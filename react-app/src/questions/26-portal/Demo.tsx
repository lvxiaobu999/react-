import { useState } from 'react'
import { createPortal } from 'react-dom'

let eventSeq = 0

interface EventEntry {
  id: number
  msg: string
}

/**
 * 对应题库 26：Portal 改变 DOM 位置，不改变 React 树位置。
 * - 普通渲染：浮层受父级 overflow: hidden 与 transform 影响，下半截被裁剪；
 * - Portal 渲染：浮层挂到 document.body，不再受父级裁剪；
 * - 两种方式下，浮层内的点击都沿 React 树冒泡到父容器（看事件日志），
 *   而 e.stopPropagation() 可以阻断这条 React 合成事件流。
 */
export default function Demo() {
  const [usePortal, setUsePortal] = useState(false)
  const [events, setEvents] = useState<EventEntry[]>([])

  const pushEvent = (msg: string) =>
    setEvents((prev) => [{ id: eventSeq++, msg }, ...prev].slice(0, 5))

  const panel = (
    <div className="demo-float">
      <p>浮层内容</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          pushEvent('浮层内点击：stopPropagation 生效，未冒泡到父容器')
        }}
      >
        阻断冒泡的点击
      </button>
      <button
        type="button"
        onClick={() =>
          pushEvent(
            `浮层内点击：冒泡到了父容器（当前 ${usePortal ? 'Portal' : '普通'} 渲染）`,
          )
        }
      >
        正常点击（会冒泡）
      </button>
    </div>
  )

  return (
    <div className="demo-stack">
      <div className="demo-row">
        <button type="button" onClick={() => setUsePortal((v) => !v)}>
          切换为{usePortal ? '普通渲染' : 'Portal 渲染'}
        </button>
        <span className="demo-note">
          当前：{usePortal ? 'createPortal 到 document.body' : '作为普通子元素渲染'}
        </span>
      </div>

      <div
        className="demo-clip-root"
        onClick={() => pushEvent('父容器捕获到冒泡点击')}
      >
        <div className="demo-clip-box">
          {usePortal ? (
            createPortal(<div className="demo-portal-host">{panel}</div>, document.body)
          ) : (
            panel
          )}
        </div>
      </div>

      <section>
        <h3>事件日志（验证 React 树冒泡）</h3>
        <ul className="demo-log">
          {events.map((entry) => (
            <li key={entry.id}>{entry.msg}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
