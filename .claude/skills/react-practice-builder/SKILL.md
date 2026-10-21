---
name: react-practice-builder
description: 把面试题或知识点转化为 react-app/ 中可运行的实战练习时使用。定义练习说明文档、代码组织方式和验收条件写法，以及完成后的检查流程。
---

# React 实战练习构建规范

## 产出结构

实战内容分两类：

1. **按题号对应的实战验证 Demo**（轻量，验证某题结论）：
   - 实现：`react-app/src/questions/<题号>-<主题>/Demo.tsx`（kebab-case 主题，如 `06-list-key`）。
   - 不单独写说明文档；在对应题目 md 中加「实战验证」小节互链，并在 `docs/practice/README.md` 的 Demo 列表登记。
   - 在 `react-app/src/App.tsx` 的演示入口 `DEMOS` 数组中登记，保证可从首页进入。
2. **独立实战练习**（完整，覆盖一组知识点）：
   - 说明文档：`docs/practice/exercises/<slug>.md`，slug 用 kebab-case（如 `virtualized-list`）。
   - 实现：`react-app/src/exercises/<slug>/`，沿用现有 Vite + React + TypeScript 配置与代码风格。
   - 说明与实现一一对应、不混放：文档讲「为什么和验收什么」，代码讲「怎么做」。

## 说明文档结构

1. **目标**：练什么原理，对应题库哪几题；
2. **前置知识**：需要的题库章节；
3. **任务清单**：可勾选的实现步骤；
4. **验收条件**：必须可验证——列出关键交互、错误/加载/空状态、边界场景，每条都能演示或测试；
5. **延伸思考**：进阶方向与相关追问。

## 实现要求

- 覆盖验收条件的全部分支，不只写 happy path；异步练习必须处理竞态与组件卸载后的更新。
- TypeScript 类型完整；不使用 `any` 逃逸类型检查。
- 不引入练习目标之外的运行时依赖；确需新增依赖时先说明理由。

## 完成后检查

- 在 `react-app/` 运行 `pnpm lint` 和 `pnpm build`，必须通过，并如实报告结果。
- 更新 `docs/practice/README.md` 的练习索引（登记练习名、对应题号与状态）。
