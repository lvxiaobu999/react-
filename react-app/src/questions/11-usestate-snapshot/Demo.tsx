import { useState } from 'react'

/**
 * 对应题库 11：调用 setter 是“请求一次更新”，本次渲染里的 state 是快照。
 * - 连续两次 setCount(count + 1) 只 +1：两次读的是同一份快照；
 * - 函数式更新基于最新值计算，两次 +2；
 * - setter 之后立即读变量，读到的仍是本次渲染的旧值；
 * - React 18（createRoot）在 setTimeout 等异步回调里也会自动批处理。
 */
export default function Demo() {
  const [direct, setDirect] = useState(0)
  const [fn, setFn] = useState(0)
  const [snap, setSnap] = useState(0)
  const [snapLog, setSnapLog] = useState<string[]>([])
  const [batched, setBatched] = useState(0)
  const [batchLog, setBatchLog] = useState<string[]>([])

  const addDirectTwice = () => {
    setDirect(direct + 1)
    setDirect(direct + 1)
  }

  const addFunctionalTwice = () => {
    setFn((v) => v + 1)
    setFn((v) => v + 1)
  }

  const readSnapshot = () => {
    setSnap(snap + 1)
    setSnapLog((prev) =>
      [
        `点击后立即读取：count = ${snap}（旧快照，不是 ${snap + 1}）`,
        ...prev,
      ].slice(0, 5),
    )
  }

  const addInTimeout = () => {
    setTimeout(() => {
      setBatched((v) => v + 1)
      setBatched((v) => v + 1)
      setBatchLog((prev) =>
        [
          'setTimeout 内连续两次更新：React 18 自动批处理，合并为一次渲染，值一次 +2',
          ...prev,
        ].slice(0, 5),
      )
    }, 0)
  }

  return (
    <div className="demo-stack">
      <section>
        <h3>快照 vs 函数式更新</h3>
        <div className="demo-row">
          <button type="button" onClick={addDirectTwice}>
            连续两次 <code>setDirect(direct + 1)</code>
          </button>
          <span className="demo-panel">direct = {direct}</span>
        </div>
        <div className="demo-row">
          <button type="button" onClick={addFunctionalTwice}>
            连续两次 <code>setFn(v =&gt; v + 1)</code>
          </button>
          <span className="demo-panel">fn = {fn}</span>
        </div>
        <p className="demo-note">
          同样调用两次 setter：直接读快照只 +1，函数式更新 +2。
        </p>
      </section>

      <section>
        <h3>setter 之后立刻读变量</h3>
        <div className="demo-row">
          <button type="button" onClick={readSnapshot}>
            setSnap(snap + 1) 后立刻读 snap
          </button>
          <span className="demo-panel">snap = {snap}</span>
        </div>
        <ul className="demo-log">
          {snapLog.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>setTimeout 中的自动批处理（React 18）</h3>
        <div className="demo-row">
          <button type="button" onClick={addInTimeout}>
            在 setTimeout 里连续更新两次
          </button>
          <span className="demo-panel">batched = {batched}</span>
        </div>
        <ul className="demo-log">
          {batchLog.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
