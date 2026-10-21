# 26. 什么时候需要 Portal？

> 所属主题：渲染与性能 ｜ [← 返回目录](./README.md)

## 回答要点

`createPortal(children, domNode)` 把子节点渲染到父组件 DOM 层级之外，适合模态框、Tooltip、下拉菜单这类需要脱离父级 `overflow: hidden`、`transform` 或 `z-index` 上下文的浮层。

## 原理 / 例子

关键点：Portal 改变的是 **DOM 位置**，不改变 **React 树位置**——事件仍沿 React 树向上冒泡，父组件的 Context 和事件处理依然生效。

## 易错点 / 追问

无障碍上还需处理焦点圈定（focus trap）与 Esc 关闭。

## 实战验证

可运行 Demo：[react-app/src/questions/26-portal/Demo.tsx](../../../react-app/src/questions/26-portal/Demo.tsx)。在带 `overflow: hidden` 与 `transform` 的父容器中，对比「普通渲染被裁剪」与「Portal 渲染正常显示」，并验证 Portal 内的点击仍会冒泡到 React 父组件。
