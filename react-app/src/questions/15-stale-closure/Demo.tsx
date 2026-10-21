import { useEffect, useState, type ComponentType } from 'react'

/**
 * 对应题库 15：Effect 闭包捕获的是创建那一刻的 props/state。
 * 三个定时器对照：
 * 1. 空依赖思路的 [running] + 直接读 count：闭包永远是旧值，计数卡在 1；
 * 2. 函数式更新：不读闭包旧值，持续累加；
 * 3. 完整依赖 [count, running]：每次 count 变化先清理旧定时器再重建——正确但每 500ms 重订一次。
 * 三个版本都写了清理函数，暂停时定时器都会被移除。
 */

function StaleTimer() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setCount(count + 1), 500) // 闭包里的 count 是启动时的快照
    return () => clearInterval(id)
    // 故意遗漏 count：本组件演示的就是陈旧闭包，正确写法见旁边两个定时器
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return (
    <TimerView
      count={count}
      running={running}
      onToggle={() => setRunning((v) => !v)}
    />
  )
}

function FunctionalTimer() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setCount((c) => c + 1), 500)
    return () => clearInterval(id)
  }, [running])

  return (
    <TimerView
      count={count}
      running={running}
      onToggle={() => setRunning((v) => !v)}
    />
  )
}

function ResubscribeTimer() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setCount(count + 1), 500)
    return () => clearInterval(id)
  }, [count, running])

  return (
    <TimerView
      count={count}
      running={running}
      onToggle={() => setRunning((v) => !v)}
    />
  )
}

function TimerView({
  count,
  running,
  onToggle,
}: {
  count: number
  running: boolean
  onToggle: () => void
}) {
  return (
    <div className="demo-timer">
      <p className="demo-timer-value">count = {count}</p>
      <button type="button" onClick={onToggle}>
        {running ? '暂停' : '启动'}
      </button>
    </div>
  )
}

interface TimerCase {
  title: string
  note: string
  Component: ComponentType
}

const CASES: TimerCase[] = [
  {
    title: '❌ 依赖缺 count：陈旧闭包',
    note: '启动后闭包里的 count 永远是 0，setCount(0 + 1) 反复执行，计数卡在 1。',
    Component: StaleTimer,
  },
  {
    title: '✅ 函数式更新',
    note: 'setCount(c => c + 1) 不依赖闭包旧值，依赖保持 [running] 即可正确累加。',
    Component: FunctionalTimer,
  },
  {
    title: '✅ 完整依赖 + 重建定时器',
    note: '依赖补全为 [count, running]：每次更新先清理旧定时器再重建。结果正确，但每 500ms 重订一次。',
    Component: ResubscribeTimer,
  },
]

export default function Demo() {
  return (
    <div className="demo-stack">
      <p className="demo-note">
        分别启动三个定时器，观察第一个的计数卡在 1，后两个正常累加。
      </p>
      <div className="demo-grid">
        {CASES.map(({ title, note, Component }) => (
          <section key={title} className="demo-case">
            <h3>{title}</h3>
            <p className="demo-note">{note}</p>
            <Component />
          </section>
        ))}
      </div>
    </div>
  )
}
