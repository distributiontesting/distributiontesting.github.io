# Results in Distribution Testing

Interactive table of query complexity bounds for distribution equivalence testing under various sampling oracle models.
**Live site**: https://distributiontesting.github.io

Maintained by [Uddalok Sarkar](https://uddaloksarkar.github.io/), [Yash Pote](https://yashpote.github.io/), and [Sayantan Sen](https://sites.google.com/view/sayantans/home).

---

## Updating results

**All data lives in one file: [`data.csv`](data.csv)**

Open it in Excel, Numbers, Google Sheets, or any text editor. Each row is one cell in the table:

```
scenario,bound,cell,formula,comment
zero_tv,ub,SAMPSAMP,"O\left(\frac{N^{2/3}}{\varepsilon^{8/3}}\right)","Follows from Theorem 1 of [{batu2013testing}]."
```

| Column | Values | Notes |
|--------|--------|-------|
| `scenario` | `zero_tv` or `tv_tv` | Non-tolerant vs tolerant closeness |
| `bound` | `ub` or `lb` | Upper or lower bound |
| `cell` | e.g. `SAMPSAMP`, `FULLCOND` | Row model + column model (see below) |
| `formula` | LaTeX string | Single backslashes — no JS escaping. Leave blank for open problems |
| `comment` | Plain text | Use `{refVarName}` to insert a clickable reference link |

**To update** an existing result: find its row, edit `formula` and/or `comment`.

**To add** a new result where there was an open problem: find the row with the blank formula, fill it in.

Lines starting with `#` are comments and are ignored by the parser.

---

## Cell names

Row and column labels map to these identifiers:

| | SAMP | DUAL | PAIRCOND | SUBCOND | COND |
|---|---|---|---|---|---|
| **SAMP** | `SAMPSAMP` | | | | |
| **DUAL** | `DUALSAMP` | `DUALDUAL` | | | |
| **PAIRCOND** | `PAIRSAMP` | `PAIRDUAL` | `PAIRPAIR` | | |
| **SUBCOND** | `SUBSAMP` | `SUBDUAL` | `SUBPAIR` | `SUBSUB` | |
| **COND** | `CONDSAMP` | `CONDDUAL` | `CONDPAIR` | `CONDSUB` | `CONDCOND` |
| **FULL** | `FULLSAMP` | `FULLDUAL` | `FULLPAIR` | `FULLSUB` | `FULLCOND` |

---

## Adding a new scenario

Currently supported scenarios: `zero_tv` (closeness = 0) and `tv_tv` (closeness = d_TV), both with farness = d_TV.

To add a new scenario (e.g. Hellinger distance):

1. Add rows to `data.csv` with the new scenario key (e.g. `hellinger_tv`).
2. In [`js/queryComplexity.js`](js/queryComplexity.js), add a case to `getScenarioKey()`:
   ```js
   if (isHellinger && isTv2) return 'hellinger_tv';
   ```
3. In [`index.html`](index.html), add a radio button in the *Closeness Distance* control group.

---

## Adding a reference

References live in the `<ol class="bib">` list in [`index.html`](index.html).

1. Add a new `<li>` following the existing pattern.
2. Choose a short variable name (e.g. `smith2025new`).
3. Call `CreateRefLink('smith2025new')` inside a `<script>` tag in that `<li>`.
4. Use `{smith2025new}` in the `comment` column of `data.csv` to link to it.

---

## Local preview

The site fetches `data.csv` at runtime, so it must be served over HTTP:

```bash
python3 -m http.server
# then open http://localhost:8000
```

Opening `index.html` directly as a `file://` URL will not load the data.

---

## File map

```
data.csv              ← edit this to update results
index.html            ← page structure, controls, reference list
dl.css                ← all styling
js/
  dataset.js          ← CSV loader and parser
  queryComplexity.js  ← maps user selection → dataset lookup
  displaying.js       ← renders formulas (KaTeX) and handles cell selection
  read_logic.js       ← reads radio button state from the form
```

---

## Open TODOs

- [ ] Add more distance scenarios (Hellinger, L∞, …)
- [ ] Color-code cells: tight bound
