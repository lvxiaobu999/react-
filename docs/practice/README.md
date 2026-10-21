# 实战题索引与验收约定

实战内容分两类，都在 `react-app/` 中可运行：

1. **按题号对应的实战验证 Demo**：`react-app/src/questions/<题号>-<主题>/Demo.tsx`，与 `docs/interview-questions/` 中同编号题目一一对应，用于在浏览器里验证题目结论。对应题目文档内有「实战验证」小节互链。
2. **独立实战练习**：说明放在 `docs/practice/exercises/`，实现放在 `react-app/src/exercises/`。文档讲「练什么、验收什么」，代码讲「怎么做」，两者一一对应。

构建独立练习请使用 [react-practice-builder](../../.claude/skills/react-practice-builder/SKILL.md) skill。

## 练习文档结构

每篇说明（`exercises/<slug>.md`，slug 用 kebab-case）包含：

1. **目标**：练什么原理，对应题库哪几题；
2. **前置知识**：需要的题库章节；
3. **任务清单**：可勾选的实现步骤；
4. **验收条件**：可验证的交互、错误/加载/空状态与边界场景；
5. **延伸思考**：进阶方向与相关追问。

## 验收约定

- 覆盖关键交互与主要分支（错误、加载、空状态），不只写 happy path；
- 异步练习必须处理竞态与组件卸载后的更新；
- TypeScript 类型完整，不使用 `any` 逃逸检查；
- 不引入练习目标之外的运行时依赖；
- 完成后在 `react-app/` 内运行 `pnpm lint` 与 `pnpm build`，必须通过。

## 练习规划（随学习路线逐步补充）

- 阶段 1：受控表单与校验、列表过滤与排序
- 阶段 2：自定义 Hook（useDebounce / useLocalStorage）、Context 主题切换
- 阶段 3：虚拟列表、memo 优化前后的 Profiler 对比
- 阶段 4：路由守卫与权限菜单、错误边界与降级 UI

当前独立练习列表为空；完成第一个练习后，在下方按「练习名 | 对应题号 | 状态」登记。

## 实战验证 Demo 列表

入口：`react-app/` 下 `pnpm dev`，首页可按题号切换。

| Demo | 对应题号 | 目录 | 状态 |
| --- | --- | --- | --- |
| JSX 与 && 渲染 | 02 | `react-app/src/questions/02-jsx-expression/` | 可运行 |
| 列表 key 与下标陷阱 | 06 | `react-app/src/questions/06-list-key/` | 可运行 |
| useState 快照与批处理 | 11 | `react-app/src/questions/11-usestate-snapshot/` | 可运行 |
| useEffect vs useLayoutEffect | 14 | `react-app/src/questions/14-effect-timing/` | 可运行 |
| useEffect 陈旧闭包 | 15 | `react-app/src/questions/15-stale-closure/` | 可运行 |
| StrictMode 双执行与清理 | 16 | `react-app/src/questions/16-strictmode-double-invoke/` | 可运行 |
| memo 与 useCallback | 22 | `react-app/src/questions/22-memo-usecallback/` | 可运行 |
| Portal | 26 | `react-app/src/questions/26-portal/` | 可运行 |
