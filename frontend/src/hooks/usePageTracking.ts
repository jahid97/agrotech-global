import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function getSessionId(): string {
  let id = sessionStorage.getItem('_sid')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('_sid', id)
  }
  return id
}

/** Fires a lightweight page-view event on every route change. */
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    // skip admin pages
    if (location.pathname.startsWith('/admin')) return

    const payload = {
      path:      location.pathname,
      referrer:  document.referrer || undefined,
      sessionId: getSessionId(),
    }

    // fire-and-forget — don't block the render
    fetch('/api/analytics/track', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).catch(() => {})
  }, [location.pathname])
}
