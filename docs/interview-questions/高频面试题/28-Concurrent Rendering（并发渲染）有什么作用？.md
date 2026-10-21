# 28. Concurrent Rendering（并发渲染）有什么作用？

> 所属主题：并发特性与架构 ｜ [← 返回目录](./README.md)

## 回答要点

并发能力让 React 可以根据优先级安排渲染工作，使部分非紧急更新可被暂停或被更高优先级更新打断，从而改善交互响应。它是调度能力，不等于多线程并行执行 JavaScript。

## 易错点 / 追问

`startTransition`/`useTransition` 可把非紧急更新标记为 transition；受控输入等直接交互状态通常不应被降为非紧急更新。

相关：17 题对比了 `useTransition` 与 `useDeferredValue` 的用法差异。
