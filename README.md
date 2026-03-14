# Micro Mirror MVP

## 目录位置
- 本地目录：`D+20260314+goat/micro-mirror`

## 当前 MVP 内容
- `index.html`
  - 每日摄像头拍照 / 图片上传兜底
  - 本地时间线记录
  - 中医理论 + 现代医学报告参照的保健方向提示
  - 智能戒指预购与 GOAT Testnet3 支付闭环
- `generated/agentkit-catalog.json`
  - 本地 `agentkit` 扫描出的能力清单，用于 hackathon judge 讲解

## 本地运行
```bash
cd D+20260314+goat/micro-mirror
python3 -m http.server 8000
```

打开：
- `http://127.0.0.1:8000`

## 提交去向
- `1+requirement.md` 中明确的最终提交入口：
  - `https://julieshi.notion.site/8b33110376804173b6ce1c95ee4a25c6`

## 建议你最后提交的内容
- GitHub 仓库链接
- 可访问的 demo 链接或本地演示说明
- 一句话说明：
  - `Micro Mirror` 用每日镜像时间线生成保健方向提示，进阶版通过智能戒指接入更多生理数据
