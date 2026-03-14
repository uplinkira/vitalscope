# Micro Mirror 项目概括与演讲稿

## 一句话概括
- 中文：
  - `Micro Mirror` 是一个用每日镜像时间线发现恢复趋势、给出中医与现代医学双参考保健方向，并可通过智能戒指扩展到多模态健康订阅的产品。
- English:
  - `Micro Mirror` is a daily camera-based health mirror that tracks recovery trends over time, gives wellness direction with both TCM and modern medical framing, and extends into a smart-ring-powered multimodal subscription service.

## Vercel 部署后怎么看效果
- 在 Vercel 项目页看到最新 deployment 状态是 `Ready`
- 点开项目域名，一般会是 `https://xxx.vercel.app`
- 打开后重点看这 5 个地方：
  - 首页主视觉和产品说明是否正常加载
  - 摄像头权限是否能弹出；如果浏览器拦摄像头，上传图片兜底是否可用
  - 拍照或上传后，时间线是否新增一条记录
  - 智能戒指预购区、`Connect MetaMask`、`支付预购单` 是否都能看到
  - `GOAT / AgentKit Infra Snapshot` 是否显示 `catalog ready`
- 如果现场要快速演示，优先用手机或带摄像头的笔记本打开这个 `vercel.app`

## 主办方 Kit 对应关系
- `x402`
  - 对应我们的智能戒指预购支付闭环
  - 现场可以说我们已经把前端预购和 GOAT Testnet3 钱包支付入口做出来，后端可直接接 `goat.x402.payment.create`、`goat.x402.payment.submitSignature`、`goat.x402.payment.status`
- `x402-merchant`
  - 对应商户侧订单、地址、统计和 webhook 能力
  - 现场可以说后续订阅订单管理可直接接 `goat.x402.merchant.orders.list`、`goat.x402.merchant.dashboard.stats`
- `ERC-8004`
  - 对应未来把 `Micro Mirror` 的分析 agent 或恢复教练 agent 注册成链上身份
  - 现场可以说这让健康建议服务不只是一个页面，而是可注册、可追踪、可积累信誉的 agent
- `wallet + GOAT Testnet3`
  - 对应现场 demo 的钱包连接和支付网络
  - 这部分已经在 MVP 界面里可见、可演示
- `AgentKit catalog`
  - 我们从本地 `agentkit` 目录生成了 `generated/agentkit-catalog.json`
  - 页面里的 `GOAT / AgentKit Infra Snapshot` 会直接展示 `x402`、`x402-merchant`、`erc8004`、`wallet` 的覆盖情况

## 5 分钟演讲稿

大家好，我们的项目叫 `Micro Mirror`。

`Micro Mirror` 想解决的问题其实很直接：很多人知道自己应该更健康一点，但日常健康管理的反馈太慢了。今天熬夜、压力大、睡眠差，通常不会立刻看到结构化结果；同样，今天开始早睡、补水、调整作息，也很难在短时间内看到可追踪的改善。我们的想法是，把“每天照镜子”这件事变成一个可记录、可解释、可形成行动建议的产品入口。

所以我们的基础功能非常简单，也非常容易理解。用户每天打开 `Micro Mirror`，用摄像头拍一张正脸照片，系统把这张照片和前几天、前几周的镜像放到同一条时间线上。我们不把它做成“单次好看不好看”的判断，而是做成“趋势”判断。也就是说，我们更关注的是：你最近是不是在持续变疲惫，还是在慢慢恢复；你的状态变化，是短期波动，还是开始出现值得长期关注的方向。

在 MVP 里，我们给用户的不是医疗诊断，而是“疾病预防 / 保健方向提示”。这个提示分成两层表达。第一层是中医理论参照，比如从气色、偏红、偏干、眼周疲态这些趋势，给出更接近“压力热象”“气血支持”“津液与屏障恢复”这样的理解路径。第二层是现代医学报告式参照，我们会把同样的趋势翻译成更容易做行动决策的语言，比如：这可能更像恢复债累积、睡眠恢复不足、慢性压力负荷偏高，或者皮肤屏障压力增加。这样做的目的不是制造焦虑，而是让用户更容易把自己的感受、镜像变化和生活方式因素对应起来。

然后，`Micro Mirror` 不只停在拍照。我们的进阶产品是智能戒指。因为只看照片，能看到的是“外显状态”；但如果我们想真正判断恢复质量和长期健康趋势，还需要照片以外的生理信号。所以在进阶版里，智能戒指会补充像 HRV、静息心率、睡眠恢复这些更底层的指标。这样我们就能把“你看起来累”升级成“你的镜像趋势和恢复系统数据正在一起变差”，或者反过来说，“虽然你自己主观上没感觉，但镜像和戒指数据都在往恢复方向走”。这会让建议更稳定，也更适合做长期订阅服务。

从产品结构上看，我们今天展示的是一个非常清晰的闭环。第一步，用户做每日镜像采集。第二步，系统把镜像放到时间线里，生成趋势性健康提示。第三步，系统给出下一周应该优先尝试的行动方向。第四步，如果用户想获得更高精度的数据和长期服务，就可以进入智能戒指订购和订阅服务。

在商业层面，这个结构也很自然。基础版可以是低门槛的日常记录工具，先帮助用户建立镜像习惯和健康反馈感；进阶版通过智能戒指，把产品从“只看脸”升级成“多模态恢复镜像”；再往后，用户还可以继续叠加季度复盘、长期健康订阅，甚至更完整的检测服务。

技术上，我们这次黑客松的 MVP 重点不是吹一个很重的医学模型，而是先把这个产品闭环跑通。我们已经把每日拍照、时间线、本地报告生成、智能戒指预购和支付路径做到了一个能现场演示的单页 MVP。

在主办方 kit 的使用上，我们不是只贴了一个 logo。第一，我们把 `GOAT Testnet3` 的钱包和支付入口直接放进了预购流程，现场可以演示智能戒指如何完成链上支付闭环。第二，我们把 `AgentKit` 里的 `x402` 和 `x402-merchant` 相关能力映射到这个产品里，意味着从支付 intent、签名确认到订单状态、商户管理，这条链路在产品叙事上是完整的。第三，我们把 `ERC-8004` 作为后续健康分析 agent 的身份层来讲，这样 `Micro Mirror` 未来不只是一个页面，而是一个可以被注册、追踪和积累信誉的健康 agent 服务。为了让 judge 看得更清楚，我们还把本地 `agentkit` 仓库扫描成 `catalog`，直接展示在页面里的 `GOAT / AgentKit Infra Snapshot` 区块。

所以如果用一句话总结，`Micro Mirror` 想做的是：让健康管理从“偶尔想起来一次”变成“每天照镜子就能看到趋势，并知道下一步该做什么”。

谢谢大家。

## Judge 快答版
- 中文：
  - 我们用 `x402` 做智能戒指预购支付闭环，用 `x402-merchant` 对接订单和商户能力，用 `ERC-8004` 作为未来健康分析 agent 的链上身份层，再用 `GOAT Testnet3` 做现场支付演示，所以这不是一个纯概念页，而是已经对齐主办方基础设施的健康订阅 MVP。
- English:
  - We use `x402` for the smart ring preorder payment flow, `x402-merchant` for merchant and order operations, `ERC-8004` as the future on-chain identity layer for our health agent, and `GOAT Testnet3` for the live payment demo, so this is not just a concept page but a health subscription MVP aligned with the organizer's infrastructure.
