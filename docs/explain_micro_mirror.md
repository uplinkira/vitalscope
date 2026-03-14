# Micro Mirror 工程说明

## 当前结构
- `index.html`
  - 单页静态 MVP
  - 上半部分是产品主叙事和每日镜像采集
  - 中段是时间线与双参考报告
  - 下半部分是智能戒指预购和 GOAT Testnet3 支付
  - 尾部是 AgentKit / GOAT 基础设施摘要、`AgentKit Workflow Studio` 和 `ERC-8004 Agent Identity Lab`
- `generated/agentkit-catalog.json`
  - 来自本地 `agentkit` 扫描结果
  - 用于 hackathon 现场解释支付与组件覆盖面
- `generated/agentkit-demo.json`
  - 从本地 `agentkit/` 目录抽取出的 foundation / workflow / source preview 资产
- `scripts/generate-agentkit-demo-assets.mjs`
  - 读取本地 `agentkit/` 真实文件
  - 组装 `x402` 支付流、`x402-merchant` 商户流、`ERC-8004` agent 信任流
  - 把源码片段输出成页面可直接展示的 JSON
- `README.md`
  - 运行方式
  - 目录位置
  - 最终提交去向

## 核心交互流
- 用户启动摄像头或上传图片
- 保存当日镜像
- 本地生成一条时间线记录
- 根据镜像亮度/偏红度/纹理对比 + 睡眠/压力/补水 + 可选戒指指标生成保健方向
- 报告分为：
  - 中医理论参照
  - 现代医学报告式参照
- 用户下拉到订购区，可以直接创建智能戒指预购单并走 GOAT Testnet3 支付
- 用户继续下拉可以看到 `AgentKit Workflow Studio`
  - 第一层展示 foundation：
    - runtime
    - policy
    - provider
    - token registry
  - 第二层展示三条与产品直接相关的工作流：
    - 智能戒指预购支付
    - 商户订单与订阅运营
    - 健康分析 agent 的身份与信誉
  - 第三层展示每条工作流对应的 action 名、风险级别、网络和源码片段
- 用户继续下拉还可以看到 `ERC-8004 Agent Identity Lab`
  - 左侧生成 sample agent metadata：
    - `name`
    - `description`
    - `capabilities`
    - `endpoint`
    - `agentURI`
  - 左侧可直接用 MetaMask 对 Identity Registry 发起 `register(string agentURI)`
  - 右侧可按 `agentId` 读取：
    - linked wallet
    - reputation summary
    - feedback clients
  - 这部分用来把“健康 agent 身份层”从讲稿里的概念升级成页面可演示动作

## 为什么是这个 MVP
- 用户要求赶时间，不做多轮打磨
- `prd.md` 方向很大，MVP 只保留最核心的三件事：
  - 每日镜像
  - 趋势保健提示
  - 戒指订购闭环
- 为了更贴近 hackathon 评分，又额外补了“基于本地 `agentkit/` 文件夹的工作流可视化”，避免只剩口头叙事

## 当前限制
- 报告逻辑是启发式 MVP，不是医疗诊断
- 时间线和订单目前都保存在 localStorage
- 支付部分依赖浏览器里的 MetaMask 和 GOAT Testnet3 资产
- `AgentKit Workflow Studio` 当前是基于本地源码和 catalog 生成的演示层
- `ERC-8004 Agent Identity Lab` 已支持前端直连注册与读取
- 但还没有把 `x402 merchant gateway`、完整 `ERC-8004` 信誉写入、`agentURI` 托管等能力接成正式在线后端服务
