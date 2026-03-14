# 参考与取舍

## 主要参考
- `D+20260314+goat/1+requirement.md`
- `D+20260314+goat/prd.md`
- `GOAT-Hackathon-2026/public/generated/agentkit-catalog.json`
- `agentkit/networks/goat/config.ts`
- `agentkit/plugins/erc8004/*`
- `https://goat-hackathon-2026.vercel.app/`
- `https://luma.com/bwro4uva`
- `https://vercel.com/docs/deployments/git/vercel-for-github`
- `https://vercel.com/docs/cli`
- `https://vercel.com/docs/cli/link`
- `https://vercel.com/docs/cli/git`

## 关键解释
- `1+requirement.md`
  - 给出了参考仓库、AgentKit 背景和最终 `Submission link`
- `prd.md`
  - 给出了产品方向扩展
  - 但内容跨度较大，因此本轮只抽取最适合 MVP 的部分
- `agentkit/networks/goat/config.ts`
  - 用于确认当前本地代码中的 GOAT 网络参数
  - 其中：
    - `goat-mainnet` 对应 `chainId 2345`
    - `goat-testnet` 对应 `chainId 48816`
- `agentkit/plugins/erc8004/*`
  - 用于确认 `register_agent`、`get_agent_wallet`、`get_reputation`、`get_clients` 的真实 action 与 ABI
- `https://goat-hackathon-2026.vercel.app/`
  - 用于交叉核对当前官方 dashboard 页面展示的 `MAINNET 2345` 与 `TESTNET3 48816`
  - 本轮据此纠正了“把 `2345` 误说成 testnet3”的风险
- `https://luma.com/bwro4uva`
  - 用于确认本项目参与的深圳线下 sprint 背景
  - 公开页说明了：
    - 活动由 `Sophia Li`、`GOAT Network`、`OpenBuild` 发起
    - 现场是高强度的 `3-4` 小时构建
    - GOAT 赛道强调 `x402`、`ERC-8004` 与 `GOAT Bitcoin L2 Testnet`
  - README 中关于“深圳从零到一的 sprint 背景”据此补充
- `https://vercel.com/docs/deployments/git/vercel-for-github`
  - 用于确认 Vercel 直接绑定 GitHub 仓库与自动部署的推荐路径
- `https://vercel.com/docs/cli`
  - 用于确认 `VERCEL_TOKEN` 与 CLI 发布流程
- `https://vercel.com/docs/cli/link`
  - 用于确认本地仓库与 Vercel 项目绑定方式
- `https://vercel.com/docs/cli/git`
  - 用于确认 `vercel git connect` / `vercel git disconnect` 的连接方式

## 本轮新增取舍
- 许可证选择 `Apache-2.0`
  - 优点：
    - 允许商用
    - 允许后续比赛和产品化继续使用
    - 带有更明确的专利授权条款
  - 不选 `MIT`
    - 更简单，但对未来产品化时的专利表述更弱
  - 不选“无许可证”
    - 虽然保守，但会让协作、复用和公开仓库解释都更模糊

## 本轮拒绝的方案
- 继续在 `GOAT-Hackathon-2026` 老页面上深改
  - 优点：复用更多旧结构
  - 缺点：目录不干净，最终交付物不聚焦
- 新起构建型前端项目
  - 优点：更工程化
  - 缺点：赶时间，不适合当前交付节奏
