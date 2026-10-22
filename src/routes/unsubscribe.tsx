import { useEffect, useState } from 'react'
import { createFileRoute, useSearch } from '@tanstack/react-router'

type State =
  | { kind: 'loading' }
  | { kind: 'invalid'; message: string }
  | { kind: 'already' }
  | { kind: 'confirm' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === 'string' ? search.token : '',
  }),
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const { token } = useSearch({ from: '/unsubscribe' })
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid', message: 'Missing unsubscribe token.' })
      return
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const json = await r.json().catch(() => ({}))
        if (!r.ok) {
          setState({ kind: 'invalid', message: json.error || 'Invalid or expired link.' })
          return
        }
        if (json.valid === false && json.reason === 'already_unsubscribed') {
          setState({ kind: 'already' })
          return
        }
        if (json.valid) {
          setState({ kind: 'confirm' })
          return
        }
        setState({ kind: 'invalid', message: 'Invalid link.' })
      })
      .catch(() => setState({ kind: 'invalid', message: 'Network error.' }))
  }, [token])

  async function confirm() {
    setState({ kind: 'submitting' })
    try {
      const res = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) {
        setState({ kind: 'success' })
      } else if (json.reason === 'already_unsubscribed') {
        setState({ kind: 'already' })
      } else {
        setState({ kind: 'error', message: json.error || 'Failed to unsubscribe.' })
      }
    } catch {
      setState({ kind: 'error', message: 'Network error.' })
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-xl border border-border bg-card p-8 shadow-elegant">
        <h1 className="text-2xl font-bold text-primary mb-2">RYZE Advisory</h1>
        <p className="text-sm text-muted-foreground mb-6">Email preferences</p>

        {state.kind === 'loading' && <p className="text-sm">Validating your link…</p>}

        {state.kind === 'invalid' && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">Link not valid</h2>
            <p className="text-sm text-muted-foreground">{state.message}</p>
          </div>
        )}

        {state.kind === 'already' && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">You're already unsubscribed</h2>
            <p className="text-sm text-muted-foreground">
              You won't receive any more emails from us.
            </p>
          </div>
        )}

        {(state.kind === 'confirm' || state.kind === 'submitting') && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">Confirm unsubscribe</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Click below to stop receiving emails from RYZE Advisory.
            </p>
            <button
              onClick={confirm}
              disabled={state.kind === 'submitting'}
              className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {state.kind === 'submitting' ? 'Unsubscribing…' : 'Confirm unsubscribe'}
            </button>
          </div>
        )}

        {state.kind === 'success' && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">You're unsubscribed</h2>
            <p className="text-sm text-muted-foreground">
              You won't receive any more emails from us. Sorry to see you go.
            </p>
          </div>
        )}

        {state.kind === 'error' && (
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">{state.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
