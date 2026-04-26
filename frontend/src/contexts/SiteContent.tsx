import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiBase } from '../lib/api'

type ContentMap = Record<string, string>

const SiteContentContext = createContext<ContentMap>({})

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentMap>({})

  useEffect(() => {
    fetch(`${apiBase}/content`)
      .then(r => r.ok ? r.json() : {})
      .then(setContent)
      .catch(() => {}) // fail silently — public pages use their built-in defaults
  }, [])

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  )
}

/** Returns the DB value for `key`, or `fallback` if not yet set. */
export function useContent(key: string, fallback: string): string {
  const ctx = useContext(SiteContentContext)
  return ctx[key] ?? fallback
}
