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

// ─── Async loader — call this once on page load ───────────────────────────────
async function loadDataset() {
    try {
        const response = await fetch('data.csv');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const text = await response.text();
        DATASET = buildDataset(parseCSV(text));
    } catch (err) {
        console.error('[dataset.js] Failed to load data.csv:', err);
        DATASET = {};
    }
}
