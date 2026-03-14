# 参考与取舍

## 主要参考
- `D+20260314+goat/1+requirement.md`
- `D+20260314+goat/prd.md`
- `GOAT-Hackathon-2026/public/generated/agentkit-catalog.json`
- `agentkit/networks/goat/config.ts`
- `agentkit/plugins/erc8004/*`
- `https://goat-hackathon-2026.vercel.app/`

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

## 本轮拒绝的方案
- 继续在 `GOAT-Hackathon-2026` 老页面上深改
  - 优点：复用更多旧结构
  - 缺点：目录不干净，最终交付物不聚焦
- 新起构建型前端项目
  - 优点：更工程化
  - 缺点：赶时间，不适合当前交付节奏
