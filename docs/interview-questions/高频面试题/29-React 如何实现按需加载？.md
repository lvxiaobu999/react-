# 29. React 如何实现按需加载？

> 所属主题：并发特性与架构 ｜ [← 返回目录](./README.md)

## 回答要点

常见方式是动态 `import()` 配合 `React.lazy` 和 `Suspense` 做组件代码分割：

```tsx
import { lazy, Suspense } from 'react'

const SettingsPage = lazy(() => import('./SettingsPage'))

function Page() {
  return (
    <Suspense fallback={<p>加载中…</p>}>
      <SettingsPage />
    </Suspense>
  )
}
```

## 易错点 / 追问

生产项目还需考虑路由级拆分、加载失败后的错误边界、预加载策略和 chunk 体积；Suspense fallback 不是加载失败处理机制。
