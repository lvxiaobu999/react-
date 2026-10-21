# React 面试题与实战练习

本项目用于系统梳理 React 面试知识，并通过 `react-app` 中的代码练习把原理落到实践。内容按初级到高级、理论到实战逐步扩展。

## 项目目录规划

```text
.
├── AGENTS.md                         # 项目级 AI 协作约定
├── README.md                         # 项目入口、学习路线和目录索引
├── .claude/                          # Claude Code 协作配置
│   ├── agents/
│   │   ├── react-interview-coach.md      # 模拟面试官：出题、追问、反馈
│   │   └── react-practice-reviewer.md    # 实战审阅：对照验收条件审查代码
│   └── skills/
│       ├── react-interview-question-author/SKILL.md # 面试题编写规范
│       └── react-practice-builder/SKILL.md          # 实战练习构建规范
├── docs/
│   ├── learning-roadmap.md           # 学习路线与阶段目标
│   ├── interview-questions/
│   │   ├── README.md                 # 题库分类和题目索引
│   │   ├── 高频面试题/               # 每题一个文件（35 题，首批）
│   │   │   ├── README.md             # 本组题目目录
│   │   │   └── 01-xxx.md … 35-xxx.md
│   │   ├── fundamentals.md           # React 基础与组件（后续补充）
│   │   ├── hooks-and-state.md        # Hooks、状态与副作用（后续补充）
│   │   ├── rendering-and-performance.md # 渲染机制与性能（后续补充）
│   │   └── engineering.md            # 工程化、路由与权限（后续补充）
│   └── practice/
│       ├── README.md                 # 实战题索引与验收约定
│       └── exercises/                # 独立实战题说明（随练习逐步创建）
└── react-app/                        # Vite + React + TypeScript 实战项目
    └── src/
        ├── questions/                # 按题号一一对应的实战验证 Demo
        └── exercises/                # 独立实战练习（随练习逐步创建）
```

目录按内容增长逐步创建；暂不预建空目录或空文档。题库按知识主题拆分，实战题放在 `docs/practice/`，可运行的实现和演示放在 `react-app/`。

## 学习路线

1. **基础**：JSX、组件、Props/State、事件、列表与表单。
2. **Hooks 与状态**：Hooks 规则、Effect、Context、自定义 Hook、状态管理。
3. **渲染与性能**：更新流程、Diff、Fiber、并发特性、性能分析与优化。
4. **工程能力**：路由、权限、代码分割、测试、构建与部署。
5. **进阶架构**：SSR/水合、微前端、设计系统与复杂项目实践。
6. **实战与表达**：在 `react-app/` 完成练习，并能解释方案取舍、边界和验证方式。

## 高频面试题

每题一个文件，包含简明回答要点、原理例子和常见追问；部分题目配有可运行实战 Demo：

- [React 高频面试题目录（35 题）](./docs/interview-questions/高频面试题/README.md)：基础与组件、Hooks 与状态、渲染与性能、并发与架构、工程化与生态。

## Agent 与 Skill

仓库提供可复用的协作配置，位于 `.claude/`（Claude Code 原生约定，新会话自动加载）：

- [React 面试教练 Agent](./.claude/agents/react-interview-coach.md)：模拟面试、追问和答案反馈。
- [React 实战审阅 Agent](./.claude/agents/react-practice-reviewer.md)：检查实战实现、边界与验证。
- [面试题编写 Skill](./.claude/skills/react-interview-question-author/SKILL.md)：统一题目结构与答案质量。
- [实战题构建 Skill](./.claude/skills/react-practice-builder/SKILL.md)：把题目转化为可验收练习。

## 实战项目

`react-app/` 使用 Vite + React 19 + TypeScript，React Compiler 已启用。运行 `pnpm dev` 后首页是实战验证入口，可按题号切换查看各题 Demo（源码在 `src/questions/<题号>-<主题>/`）。独立的综合练习放在 `src/exercises/`，随学习路线逐步补充。

```powershell
cd react-app
pnpm install
pnpm dev
```
