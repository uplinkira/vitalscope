# 可复用结果

## 当前主仓库

- 路径：
  - `D+20260314+goat/vitalscope/`
- GitHub：
  - `https://github.com/uplinkira/vitalscope.git`
- 定位：
  - 长期单人产品仓库
  - source of truth
- 维护者：
  - `uplinkira`
- 许可证：
  - `Apache-2.0`

## 当前部署快照仓库

- GitHub：
  - `https://github.com/uplinkira/micro-mirror-deploy.git`
- 定位：
  - `2026-03-14` 深圳黑客松快照
  - 发布镜像与历史档案

## 命名结果

- 长期产品名：
  - `VitalScope`
- 选择理由：
  - 既保留“观察 / 可视化”含义
  - 又比 `Micro Mirror` 更适合长期健康产品与未来商用语境

## Contributors 异常的当前判断

- 当前主仓库默认分支提交已经是 `uplinkira`
- 远端公开仓库当前只有 `main`
- 远端没有 tags
- 旧账号如果还显示在 GitHub contributors，最可能是：
  - GitHub contributors 统计缓存尚未刷新
  - 或旧账号曾以 co-author / 旧 commit 统计进入 contributors 集合
- 本地已确认还有一个备份 tag：
  - `backup/pre_author_rewrite_20260315`
  - 它保留了旧提交对象，但当前未推送到远端

## Vercel 快速判断口径

- 现在为什么可以先不花钱
  - 因为当前仓库是轻量静态站
  - 摄像头、钱包、前端交互大多在浏览器里完成
  - 当前流量仍属于个人开发 / 产品预览级别
- 为什么这不是永久答案
  - `Hobby` 官方边界是个人、非商业使用
  - 一旦进入真实商用或更大流量，就该评估 `Pro`
- 当前公开价格口径
  - `Hobby = free`
  - `Pro = $20 / user / month + additional usage`
  - `Enterprise = custom`

## 推荐仓库策略

- 主仓库：
  - `vitalscope`
- 快照仓库：
  - `micro-mirror-deploy`
- 推荐结构：
  - 以后只在 `vitalscope` 继续开发
  - `micro-mirror-deploy` 只保留比赛快照与历史说明

## Vercel 快速入口

- 一键导入：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/vitalscope`

## 稳定命令

- 运行本地静态站
  - `cd D+20260314+goat/vitalscope && python3 -m http.server 8000`
- 页面脚本语法检查
  - `cd D+20260314+goat/vitalscope && awk '/<script type=\"module\">/{flag=1;next}/<\\/script>/{flag=0}flag' index.html > /tmp/vitalscope_check.mjs && node --check /tmp/vitalscope_check.mjs`

## 可直接演示的点

- 摄像头拍照或上传图片
- 本地时间线记录
- 双参考报告
- 智能戒指预购
- GOAT Testnet3 支付
- `AgentKit Workflow Studio`
- `ERC-8004 Agent Identity Lab`

## 可直接复制的材料

- 项目概括与演讲稿：
  - `docs/pitch_vitalscope.md`
- GitHub / Vercel / `VERCEL_TOKEN` / 单仓库指南：
  - `docs/repo_deploy_workflow_2026.md`

## AgentKit 资产刷新命令

- `cd D+20260314+goat/vitalscope && node scripts/generate-agentkit-demo-assets.mjs`
