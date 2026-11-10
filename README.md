# Vein Launcher Flash（轻量版）

只保留**下载原版 Minecraft、启动游戏、插件**三件事的 Vein Launcher，界面沿用原版风格，体积尽量压小。

> 上游项目：[zhanjhn-studio/vein_launcher](https://github.com/zhanjhn-studio/vein_launcher)
> 本仓库是裁剪版，不跟随上游的全部功能。

---

## 保留的功能

| 页面 | 内容 |
|---|---|
| **启动** | 版本列表、启动游戏、账号状态、运行中的游戏、公告、游戏日志 |
| **下载** | 只剩「原版与加载器」：原版 / Fabric / Quilt / Forge / NeoForge |
| **插件** | 插件列表、启用/禁用、权限、宿主日志 |
| **设置** | 外观（主题 / 主题色 / 简洁模式 / 语言）、账号、Java 环境、游戏目录、日志、关于 |

首次启动有 6 步向导：**语言** → 欢迎 → 功能 → 账号 → 隐私 → 就绪。

## 去掉了什么

皮肤页、MLC 页（世界扫描 / 玩家数据 / agent 控制）、联机页、工具页（指令构建器 / 速查小窗 / 自定义指令）、实例详情页，以及下载里的模组 / 整合包 / 资源包 / 光影 / 数据包 / OptiFine。

## 体积

| 项 | 完整版 | 本仓库 |
|---|---|---|
| 交付体积（不含 node_modules） | 4.94 MB | **2.56 MB** |
| 前端 dist | 1523 KB | **631 KB** |
| 打包后的 app.js | 378 KB | **317 KB** |
| 侧边导航 | 8 项 | **4 项** |

省下来的主要来源：删掉工具页与指令树（`commandTree.ts` 38.7 KB）、删掉 `vendor/layui/layui.js`（389 KB，layer 弹窗已无调用）、只保留 woff2/woff 字体（省 379 KB）、图标 16 → 11 个。

## 怎么跑

需要 Python 3.10+ 与 PySide6：

```bat
pip install PySide6 aiohttp pydantic

set PYTHONPATH=D:\path\to\.deps;D:\path\to\vein_launcher-flash
set QTWEBENGINE_DISABLE_SANDBOX=1
python -m vein_launcher.presentation.main
```

或双击 `启动VeinLauncher-轻量版.cmd`（按需修改里面的 `VPY` 变量）。

`dist/` 已随仓库提供，克隆下来可直接运行；运行期数据（配置、日志、下载缓存）落在本目录的 `VeinLauncher\`（不入库）。

## 改前端后重新构建

仓库**不含 `node_modules`**，改源码后需要：

```bat
cd vein_launcher\presentation\webui
npm install
powershell -ExecutionPolicy Bypass -File build.ps1 -Esbuild node_modules\.bin\esbuild.cmd
```

> 必须用 `build.ps1`：它除了打包 `app.js`，还会把 `icons/`、`vendor/`、`logo.png` 拷进 `dist/`。
> 只跑 esbuild 会出现「界面能开、图标全破图」。

## 许可

MIT，见 [LICENSE](LICENSE)。基于 zhanjhn-studio/vein_launcher 修改。
