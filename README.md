# 官网概念网站 (Fake Website)

![Hero Section](https://raw.githubusercontent.com/hexianWeb/earthMap-heroSection/main/heroSection.png)
## 目录
1. [项目概述](#项目概述)
2. [项目结构](#项目结构)
3. [安装步骤](#安装步骤)
4. [常见问题](#常见问题)

---

## 项目概述

本项目是一个基于 Three.js 和 Vite 的 WebGL 应用程序，用于创建交互式的三维场景。项目集成了多种工具和技术，以确保高效的开发和优化的性能。

**注意**：本项目只是一个简易的初级 threejs 应用项目，如果需要更多的threejs 教育资源，请前往[ICE - 图形学社区](https://www.icegl.cn/)，或者前往[TvT.js](https://docs.icegl.cn/)获得更多的教育资源
---

## 项目结构

项目的目录结构清晰且模块化，方便开发者进行维护和扩展。以下是主要目录及其说明：

### 根目录
- **README.md**：项目说明文档。
- **package.json**：项目配置文件，包含依赖项和脚本。
- **pnpm-lock.yaml**：依赖锁定文件，确保依赖版本一致。
- **vite.config.js**：Vite 配置文件，定义了构建和开发服务器设置。
- **index.html**：主页面文件，入口点。

### 源代码目录 (`src`)
- **shaders**：包含 GLSL 着色器代码，分为多个子目录（如 `halftone`, `glass`, `includes` 等）。
- **js**：JavaScript 文件，进一步细分为多个子模块：
  - **utils**：实用工具函数（如 `debug.js`, `event-emitter.js`, `imouse.js` 等）。
  - **tools**：辅助工具（如 `dom.js`, `misc.js`）。
  - **world**：世界场景相关代码（如 `environment.js`, `physics-world.js`, `world.js`）。
  - **components**：UI 组件（如 `center.js`, `float.js`, `glass-wall.js`）。
- **scss**：SCSS 文件（如 `global.scss`），用于样式预处理。
- **css**：CSS 文件（如 `global.css`），用于最终样式输出。

### 公共资源目录 (`public`)
- 包含静态资源文件，如 `sitemap.xml` 和字体文件（如 `helvetiker_bold.typeface.json`, `机械风.typeface.json`）。

### 测试目录 (`tests`)
- 包含浏览器测试文件（如 `browsers.test.js`），用于自动化测试。

---

## 安装步骤

### 前提条件
确保你已经安装了以下工具：
- Node.js (建议版本 ^18.12.0 || ^20.9.0 || >=22.0)
- pnpm (推荐使用 pnpm 作为包管理工具)

### 步骤 1：克隆仓库
```bash
git clone https://github.com/hexianWeb/earthMap-heroSection.git
```

### 步骤 2：安装依赖
使用 pnpm 安装项目所需的依赖：
```bash
pnpm install
```

### 步骤 3：启动开发服务器
启动 Vite 开发服务器：
```bash
pnpm run dev
```
这将启动一个本地开发服务器，默认情况下可以在 `http://localhost:3000` 访问。

### 步骤 4：构建生产版本
当你准备部署时，可以构建生产版本：
```bash
pnpm run build
```
构建后的文件将位于 `dist` 目录中。

---

## 常见问题

### Q: 我遇到了依赖安装失败的问题，应该怎么办？
A: 确保你的 Node.js 和 pnpm 版本符合要求。如果问题仍然存在，尝试清理缓存并重新安装依赖：
```bash
pnpm cache clean --all
pnpm install
```

### Q: 如何调试 Three.js 场景中的问题？
本项目集成了 tweakpane 只需要在url后跟 #debug 即可开启调试模式。
```
如: http://localhost:3000/#debug
```


---

希望这份指南能帮助你顺利开始开发！如果有任何问题或需要进一步的帮助，请随时联系我或者加入[ICE - 图形学社区](https://www.icegl.cn/)，寻找互动问答版块。