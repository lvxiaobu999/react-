"use no memo"
// 本仓库启用了 React Compiler；这行指令关闭整个文件的自动缓存，
// 以复现手写 memo / useCallback 时代的渲染行为。

import { memo, useCallback, useRef, useState } from 'react'

/**
 * 对应题库 22：useCallback 只有在下游能利用稳定引用时才有价值。
 * 点「修改无关状态」：三个子组件的 value 都没变——
 * 1. 无 memo：父组件每次渲染它都跟着渲染；
 * 2. memo 但 onPing 每次新建：新引用让浅比较失败，memo 形同虚设；
 * 3. memo + useCallback：引用稳定，跳过渲染（render 次数不变）。
 * 点子组件按钮真正更新 related 时，props 变了，谁都该重渲染。
 * 注意：开发模式 StrictMode 双调用渲染函数，render 次数按 2 递增，看相对差距即可。
 */
export default function Demo() {
  const [related, setRelated] = useState(0)
  const [unrelated, setUnrelated] = useState(0)

  const handlePingFresh = () => setRelated((v) => v + 1) // 每次渲染都新建引用
  const handlePingStable = useCallback(() => setRelated((v) => v + 1), [])

  return (
    <div className="demo-stack">
      <div className="demo-row">
        <button type="button" onClick={() => setUnrelated((v) => v + 1)}>
          修改无关状态（unrelated = {unrelated}）
        </button>
        <span className="demo-panel">related = {related}</span>
      </div>

      <div className="demo-grid">
        <Child label="❌ 无 memo" value={related} onPing={handlePingFresh} />
        <MemoFreshChild
          label="⚠️ memo，但 onPing 每次新建"
          value={related}
          onPing={handlePingFresh}
        />
        <MemoStableChild
          label="✅ memo + useCallback"
          value={related}
          onPing={handlePingStable}
        />
      </div>
    </div>
  )
}

interface ChildProps {
  label: string
  value: number
  onPing: () => void
}

function Child({ label, value, onPing }: ChildProps) {
  // render 函数执行计数；memo 生效时组件不渲染，数字保持不变。
  // 渲染期读写 ref 是刻意的教学手段（业界统计渲染次数的常见演示写法），
  // 业务代码请勿在渲染中读写 ref。
  // oxlint-disable-next-line react/refs
  const renders = useRef(0)
  // oxlint-disable-next-line react/refs
  renders.current += 1

  return (
    <div className="demo-case">
      <h3>{label}</h3>
      <p>
        {/* oxlint-disable-next-line react/refs */}
        render 次数：{renders.current} ｜ value = {value}
      </p>
      <button type="button" onClick={onPing}>
        更新 related
      </button>
    </div>
  )
}

const MemoFreshChild = memo(Child)
const MemoStableChild = memo(Child)
