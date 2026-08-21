import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Picks the render tier before React mounts, so nothing expensive gets built on
 * a device that cannot afford it. `perf-lite` switches off the reveal
 * transitions and the card hover zoom; composition and colour are unchanged.
 *
 * The whole thing is wrapped in try/catch on purpose. This is a progressive
 * enhancement — a *hint*. It runs before createRoot(), so anything that throws
 * in here takes the entire site down and leaves the visitor looking at a blank
 * background with no error. No optional nicety is worth that risk.
 *
 * Fallbacks are generous so browsers that do not expose these APIs (Safari,
 * Firefox) get the full experience rather than being downgraded by a missing
 * value.
 */
function selectRenderTier() {
  try {
    const cores = navigator.hardwareConcurrency || 8
    const memory = navigator.deviceMemory || 8
    const conn = navigator.connection

    const lite =
      // Phones and small tablets: fill rate is the constraint here.
      window.matchMedia('(max-width: 820px)').matches ||
      // No fine pointer means a touch device on a mobile GPU.
      window.matchMedia('(pointer: coarse)').matches ||
      cores <= 2 ||
      memory <= 2 ||
      (conn && conn.saveData === true)

    if (lite) document.documentElement.classList.add('perf-lite')
  } catch {
    /* Not worth a single pixel of breakage — carry on at the full tier. */
  }
}

selectRenderTier()

const container = document.getElementById('root')

if (!container) {
  // Nothing to mount into. Say so loudly rather than failing silently.
  document.body.textContent =
    'Could not start: the #root element is missing from index.html.'
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
