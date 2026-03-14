# 可复用结果

## 当前主仓库

- 路径：
  - `D+20260314+goat/micro-mirror/`
- GitHub：
  - `https://github.com/uplinkira/micro-mirror.git`
- 定位：
  - 长期产品仓库
  - source of truth
- 许可证：
  - `Apache-2.0`

## 当前部署镜像仓库

- GitHub：
  - `https://github.com/uplinkira/micro-mirror-deploy.git`
- 定位：
  - 当前线上 demo 的发布镜像
  - 迁移完成前的 release archive

## README 定位结果

- `micro-mirror/README.md`
  - 不再以黑客松参赛历史为主叙事
  - 只保留成员信息、产品说明、技术定位与长期仓库角色
- `micro-mirror-deploy/README.md`
  - 保留 2026-03-14 深圳现场 sprint 语境
  - 保留团队获奖记录

## Vercel 快速判断口径

- 现在为什么可以先不花钱
  - 因为当前仓库是轻量静态站
  - 摄像头、钱包、前端交互大多在浏览器里完成
  - 当前流量仍属于 demo / judge / 小规模访问级别
- 为什么这不是永久答案
  - `Hobby` 官方边界是个人、非商业使用
  - 一旦进入真实产品协作或商用阶段，就该评估 `Pro`
- 当前公开价格口径
  - `Hobby = free`
  - `Pro = $20 / user / month + additional usage`
  - `Enterprise = custom`

## 推荐仓库策略

- 目标状态
  - 只保留一个主仓库 `micro-mirror`
  - 让 Vercel 直接绑定 `micro-mirror`
- 过渡状态
  - 暂时保留 `micro-mirror-deploy`
  - 仅在需要刷新现有线上 demo 时同步过去

## Vercel 快速入口

- 一键导入：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`

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
- GitHub / Vercel / `VERCEL_TOKEN` / 单仓库迁移指南：
  - `docs/repo_deploy_workflow_2026.md`

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
- 当前长期产品说明以主仓库为准
