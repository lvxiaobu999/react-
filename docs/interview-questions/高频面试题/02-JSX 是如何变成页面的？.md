# 02. JSX 是如何变成页面的？

> 所属主题：基础与组件 ｜ [← 返回目录](./README.md)

## 回答要点

JSX 是 JavaScript 的语法扩展，不是模板语言，也不是浏览器原生语法。构建工具会把 JSX 编译为 `jsx()` 一类的函数调用（React 17 起新 JSX 转换不再要求手动导入 React），得到描述 UI 的普通 JS 对象（React 元素），再由 React 协调并渲染为 DOM。

## 原理 / 例子

- `{}` 中只能写表达式，不能写 `if`/`for` 等语句；条件渲染常用三元、`&&` 或提前 return。
- 属性遵循 DOM 命名约定，如 `className`、`htmlFor`。
- JSX 中的文本默认会被转义，插入变量不会直接产生 XSS；但 `dangerouslySetInnerHTML` 会绕过这层保护，必须确保内容可信。

## 易错点 / 追问

追问：为什么 `count && <List />` 在 `count` 为 0 时会渲染出 `0`？——`&&` 返回左操作数，而 `0` 是可渲染的合法节点；应改用三元表达式或 `count > 0 && ...`。

## 实战验证

可运行 Demo：[react-app/src/questions/02-jsx-expression/Demo.tsx](../../../react-app/src/questions/02-jsx-expression/Demo.tsx)。在 `react-app/` 下运行 `pnpm dev`，从演示入口选择「02 JSX 与 && 渲染」查看。
