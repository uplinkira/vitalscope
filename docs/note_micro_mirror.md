# 历史概念记录

## 2026-03-14 17:18
- 当前版本尚未进入复杂架构迭代期。
- 暂时没有被正式移除的页面概念。
- 已明确没有采用：
  - 继续混改旧 `GOAT-Hackathon-2026` 页面
  - 新起完整前端工程

## 2026-03-14 18:08 公司模块原理与 `Micro Mirror` 应用笔记

### 一、先用一句话理解这些模块的分层
- `AgentKit` 不是一个单一支付按钮，而是一组把“agent 要调用什么能力”标准化的动作层。
- 它的大致分层可以理解为：
  - `Action`
    - 给 agent 一个统一工具名，例如 `goat.x402.payment.create`
    - 定义输入格式、风险等级、是否需要确认、适用网络
  - `Adapter`
    - 负责把动作真正接到外部系统
    - 可能接 HTTP 商户接口，也可能接钱包签名器
  - `Wallet / Chain / Portal`
    - 最底层才是真正的链上合约、钱包签名、商户后台 API
- 所以这些模块的价值，不只是“能调接口”，而是把支付、身份、信誉、商户运维变成 agent 可以稳定调用的标准能力。

### 二、`x402` 的底层原理

#### 1. 它本质上在做什么
- 从本地源码看，`x402` 不是单一步骤，而是一条支付流程的拆分：
  - `goat.x402.payment.create`
    - 创建支付意图
  - `goat.x402.payment.submitSignature`
    - 提交付款人签名
  - `goat.x402.payment.transfer`
    - 执行代币转账
  - `goat.x402.payment.status`
    - 查询支付状态
  - `goat.x402.payment.cancel`
    - 取消支付
- 这意味着它不是把“付款”写死成一次 RPC，而是把支付拆成可追踪的状态机。

#### 2. 它为什么要拆成这几步
- 在 `agentkit/plugins/x402/adapters/types.ts` 里，商户侧和付款侧被拆成两个角色：
  - `MerchantGatewayAdapter`
    - 负责创建 payment intent
    - 负责返回支付状态
    - 负责接收签名
    - 负责取消订单
  - `PayerWalletAdapter`
    - 负责规范化签名
    - 负责对 `EIP-712` typed data 做签名
    - 负责真正执行 token transfer
- 这个设计的底层逻辑是：
  - 商户负责“定义这笔钱应该怎么付、付给谁、什么时候算成功”
  - 用户钱包负责“证明我同意并完成转账”
- 这样能把支付流程拆成“订单生成”“授权”“结算”“状态查询”四个清晰阶段，适合 agent 编排。

#### 3. `EIP-712` 在这里的意义
- 在 `payment.submit-signature.ts` 和 `examples/x402-payment-flow/eip712-full-flow.ts` 里，可以看到商户会返回 `calldataSignRequest`。
- 这里的核心不是简单签一串字符串，而是签一个结构化 typed data：
  - `domain`
  - `types`
  - `primaryType`
  - `message`
- 这样做的意义是：
  - 用户知道自己到底在签什么结构化授权
  - 商户后续可以把这个签名作为支付授权凭证
  - agent 可以先拿到订单、再拿到签名、再推进后续状态
- 对支付系统来说，这比“盲签任意 hex”更可控，也更适合接入合规或审计流程。

#### 4. `x402` 在我们场景里的用法
- 对 `Micro Mirror` 来说，`x402` 最直接对应的是“智能戒指预购支付闭环”。
- 更具体地说，它适合承接这些场景：
  - 智能戒指预购付款
  - 健康订阅月费
  - 解锁更深度的恢复报告
  - 企业版批量开通健康观察名额
- 如果 judge 问“你们为什么需要 `x402`”，可以回答：
  - 因为我们不是只想做一个静态表单收款页，而是想让健康订阅能被 agent 自动创建订单、请求签名、确认支付、再激活服务。

#### 5. 我们现在已经做到哪里
- 当前 MVP 前端已经把 GOAT Testnet3 钱包连接和支付入口做进页面。
- 当前页面也已经把 `x402` 的能力映射到产品叙事里。
- 但要更完整落地，还需要下一步接真正的商户网关：
  - 前端或服务端调用 `goat.x402.payment.create`
  - 返回 payment intent 和待签名数据
  - 用户签名后走 `goat.x402.payment.submitSignature`
  - 再通过 `goat.x402.payment.status` 更新订单状态

### 三、`x402-merchant` 的底层原理

#### 1. 它和 `x402` 的区别
- `x402` 更像支付交易流本身。
- `x402-merchant` 更像商户后台操作层。
- 从 `agentkit/plugins/x402-merchant/index.ts` 可以看到，这一层覆盖了：
  - 商户注册、登录、刷新 token
  - dashboard 统计
  - profile 管理
  - orders 查询
  - balance 与手续费配置
  - receiving addresses
  - callback contracts
  - API keys
  - webhooks
  - invite codes
  - audit logs
- 所以 `x402-merchant` 的本质是：让 agent 能操作“收款方后台”，而不是只管付款动作。

#### 2. 它底层怎么工作
- 在 `agentkit/plugins/x402-merchant/adapters/types.ts` 中，底层抽象是 `MerchantPortalClient`。
- 它只做几件基础但关键的事：
  - 维护访问令牌 `accessToken`
  - 对商户后台发 `GET / POST / PUT / DELETE`
  - 每个动作可以带独立 token 和取消信号
- 这说明 `x402-merchant` 的核心思想不是把所有逻辑塞到 SDK 里，而是：
  - 把商户后台能力统一包装成 agent action
  - 再由一个 HTTP client 去调用真实 merchant portal
- 例如：
  - `goat.x402.merchant.orders.list`
    - 本质是拼 query string 再请求 `/merchant/v1/orders`
  - `goat.x402.merchant.dashboard.stats`
    - 本质是读 `/merchant/v1/dashboard/stats`

#### 3. 它在我们场景里为什么重要
- `Micro Mirror` 不只是一次性卖戒指，真正长期价值是订阅和持续服务。
- 一旦进入真实运营阶段，我们就需要：
  - 查看今天有多少预购单
  - 看哪些用户支付成功
  - 哪些订单该触发发货或开通订阅
  - 哪些 webhook 已经把支付事件推送到我们的应用
  - 商户地址和 API key 如何管理
- 这些事情如果没有 `x402-merchant`，就只能自己零散地接后台接口。
- 有了它，就能把“商户运营”也纳入 agent 自动化流程。

#### 4. 在 `Micro Mirror` 中的具体用途
- 预购戒指后：
  - 用 `orders.list` / `orders.get` 查订单状态
- 看业务增长：
  - 用 `dashboard.stats` 看营收和订单走势
- 激活订阅：
  - 用 `webhooks.create` 接支付成功事件
- 多钱包收款：
  - 用 `addresses.list` / `addresses.add` 管理收款地址
- 后续团队协作：
  - 用 `api-keys.get` / `api-keys.rotate` 做密钥轮换
- 这层对我们的意义不是“让 demo 更炫”，而是“让 demo 能自然长成一个真的业务系统”。

### 四、`ERC-8004` 的底层原理

#### 1. 它不是支付模块，而是 agent 身份与信誉模块
- 从 `agentkit/plugins/erc8004` 可以看到，`ERC-8004` 至少覆盖两类 registry：
  - `Identity Registry`
  - `Reputation Registry`
- 在 `addresses.ts` 里，主网和测试网对应的是不同 registry 地址。
- 这说明它的定位不是订单或钱包，而是“把 agent 作为一个链上实体记录下来”。

#### 2. 身份层在做什么
- `erc8004.register_agent`
  - 调用 identity registry 的 `register(string agentURI)`
  - 返回交易哈希
- `erc8004.set_agent_uri`
  - 更新 agent 的外部描述地址
- `erc8004.get_metadata` / `erc8004.set_metadata`
  - 对 agent 读写元数据
- `erc8004.get_agent_wallet`
  - 查询 agent 对应的钱包
- 它的底层逻辑可以理解成：
  - 先把 agent 注册成一个正式身份
  - 再把描述信息、版本、方法论、钱包等资料挂到这个身份上

#### 3. 信誉层在做什么
- `erc8004.give_feedback`
  - 向 reputation registry 写入反馈
  - 反馈里不只是一个分数，还包含：
    - `value`
    - `valueDecimals`
    - `tag1`
    - `tag2`
    - `endpoint`
    - `feedbackURI`
    - `feedbackHash`
- `erc8004.get_reputation`
  - 可以按 `agentId`、客户地址、标签做聚合查询
- 这意味着它不是一个“拍脑袋总评分”，而是：
  - 可分标签
  - 可分客户
  - 可附带证据 URI / hash
  - 可做结构化信誉统计

#### 4. 它在我们场景里为什么很有价值
- `Micro Mirror` 做的是健康方向建议，不是普通电商。
- 这种产品最难的一点，不只是“给建议”，而是“让用户和合作方相信建议体系是可追踪、可版本化、可逐步建立信誉的”。
- `ERC-8004` 刚好可以承接这一层：
  - 把 `Micro Mirror Recovery Agent` 注册成链上 agent
  - `agentURI` 指向我们的公开说明 JSON
  - 里面写清楚：
    - 这是保健方向提示，不是医疗诊断
    - 当前使用的是镜像趋势 + 可选戒指数据
    - 哪些解释属于中医参考，哪些属于现代医学参考
    - 当前分析模型版本号
- 后续我们还可以把下面这些维度做成信誉标签：
  - `trend_consistency`
  - `recovery_signal_quality`
  - `explanation_clarity`
  - `ring_data_alignment`
- 这样 judge 会更容易理解：
  - 我们不是只有一个“健康建议页面”
  - 我们是在做一个可注册、可迭代、可积累信誉的健康 agent 服务

#### 5. `ERC-8004` 在 `Micro Mirror` 的理想闭环
- 用户先用镜像与戒指数据获得建议
- agent 给出本周恢复方向
- 一段时间后，用户或合作机构可以对建议质量给反馈
- 这些反馈被按标签记录
- 新用户可以看到这个 agent 在不同标签上的累计表现
- 这会让“健康建议”从主观体验，慢慢变成可跟踪的服务信誉资产

### 五、`wallet` 模块的底层原理

#### 1. 它是所有链上动作的基础层
- 在 `agentkit/plugins/wallet/index.ts` 中，`wallet` 暴露的不是一个单能力，而是一组基础链上工具：
  - 查余额
  - 查 allowance
  - 合约读写
  - 原生币转账
  - `ERC20` 转账与授权
  - 部署合约
  - 解析 token symbol
- 这层的意义是：上层业务模块可以少关心底层细节，把链交互统一成标准 action。

#### 2. 读能力和写能力为什么要分开
- 例如 `wallet.balance` 是只读动作。
- `contractWrite`、`transferErc20` 这类是高风险写动作。
- 这种拆法很适合 agent 场景，因为：
  - 查询类动作可以自动化频繁执行
  - 写操作必须严格确认
- 对健康应用来说尤其重要，因为我们不希望“看个余额”和“发起支付”被混成同一风险等级。

#### 3. `resolve_token` 为什么看起来简单却很实用
- `wallet.resolve_token` 背后用的是 `networks/goat/tokens.ts` 里的 token registry。
- 它会把符号映射为链上地址，例如 `GOAT`、`WGBTC` 等。
- 这个能力很基础，但很适合作为 agent 的预处理步骤：
  - 用户说“我要用 GOAT 支付”
  - agent 先解析出正确 token 地址
  - 再交给支付或转账动作使用
- 这能减少硬编码地址散落在业务代码里的问题。

#### 4. 它在我们场景里的价值
- 在 `Micro Mirror` 里，`wallet` 主要提供四类支撑：
  - 支付前余额检查
  - token 地址解析
  - 测试网演示时的钱包连通性验证
  - 后续链上订阅、退款、奖励等能力的基础层
- 也就是说：
  - `wallet` 本身不是业务卖点
  - 但没有它，`x402` 和 `ERC-8004` 这种上层能力就很难稳定落地

### 六、为什么这些模块组合起来很适合 `Micro Mirror`
- 如果只看单模块：
  - `x402` 解决支付
  - `x402-merchant` 解决商户运营
  - `ERC-8004` 解决 agent 身份与信誉
  - `wallet` 解决底层链交互
- 但对我们来说，真正重要的是它们能拼成一条完整业务链：
  - 用户每天拍照
  - agent 生成恢复方向
  - 用户购买智能戒指或订阅服务
  - 商户系统管理订单和开通状态
  - 健康分析 agent 逐步沉淀身份和信誉
- 这条链非常适合 hackathon 叙事，因为它既能现场演示，又能讲清长期产品化方向。

### 七、我们当前 MVP 与下一步的边界

#### 1. 当前已经落地到界面的部分
- 每日镜像采集
- 时间线
- 本地健康方向报告
- 智能戒指预购区
- GOAT Testnet3 钱包连接与支付入口
- `AgentKit catalog` 展示 `x402`、`x402-merchant`、`erc8004`、`wallet` 的覆盖情况

#### 2. 还没有完全打通、但最容易继续接的部分
- `x402`
  - 接真实 merchant gateway，完成创建 intent、签名提交、状态回查
- `x402-merchant`
  - 接订单查询、dashboard、webhook 开通服务
- `ERC-8004`
  - 把 `Micro Mirror` 分析 agent 真正注册到测试网
- `wallet`
  - 在支付前先做余额和 token 检查提示

#### 3. 对外应该怎么诚实表述
- 可以说：
  - 我们已经把这些模块和产品闭环对齐，并在 MVP 页面中体现了支付入口、网络环境和模块覆盖说明。
- 不建议说：
  - 我们已经完成全部商户后端、链上注册和信誉系统上线。
- 最稳妥的说法是：
  - 我们已经完成可演示的前端闭环和主办方 kit 映射，下一步最直接的工程落点就是把 `x402`、`x402-merchant`、`ERC-8004` 从 catalog 展示升级成真实在线调用。

## 后续可迁入本文件的内容
- 如果后续把 MVP 从本地启发式分析替换为真实模型推理
- 如果后续把单页静态实现升级为前后端服务
