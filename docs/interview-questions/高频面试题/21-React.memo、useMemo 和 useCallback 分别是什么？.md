# 21. `React.memo`、`useMemo` 和 `useCallback` 分别是什么？

> 所属主题：渲染与性能 ｜ [← 返回目录](./README.md)

## 回答要点

- `React.memo(Component)` 可在 props 浅比较相等时跳过该组件的一次渲染。
- `useMemo(() => value, deps)` 在依赖未变时复用计算结果。
- `useCallback(fn, deps)` 在依赖未变时复用函数引用，本质上是缓存函数值。

## 易错点 / 追问

它们是性能优化工具，不应承载业务正确性。对象、数组和函数的引用变化会影响浅比较；使用自定义比较时也要考虑比较成本和闭包语义。

相关：22 题讨论 `useCallback` 何时真正有用；23 题讨论 React Compiler 的影响。
