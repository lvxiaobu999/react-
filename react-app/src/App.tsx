import { useState, type ComponentType } from 'react'
import './App.css'
import Demo02 from './questions/02-jsx-expression/Demo'
import Demo06 from './questions/06-list-key/Demo'
import Demo11 from './questions/11-usestate-snapshot/Demo'
import Demo14 from './questions/14-effect-timing/Demo'
import Demo15 from './questions/15-stale-closure/Demo'
import Demo16 from './questions/16-strictmode-double-invoke/Demo'
import Demo22 from './questions/22-memo-usecallback/Demo'
import Demo26 from './questions/26-portal/Demo'

interface DemoEntry {
  id: string
  title: string
  slug: string
  Component: ComponentType
}

const DEMOS: DemoEntry[] = [
  {
    id: '02',
    title: 'JSX 与 && 渲染',
    slug: '02-jsx-expression',
    Component: Demo02,
  },
  {
    id: '06',
    title: '列表 key 与下标陷阱',
    slug: '06-list-key',
    Component: Demo06,
  },
  {
    id: '11',
    title: 'useState 快照与批处理',
    slug: '11-usestate-snapshot',
    Component: Demo11,
  },
  {
    id: '14',
    title: 'useEffect vs useLayoutEffect',
    slug: '14-effect-timing',
    Component: Demo14,
  },
  {
    id: '15',
    title: 'useEffect 陈旧闭包',
    slug: '15-stale-closure',
    Component: Demo15,
  },
  {
    id: '16',
    title: 'StrictMode 双执行与清理',
    slug: '16-strictmode-double-invoke',
    Component: Demo16,
  },
  {
    id: '22',
    title: 'memo 与 useCallback',
    slug: '22-memo-usecallback',
    Component: Demo22,
  },
  {
    id: '26',
    title: 'Portal',
    slug: '26-portal',
    Component: Demo26,
  },
]

function App() {
  const [activeId, setActiveId] = useState(DEMOS[0].id)
  const active = DEMOS.find((d) => d.id === activeId) ?? DEMOS[0]

  return (
    <div className="hub">
      <header className="hub-header">
        <h1>React 面试实战验证</h1>
        <p>
          每个 Demo 对应 docs/interview-questions/高频面试题/
          中同编号的题目，先读题再动手对照。
        </p>
      </header>

      <nav className="hub-nav">
        {DEMOS.map(({ id, title }) => (
          <button
            key={id}
            type="button"
            className={id === activeId ? 'active' : undefined}
            onClick={() => setActiveId(id)}
          >
            {id} · {title}
          </button>
        ))}
      </nav>

      <main className="hub-main">
        <h2>
          {active.id} · {active.title}
        </h2>
        <p className="hub-src">
          源码：<code>react-app/src/questions/{active.slug}/Demo.tsx</code>
        </p>
        <active.Component />
      </main>
    </div>
  )
}

export default App
