// Page selector: turns the unit/chapter eyebrow on each chapter page into a
// jump-to-page dropdown. The label stays as written; a transparent native
// <select> sits over it, so phones get the system picker and keyboards work.
// Canonical live copy: technical-ai-safety-field-map/nav.js.
(function () {
  // [group label, [[path from site root, option label], ...]]; the first group is the home page.
  var PAGES = [
    ["Field map", [["index.html", "Home · all parts"]]],
    ["Arc 1 · The idea", [["parts/p01.html", "01 What \"misaligned\" means"], ["parts/p02.html", "02 Reward hacking and specification gaming"]]],
    ["Arc 2 · The landmark experiments", [["parts/p03.html", "03 Sleeper Agents"], ["parts/p04.html", "04 Alignment faking"], ["parts/p05.html", "05 In-context scheming"], ["parts/p06.html", "06 Agentic misalignment"], ["parts/p07.html", "07 Sandbagging"], ["parts/p08.html", "08 Emergent misalignment"]]],
    ["Arc 3 · How labs test for it", [["parts/p09.html", "09 Evaluation awareness"], ["parts/p10.html", "10 Anti-scheming training"], ["parts/p11.html", "11 Reading the reasoning"], ["parts/p12.html", "12 Looking inside"], ["parts/p13.html", "13 Control and sabotage evaluations"]]],
    ["Arc 4 · Reading the evidence", [["parts/p14.html", "14 The sceptics' case"], ["parts/p15.html", "15 2026"]]]
  ];

  var root = new URL('.', document.currentScript.src);
  function init() {
    var box = document.querySelector('main .eyebrow .box');
    if (!box) return;
    var here = location.pathname.replace(/\/$/, '/index.html');
    var sel = document.createElement('select');
    sel.className = 'page-select';
    sel.setAttribute('aria-label', 'Jump to page');
    var current = null;
    PAGES.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g[0];
      g[1].forEach(function (p) {
        var o = new Option(p[1], new URL(p[0], root).href);
        if (new URL(p[0], root).pathname === here) { o.selected = true; current = o.value; }
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    if (!current) return; // page not in the list: leave the eyebrow alone
    sel.addEventListener('change', function () { if (sel.value !== current) location.href = sel.value; });
    // Back/forward restores the changed value from the bfcache; put it back.
    addEventListener('pageshow', function () { sel.value = current; });
    box.classList.add('page-pick');
    // Comments mode (annotate.js) comments on selected text, so there only the caret opens the
    // list and the label stays selectable. ponytail: read once at load; toggling comments
    // mid-page keeps the old hit area until reload.
    var annot = /[?&]annotate=(1|true|on)\b/.test(location.search);
    try { annot = annot || (localStorage.getItem('blogAnnotate') === '1' && !/[?&]annotate=(0|false|off)\b/.test(location.search)); } catch (e) {}
    if (annot) box.classList.add('page-pick-caret');
    box.appendChild(sel);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
