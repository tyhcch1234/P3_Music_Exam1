/* ============================================================
   App — tabs, panels, progress, glossary
   ============================================================ */
(function (w, d) {
  'use strict';

  var LESSONS = w.LESSONS || [];
  var STORE = 'p3music.progress.v2';
  var progress = {};

  try { progress = JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { progress = {}; }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch (e) { /* ignore */ }
  }

  var tabsEl = d.getElementById('tabs');
  var mainEl = d.getElementById('main');
  var heroEl = d.getElementById('hero');

  /* ---------------- build ---------------- */
  function buildTabs() {
    tabsEl.innerHTML = LESSONS.map(function (l) {
      return '<button class="tab" type="button" role="tab" id="tab-' + l.id + '" data-id="' + l.id + '" ' +
        'aria-controls="panel-' + l.id + '" aria-selected="false" style="--tab-accent:' + l.accent + '">' +
        '<span class="tab-dot"></span><span>' + l.tab + '</span><small>' + (l.tabSub || '') + '</small>' +
        '<span class="tick" aria-hidden="true">✓</span></button>';
    }).join('');
  }

  function buildPanels() {
    mainEl.innerHTML = LESSONS.map(function (l, i) {
      return '<section class="lesson" id="panel-' + l.id + '" data-accent="' + l.id + '" role="tabpanel" ' +
        'aria-labelledby="tab-' + l.id + '" style="--accent:' + l.accent + ';--accent-soft:' + l.soft + ';--accent-deep:' + l.deep + '">' +
        '<div class="lesson-head">' +
        '<div class="lesson-head-copy">' +
        '<span class="lesson-no">' + l.kicker + '</span>' +
        '<h2>' + l.title + '<span class="en">' + l.en + '</span></h2>' +
        '<p class="desc">' + l.desc + '</p>' +
        '<div class="goals">' + (l.goals || []).map(function (g) { return '<span>' + g + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="lesson-art"><img src="' + l.image + '" alt="' + (l.imageAlt || '') + '" width="1400" height="933" loading="' + (i === 0 ? 'eager' : 'lazy') + '"></div>' +
        '</div>' +

        '<div class="section-head" id="teach-' + l.id + '">' +
        '<h3><span class="num">1</span>互動教學</h3>' +
        '<p>' + (l.teachNote || '逐項點按示範，聽清楚再往下做小測。') + '</p>' +
        '</div>' +
        l.teach +

        '<div class="section-head" id="quiz-' + l.id + '-head">' +
        '<h3><span class="num">2</span>互動小測</h3>' +
        '<p>' + (l.quizNote || '共 ' + l.quiz.length + ' 題，答完會顯示成績。') + '</p>' +
        '</div>' +
        '<div class="quiz" id="quizbox-' + l.id + '"></div>' +
        '</section>';
    }).join('');
  }

  /* ---------------- routing ---------------- */
  var current = null;

  function activate(id, opts) {
    if (!d.getElementById('panel-' + id)) id = LESSONS[0].id;
    current = id;
    LESSONS.forEach(function (l) {
      var panel = d.getElementById('panel-' + l.id);
      var tab = d.getElementById('tab-' + l.id);
      var on = l.id === id;
      panel.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      tab.tabIndex = on ? 0 : -1;
    });
    if (!(opts && opts.silent)) {
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.tab');
    if (!b) return;
    activate(b.getAttribute('data-id'));
  });

  tabsEl.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = LESSONS.findIndex(function (l) { return l.id === current; });
    var next = e.key === 'ArrowRight' ? (i + 1) % LESSONS.length : (i - 1 + LESSONS.length) % LESSONS.length;
    activate(LESSONS[next].id);
    d.getElementById('tab-' + LESSONS[next].id).focus();
    e.preventDefault();
  });

  window.addEventListener('hashchange', function () {
    var id = location.hash.replace('#', '');
    if (id && id !== current) activate(id, { silent: true });
  });

  /* ---------------- progress ---------------- */
  function paintProgress() {
    var done = LESSONS.filter(function (l) { return progress[l.id] != null; }).length;
    var pct = LESSONS.length ? done / LESSONS.length : 0;
    var fg = d.getElementById('prFg');
    var txt = d.getElementById('progressText');
    var ring = d.getElementById('progress');
    if (fg) fg.style.strokeDashoffset = String(Math.round(94.2 * (1 - pct) * 100) / 100);
    if (txt) txt.textContent = done + ' / ' + LESSONS.length;
    if (ring) ring.setAttribute('title', '已完成 ' + done + ' / ' + LESSONS.length + ' 課小測');
    LESSONS.forEach(function (l) {
      var tab = d.getElementById('tab-' + l.id);
      if (tab) tab.classList.toggle('is-done', progress[l.id] != null);
    });
  }

  function markDone(id, correct, total, pct) {
    var best = progress[id];
    if (best == null || pct > best) progress[id] = pct;
    save();
    paintProgress();
    void correct; void total;
  }

  /* ---------------- quiz mounting ---------------- */
  function mountQuizzes() {
    LESSONS.forEach(function (l) {
      var box = d.getElementById('quizbox-' + l.id);
      if (!box) return;
      w.Quiz.mount(box, {
        id: l.id,
        label: l.tab + ' · 小測',
        questions: l.quiz,
        onFinish: function (correct, total, pct) { markDone(l.id, correct, total, pct); }
      });
    });
  }

  /* ---------------- glossary ---------------- */
  function setupGlossary() {
    var modal = d.getElementById('glossaryModal');
    var grid = d.getElementById('glossaryGrid');
    var input = d.getElementById('glossarySearch');
    var items = w.GLOSSARY || [];

    grid.innerHTML = items.map(function (t) {
      return '<div class="gterm" data-k="' + (t[0] + ' ' + t[1]).toLowerCase() + '"><b>' + t[0] + '</b><span>' + t[1] + '</span></div>';
    }).join('');

    function open() {
      modal.hidden = false;
      d.body.style.overflow = 'hidden';
      input.value = '';
      filter('');
      setTimeout(function () { input.focus(); }, 40);
    }
    function close() {
      modal.hidden = true;
      d.body.style.overflow = '';
    }
    function filter(qq) {
      var q = qq.trim().toLowerCase();
      var shown = 0;
      Array.prototype.forEach.call(grid.children, function (c) {
        var hit = !q || c.getAttribute('data-k').indexOf(q) >= 0;
        c.style.display = hit ? '' : 'none';
        if (hit) shown++;
      });
      var empty = d.getElementById('glossaryEmpty');
      if (!shown && !empty) {
        empty = d.createElement('p');
        empty.id = 'glossaryEmpty';
        empty.className = 'q-note';
        empty.textContent = '找不到相關詞彙。';
        grid.appendChild(empty);
      } else if (shown && empty) empty.remove();
    }

    d.getElementById('glossaryBtn').addEventListener('click', open);
    modal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) close();
    });
    input.addEventListener('input', function () { filter(this.value); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* ---------------- sound ---------------- */
  function setupSound() {
    var btn = d.getElementById('soundBtn');
    btn.innerHTML = (w.Icons ? w.Icons.speaker : '音效') + '<span class="sr">聲音開關</span>';
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      w.Sound.setEnabled(on);
      btn.innerHTML = (on ? w.Icons.speaker : w.Icons.mute) + '<span class="sr">聲音開關</span>';
    });
  }

  /* ---------------- reset ---------------- */
  function setupReset() {
    var b = d.getElementById('resetBtn');
    if (!b) return;
    b.addEventListener('click', function () {
      if (!confirm('確定要清除所有小測紀錄嗎？')) return;
      progress = {};
      save();
      paintProgress();
      location.reload();
    });
  }

  /* ---------------- boot ---------------- */
  buildTabs();
  buildPanels();
  setupGlossary();
  setupSound();
  setupReset();
  mountQuizzes();

  LESSONS.forEach(function (l) {
    if (typeof l.init === 'function') {
      try { l.init(d.getElementById('panel-' + l.id)); }
      catch (err) { console.error('init failed:', l.id, err); }
    }
  });

  paintProgress();
  var initial = location.hash.replace('#', '');
  activate(initial && d.getElementById('panel-' + initial) ? initial : LESSONS[0].id, { silent: true });

  // hide hero once a lesson is chosen? keep it, it scrolls away
  void heroEl;

  w.App = { activate: activate, markDone: markDone, lessons: LESSONS };
})(window, document);
