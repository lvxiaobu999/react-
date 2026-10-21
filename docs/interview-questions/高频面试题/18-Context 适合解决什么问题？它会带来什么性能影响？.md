# 18. Context 适合解决什么问题？它会带来什么性能影响？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

Context 适合在组件树中共享主题、语言、当前用户等跨层级数据，减少逐层传递 props。Provider 的 `value` 发生变化时，读取该 Context 的消费者会收到更新；把大量高频变化状态放进一个大 Context 可能导致较广的更新范围。

## 易错点 / 追问

可按更新频率和职责拆分 Context，保持 value 稳定，并在确有性能问题时用 Profiler 测量后优化。
