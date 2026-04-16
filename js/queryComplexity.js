/**
 * queryComplexity.js — Loads complexity results from dataset.js into global variables.
 *
 * This file is intentionally thin. All data lives in dataset.js.
 * To add a new scenario (e.g., Hellinger distance), add a block in DATASET,
 * then add a case in getScenarioKey() below.
 */

// Resolve {refVarName} placeholders in comment strings at runtime,
// after CreateRefLink() has populated the reference anchor variables.
function resolveComment(template) {
    return template.replace(/\[\{(\w+)\}\]/g, function(_match, refName) {
        var val = (typeof window[refName] !== 'undefined') ? window[refName] : null;
        return val ? ('[' + val + ']') : ('[' + refName + ']');
    });
}

// Map (inp_1, inp_2) to a key in DATASET, or null if not yet defined.
function getScenarioKey(inp_1, inp_2) {
    var isZero = inp_1[2], isTv1 = inp_1[0];
    var isTv2  = inp_2[0];
    if (isZero && isTv2) return 'zero_tv';
    if (isTv1  && isTv2) return 'tv_tv';
    return null;  // scenario not yet in dataset
}

// Main entry point called by displaying.js
function QueryC(inp_1, inp_2, inp_3) {
    var TBox_3IsUB = inp_3[1];
    var boundType  = TBox_3IsUB ? 'ub' : 'lb';
    var scenarioKey = getScenarioKey(inp_1, inp_2);

    if (!scenarioKey || !DATASET[scenarioKey]) {
        // Scenario not defined — blank every cell
        ALL_CELLS.forEach(function(key) {
            window[key] = '';
            complComment[key] = 'No data available for this configuration.';
        });
        return;
    }

    var data = DATASET[scenarioKey][boundType];

    ALL_CELLS.forEach(function(key) {
        var entry = data[key];
        window[key]       = entry ? entry.formula  : '';
        complComment[key] = entry ? resolveComment(entry.comment) : 'No data.';
    });
}
