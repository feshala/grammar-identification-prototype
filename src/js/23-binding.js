/* ============================================================
   23-binding.js
   Original section: 22. MAIN EVENT BINDING
   Depends on: $, STATE (12); analyze (17); autoGrowInput (14)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const go = $('go');
  if (go) go.addEventListener('click', () => analyze());
  const input = $('input');
  if (input) input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); }
  });
});
