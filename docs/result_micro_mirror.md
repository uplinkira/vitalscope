# 可复用结果

## 当前目录
- `D+20260314+goat/micro-mirror/`

## 当前仓库
- `https://github.com/uplinkira/micro-mirror.git`

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
  - 智能戒指预购区和钱包按钮是否可见
  - `GOAT / AgentKit Infra Snapshot` 是否显示 `catalog ready`

## 稳定命令
- 运行本地静态站
  - `cd D+20260314+goat/micro-mirror && python3 -m http.server 8000`

## 可直接演示的点
- 摄像头拍照或上传图片
- 本地时间线记录
- 双参考报告
- 智能戒指预购
- GOAT Testnet3 支付
- AgentKit 覆盖面说明

## 可直接复制的材料
- 项目一句话概括与 5 分钟演讲稿：
  - `docs/pitch_micro_mirror.md`
- `VERCEL_TOKEN` 获取与部署手册：
  - `docs/vercel_token_guide.md`

## Judge 快速口径
- `x402`：
  - 对应智能戒指预购支付闭环
- `x402-merchant`：
  - 对应订单和商户管理能力
- `ERC-8004`：
  - 对应未来健康分析 agent 的链上身份与信誉层
- `GOAT Testnet3`：
  - 对应现场钱包支付演示网络
- `AgentKit catalog`：
  - 对应页面里的 `GOAT / AgentKit Infra Snapshot`

## 最终提交方向
- `1+requirement.md` 中的 `Submission link`
- 建议同时提供：
  - GitHub 仓库链接
  - demo 链接或本地运行说明
