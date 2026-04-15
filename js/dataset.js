/**
 * dataset.js — Loads and parses data.csv at page startup.
 *
 * To update results, edit data.csv only.
 * Format:  scenario, bound, cell, formula, comment
 *   scenario : zero_tv | tv_tv
 *   bound    : ub | lb
 *   cell     : e.g. SAMPSAMP, FULLCOND, PAIRDUAL …
 *   formula  : LaTeX string with single backslashes (leave blank = open problem)
 *   comment  : plain text; use {refVarName} for clickable reference links
 */

// ─── Global stores (populated by loadDataset) ────────────────────────────────
let complComment = {};
let DATASET      = null;

// ─── Table cell order ─────────────────────────────────────────────────────────
const ALL_CELLS = [
    'SAMPSAMP',
    'DUALSAMP',  'DUALDUAL',
    'PAIRSAMP',  'PAIRDUAL',  'PAIRPAIR',
    'SUBSAMP',   'SUBDUAL',   'SUBPAIR',   'SUBSUB',
    'CONDSAMP',  'CONDDUAL',  'CONDPAIR',  'CONDSUB',  'CONDCOND',
    'FULLSAMP',  'FULLDUAL',  'FULLPAIR',  'FULLSUB',  'FULLCOND',
];

// ─── Minimal RFC-4180 CSV parser (handles quoted fields with commas) ──────────
function parseCSV(text) {
    const rows = [];
    let i = 0, len = text.length;

    while (i < len) {
        // Skip comment lines (start with #)
        if (text[i] === '#') {
            while (i < len && text[i] !== '\n') i++;
            if (i < len) i++; // skip \n
            continue;
        }

        const row = [];
        while (i < len && text[i] !== '\n' && text[i] !== '\r') {
            if (text[i] === '"') {
                // Quoted field
                i++;
                let field = '';
                while (i < len) {
                    if (text[i] === '"' && text[i + 1] === '"') { field += '"'; i += 2; }
                    else if (text[i] === '"')                   { i++; break; }
                    else                                         { field += text[i++]; }
                }
                row.push(field);
                if (text[i] === ',') i++;
            } else {
                // Unquoted field
                let start = i;
                while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') i++;
                row.push(text.slice(start, i));
                if (text[i] === ',') i++;
            }
        }
        if (text[i] === '\r') i++;
        if (text[i] === '\n') i++;

        // Skip blank or header rows
        if (row.length >= 3 && row[0] !== 'scenario') rows.push(row);
    }
    return rows;
}

// ─── Build DATASET object from parsed rows ────────────────────────────────────
function buildDataset(rows) {
    const ds = {};
    rows.forEach(function(row) {
        const scenario = row[0].trim();
        const bound    = row[1].trim();
        const cell     = row[2].trim();
        const formula  = (row[3] || '').trim();
        const comment  = (row[4] || '').trim();
        if (!scenario || !bound || !cell) return;
        if (!ds[scenario])        ds[scenario]        = {};
        if (!ds[scenario][bound]) ds[scenario][bound] = {};
        ds[scenario][bound][cell] = { formula, comment };
    });
    return ds;
}

// ─── Inlined data (generated from data.csv — edit data.csv, then paste here) ──
//
// To update: copy the contents of data.csv and replace the string below.
// Lines starting with # and the header row are ignored by parseCSV.
const INLINE_CSV = `scenario,bound,cell,formula,comment
# To add a new result: fill in formula (LaTeX, single backslash) and comment ({refVarName} inserts a clickable reference link).
# Leave formula blank for open problems. Lines starting with # are ignored.
# scenario: zero_tv | tv_tv
# bound:    ub (upper bound) | lb (lower bound)
# cell:     ROW+COL  e.g. SAMPSAMP  FULLCOND  PAIRDUAL  etc.
#
# ── NON-TOLERANT  (closeness = 0,  farness = d_TV) ──────────────────────────
zero_tv,ub,SAMPSAMP,"O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from Theorem 1 of [{batu2013testing}]."
zero_tv,ub,DUALSAMP,"O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from SAMP vs SAMP upper bound."
zero_tv,ub,DUALDUAL,"O\\left(\\frac{1}{\\varepsilon}\\right)","Follows from [{canonne2014testing}]."
zero_tv,ub,PAIRSAMP,"O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from SAMP vs SAMP upper bound."
zero_tv,ub,PAIRDUAL,"O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)","Follows from [{potescalable}]."
zero_tv,ub,PAIRPAIR,"O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)","Follows from [{canonne2015testing}]."
zero_tv,ub,SUBSAMP,"O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from SAMP vs SAMP upper bound."
zero_tv,ub,SUBDUAL,"O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)","Follows from [{adar2024improved}]."
zero_tv,ub,SUBPAIR,,Open problem.
zero_tv,ub,SUBSUB,"O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)","Follows from [{kumar2023tolerant}]."
zero_tv,ub,CONDSAMP,"O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from SAMP vs SAMP upper bound."
zero_tv,ub,CONDDUAL,"O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)","Follows from PAIRCOND vs DUAL."
zero_tv,ub,CONDPAIR,"O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)","Follows from PAIRCOND vs PAIRCOND."
zero_tv,ub,CONDSUB,"O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)","Follows from SUBCOND vs SUBCOND."
zero_tv,ub,CONDCOND,"O\\left(\\frac{\\log{\\log{N}}}{\\varepsilon^5}\\right)","Follows from [{falahatgar2015faster}]."
zero_tv,ub,FULLSAMP,"O\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from [{valiant2017automatic}]."
zero_tv,ub,FULLDUAL,"O\\left(\\frac{1}{\\varepsilon}\\right)","Follows from DUAL vs DUAL upper bound."
zero_tv,ub,FULLPAIR,"O\\left(\\frac{\\sqrt{\\log{N}}}{\\varepsilon^2}\\right)","Follows from [{nar2020cond}]."
zero_tv,ub,FULLSUB,"O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)","Follows from [{adar2024improved}]."
zero_tv,ub,FULLCOND,"O\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from [{falahatgar2015faster}]."
#
zero_tv,lb,SAMPSAMP,"\\Omega\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)","Follows from Theorem 1 of [{batu2013testing}]."
zero_tv,lb,DUALSAMP,"\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from FULL vs SAMP lower bound."
zero_tv,lb,DUALDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon}\\right)","Follows from FULL vs DUAL lower bound."
zero_tv,lb,PAIRSAMP,"\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from FULL vs SAMP lower bound."
zero_tv,lb,PAIRDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon}\\right)","Follows from FULL vs DUAL lower bound."
zero_tv,lb,PAIRPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
zero_tv,lb,SUBSAMP,"\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from FULL vs SAMP lower bound."
zero_tv,lb,SUBDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon}\\right)","Follows from FULL vs DUAL lower bound."
zero_tv,lb,SUBPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
zero_tv,lb,SUBSUB,"\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2},\\frac{n^{3/4}}{\\varepsilon}\\right)","Follows from Theorem 10 of [{canonne2017testing}]."
zero_tv,lb,CONDSAMP,"\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from FULL vs SAMP lower bound."
zero_tv,lb,CONDDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon}\\right)","Follows from FULL vs DUAL lower bound."
zero_tv,lb,CONDPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
zero_tv,lb,CONDSUB,"\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)","Follows from COND vs COND lower bound."
zero_tv,lb,CONDCOND,"\\Omega\\left(\\log{\\log{N}}\\right)","Follows from [{chakraborty2024tight}]."
zero_tv,lb,FULLSAMP,"\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)","Follows from [{valiant2017automatic}]."
zero_tv,lb,FULLDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon}\\right)","Follows from [{canonne2014testing}]."
zero_tv,lb,FULLPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from [{canonne2015testing}]."
zero_tv,lb,FULLSUB,"\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)","Follows from Theorem 7 of [{canonne2017testing}]."
zero_tv,lb,FULLCOND,,Open problem.
#
# ── TOLERANT  (closeness = d_TV,  farness = d_TV) ────────────────────────────
tv_tv,ub,SAMPSAMP,,Open problem.
tv_tv,ub,DUALSAMP,,Open problem.
tv_tv,ub,DUALDUAL,"O\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from [{canonne2014testing}]."
tv_tv,ub,PAIRSAMP,,Open problem.
tv_tv,ub,PAIRDUAL,"O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)","Follows from [{potescalable}]."
tv_tv,ub,PAIRPAIR,,Open problem.
tv_tv,ub,SUBSAMP,,Open problem.
tv_tv,ub,SUBDUAL,"O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)","Follows from [{bhattacharyya2024testing}]."
tv_tv,ub,SUBPAIR,,Open problem.
tv_tv,ub,SUBSUB,"O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)","Follows from [{kumar2023tolerant}]."
tv_tv,ub,CONDSAMP,,Open problem.
tv_tv,ub,CONDDUAL,"O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)","Follows from PAIRCOND vs DUAL."
tv_tv,ub,CONDPAIR,,Open problem.
tv_tv,ub,CONDSUB,"O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)","Follows from SUBCOND vs SUBCOND."
tv_tv,ub,CONDCOND,,Open problem.
tv_tv,ub,FULLSAMP,,Open problem.
tv_tv,ub,FULLDUAL,"O\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from DUAL vs DUAL upper bound."
tv_tv,ub,FULLPAIR,"O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)","Follows from DUAL vs PAIRCOND."
tv_tv,ub,FULLSUB,"O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)","Follows from [{bhattacharyya2024testing}]."
tv_tv,ub,FULLCOND,"O\\left(\\frac{1}{\\varepsilon^4}\\right)","Follows from [{nar2020cond}]."
#
tv_tv,lb,SAMPSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from FULL vs SAMP lower bound."
tv_tv,lb,DUALSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from FULL vs SAMP lower bound."
tv_tv,lb,DUALDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from FULL vs DUAL lower bound."
tv_tv,lb,PAIRSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from FULL vs SAMP lower bound."
tv_tv,lb,PAIRDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from FULL vs DUAL lower bound."
tv_tv,lb,PAIRPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
tv_tv,lb,SUBSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from FULL vs SAMP lower bound."
tv_tv,lb,SUBDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from FULL vs DUAL lower bound."
tv_tv,lb,SUBPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
tv_tv,lb,SUBSUB,"\\Omega\\left(\\frac{\\sqrt{n}}{\\log{n}}\\right)","Follows from Theorem 11 of [{canonne2017testing}]."
tv_tv,lb,CONDSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from FULL vs SAMP lower bound."
tv_tv,lb,CONDDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from FULL vs DUAL lower bound."
tv_tv,lb,CONDPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from FULL vs PAIRCOND lower bound."
tv_tv,lb,CONDSUB,"\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)","Follows from FULL vs SUBCOND lower bound."
tv_tv,lb,CONDCOND,"\\Omega\\left(\\log{\\log{N}}\\right)","Follows from [{chakraborty2024tight}]."
tv_tv,lb,FULLSAMP,"\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)","Follows from [{jiao2018minimax}]."
tv_tv,lb,FULLDUAL,"\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)","Follows from [{canonne2014testing}]."
tv_tv,lb,FULLPAIR,"\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)","Follows from [{canonne2015testing}]."
tv_tv,lb,FULLSUB,"\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)","Follows from Theorem 10 of [{canonne2017testing}]."
tv_tv,lb,FULLCOND,,Open problem.
`;

// ─── Pre-build DATASET at parse time — no work deferred to loadDataset ───────
DATASET = buildDataset(parseCSV(INLINE_CSV));

// ─── Loader — kept for backwards-compat with index.html's .then(ShowAll) ─────
function loadDataset() {
    return Promise.resolve();
}
