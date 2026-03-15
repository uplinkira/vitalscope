# 参考与取舍

## 主要参考

- `D+20260314+goat/1+requirement.md`
- `D+20260314+goat/prd.md`
- `GOAT-Hackathon-2026/public/generated/agentkit-catalog.json`
- `agentkit/networks/goat/config.ts`
- `agentkit/plugins/erc8004/*`
- `https://goat-hackathon-2026.vercel.app/`
- `https://luma.com/bwro4uva`
- `https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-a-projects-contributors`
- `https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference`
- `https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/troubleshooting-commits-on-your-timeline`
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
  - 本轮保留“健康可视化 + 可穿戴扩展 + 支付闭环”的长期主线
- `agentkit/networks/goat/config.ts`
  - 用于确认本地代码中的 GOAT 网络参数
  - 其中：
    - `goat-mainnet` 对应 `chainId 2345`
    - `goat-testnet` 对应 `chainId 48816`
- `agentkit/plugins/erc8004/*`
  - 用于确认 `register_agent`、`get_agent_wallet`、`get_reputation`、`get_clients` 的真实 action 与 ABI
- `https://goat-hackathon-2026.vercel.app/`
  - 用于交叉核对当前官方 dashboard 页面展示的 `MAINNET 2345` 与 `TESTNET3 48816`
- `https://luma.com/bwro4uva`
  - 用于确认 `March 14, 2026` 深圳线下 sprint 的公开活动背景
- `https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-a-projects-contributors`
  - 用于确认 GitHub contributors 页面会把 commit 作者和 co-author 都计算进来
- `https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference`
  - 用于确认 contribution 统计依赖满足归属条件的 commit
- `https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/troubleshooting-commits-on-your-timeline`
  - 用于确认贡献图更新可能不是即时的，GitHub 明确写到更新最多可能需要 `24 hours`
- `https://vercel.com/docs/deployments/git/vercel-for-github`
  - 用于确认 Vercel 连接 GitHub 后，提交可以触发自动部署，并区分 preview / production
- `https://vercel.com/docs/pricing/hobby`
  - 用于确认 `Hobby` 当前是免费方案
  - 也用于确认 `Hobby` 的适用边界是个人、非商业使用
- `https://vercel.com/pricing`
  - 用于确认 `Pro` 当前公开价格是 `$20 / user / month`
  - 也用于确认 Vercel 的收费模型包含 `additional usage`

## 本轮新增决策

- 主项目正式更名为 `VitalScope`
  - 理由：
    - 比 `Micro Mirror` 更像长期健康可视化产品名
    - 仍然保留“visualization / observation”意味
    - 不把产品叙事锁死在“镜子”这个单一交互上
- 主仓库改为单人长期开发定位
  - 主维护者：
    - `uplinkira`
- 部署仓库继续保留 `micro-mirror-deploy`
  - 用作 `2026-03-14` 深圳黑客松快照仓库

## 关于 GitHub Contributors 仍显示旧账号的解释

- 结合本地与远端检查，本轮可确认：
  - 远端公开仓库当前只有 `main` 分支
  - 远端没有公开 tags
  - 默认分支当前提交作者名已经统一为 `uplinkira`
- 但旧账号仍可能继续显示在 contributors 的最可能原因有三类：
  - GitHub contributors / contribution 统计有缓存与后台重算延迟
  - 旧账号曾经通过 commit author 或 co-author 被统计过
  - 本地虽然已重写默认分支，但仍保留了未推送的备份 tag，说明旧提交对象并非完全从所有本地引用里消失
- 其中最强的一条推断是：
  - 当前远端只有 `main` 且无 tags，旧账号仍显示时，更像是 GitHub 的统计缓存尚未完全刷新
  - 这是基于 GitHub 官方“贡献图最多需要 `24 hours` 更新”的文档做出的推断

## 本轮拒绝的方案

- 继续沿用 `Micro Mirror` 作为长期主仓库名
  - 缺点：
    - 更像一次性 hackathon 产品
    - 不够适合长期健康可视化品牌化
- 把 deploy 仓库也一起改名
  - 缺点：
    - 会冲淡它作为 `2026-03-14` 黑客松快照的档案价值
- 在没有官方公开奖项页时，把获奖写成外部已核验事实
  - 缺点：
    - 事实外推风险较高
