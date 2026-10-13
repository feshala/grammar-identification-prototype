/* analyze-one.js — pipeline penuh untuk satu kalimat: node analyze-one.js "text" */
const s = require('./dev-cli.js');
if (!s.__GI__) process.exit(2);
const gi = s.__GI__;
const text = process.argv[2] || 'She go to school since two years.';
const tokens = gi.tokenize(text); gi.tagAll(tokens);
const spans = gi.chunk(tokens);
const grammar = gi.detectGrammar(tokens, spans);
const clauses = gi.splitClauses(tokens);
const structures = clauses.map(c => gi.analyzeStructure(tokens, spans, c.start, c.end));
const issues = gi.validate(tokens, structures);
console.log(JSON.stringify({
  tokens: tokens.map(t => ({t:t.text, tag:t.tag, lemma:t.lemma, prov:t.provenance, conf:t.confidence})),
  spans, grammar: grammar.map(g=>g.name), issues
}, null, 1));
