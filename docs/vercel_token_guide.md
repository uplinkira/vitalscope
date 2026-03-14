# VERCEL_TOKEN 获取与发布手册

## 目标
- 获取 `VERCEL_TOKEN`
- 用它把 `micro-mirror` 快速发布成一个 `vercel.app` 链接

## 先说最短路径
- 如果你只想最快拿到一个 `vercel.app`
- 直接打开：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
- 登录 Vercel
- 导入仓库
- 大多数情况下保持默认配置直接点 Deploy 就行

## 如果你要 `VERCEL_TOKEN`

### 方式 A：网页上创建 Access Token
1. 先登录 Vercel
   - 网址：`https://vercel.com`
2. 打开账号设置里的 Token 页面
   - 官方文档说明：Vercel CLI 在非交互环境下可以使用 token
   - 官方 CLI 文档：`https://vercel.com/docs/cli`
3. 在 Token 页面创建一个新的 Access Token
   - 给 token 起一个容易识别的名字
   - 例如：`micro-mirror-local`
4. 创建后，立即复制保存
   - 这个值通常只会完整显示一次
5. 不要把它提交到 GitHub
   - 不要写进仓库里的公开文件

### 方式 B：先网页登录，再用 CLI 登录
1. 在浏览器里登录 Vercel
2. 回到终端运行：
```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel login
```
3. 根据 CLI 提示完成登录
4. 登录完成后，再运行部署命令

## 当前项目怎么用 token 部署

### 方式 1：直接用环境变量
```bash
export VERCEL_TOKEN="这里替换成你的token"
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel --prod --token "$VERCEL_TOKEN"
```

### 方式 2：命令里直接带 `--token`
```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
./node_modules/.bin/vercel --prod --token "这里替换成你的token"
```

## 推荐发布步骤
1. 进入项目目录
```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
```
2. 确认仓库最新
```bash
git pull
```
3. 使用 token 发布生产版本
```bash
./node_modules/.bin/vercel --prod --token "$VERCEL_TOKEN"
```
4. 如果 CLI 问你：
   - Set up and deploy? 选 `Y`
   - Which scope? 选你的个人账号或对应团队
   - Link to existing project? 如果还没有项目，选 `N`
   - What’s your project’s name? 填 `micro-mirror`
   - In which directory is your code located? 直接回车，保持当前目录 `.`
5. 等待部署完成
6. 终端会返回一个 `https://xxx.vercel.app` 的地址

## 部署前你已经有的条件
- GitHub 仓库：
  - `https://github.com/uplinkira/micro-mirror.git`
- Vercel 配置：
  - 仓库里已经有 `vercel.json`
- 项目类型：
  - 纯静态站
  - 不需要额外 build step

## 最快打开本地页面
```bash
cd /Users/orangesnail/Desktop/agent_yaqi/D+20260314+goat/micro-mirror
python3 -m http.server 8000
```

然后打开：
- `http://127.0.0.1:8000`

如果你在 macOS 终端里，想直接弹浏览器：
```bash
open http://127.0.0.1:8000
```

## 常见问题

### 1. 为什么 `vercel whoami` 提示没有凭证？
- 因为这台机器当前没有现成的 Vercel 登录态
- 官方 CLI 文档说明需要先 `vercel login`，或者在非交互环境下使用 token

### 2. token 要放到哪里？
- 临时发布时，推荐只放到当前 shell 环境变量：
```bash
export VERCEL_TOKEN="你的token"
```
- 不建议写入公开仓库文件

### 3. token 创建了但部署还是 403
- 可能原因：
  - token 过期
  - token scope 不对
  - 你选错了个人账号 / team

## 官方参考
- Vercel CLI Overview:
  - `https://vercel.com/docs/cli`
- Vercel Login:
  - `https://vercel.com/docs/cli/login`
- Vercel REST API Authentication:
  - `https://vercel.com/docs/rest-api`

## 我们项目当前状态
- 本地项目目录：
  - `D+20260314+goat/micro-mirror`
- GitHub：
  - `https://github.com/uplinkira/micro-mirror.git`
- 一键导入 Vercel：
  - `https://vercel.com/new/clone?repository-url=https://github.com/uplinkira/micro-mirror`
