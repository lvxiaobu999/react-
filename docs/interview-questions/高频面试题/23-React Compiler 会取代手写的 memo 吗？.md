# 23. React Compiler 会取代手写的 memo 吗？

> 所属主题：渲染与性能 ｜ [← 返回目录](./README.md)

## 回答要点

React Compiler 可以在满足条件时自动优化组件和计算，减少部分手工 `memo`、`useMemo`、`useCallback` 的需要，但这不等于所有代码都自动变快或无需分析。项目是否启用、支持范围和行为取决于编译器配置与版本。

## 易错点 / 追问

本仓库的 `react-app` 模板已启用 React Compiler。写代码仍应保持纯函数组件和正确的数据依赖，并用实际构建和 Profiler 验证结果。

相关：22 题的 Demo 用 `"use no memo"` 关闭编译器优化来复现手写 memo 的行为。
