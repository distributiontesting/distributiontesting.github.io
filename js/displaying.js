// ── Global formula variables (set by queryComplexity.js) ─────────────────────────
var SAMPSAMP='', DUALSAMP='', DUALDUAL='',
    PAIRSAMP='', PAIRDUAL='', PAIRPAIR='',
    SUBSAMP='',  SUBDUAL='',  SUBPAIR='',  SUBSUB='',
    CONDSAMP='', CONDDUAL='', CONDPAIR='', CONDSUB='', CONDCOND='',
    FULLSAMP='', FULLDUAL='', FULLPAIR='', FULLSUB='', FULLCOND='';

// ── Rendering ─────────────────────────────────────────────────────────────────────

function ShowID(id, latex) {
    var el = document.getElementById(id);
    if (!el) return;
    var td = el.closest('td');
    if (!latex || latex.trim() === '') {
        el.innerHTML = '?';
        if (td) td.classList.add('empty-cell');
    } else {
        try { el.innerHTML = katex.renderToString(latex, { throwOnError: false }); }
        catch(e) { el.innerHTML = latex; }
        if (td) td.classList.remove('empty-cell');
    }
}

function showComment(html) {
    document.getElementById('resultcomment').innerHTML = html || '&nbsp;';
}

// ── Cell selection ────────────────────────────────────────────────────────────────

// Human-readable label for each cell id
var CELL_LABEL_MAP = {
    sampSamp:'SAMP × SAMP', dualSamp:'DUAL × SAMP', dualDual:'DUAL × DUAL',
    pairSamp:'PAIRCOND × SAMP', pairDual:'PAIRCOND × DUAL', pairPair:'PAIRCOND × PAIRCOND',
    subSamp:'SUBCOND × SAMP', subDual:'SUBCOND × DUAL', subPair:'SUBCOND × PAIRCOND', subSub:'SUBCOND × SUBCOND',
    condSamp:'COND × SAMP', condDual:'COND × DUAL', condPair:'COND × PAIRCOND', condSub:'COND × SUBCOND', condCond:'COND × COND',
    fullSamp:'FULL × SAMP', fullDual:'FULL × DUAL', fullPair:'FULL × PAIRCOND', fullSub:'FULL × SUBCOND', fullCond:'FULL × COND',
};

// Update the "Suggest for selected cell" issue link with cell-specific pre-fill
function updateIssueLink(cellId) {
    var btn = document.getElementById('btn-issue-cell');
    if (!btn) return;
    var label = CELL_LABEL_MAP[cellId] || cellId;
    var inp = ReadInput ? ReadInput() : [];
    var boundType = '';
    if (inp[2] === 'UB') boundType = 'Upper Bound';
    else if (inp[2] === 'LB') boundType = 'Lower Bound';
    var title = encodeURIComponent('Result suggestion: ' + label);
    var body = encodeURIComponent(
        '**Cell (row \u00d7 col oracle):** ' + label + '\n' +
        '**Bound type (UB / LB):** ' + (boundType || '') + '\n' +
        '**Complexity:** \n' +
        '**Reference (arXiv or DOI):** \n' +
        '**Additional notes:** '
    );
    btn.href = 'https://github.com/distributiontesting/distributiontesting.github.io/issues/new?title=' + title + '&body=' + body;
}

// Called when user clicks a formula cell.
function selectCell(cellId) {
    // Check the hidden radio
    var radio = document.getElementById('radio_' + cellId);
    if (radio) radio.checked = true;

    // Update visual highlight
    document.querySelectorAll('.formula-cell').forEach(function(c) {
        c.classList.remove('selected-cell');
    });
    var td = document.querySelector('[data-cell="' + cellId + '"]');
    if (td) td.classList.add('selected-cell');

    updateIssueLink(cellId);
    displayComments();
}

// ── Comment display ───────────────────────────────────────────────────────────────

// Cell-id → complComment key mapping (camelCase → UPPERCASE)
var CELL_KEY_MAP = {
    sampSamp:'SAMPSAMP', dualSamp:'DUALSAMP', dualDual:'DUALDUAL',
    pairSamp:'PAIRSAMP', pairDual:'PAIRDUAL', pairPair:'PAIRPAIR',
    subSamp:'SUBSAMP',   subDual:'SUBDUAL',   subPair:'SUBPAIR',   subSub:'SUBSUB',
    condSamp:'CONDSAMP', condDual:'CONDDUAL', condPair:'CONDPAIR', condSub:'CONDSUB', condCond:'CONDCOND',
    fullSamp:'FULLSAMP', fullDual:'FULLDUAL', fullPair:'FULLPAIR', fullSub:'FULLSUB', fullCond:'FULLCOND',
};

function displayComments() {
    var selected = document.querySelector('input[name="combaton"]:checked');
    if (!selected) return;
    var key = CELL_KEY_MAP[selected.value];
    if (key && complComment[key] !== undefined) {
        showComment(complComment[key]);
    }
}

// ── Display all 20 table cells ────────────────────────────────────────────────────

function DisplayResults() {
    ShowID('sampSamp', SAMPSAMP);
    ShowID('dualSamp', DUALSAMP);  ShowID('dualDual', DUALDUAL);
    ShowID('pairSamp', PAIRSAMP);  ShowID('pairDual', PAIRDUAL);  ShowID('pairPair', PAIRPAIR);
    ShowID('subSamp',  SUBSAMP);   ShowID('subDual',  SUBDUAL);   ShowID('subPair',  SUBPAIR);  ShowID('subSub',  SUBSUB);
    ShowID('condSamp', CONDSAMP);  ShowID('condDual', CONDDUAL);  ShowID('condPair', CONDPAIR); ShowID('condSub', CONDSUB); ShowID('condCond', CONDCOND);
    ShowID('fullSamp', FULLSAMP);  ShowID('fullDual', FULLDUAL);  ShowID('fullPair', FULLPAIR); ShowID('fullSub', FULLSUB); ShowID('fullCond', FULLCOND);
}

// ── Master show function ──────────────────────────────────────────────────────────

function ShowComplexity(inp_1, inp_2, inp_3) {
    QueryC(inp_1, inp_2, inp_3);
    DisplayResults();
}

function ShowAll() {
    var inp = ReadInput();
    ShowComplexity(inp[0], inp[1], inp[2]);
    displayComments();
}

// ── Reference management ──────────────────────────────────────────────────────────

var NamingScheme = '_Anchor';
var EmptyString  = '';
var OMOString    = 'Go to reference [';
var OMOEnd       = ']';

function GoToRef(VN) {
    var url = window.location.href;
    var hash = url.lastIndexOf('#');
    window.location.href = (hash > 0 ? url.substring(0, hash) : url) + '#' + VN;
}

function CreateRefLink(VarName) {
    NamingScheme = VarName + '_Anchor';
    RefLabel++;
    eval(VarName + '=\'<a target="_self" style="color:var(--primary-light)" href="javascript:void(0);" ' +
        'onMouseOver="window.status=OMOString+' + RefLabel + '+OMOEnd;return true;" ' +
        'onMouseOut="window.status=EmptyString;" ' +
        'onClick=GoToRef(\\"' + NamingScheme + '\\");>' + RefLabel + '</a>\';');
    document.writeln('<a name="' + NamingScheme + '"></a>');
}

function SwapValues(cur, v1, v2) { return (cur === v1) ? v2 : v1; }

function FlipAbstract(refID, anchorObj, divSuffix, text1, text2, flipText) {
    var el = document.getElementById(refID + '_' + divSuffix);
    var before = el.style.display || 'none';
    el.style.display = SwapValues(before, 'none', 'block');
    if (flipText) anchorObj.innerHTML = SwapValues(anchorObj.innerHTML, text1, text2);
}

var ShowBib = 'BibTeX';
var HideBib = 'Hide BibTeX';

function CreateBibTeXLink(refID) {
    document.writeln('<a target="_self" href="javascript:void(0);" ' +
        'onclick="FlipAbstract(\'' + refID + '\',this,\'bibtex\',ShowBib,HideBib,true);">' + ShowBib + '</a>');
}

function CreateAbstractBibTeXLinks(refID) {
    CreateBibTeXLink(refID);
}
