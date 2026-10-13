/* dev-cli.js — Node harness untuk menjalankan pipeline GI di luar browser.
   Bukan bagian aplikasi; hanya alat uji pengembang (zero runtime dependency tetap terjaga). */
const fs = require('fs'), path = require('path'), vm = require('vm');

const noopEl = () => ({
  textContent:'', innerHTML:'', value:'', hidden:false, disabled:false,
  classList:{add(){},remove(){},toggle(){},contains(){return false}},
  addEventListener(){}, appendChild(){}, querySelector(){return null}, querySelectorAll(){return []},
  setAttribute(){}, getAttribute(){return null}, style:{}, focus(){}, scrollIntoView(){}
});
const sandbox = {
  console,
  document: { getElementById: () => noopEl(), addEventListener(){}, querySelector: () => noopEl(),
              querySelectorAll: () => [], createElement: noopEl, body: noopEl() },
  window: {}, navigator: { connection: undefined, hardwareConcurrency: 8, deviceMemory: 8 },
  performance: { now: () => Date.now() },
  requestAnimationFrame: cb => cb(),
  setTimeout, setInterval: () => 0, clearTimeout, localStorage: { getItem:()=>null, setItem(){} }
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const dir = path.join(__dirname, 'src', 'js');
const files = fs.readdirSync(dir).filter(f => /^\d\d-.*\.js$/.test(f)).sort();
// Bungkus semua modul dalam satu IIFE agar deklarasi const saling terlihat (seperti di browser).
let combined = '';
for (const f of files) {
  combined += `\n/* ==== ${f} ==== */\n` + fs.readFileSync(path.join(dir, f), 'utf8');
}
combined += `
globalThis.__GI__ = { tokenize, tagAll, chunk, splitClauses, analyzeStructure, detectTense, detectGrammar,
  detectTransferPatterns, detectPrepCollocations, validate, runOneTest, TEST_CORPUS, GRAMMAR_GLOSSARY };
`;
try { vm.runInContext(combined, sandbox, { filename: 'bundle.js' }); }
catch (e) { console.error('LOAD FAIL:', e.message); process.exit(1); }
module.exports = sandbox;
