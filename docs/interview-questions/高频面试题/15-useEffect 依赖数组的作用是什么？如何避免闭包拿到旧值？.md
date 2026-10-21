# 15. `useEffect` 依赖数组的作用是什么？如何避免闭包拿到旧值？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

依赖数组声明 Effect 使用的响应式值；依赖变化时 React 会先清理上一次 Effect，再执行新的 Effect。遗漏依赖可能导致 Effect 继续使用旧的 props/state（陈旧闭包）。

应遵循 Hooks lint 规则，完整声明依赖，并通过重构回调、使用函数式状态更新或合适的 ref 解决具体闭包问题，而不是随意删依赖来压制重复执行。

## 实战验证

可运行 Demo：[react-app/src/questions/15-stale-closure/Demo.tsx](../../../react-app/src/questions/15-stale-closure/Demo.tsx)。三个定时器分别演示：空依赖导致的陈旧闭包（计数卡住）、函数式更新修复、依赖 + 重建定时器修复。
