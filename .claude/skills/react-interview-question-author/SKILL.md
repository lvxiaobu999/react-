---
name: react-interview-question-author
description: 在 docs/interview-questions/ 中编写、更新或审查 React 面试题时使用。规定题目结构、版本标注规则与质量标准，保证题库风格一致、结论可靠。
---

# React 面试题编写规范

## 放置与结构

- 每题一个文件：`docs/interview-questions/<主题目录>/<编号>-<题目>.md`（如 `高频面试题/01-React 的核心设计是什么？它适合什么场景？.md`）；每个主题目录用 `README.md` 维护题目索引。新增主题先在 `docs/interview-questions/README.md` 的「后续方向」登记，内容就绪后再创建，不预建空文档。
- 单题固定四要素：**问题**（标题，口语化提问）、**回答要点**（先结论）、**原理/例子**（需要时给最小代码或机制解释）、**易错点/追问**（常见误区、版本差异、面试官可能的追问）；文件头部标注所属主题并链接回目录。
- 同一主题内大致由浅入深连续编号；插入新题时更新目录索引与受影响的编号交叉引用。若题目适合动手验证，按 `react-practice-builder` skill 在 `react-app/src/questions/<题号>-<主题>/` 建 Demo，并在题目文件加「实战验证」小节互链。

## 质量标准

- 回答遵循「结论 → 机制 → 场景/例子 → 限制或取舍」；先给能直接说出口的结论，再给深度。
- 区分 React 版本行为：17/18/19 差异必须显式标注版本与启用条件（如 `createRoot`、StrictMode、React Compiler），不把旧行为描述成当前通用结论。
- 不夸大框架优劣；性能结论要有机制依据，不写「一定更快」类断言。
- 事实不确定时核对官方文档（react.dev）或源码，不编造；无法核实的内容明确标注待验证。
- 语言为简体中文，保留 React/JavaScript/TypeScript API 的英文名；示例代码保持最小可运行，不引入运行时依赖。

## 完成后检查

- 更新 `docs/interview-questions/README.md` 索引（题数、章节分布、状态）。
- 检查编号连续、文内链接有效。
