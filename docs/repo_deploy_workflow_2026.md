# Micro Mirror 2026 仓库与部署工作流指南

## 先说结论
- 对你们这个项目，当前最稳的做法不是“以后只改 Vercel 仓库”。
- 正确做法是：
  - `micro-mirror` 继续作为唯一主开发仓库
  - `micro-mirror-deploy` 继续作为已绑定 Vercel 的部署镜像仓库
  - 平时先改 `micro-mirror`
  - 只有当你们准备发布一个稳定演示版本时，再同步到 `micro-mirror-deploy`

## 为什么这是 2026 更好的做法
- 开发仓库和部署仓库职责分离后，最怕的是两边都改，最后内容漂移。
- 如果只改 `micro-mirror-deploy`：
  - Vercel 线上会更新
  - 但主代码仓库会落后
  - 后续再开发时，很容易不知道哪个才是真正最新版本
- 如果只改 `micro-mirror` 而不部署：
  - 代码是干净的
  - 但线上 demo 不会更新
- 所以最稳的策略是：
  - 主仓库存“真相”
  - 部署仓库存“可上线快照”

## 你们现在应该采用的模式

## 模式 A：Hackathon 最佳现实方案
- 适合你们现在
- 继续保持双仓库
- 工作方式：
  - 所有功能开发都在 `micro-mirror`
  - 本地验证通过后，提交到 `micro-mirror`
  - 需要刷新线上 demo 时，再把 `micro-mirror` 同步到 `micro-mirror-deploy`
  - push `micro-mirror-deploy`，触发 Vercel 自动部署

### 这个模式的优点
- 不会把“开发中半成品”直接丢到线上
- 线上永远是一个可演示快照
- 讲 hackathon 时更稳，不容易线上翻车

### 这个模式的缺点
- 你们要记得同步两次
- 如果团队成员直接在 deploy 仓库热修，会造成漂移

## 模式 B：2026 长期最佳方案
- 真正长期更推荐的是：
  - 只保留一个主仓库
  - 让 Vercel 直接绑定 `micro-mirror`
- 或者：
  - 保留双仓库
  - 但用 GitHub Action 自动把 `micro-mirror` 同步到 `micro-mirror-deploy`

### 为什么长期更推荐单仓库
- 少一个同步步骤
- 少一个“哪个仓库才是最新”的判断成本
- 团队协作更清晰
- 发布历史和代码历史天然一致

### 为什么你们现在不一定马上改成单仓库
- 当前 `micro-mirror-deploy` 已经绑定 Vercel，正在稳定工作
- hackathon 期间最重要的是：
  - 少改基础设施
  - 少冒风险
  - 先保证线上 demo 一直能用

## 所以你问的那个核心问题，直接回答

## q1: 后续只更 `vercel` 仓库吗？
- 不建议。
- `micro-mirror-deploy` 不应该成为主开发仓库。
- 它应该只是“发布仓库”。

## q2: 还是继续更新原来的代码仓库，只在要部署的时候重新上传一遍？
- 对，这就是你们现在最推荐的做法。
- 也就是：
  - 平时一直改 `micro-mirror`
  - 需要上线时，再同步到 `micro-mirror-deploy`

## 你们之后的标准流程

## 日常开发
1. 在 `micro-mirror` 里开发
2. 本地验证
3. 提交并 push `micro-mirror`

## 要发布到 Vercel
1. 确认 `micro-mirror` 已经是你们要演示的稳定版本
2. 同步内容到 `micro-mirror-deploy`
3. 在 `micro-mirror-deploy` 提交并 push
4. 等 Vercel 自动部署
5. 打开线上链接检查

## 你们现在可以直接复用的命令

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
git add .
git commit -m "your update"
git push origin main
```

```bash
rsync -a --exclude '.git' --exclude 'node_modules' \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror/ \
/Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy/
```

```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror-deploy
git add .
git commit -m "deploy latest stable demo"
git push origin main
```

## 哪些情况可以直接改 deploy 仓库
- 只有一种情况可以接受：
  - 线上 demo 正在演示前夕
  - 必须做一个极小热修
  - 来不及走完整主仓库流程

## 但即使这样也必须补做一件事
- 你改完 `micro-mirror-deploy` 后，必须立刻把同样修改回写到 `micro-mirror`
- 否则后面一定会漂移

## 一条很重要的团队规则
- 永远默认：
  - `micro-mirror` 是 source of truth
  - `micro-mirror-deploy` 是 release mirror

## 最推荐的协作口径
- 讨论功能时，只看 `micro-mirror`
- 讨论线上展示时，只看 `micro-mirror-deploy`
- 讨论“最新开发进展”时，以 `micro-mirror` 为准
- 讨论“当前可公开演示版本”时，以 `micro-mirror-deploy` 为准

## 未来如果你们还继续做这个项目
- 第一优先级：
  - 把 Vercel 直接绑定 `micro-mirror`
- 第二优先级：
  - 如果还想保留 deploy 仓库，就加自动同步，而不是手工同步
- 第三优先级：
  - 引入 preview branch / staging，而不是每次都只靠 `main`

## 对你们当前项目的最终建议
- 短期：
  - 继续双仓库
  - 主仓库开发，部署仓库发布
- 中期：
  - 尽量不要在 deploy 仓库独立开发
- 长期：
  - 改成单仓库直连 Vercel，或者自动镜像同步

## 一句话版本
- 2026 对你们最合适的不是“以后只改 Vercel 仓库”，而是“继续把 `micro-mirror` 当主仓库，只在要发布稳定演示版本时同步到 `micro-mirror-deploy`”。 
