# 14. `useEffect` 和 `useLayoutEffect` 有什么区别？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

两者都用于同步 React 与外部系统。`useEffect` 通常在浏览器绘制后执行；`useLayoutEffect` 在 DOM 提交后、浏览器绘制前同步执行，适合必须在绘制前测量布局并同步修正 UI 的少数场景。

## 易错点 / 追问

`useLayoutEffect` 会阻塞绘制，可能影响性能；服务端渲染时也没有浏览器布局阶段。Effect 应有明确外部同步目标，并正确清理订阅、定时器等资源。

## 实战验证

可运行 Demo：[react-app/src/questions/14-effect-timing/Demo.tsx](../../../react-app/src/questions/14-effect-timing/Demo.tsx)。用屏上日志展示一次更新中 render → `useLayoutEffect` → 浏览器绘制 → `useEffect` 的先后顺序，以及「绘制前测量并修正布局」的典型用法。
