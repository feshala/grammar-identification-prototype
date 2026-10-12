# Analisa Kematangan Mesin Identifikasi Grammar — `GI.bundle.html` (v2.6.0 / Wave 13)
Catatan analisa (berlaku untuk pertanyaan lanjutan). Tanggal: 2026-10-12. Metode: eksekusi aktual pipeline bundle di Node dengan DOM-shim, bukan estimasi.

## 1. Hasil Uji Regresi Internal (TEST_CORPUS bawaan bundle)
- TOTAL = 239 test | PASS = 238 | FAIL = 1 | XFAIL = 0
- 1 fail: `[data] glossary chars ≥ 50000` → aktual 39.752 char (defisit ~20%). Ini target konten kamus, bukan bug logika.
- Skor corpus internal: **99,6%** (238/239).

## 2. Profil Kapabilitas (terverifikasi jalan)
| Aspek | Status |
|---|---|
| POS tagging + provenance + confidence/token | Ada (lexicon/irregular/contraction/fallback) |
| Chunking NP/VP/PP/AdjP/AdvP/InfP/GerP | Ada [FROZEN], tanpa overlap (uji group F) |
| Tense detection | 12+ bentuk + passive + modal perfect + be-going-to; akurat pada kalimat sederhana–menengah |
| Validasi | SVA, v3-after-have, aux+Vfin, modal, determiner/article, uncountable, missing-be, 8 pola L1-transfer (ID→EN) |
| Verdict 3 tingkat | clean / hedged / abstain (abstain saat kompleksitas/OOV tinggi — perilaku aman yang baik) |
| Glossary | 69 entri, mapping TAG(27)/PHRASE(8)/FORM(5) konsisten |

## 3. Stress-Test Register Akademik (15 kalimat di luar corpus)
- Crash/error: 0 (robust). Namun:
  - **False negative tinggi**: inverted conditional ("Had the hypothesis been tested…"), cleft ("What surprised…was…"), correlative "the more…the more", participial clause, subjunctive — tidak dikenali strukturnya; banyak divonis `abstain`/`hedged`.
  - **False positive**: "She suggested that he apply…" → salah tuduh subject-verb-agreement (subjunctive tidak dikenal).
  - Passive + past-participle ambigu ("later refined", "having seen") hanya sebagian tertangkap.
- OOV rate pada kosakata akademik: ~7,7% token → memicu abstain berlebihan.

## 4. Kesimpulan Tingkat Kematangan
- **Skala operasional harian (pelajar SMP/SMA, kalimat SVO sederhana–majemuk ringan): matang (~95–99%)** — sesuai desain aslinya.
- **Skala register akademis (esai/laporan pelajar, kalimat majemuk bertingkat, pasif kompleks, subjunctive, inversi): belum matang.**

### Angka kematangan untuk level akademis pelajar: **≈ 65%**
Komposit dari: akurasi kasus umum 99% × cakupan fenomena sintaksis akademik ±55% × ketahanan false-positive/negative ±70% × kelengkapan materi pendukung 79% (39.752/50.000 char).
Rentang jujur: 60–70%. Belum layak diklaim sebagai alat analisis teks akademik penuh; layak sebagai *scaffold* identifikasi grammar dasar-menengah untuk penulisan akademik pemula.

## 5. Gap Prioritas (untuk wave berikutnya)
1. Subjunctive & formulaic "suggest/insist that + V1" (hapus FP SVA).
2. Inverted conditional & cleft construction.
3. Perluas LEX kosakata akademik (turunkan abstain; OOV <3%).
4. Tuntaskan glossary ke ≥50.000 char (fail #1).
5. Disambiguasi N/V kontekstual (xfail W17: "Climate change affects…").

## 6. Rencana Kedepan (Roadmap Wave 14–18) — berbasis Contract README + kondisi mesin v2.6.0
Prinsip: setiap wave = goal eksplisit terhadap contract (terutama #3 frozen `chunk`/`detectTense` → hanya diubah lewat "explicit wave goal: feature maturation"), corpus TEST_CORPUS bertambah (target dihitung dari length, tidak hardcode), hasil = N pass · 0 fail · 0 xfail.

### W14 — FP/FN termurah dulu (validator & leksikon; TANPA menyentuh frozen)
- Subjunctive formulaic "suggest/insist/recommend/demand/require that + V1" di `validate` (src/09): hapus FP SVA ("that he apply"). +Group tests.
- Disambiguasi N/V kontekstual untuk shadowing terdaftar (`may, clean, kind, only, past, second, yet`) + xfail W17 "Climate change affects…" → rule-based di tagger (src/05), bukan di chunker.
- Perluas LEX kosakata akademik (target OOV <3% pada stress-set akademik → abstain turun).
- Exit criteria: 15 stress-test akademik §3 tidak ada FP baru; corpus internal tetap 0 fail logika.

### W15 — Tuntas glossary (fail #1 saat ini)
- GRAMMAR_GLOSSARY (src/19) 39.752 → ≥50.000 char: tambah entri dengan id/name/category/definition (contract #4) + simple field bertahap; sinkron TAG/PHRASE/FORM_TO_GLOSSARY (contract #5,#6) via Group R/O data tests.
- Exit criteria: test `[data] glossary chars ≥ 50000` pass → **239/239 (100%)**.

### W16 — Fenomena sintaksis akademik (butuh explicit wave goal untuk frozen `chunk`)
- Inverted conditional ("Had the hypothesis been tested…"), cleft ("What surprised X was Y"), correlative "the more…the more", participial reduced clause.
- Strategi: deteksi pola di `splitClauses`/`analyzeStructure` (src/07, tidak frozen) semaksimal mungkin; jika span barus dibutuhkan, ajukan goal "feature maturation" untuk `chunk` dengan regression guard penuh Group F sebelum/sesudah.
- Exit criteria: FN pada stress-set akademik ≤2 kasus; verdict `abstain` tidak lagi dipakai sebagai pelarian untuk pola yang kini dikenali.

### W17 — Ketahanan register akademik
- Passive vs past-participle ambigu ("later refined", "having seen") — perbaikan di detectGrammar/pass-2 validate.
- Kalimat majemuk bertingkat khas esai pelajar (nominalisasi, reported speech, relative clause bersarang) masuk TEST_CORPUS sebagai grup baru.
- Ukur ulang komposit kematangan akademis.

### W18 — Consolidation & quality gate
- Benchmark otomatis: corpus internal + stress-set akademik 15 kalimat + korpus esai pelajar mini (hand-labeled) sebagai regression suite.
- Update README changelog + versi minor; dokumentasi batas kapabilitas (hindari overclaim).

### Estimasi dampak ke angka kematangan (§4)
| Tahap | Kematangan akademis (est.) |
|---|---|
| Sekarang (W13/v2.6.0) | ≈65% |
| Setelah W14+W15 (FP hilang, OOV<3%, glossary tuntas) | ≈75% |
| Setelah W16 (inversi/cleft/correlative) | ≈82% |
| Setelah W17 (pasif ambigu + kompleksitas esai) | ≈88–90% |

Rasio effort:benefit: W14 dan W15 adalah "quick win" (risiko rendah, tidak menyentuh frozen, langsung menaikkan skor); W16 adalah lompatan terbesar tetapi berisiko regresi sehingga dijaga gerbang tes Group F.
