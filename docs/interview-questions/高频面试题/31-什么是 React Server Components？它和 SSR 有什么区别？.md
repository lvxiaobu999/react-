# 31. 什么是 React Server Components？它和 SSR 有什么区别？

> 所属主题：并发特性与架构 ｜ [← 返回目录](./README.md)

## 回答要点

RSC 是在服务端运行的组件：不打包进客户端 bundle，可以直接 `async` 获取数据、访问数据库和文件系统，渲染结果序列化后发给客户端。客户端组件用 `'use client'` 标记边界，通过 props 接收服务端组件。

与 SSR 的区别：SSR 只在首屏把组件渲染成 HTML，之后客户端仍要下载并执行全部组件代码来水合；RSC 的服务端组件代码**根本不发送到浏览器**，且交互后还能按需请求服务端重新渲染。约束是服务端组件不能用 state、Effect 和浏览器 API。

## 易错点 / 追问

RSC 需要框架支持（Next.js App Router、RedwoodJS 等），纯 `react-dom` SPA 用不了；面试时说清这个边界能体现理解深度。
