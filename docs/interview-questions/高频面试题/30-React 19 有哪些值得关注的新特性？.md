# 30. React 19 有哪些值得关注的新特性？

> 所属主题：并发特性与架构 ｜ [← 返回目录](./README.md)

## 回答要点

- **Actions 与表单**：`<form action={fn}>`；`useActionState` 封装 action、返回值与 pending；`useFormStatus`（react-dom）读取父级表单状态；`useOptimistic` 实现乐观更新与失败回滚。
- **`use()`**：在渲染中读取 Promise 或 Context，可在条件语句中调用，不受普通 Hook 的调用位置限制。
- **ref 作为普通 prop**：函数组件直接接收 `ref`，不再需要 `forwardRef`；ref 回调支持返回清理函数。
- **`<Context>` 直接作为 Provider**：等价于旧的 `<Context.Provider>`。
- **文档元数据**：组件里直接渲染 `<title>`、`<meta>`、`<link>` 会被提升到 `<head>`。
- **其他**：水合不匹配报错带具体 diff、`preload`/`preinit` 等资源预加载 API、React Compiler 发布 1.0。

## 易错点 / 追问

这些能力多依赖框架集成（如 Next.js App Router）才能完整发挥。React 19 移除了 `propTypes`、字符串 ref 等弃用 API，升级前应跑官方 codemod 并回归测试。

本仓库 `react-app` 即运行在 React 19 上，多数语言层特性可直接验证。
