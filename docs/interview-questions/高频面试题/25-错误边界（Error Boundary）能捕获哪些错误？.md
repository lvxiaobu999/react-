# 25. 错误边界（Error Boundary）能捕获哪些错误？

> 所属主题：渲染与性能 ｜ [← 返回目录](./README.md)

## 回答要点

错误边界是捕获子组件树渲染错误的组件：类组件中用 `getDerivedStateFromError` 渲染降级 UI，用 `componentDidCatch` 记录日志。

## 原理 / 例子

它**不能**捕获：

- 事件处理函数中的错误（用 try/catch 处理）；
- 异步回调、定时器、Promise 中的错误；
- 服务端渲染的错误；
- 错误边界自身的错误。

## 易错点 / 追问

官方实现仍是类组件 API，实际项目常用 `react-error-boundary` 这类封装。常见分层做法是路由级兜底边界 + 局部边界隔离高风险区块（图表、富文本）。React 19 改进了错误提示并新增 `onUncaughtError` 等 root 选项，但依然没有提供函数组件官方 API。
