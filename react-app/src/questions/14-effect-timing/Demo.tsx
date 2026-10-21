import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * 对应题库 14：同一次更新中的执行顺序是
 * render → useLayoutEffect（DOM 已提交、浏览器绘制前）→ 浏览器绘制 → useEffect。
 * 上方面板用日志展示顺序；下方面板演示 useLayoutEffect 的典型场景——
 * 在绘制前测量布局并同步修正样式，用户看不到错误布局的中间帧。
 * 如果把测量换成 useEffect，超宽标签会先闪现一帧再被修正。
 */
export default function Demo() {
  const [round, setRound] = useState(0)
  const [log, setLog] = useState<string[]>([])

  useLayoutEffect(() => {
    // 本 Demo 的目的就是观察 Effect 的执行时机，把时序写进界面属于刻意的教学输出
    // oxlint-disable-next-line react/set-state-in-effect
    setLog((prev) =>
      [`第 ${round} 轮 · useLayoutEffect 执行（绘制前）`, ...prev].slice(0, 8),
    )
  }, [round])

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setLog((prev) =>
      [`第 ${round} 轮 · useEffect 执行（绘制后）`, ...prev].slice(0, 8),
    )
  }, [round])

  return (
    <div className="demo-stack">
      <section>
        <h3>执行顺序日志</h3>
        <div className="demo-row">
          <button type="button" onClick={() => setRound((r) => r + 1)}>
            触发一次更新
          </button>
        </div>
        <p className="demo-note">
          每轮更新：useLayoutEffect 在绘制前执行，useEffect 在绘制后执行。
        </p>
        <ul className="demo-log">
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </section>

      <MeasureFix />
    </div>
  )
}

function MeasureFix() {
  const [long, setLong] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const barRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    const bar = barRef.current
    const label = labelRef.current
    if (!bar || !label) return
    // 绘制前测量：不换行的标签若超出容器宽度，同步改为可换行样式。
    // 这段 setState 会在浏览器绘制前完成，肉眼看不到超宽的中间帧。
    setFlipped(label.scrollWidth > bar.clientWidth)
  }, [long])

  return (
    <section>
      <h3>绘制前测量并修正布局</h3>
      <div className="demo-row">
        <button type="button" onClick={() => setLong((v) => !v)}>
          切换标签长度
        </button>
        <span className="demo-note">
          当前样式：{flipped ? '换行显示（测量后修正）' : '单行显示'}
        </span>
      </div>
      <div ref={barRef} className={flipped ? 'demo-measure flipped' : 'demo-measure'}>
        <span ref={labelRef} className="demo-measure-label">
          {long
            ? '这是一个故意写得很长的标签文本，用来触发测量与修正逻辑，观察它没有闪现超宽帧'
            : '短标签'}
        </span>
      </div>
    </section>
  )
}
