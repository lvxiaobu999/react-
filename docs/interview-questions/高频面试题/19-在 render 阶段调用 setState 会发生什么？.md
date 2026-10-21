# 19. 在 render 阶段调用 setState 会发生什么？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

渲染函数必须是纯函数：同样的 props/state 应得到同样的输出；DOM 操作、请求、修改外部变量等副作用应放在事件处理或 Effect 中，否则会被 StrictMode 的双调用放大成 bug。

## 原理 / 例子

一个受支持的例外是“渲染期间调整自身 state”：当 props 变化需要重置派生状态时，可以在渲染中比较上一次 props 并**有条件地**调用自身 setState，React 会立即丢弃结果重渲染而不提交。

## 易错点 / 追问

无条件调用会触发 "Too many re-renders" 死循环；渲染期间对其他组件 setState 也是不允许的。
