# 可复用结果

## 当前目录
- `D+20260314+goat/micro-mirror/`

## 当前仓库
- `https://github.com/uplinkira/micro-mirror.git`

## 部署仓库
- `https://github.com/uplinkira/micro-mirror-deploy.git`
- 用途：
  - 绑定已成功上线的 Vercel 项目
  - 当需要快速刷新线上 demo 时，把主仓库当前稳定版本同步到这个仓库

## Vercel 快速入口
- 一键导入：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
- 当前说明：
  - 仓库和 `vercel.json` 已准备好
  - 这台机器缺少 Vercel 登录态，CLI 暂时不能直接出 `vercel.app`

## Vercel 上线后检查
- 在 Vercel 控制台确认最新 deployment 状态为 `Ready`
- 点击项目域名，一般为 `https://xxx.vercel.app`
- 打开后优先检查：
  - 摄像头或图片上传是否可用
  - 时间线新增记录是否正常
  - hero 是否出现 `Season / Rank / Quest XP`
  - 智能戒指预购区是否出现 `Quest Checkout Board`
  - `GOAT / AgentKit Infra Snapshot` 是否显示 `catalog ready`

## 稳定命令
- 运行本地静态站
  - `cd D+20260314+goat/micro-mirror && python3 -m http.server 8000`
- 页面脚本语法检查
  - `cd D+20260314+goat/micro-mirror && awk '/<script type="module">/{flag=1;next}/<\\/script>/{flag=0}flag' index.html > /tmp/micro_mirror_check.mjs && node --check /tmp/micro_mirror_check.mjs`

## 可直接演示的点
- 摄像头拍照或上传图片
- 本地时间线记录
- 双参考报告
- 游戏化 hero：
  - `Season`
  - `Rank`
  - `Quest XP`
  - `daily quest`
- 智能戒指预购
- GOAT Testnet3 支付
- 游戏化支付面板：
  - `Quest Checkout Board`
  - 五段支付关卡
  - 套餐稀有度 / 奖励 / 下一解锁
- AgentKit 覆盖面说明
- AgentKit Workflow Studio：
  - foundation 卡片
  - 三条产品化工作流
  - 对应 action 列表
  - 本地 `agentkit/` 源码片段预览
- ERC-8004 Agent Identity Lab：
  - sample agent metadata / `agentURI`
  - MetaMask 注册 `register_agent`
  - 按 `agentId` 读取 wallet / reputation / clients

## 可直接复制的材料
- 项目一句话概括与 5 分钟演讲稿：
  - `docs/pitch_micro_mirror.md`
- `VERCEL_TOKEN` 获取与部署手册：
  - `docs/vercel_token_guide.md`

## AgentKit 资产刷新命令
- `cd D+20260314+goat/micro-mirror && node scripts/generate-agentkit-demo-assets.mjs`

## Judge 快速口径
- `x402`
  - 对应智能戒指预购支付闭环
- `x402-merchant`
  - 对应订单和商户管理能力
- `ERC-8004`
  - 对应未来健康分析 agent 的链上身份与信誉层
- `GOAT Testnet3`
  - 对应现场钱包支付演示网络
- `Quest Checkout Board`
  - 对应把支付闭环讲成清晰任务链，让 judge 更容易理解 agent 何时“行动”
- `AgentKit catalog`
  - 对应页面里的 `GOAT / AgentKit Infra Snapshot`

## 当前网络口径
- `GOAT Testnet3`
  - RPC: `https://rpc.testnet3.goat.network`
  - Chain ID: `48816`
- `GOAT mainnet`
  - RPC: `https://rpc.goat.network`
  - Chain ID: `2345`

## 最终提交方向
- `1+requirement.md` 中的 `Submission link`
- 建议同时提供：
  - GitHub 仓库链接
  - demo 链接或本地运行说明
