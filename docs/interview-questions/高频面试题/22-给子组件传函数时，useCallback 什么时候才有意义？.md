# 22. 给子组件传函数时，`useCallback` 什么时候才有意义？

> 所属主题：渲染与性能 ｜ [← 返回目录](./README.md)

## 回答要点

只有下游能利用稳定引用时它才有价值：子组件被 `React.memo` 包裹、函数作为其他 Hook 的依赖、或传给依赖引用稳定性的组件。只有 `useCallback` 而**没有** `memo` 的子组件，渲染次数不会减少，反而多付缓存成本。

推荐顺序：先用 Profiler 确认某个子组件真的被不必要的渲染拖慢 → `memo` 该组件 → 再为它的函数类 props 补 `useCallback`（或改用天然稳定的 setter、把状态下移让更新局部化）。缓存不是默认优化项。

## 实战验证

可运行 Demo：[react-app/src/questions/22-memo-usecallback/Demo.tsx](../../../react-app/src/questions/22-memo-usecallback/Demo.tsx)。三个子组件分别用「无 memo」「memo 但函数 prop 每次新建」「memo + useCallback」包裹，用提交计数对比谁真的跳过了渲染。注意本仓库启用了 React Compiler，Demo 文件用 `"use no memo"` 关闭自动优化以复现手写场景。

## 易错点 / 追问

本仓库 `react-app` 启用了 React Compiler：编译器会自动缓存，手写 `useCallback` 的收益会被部分替代。分析真实项目时先确认编译器是否启用，再决定优化手段。
