# 11. `useState` 的更新为什么常被说成“异步”？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

更准确地说，调用 setter 是**请求一次状态更新**，当前这次渲染中的 state 是快照，不会被同步改写。React 会安排后续渲染，并可能合并多个更新；所以紧接 setter 读取旧变量，仍会读到当前渲染的值。

## 易错点 / 追问

依赖前一个状态计算新值时使用函数式更新，例如 `setCount(count => count + 1)`。不要简单把它描述成普通意义上的异步函数或 Promise。

## 实战验证

可运行 Demo：[react-app/src/questions/11-usestate-snapshot/Demo.tsx](../../../react-app/src/questions/11-usestate-snapshot/Demo.tsx)。对比「连调两次 `setCount(count + 1)`」与「函数式更新」的结果差异、setter 后立刻读到的快照值，以及 React 18 在 `setTimeout` 中的自动批处理。
