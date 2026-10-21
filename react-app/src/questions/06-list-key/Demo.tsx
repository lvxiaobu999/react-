import { useState } from 'react'

interface Item {
  id: number
  label: string
}

let nextId = 100

/**
 * 对应题库 06：每行带一个非受控输入框（值保存在 DOM 节点上），
 * React 按 key 决定复用哪个节点。key 用数组下标时，头部插入/删除
 * 会让“身份”随位置移动，输入内容串到错误的行；key 用稳定 id 则不受影响。
 * 切换 key 策略会改变所有元素的 key，从而整表重挂载——输入框被重置，
 * 这本身也是「key 变了 = 不同元素」的现场演示。
 */
export default function Demo() {
  const [items, setItems] = useState<Item[]>(() => [
    { id: 1, label: '苹果' },
    { id: 2, label: '香蕉' },
    { id: 3, label: '樱桃' },
  ])
  const [useIndexKey, setUseIndexKey] = useState(false)

  const insertFirst = () => {
    const id = nextId++
    setItems((prev) => [{ id, label: `新增 #${id}` }, ...prev])
  }

  const removeFirst = () => setItems((prev) => prev.slice(1))

  const rows = items.map((item, index) => (
    <li key={useIndexKey ? index : item.id}>
      <span className="demo-item-label">{item.label}</span>
      <input type="text" defaultValue={`备注：${item.label}`} />
    </li>
  ))

  return (
    <div className="demo-stack">
      <div className="demo-row">
        <button type="button" onClick={insertFirst}>
          在头部插入一项
        </button>
        <button type="button" onClick={removeFirst} disabled={items.length === 0}>
          删除第一项
        </button>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={useIndexKey}
            onChange={(e) => setUseIndexKey(e.target.checked)}
          />
          用数组下标作为 key
        </label>
      </div>

      <p className="demo-note">
        先在任意一行的输入框里改几个字，再点「在头部插入一项」或「删除第一项」：
        下标 key 时输入内容会落到错误的行上；id key 始终跟随原数据。
        勾选/取消复选框会整表重挂载（key 变了就是不同元素），输入框会被重置。
      </p>

      <ul className="demo-list">{rows}</ul>
    </div>
  )
}
