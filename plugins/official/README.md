# 官方插件（Official Plugins）

轻量版内置功能的插件化实现。放在这里的是**官方维护**的插件源码，安装方式：
把对应插件目录整个复制到 `VeinLauncher\plugin\` 下，重启启动器即可。

> 插件机制：每个插件独立 Node 进程、权限声明、路径沙箱、30 秒超时；
> 界面为声明式 UI（沙箱渲染），不会碰到启动器自身的 DOM。

## 插件清单

| 插件 | 作用 | 需要权限 |
|---|---|---|
| `skin-library` | 皮肤下载 · LittleSkin：搜索公开皮肤库、下载 PNG、一键应用到账号 | `network.http`、`download.queue`、`file.read/write`、`skin.write`、`accounts.read`、`ui.lua`、`ui.notify` |
| `command-book` | 指令速查：6660 条指令，中英文检索，点「复制」写剪贴板 | `file.read`、`file.write`、`system.clipboard`、`ui.lua`、`ui.notify` |
| `mlc-panel` | MLC 状态：总开关、Agent、实例世界、玩家坐标（只读） | `mlc.state`、`mlc.world`、`mlc.player`、`versions.read`、`ui.lua` |

## 安装示例

```bat
xcopy /E /I plugins\official\skin-library  "VeinLauncher\plugin\skin-library"
xcopy /E /I plugins\official\command-book   "VeinLauncher\plugin\command-book"
xcopy /E /I plugins\official\mlc-panel      "VeinLauncher\plugin\mlc-panel"
```

装好后在「插件」页能看到，状态默认是启用；如果改过插件的权限声明，
启动器会把它自动禁用，需要重新启用一次（安全设计）。

## 依赖的宿主能力

`skin-library` 用到 `skin.apply` / `accounts.list`，`command-book` 用到 `system.clipboard` ——
这三个能力是随插件一起加入启动器的，需要 **0.6.7 及以上**的宿主版本。
宿主能力清单可以在「插件」页的 `capabilities` 里看到。

## 目录约定

```
plugins/official/<插件名>/
├─ package.json     清单：name / version / vein.permissions / vein.activateOnStartup
├─ index.js         入口：export async function activate(vein) { ... }
└─ data/            运行期数据（皮肤文件、指令库、自检报告），可安全删除
```

`command-book/data/commands.json` 由启动器的 `commandTree.ts` 导出
（6660 条候选 / 684 个前缀，含中英文标签），更新指令树后重新导出替换即可。
