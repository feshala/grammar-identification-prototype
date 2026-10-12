/* ============================================================
   25-init.js
   Original section: 24. INIT
   Depends on: $ (12); runTests (24);
               initLibraryEvents (20); initBottomNav (21); initTextViewEvents (16);
               autoGrowInput (14); analyze (17)
   ============================================================ */
const tcEl = $('target-count');
if (tcEl) tcEl.textContent = TEST_CORPUS.length + ' test · target: 0 hard fail';

$('run-tests').addEventListener('click', runTests);
const collectBtn = $('collect-oov');
if (collectBtn) collectBtn.addEventListener('click', () => {
  const oov = collectOOV();
  const panel = $('oov-panel');
  panel.hidden = false;
  panel.textContent = oov.length ? oov.join('\n') : '(tidak ada OOV)';
  console.log('[OOV]', oov);
});
initLibraryEvents();
initBottomNav();
initTextViewEvents();
autoGrowInput();
analyze({ silent: true });
