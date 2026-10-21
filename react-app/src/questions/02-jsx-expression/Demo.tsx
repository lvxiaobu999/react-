import { useState } from 'react'

/**
 * 对应题库 02「JSX 是如何变成页面的？」的追问：
 * `count && <List />` 在 count 为 0 时会把左操作数 0 当作可渲染节点输出。
 * 修复方式：三元表达式，或把条件改写成只产生布尔值的比较。
 */
export default function Demo() {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-stack">
      <p>
        当前 <code>count = {count}</code>，把它减到 0 观察两种写法的差别。
      </p>
      <div className="demo-row">
        <button type="button" onClick={() => setCount(count + 1)}>
          +1
        </button>
        <button
          type="button"
          onClick={() => setCount(count - 1)}
          disabled={count <= 0}
        >
          -1
        </button>
      </div>

      <section>
        <h3>写法一：{'{count && <List />}'}</h3>
        <p className="demo-note">
          <code>&amp;&amp;</code> 返回左操作数，<code>0</code>{' '}
          是可渲染的合法节点，所以面板里出现了字面量 0。
        </p>
        <div className="demo-panel">{count && <List />}</div>
      </section>

      <section>
        <h3>写法二：{'{count > 0 && <List />}'}</h3>
        <p className="demo-note">
          比较表达式只产生布尔值，<code>false</code> 不会被渲染。
        </p>
        <div className="demo-panel">{count > 0 && <List />}</div>
      </section>

      <section>
        <h3>写法三：三元表达式</h3>
        <div className="demo-panel">
          {count > 0 ? <List /> : <em>暂无列表</em>}
        </div>
      </section>
    </div>
  )
}

function List() {
  return (
    <ul>
      <li>列表项 A</li>
      <li>列表项 B</li>
    </ul>
  )
}
