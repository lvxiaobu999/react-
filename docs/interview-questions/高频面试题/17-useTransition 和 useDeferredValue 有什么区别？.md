# 17. `useTransition` 和 `useDeferredValue` 有什么区别？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

两者都把更新标记为低优先级的 transition，让高优先级更新（如输入）先响应。

- `useTransition` 返回 `[isPending, startTransition]`，包裹**你自己发起的**状态更新，并能展示 pending 状态。
- `useDeferredValue` 包裹一个**值**（常来自 props），组件先用旧值渲染一版，再用新值重渲染，适合无法控制更新来源的场景。

## 易错点 / 追问

它类似防抖，但不丢更新、没有固定延迟、且立即用旧值保持界面响应。输入框绑定的状态要保持同步更新，被降级的应是重计算或大列表部分。
