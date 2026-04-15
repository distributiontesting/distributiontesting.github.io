/**
 * DATASET.JS — Distribution Testing Results Database
 * =====================================================
 * This is the ONLY file you need to edit to add or update complexity results.
 *
 * HOW TO UPDATE A RESULT:
 *   1. Find the right scenario block (e.g., "zero_tv" for non-tolerant, "tv_tv" for tolerant)
 *   2. Find "ub" (upper bound) or "lb" (lower bound)
 *   3. Find the cell by name: ROW_MODEL + COL_MODEL (e.g., SAMPSAMP, FULLCOND)
 *      Row models (sampling oracle): SAMP, DUAL, PAIR, SUB, COND, FULL
 *      Col models (query oracle):    SAMP, DUAL, PAIR, SUB, COND
 *   4. Update "formula" with a LaTeX string (use '' for unknown / open problems)
 *   5. Update "comment" — use {refVarName} to insert a clickable reference link
 *
 * REFERENCE VARIABLE NAMES (defined in the <ol class="bib"> list in index.html):
 *   batu2013testing, valiant2017automatic, nar2020cond, bc18,
 *   canonne2017testing, canonne2015testing, chakraborty2013power,
 *   potescalable, falahatgar2015faster, bhattacharyya2024testing,
 *   kumar2023tolerant, valiant2008testing, canonne2014testing,
 *   jiao2018minimax, chakraborty2024tight, adar2024improved
 *
 * EXAMPLE ENTRY:
 *   SAMPSAMP: {
 *     formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',
 *     comment: 'Follows from Theorem 1 of [{batu2013testing}].'
 *   }
 */

// ─── Global comment store (populated by queryComplexity.js at runtime) ─────────
let complComment = {};

// ─── Dataset ─────────────────────────────────────────────────────────────────────
const DATASET = {

    // ============================================================================
    // NON-TOLERANT: closeness distance = 0,  farness distance = d_TV
    // ============================================================================
    zero_tv: {
        ub: {
            SAMPSAMP: { formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                              comment: 'Follows from Theorem 1 of [{batu2013testing}].' },
            DUALSAMP:  { formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                             comment: 'Follows from SAMP vs SAMP upper bound.' },
            DUALDUAL:  { formula: 'O\\left(\\frac{1}{\\varepsilon}\\right)',                                         comment: 'Follows from [{canonne2014testing}].' },
            PAIRSAMP:  { formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                             comment: 'Follows from SAMP vs SAMP upper bound.' },
            PAIRDUAL:  { formula: 'O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)', comment: 'Follows from [{potescalable}].' },
            PAIRPAIR:  { formula: 'O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)',                           comment: 'Follows from [{canonne2015testing}].' },
            SUBSAMP:   { formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                             comment: 'Follows from SAMP vs SAMP upper bound.' },
            SUBDUAL:   { formula: 'O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)',                                    comment: 'Follows from [{adar2024improved}].' },
            SUBPAIR:   { formula: '',                                                                                 comment: 'Open problem.' },
            SUBSUB:    { formula: 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from [{kumar2023tolerant}].' },
            CONDSAMP:  { formula: 'O\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                             comment: 'Follows from SAMP vs SAMP upper bound.' },
            CONDDUAL:  { formula: 'O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)', comment: 'Follows from PAIRCOND vs DUAL.' },
            CONDPAIR:  { formula: 'O\\left(\\frac{\\log^6{N}}{\\varepsilon^{21}}\\right)',                           comment: 'Follows from PAIRCOND vs PAIRCOND.' },
            CONDSUB:   { formula: 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from SUBCOND vs SUBCOND.' },
            CONDCOND:  { formula: 'O\\left(\\frac{\\log{\\log{N}}}{\\varepsilon^5}\\right)',                         comment: 'Follows from [{falahatgar2015faster}].' },
            FULLSAMP:  { formula: 'O\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                              comment: 'Follows from [{valiant2017automatic}].' },
            FULLDUAL:  { formula: 'O\\left(\\frac{1}{\\varepsilon}\\right)',                                         comment: 'Follows from DUAL vs DUAL upper bound.' },
            FULLPAIR:  { formula: 'O\\left(\\frac{\\sqrt{\\log{N}}}{\\varepsilon^2}\\right)',                       comment: 'Follows from [{nar2020cond}].' },
            FULLSUB:   { formula: 'O\\left(\\frac{dN}{\\varepsilon^{2}}\\right)',                                    comment: 'Follows from [{adar2024improved}].' },
            FULLCOND:  { formula: 'O\\left(\\frac{1}{\\varepsilon^2}\\right)',                                       comment: 'Follows from [{falahatgar2015faster}].' },
        },
        lb: {
            SAMPSAMP: { formula: '\\Omega\\left(\\frac{N^{2/3}}{\\varepsilon^{8/3}}\\right)',                        comment: 'Follows from Theorem 1 of [{batu2013testing}].' },
            DUALSAMP:  { formula: '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                         comment: 'Follows from FULL vs SAMP lower bound.' },
            DUALDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)',                                   comment: 'Follows from FULL vs DUAL lower bound.' },
            PAIRSAMP:  { formula: '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                         comment: 'Follows from FULL vs SAMP lower bound.' },
            PAIRDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)',                                   comment: 'Follows from FULL vs DUAL lower bound.' },
            PAIRPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            SUBSAMP:   { formula: '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                         comment: 'Follows from FULL vs SAMP lower bound.' },
            SUBDUAL:   { formula: '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)',                                   comment: 'Follows from FULL vs DUAL lower bound.' },
            SUBPAIR:   { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            SUBSUB:    { formula: '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2},\\frac{n^{3/4}}{\\varepsilon}\\right)', comment: 'Follows from Theorem 10 of [{canonne2017testing}].' },
            CONDSAMP:  { formula: '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                         comment: 'Follows from FULL vs SAMP lower bound.' },
            CONDDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)',                                   comment: 'Follows from FULL vs DUAL lower bound.' },
            CONDPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            CONDSUB:   { formula: '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)',                         comment: 'Follows from COND vs COND lower bound.' },
            CONDCOND:  { formula: '\\Omega\\left(\\log{\\log{N}}\\right)',                                           comment: 'Follows from [{chakraborty2024tight}].' },
            FULLSAMP:  { formula: '\\Omega\\left(\\frac{\\sqrt{N}}{\\varepsilon^2}\\right)',                         comment: 'Follows from [{valiant2017automatic}].' },
            FULLDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon}\\right)',                                   comment: 'Follows from [{canonne2014testing}].' },
            FULLPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from [{canonne2015testing}].' },
            FULLSUB:   { formula: '\\Omega\\left(\\frac{\\sqrt{d}}{\\varepsilon^2}\\right)',                         comment: 'Follows from Theorem 7 of [{canonne2017testing}].' },
            FULLCOND:  { formula: '',                                                                                 comment: 'Open problem.' },
        }
    },

    // ============================================================================
    // TOLERANT: closeness distance = d_TV,  farness distance = d_TV
    // ============================================================================
    tv_tv: {
        ub: {
            SAMPSAMP: { formula: '',                                                                                  comment: 'Open problem.' },
            DUALSAMP:  { formula: '',                                                                                 comment: 'Open problem.' },
            DUALDUAL:  { formula: 'O\\left(\\frac{1}{\\varepsilon^2}\\right)',                                       comment: 'Follows from [{canonne2014testing}].' },
            PAIRSAMP:  { formula: '',                                                                                 comment: 'Open problem.' },
            PAIRDUAL:  { formula: 'O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)', comment: 'Follows from [{potescalable}].' },
            PAIRPAIR:  { formula: '',                                                                                 comment: 'Open problem.' },
            SUBSAMP:   { formula: '',                                                                                 comment: 'Open problem.' },
            SUBDUAL:   { formula: 'O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from [{bhattacharyya2024testing}].' },
            SUBPAIR:   { formula: '',                                                                                 comment: 'Open problem.' },
            SUBSUB:    { formula: 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from [{kumar2023tolerant}].' },
            CONDSAMP:  { formula: '',                                                                                 comment: 'Open problem.' },
            CONDDUAL:  { formula: 'O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)', comment: 'Follows from PAIRCOND vs DUAL.' },
            CONDPAIR:  { formula: '',                                                                                 comment: 'Open problem.' },
            CONDSUB:   { formula: 'O\\left(\\frac{d^{3}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from SUBCOND vs SUBCOND.' },
            CONDCOND:  { formula: '',                                                                                 comment: 'Open problem.' },
            FULLSAMP:  { formula: '',                                                                                 comment: 'Open problem.' },
            FULLDUAL:  { formula: 'O\\left(\\frac{1}{\\varepsilon^2}\\right)',                                       comment: 'Follows from DUAL vs DUAL upper bound.' },
            FULLPAIR:  { formula: 'O\\left(\\frac{\\log{N}}{\\varepsilon^2}+\\frac{\\sqrt{N}\\log{N}}{\\varepsilon^4}\\right)', comment: 'Follows from DUAL vs PAIRCOND.' },
            FULLSUB:   { formula: 'O\\left(\\frac{d^{2}N}{\\varepsilon^{4}}\\right)',                               comment: 'Follows from [{bhattacharyya2024testing}].' },
            FULLCOND:  { formula: 'O\\left(\\frac{1}{\\varepsilon^4}\\right)',                                       comment: 'Follows from [{nar2020cond}].' },
        },
        lb: {
            SAMPSAMP: { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                        comment: 'Follows from FULL vs SAMP lower bound.' },
            DUALSAMP:  { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                       comment: 'Follows from FULL vs SAMP lower bound.' },
            DUALDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)',                                 comment: 'Follows from FULL vs DUAL lower bound.' },
            PAIRSAMP:  { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                       comment: 'Follows from FULL vs SAMP lower bound.' },
            PAIRDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)',                                 comment: 'Follows from FULL vs DUAL lower bound.' },
            PAIRPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            SUBSAMP:   { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                       comment: 'Follows from FULL vs SAMP lower bound.' },
            SUBDUAL:   { formula: '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)',                                 comment: 'Follows from FULL vs DUAL lower bound.' },
            SUBPAIR:   { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            SUBSUB:    { formula: '\\Omega\\left(\\frac{\\sqrt{n}}{\\log{n}}\\right)',                               comment: 'Follows from Theorem 11 of [{canonne2017testing}].' },
            CONDSAMP:  { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                       comment: 'Follows from FULL vs SAMP lower bound.' },
            CONDDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)',                                 comment: 'Follows from FULL vs DUAL lower bound.' },
            CONDPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from FULL vs PAIRCOND lower bound.' },
            CONDSUB:   { formula: '\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)',                         comment: 'Follows from FULL vs SUBCOND lower bound.' },
            CONDCOND:  { formula: '\\Omega\\left(\\log{\\log{N}}\\right)',                                           comment: 'Follows from [{chakraborty2024tight}].' },
            FULLSAMP:  { formula: '\\Omega\\left(\\frac{N}{\\varepsilon^{2}\\log{N}}\\right)',                       comment: 'Follows from [{jiao2018minimax}].' },
            FULLDUAL:  { formula: '\\Omega\\left(\\frac{1}{\\varepsilon^2}\\right)',                                 comment: 'Follows from [{canonne2014testing}].' },
            FULLPAIR:  { formula: '\\Omega\\left(\\sqrt{\\frac{\\log{N}}{\\log\\log{N}}}\\right)',                  comment: 'Follows from [{canonne2015testing}].' },
            FULLSUB:   { formula: '\\Omega\\left(\\frac{\\sqrt{n}}{\\varepsilon^2}\\right)',                         comment: 'Follows from Theorem 10 of [{canonne2017testing}].' },
            FULLCOND:  { formula: '',                                                                                 comment: 'Open problem.' },
        }
    }
};

// ─── All 20 cell keys in table order ─────────────────────────────────────────────
const ALL_CELLS = [
    'SAMPSAMP',
    'DUALSAMP',  'DUALDUAL',
    'PAIRSAMP',  'PAIRDUAL',  'PAIRPAIR',
    'SUBSAMP',   'SUBDUAL',   'SUBPAIR',   'SUBSUB',
    'CONDSAMP',  'CONDDUAL',  'CONDPAIR',  'CONDSUB',  'CONDCOND',
    'FULLSAMP',  'FULLDUAL',  'FULLPAIR',  'FULLSUB',  'FULLCOND',
];
