# VitalScope 工程说明

## 命名说明
- 当前长期项目名为 `VitalScope`
- 本文部分历史内容仍会引用 `Micro Mirror`
- 那些表述指向的是当前项目的 hackathon 原型阶段

## 当前结构
- `index.html`
  - 单页静态 MVP
  - 上半部分是产品叙事、赛季化 hero、每日镜像采集
  - 中段是时间线与双参考报告
  - 下半部分是游戏化 `Quest Checkout Board`、智能戒指预购和 GOAT Testnet3 支付
  - 尾部是 `GOAT / AgentKit Infra Snapshot`、`AgentKit Workflow Studio` 和 `ERC-8004 Agent Identity Lab`
- `generated/agentkit-catalog.json`
  - 来自本地 `agentkit` 扫描结果
  - 用于 hackathon 现场解释支付与组件覆盖面
- `generated/agentkit-demo.json`
  - 从本地 `agentkit/` 目录抽取出的 foundation / workflow / source preview 资产
- `scripts/generate-agentkit-demo-assets.mjs`
  - 读取本地 `agentkit/` 真实文件
  - 组装 `x402` 支付流、`x402-merchant` 商户流、`ERC-8004` agent 信任流
  - 把源码片段输出成页面可直接展示的 JSON

## 这次新增的游戏化层
- hero 区新增：
  - `season-strip`
  - `hero-dashboard`
  - `hero-quest-track`
- 支付区新增：
  - `Quest Checkout Board`
  - `reward-grid`
  - `checkout-track`
- 套餐卡新增：
  - `tier`
  - `rarity`
  - `xpReward`
  - `perks`
  - `questCopy`

## 关键状态函数
- `computeGamifiedProfile()`
  - 把镜像记录、连续天数、戒指使用、订单进度、钱包连接、ERC-8004 身份转成 XP / 等级 / 下一奖励
- `buildJourneyStages()`
  - 生成产品总进度：
    - `Capture`
    - `Trend`
    - `Ring Sync`
    - `Checkout`
    - `Agent ID`
- `buildCheckoutStages()`
  - 生成支付进度：
    - `Connect`
    - `Create`
    - `Authorize`
    - `Pay`
    - `Confirm`
- `renderQuestTrack()`
  - 把阶段状态渲染成统一的 quest 卡片
- `renderCheckoutBoard()`
  - 把当前套餐、订单状态、等级和下一步动作压成可演示的支付任务面板

## 核心交互流
- 用户启动摄像头或上传图片
- 保存当日镜像
- 本地生成一条时间线记录
- 根据镜像亮度/偏红度/纹理对比 + 睡眠/压力/补水 + 可选戒指指标生成保健方向
- 报告分为：
  - 中医理论参照
  - 现代医学报告式参照
- 页面同时把进度映射成游戏化叙事：
  - hero 显示 season / rank / XP / daily quest
  - 订购区显示 quest checkout 的五段任务
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

## 为什么是这个 MVP
- 用户要求赶时间，不做多轮打磨
- `prd.md` 方向很大，MVP 只保留最核心的三件事：
  - 每日镜像
  - 趋势保健提示
  - 戒指订购闭环
- 为了更贴近 hackathon 评分，又额外补了三层可讲点：
  - 基于本地 `agentkit/` 文件夹的工作流可视化
  - ERC-8004 身份演示
  - 支付区游戏化 quest 叙事

## 当前限制
- 报告逻辑是启发式 MVP，不是医疗诊断
- 时间线和订单目前都保存在 `localStorage`
- 支付部分依赖浏览器里的 MetaMask 和 GOAT Testnet3 资产
- `AgentKit Workflow Studio` 当前是基于本地源码和 catalog 生成的演示层
- `ERC-8004 Agent Identity Lab` 已支持前端直连注册与读取
- `Quest Checkout Board` 当前是前端状态驱动的演示层，不是后端任务系统
- 还没有把 `x402 merchant gateway`、完整 `ERC-8004` 信誉写入、`agentURI` 托管等能力接成正式在线后端服务
