import { useEffect, useState } from 'react'

const DEMO_TICK = 'demo-16-tick'

/**
 * 对应题库 16。main.tsx 已用 <StrictMode> 包裹整个应用：
 * 开发模式下组件挂载时 Effect 会按「执行 → 清理 → 再执行」跑一遍，
 * 渲染函数也会被双调用（打开浏览器控制台可见每次提交两条 render 日志）。
 * 第二个面板对比清理函数的作用：双挂载后，缺少清理的订阅会遗留下来，
 * 同一次广播被处理两次；带清理的版本始终一一对应。
 * 这是仅开发环境的行为；生产构建中比例会回到 1:1，
 * 但依赖变化或真实卸载时，未清理的订阅同样会累积成 bug。
 */
export default function Demo() {
  const [broadcasting, setBroadcasting] = useState(false)
  const [sent, setSent] = useState(0)

  useEffect(() => {
    if (!broadcasting) return
    const id = setInterval(() => {
      setSent((s) => s + 1)
      window.dispatchEvent(new Event(DEMO_TICK))
    }, 1000)
    return () => clearInterval(id)
  }, [broadcasting])

  return (
    <div className="demo-stack">
      <LifecycleProbe />

      <section>
        <h3>清理函数对比：每秒广播一次 tick</h3>
        <div className="demo-row">
          <button type="button" onClick={() => setBroadcasting((v) => !v)}>
            {broadcasting ? '停止广播' : '开始广播'}
          </button>
          <span className="demo-panel">已广播 {sent} 次</span>
        </div>
        <div className="demo-grid">
          <TickSubscriber withCleanup sent={sent} />
          <TickSubscriber withCleanup={false} sent={sent} />
        </div>
      </section>
    </div>
  )
}

function LifecycleProbe() {
  const [events, setEvents] = useState<string[]>([])

  // 控制台会同步打印两条 render 日志：渲染函数被 StrictMode 双调用
  console.info('[16] Probe render')

  useEffect(() => {
    // 把生命周期写进界面属于本 Demo 的教学输出，并非业务副作用
    // oxlint-disable-next-line react/set-state-in-effect
    setEvents((prev) => [...prev, 'Effect 执行'])
    return () => {
      // oxlint-disable-next-line react/set-state-in-effect
      setEvents((prev) => [...prev, 'Effect 清理'])
    }
  }, [])

  return (
    <section>
      <h3>挂载生命周期日志</h3>
      <p className="demo-note">
        开发模式下刚进入本页应看到：执行 → 清理 → 执行。生产构建只会有一条「执行」。
      </p>
      <ul className="demo-log">
        {events.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </section>
  )
}

function TickSubscriber({
  withCleanup,
  sent,
}: {
  withCleanup: boolean
  sent: number
}) {
  const [received, setReceived] = useState(0)

  useEffect(() => {
    const onTick = () => setReceived((r) => r + 1)
    window.addEventListener(DEMO_TICK, onTick)
    return () => {
      if (withCleanup) window.removeEventListener(DEMO_TICK, onTick)
    }
  }, [withCleanup])

  return (
    <div
      className={
        withCleanup ? 'demo-case demo-case-ok' : 'demo-case demo-case-bad'
      }
    >
      <h3>{withCleanup ? '✅ 卸载时移除监听' : '❌ 缺少清理'}</h3>
      <p>
        收到 {received} 次 / 已广播 {sent} 次
      </p>
      <p className="demo-note">
        {withCleanup
          ? '收到次数始终等于广播次数。'
          : '开发模式下双挂载遗留了未清理的监听器，收到次数是广播的约 2 倍。'}
      </p>
    </div>
  )
}
