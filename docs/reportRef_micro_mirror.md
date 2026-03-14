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
- `https://vercel.com/docs/pricing/hobby`
- `https://vercel.com/pricing`
- `https://vercel.com/docs/cli`
- `https://vercel.com/docs/cli/link`
- `https://vercel.com/docs/cli/git`

## 关键解释

- `1+requirement.md`
  - 给出了参考仓库、AgentKit 背景和最终 `Submission link`
- `prd.md`
  - 给出了产品方向扩展
  - 但内容跨度较大，因此本轮继续只抽取最适合 MVP 和长期产品定位的部分
- `agentkit/networks/goat/config.ts`
  - 用于确认当前本地代码中的 GOAT 网络参数
  - 其中：
    - `goat-mainnet` 对应 `chainId 2345`
    - `goat-testnet` 对应 `chainId 48816`
- `agentkit/plugins/erc8004/*`
  - 用于确认 `register_agent`、`get_agent_wallet`、`get_reputation`、`get_clients` 的真实 action 与 ABI
- `https://goat-hackathon-2026.vercel.app/`
  - 用于交叉核对当前官方 dashboard 页面展示的 `MAINNET 2345` 与 `TESTNET3 48816`
  - 页面演示逻辑仍然可以作为 `ERC-8004` 身份层说明的参考
- `https://luma.com/bwro4uva`
  - 用于确认 2026-03-14 深圳线下 sprint 的公开活动背景
  - 公开页可支持：
    - 活动由 `Sophia Li`、`GOAT Network`、`OpenBuild` 发起
    - 现场构建窗口为 `14:30` 到 `17:30`
    - 赛题背景强调 `OpenClaw`、`GOAT`、`x402`、`ERC-8004`
- `https://vercel.com/docs/deployments/git/vercel-for-github`
  - 用于确认 Vercel 连接 GitHub 后，提交可以触发自动部署，并区分 preview / production
- `https://vercel.com/docs/pricing/hobby`
  - 用于确认 `Hobby` 当前是免费方案
  - 也用于确认 `Hobby` 的适用边界是个人、非商业使用
- `https://vercel.com/pricing`
  - 用于确认 `Pro` 当前公开价格是 `$20 / user / month`
  - 也用于确认 Vercel 的收费模型不是只有平价月费，还包含 `additional usage`
- `https://vercel.com/docs/cli`
  - 用于确认 `VERCEL_TOKEN` 与 CLI 发布流程
- `https://vercel.com/docs/cli/link`
  - 用于确认本地仓库与 Vercel 项目绑定方式
- `https://vercel.com/docs/cli/git`
  - 用于确认 `vercel git connect` / `vercel git disconnect` 的连接方式

## 本轮新增决策

- 主仓库 `micro-mirror`
  - 去掉 README 里的黑客松参赛叙事
  - 保留成员信息与长期产品定位
  - 将其明确为长期主仓库与 source of truth
- 部署仓库 `micro-mirror-deploy`
  - 保留 2026-03-14 深圳黑客松语境
  - 保留线上交付镜像与发布记录定位
- `docs/repo_deploy_workflow_2026.md`
  - 新增 Vercel 原理说明
  - 新增“为什么现在免费能跑”的解释
  - 新增 `Hobby` 限制与 `Pro` 升级触发条件

## 获奖信息取舍

- 用户要求在部署仓库保留：
  - 2026-03-14 深圳现场黑客松背景
  - `General Track First Place`
- 本轮未找到公开网页能独立验证获奖结果
- 因此部署仓库 README 采用的口径是：
  - `according to team records`
  - 这样既保留团队真实记录，也避免把未核验的奖项写成公开可证的外部事实

## 本轮新增取舍

- 关于 Vercel 免费部署解释
  - 选择写成：
    - 当前 MVP 是轻量静态前端
    - 所以在低流量 demo 阶段适合 `Hobby`
  - 不写成：
    - “Vercel 永远免费够用”
  - 原因：
    - 这会误导后续产品化判断
- 关于主仓库 README
  - 选择去掉 hackathon 叙事
  - 不继续把所有定位都绑在最初 sprint 上
  - 原因：
    - 用户已明确将其作为长期项目推进

## 本轮拒绝的方案

- 继续让两个仓库都使用同一份 README 叙事
  - 优点：
    - 同步简单
  - 缺点：
    - 无法体现“主仓库长期化”和“部署仓库保留黑客松档案”这两个不同定位
- 在没有公开来源时把 `General Track First Place` 写成已公开核验事实
  - 优点：
    - 表达更强
  - 缺点：
    - 存在事实外推风险
- 把 Vercel 免费原因写成单纯“因为 Vercel 很良心”
  - 优点：
    - 口语化
  - 缺点：
    - 解释不具工程价值，也不利于后续估算部署边界
