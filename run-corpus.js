/* run-corpus.js — jalankan TEST_CORPUS di Node (alat uji pengembang). */
const s = require('./dev-cli.js');
if (!s.__GI__) process.exit(2);
const gi = s.__GI__;
const results = gi.TEST_CORPUS.map(gi.runOneTest);
let pass = 0, xfail = 0, fail = 0;
for (const r of results) { if (r.pass) pass++; else if (r.tc.xfail) xfail++; else fail++; }
console.log(`total ${results.length} · pass ${pass} · xfail ${xfail} · fail ${fail}`);
for (const r of results) if (!r.pass) console.log((r.tc.xfail ? 'XFAIL ' : 'FAIL  ') + JSON.stringify(r.tc.s) + ' :: ' + r.fails.join(' · '));
process.exit(fail ? 1 : 0);
