# Micro Mirror MVP

## 目录位置
- 本地目录：`D+20260314+goat/micro-mirror`

## 当前 MVP 内容
- `index.html`
  - 每日摄像头拍照 / 图片上传兜底
  - 本地时间线记录
  - 中医理论 + 现代医学报告参照的保健方向提示
  - 智能戒指预购与 GOAT Testnet3 支付闭环
  - `AgentKit Workflow Studio`
    - 直接展示 `x402`、`x402-merchant`、`ERC-8004`、`wallet` 在 `Micro Mirror` 场景里的工作流
    - 可点击查看动作列表和本地 `agentkit/` 源码片段
- `generated/agentkit-catalog.json`
  - 本地 `agentkit` 扫描出的能力清单，用于 hackathon judge 讲解
- `generated/agentkit-demo.json`
  - 从本地 `agentkit/` 目录提取出的工作流、基础模块和源码片段
- `scripts/generate-agentkit-demo-assets.mjs`
  - 重新生成 `AgentKit Workflow Studio` 所需资产

## 本地运行
```bash
cd D+20260314+goat/micro-mirror
python3 -m http.server 8000
```

打开：
- `http://127.0.0.1:8000`

如需刷新 AgentKit demo 资产：
```bash
cd D+20260314+goat/micro-mirror
node scripts/generate-agentkit-demo-assets.mjs
```

## 提交去向
- `1+requirement.md` 中明确的最终提交入口：
  - `https://julieshi.notion.site/8b33110376804173b6ce1c95ee4a25c6`

## 当前 GitHub 仓库
- `https://github.com/uplinkira/micro-mirror.git`

## Vercel 部署
- 已补 `vercel.json`
- 仓库已推到 GitHub，可直接导入
- 一键导入链接：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
- 当前这台机器没有现成 Vercel 登录态，所以 CLI 无法直接完成发布

## 建议你最后提交的内容
- GitHub 仓库链接
- 可访问的 demo 链接或本地演示说明
- 一句话说明：
  - `Micro Mirror` 用每日镜像时间线生成保健方向提示，进阶版通过智能戒指接入更多生理数据
