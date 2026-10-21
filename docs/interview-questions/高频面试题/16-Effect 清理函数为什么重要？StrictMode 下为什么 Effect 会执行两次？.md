# 16. Effect 清理函数为什么重要？StrictMode 下为什么 Effect 会执行两次？

> 所属主题：Hooks、状态与副作用 ｜ [← 返回目录](./README.md)

## 回答要点

清理函数负责抵消上一次 Effect 的影响：取消订阅、清除定时器、中止请求、断开连接。缺少清理时，依赖变化会累积旧订阅，组件卸载后还可能更新已失效的外部资源。

React 18 起，开发模式的 StrictMode 有意把组件按“挂载 → 清理 → 再挂载”跑一遍，并双重调用渲染函数，用于提前暴露缺失清理和非纯渲染问题。这是仅开发环境的行为，生产构建不受影响。正确的心态是假设 Effect 可能被销毁重建，而不是想办法绕过双执行。

## 实战验证

可运行 Demo：[react-app/src/questions/16-strictmode-double-invoke/Demo.tsx](../../../react-app/src/questions/16-strictmode-double-invoke/Demo.tsx)。本仓库 `main.tsx` 已启用 StrictMode，Demo 用屏上日志展示“挂载 → 清理 → 再挂载”与渲染函数双调用，并可切换对照无清理订阅的累积问题。
