/* ============================================================
   Quiz — one-question-at-a-time interactive quiz
   ============================================================ */
(function (w) {
  'use strict';

  var Quiz = {};

  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function starsFor(pct) {
    if (pct >= 90) return 3;
    if (pct >= 70) return 2;
    return 1;
  }

  function mediaHTML(q) {
    var out = '';
    if (q.audio) {
      out += '<button class="btn btn--sm js-clip" type="button" data-clip="' + q.audio + '">' +
        (w.Icons ? w.Icons.play : '') + ' 播放示範</button>';
      if (q.audioNote) out += '<p class="q-note">' + q.audioNote + '</p>';
    }
    if (q.img) {
      out += '<div class="q-media"><img src="' + q.img.src + '" alt="' + esc(q.img.alt || '') + '" loading="lazy"></div>';
    }
    if (q.staff) {
      var clef = q.staffClef || 'treble';
      out += '<div class="q-media">' + w.Staff.render({
        notes: q.staff.map(function (p) { return { p: p, dur: 'q' }; }),
        clef: clef,
        width: 420,
        height: 208,
        time: q.staffTime || null
      }) + '</div>';
    }
    if (q.html) out += '<div class="q-media">' + q.html + '</div>';
    return out ? '<div class="q-extra">' + out + '</div>' : '';
  }

  function mount(root, cfg) {
    var questions = cfg.questions || [];
    var idx = 0;
    var score = 0;
    var answered = [];
    var state = null;

    root.classList.add('quiz');
    root.innerHTML = '';

    function topbar() {
      var dots = questions.map(function (_, i) {
        return '<i class="' + (i < idx ? 'is-done' : i === idx ? 'is-now' : '') + '"></i>';
      }).join('');
      return '<div class="quiz-top">' +
        '<span class="quiz-count">第 <b>' + (idx + 1) + '</b> / ' + questions.length + ' 題</span>' +
        '<span class="quiz-dots">' + dots + '</span>' +
        '</div>';
    }

    function renderResult() {
      var pct = questions.length ? Math.round(score / questions.length * 100) : 0;
      var stars = starsFor(pct);
      var msg = pct >= 90 ? '太厲害了！這一課你已經掌握得很好。'
        : pct >= 70 ? '不錯！再溫習一下重點就滿分了。'
          : '先回去看一次互動教學，再來挑戰吧。';
      root.innerHTML = topbar() +
        '<div class="result">' +
        '<div class="stars">' + '★'.repeat(stars) + '<span style="color:#e6dccb">' + '★'.repeat(3 - stars) + '</span></div>' +
        '<div class="score-num">' + score + ' / ' + questions.length + '</div>' +
        '<h4>' + (pct >= 70 ? '完成小測！' : '再試一次！') + '</h4>' +
        '<p>' + msg + '</p>' +
        '<div class="btn-row">' +
        '<button class="btn btn--primary" type="button" data-retry>重新挑戰</button>' +
        '<a class="btn" href="#teach-' + cfg.id + '" data-goto-teach>重看教學</a>' +
        '</div>' +
        '</div>';

      root.querySelector('[data-retry]').addEventListener('click', function () {
        idx = 0; score = 0; answered = []; render();
      });
      var back = root.querySelector('[data-goto-teach]');
      back.addEventListener('click', function (e) {
        e.preventDefault();
        var t = document.getElementById('teach-' + cfg.id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      if (cfg.onFinish) cfg.onFinish(score, questions.length, pct);
    }

    function render() {
      if (idx >= questions.length) { renderResult(); return; }
      var q = questions[idx];
      var type = q.type || 'mcq';

      var html = topbar() + '<div class="quiz-body">' +
        '<p class="q-stem"><span class="q-num">Q' + (idx + 1) + '.</span>' + q.q + '</p>' +
        mediaHTML(q);

      if (type === 'mcq') {
        html += '<div class="opts" role="group">' + q.options.map(function (o, i) {
          return '<button class="opt" type="button" data-i="' + i + '"><span class="key"><span>' + String.fromCharCode(65 + i) + '</span></span><span>' + o + '</span></button>';
        }).join('') + '</div>';
      } else if (type === 'multi') {
        html += '<div class="opts" role="group">' + q.options.map(function (o, i) {
          return '<button class="opt" type="button" data-i="' + i + '" aria-pressed="false"><span class="key"><span>' + String.fromCharCode(65 + i) + '</span></span><span>' + o + '</span></button>';
        }).join('') + '</div>' +
          '<div class="btn-row"><button class="btn btn--primary" type="button" data-check disabled>確認答案</button><span class="q-note">可選多於一個答案</span></div>';
      } else if (type === 'order') {
        html += '<div class="order-slots" data-slots>' + q.items.map(function () { return '<span class="slot">?</span>'; }).join('') + '</div>' +
          '<div class="pads" style="margin-top:14px" data-pool>' + q.items.map(function (o, i) {
            return '<button class="pad" type="button" data-i="' + i + '"><b>' + o + '</b></button>';
          }).join('') + '</div>';
      } else if (type === 'match') {
        html += '<div class="match-wrap"><div class="match-col" data-left>' +
          q.left.map(function (o, i) { return '<button class="match-item" type="button" data-side="l" data-i="' + i + '">' + o + '</button>'; }).join('') +
          '</div><div class="match-col" data-right>' +
          q.right.map(function (o, i) { return '<button class="match-item" type="button" data-side="r" data-i="' + i + '">' + o + '</button>'; }).join('') +
          '</div></div>';
      }

      html += '<div class="feedback" data-fb aria-live="polite"></div></div>' +
        '<div class="quiz-foot"><span class="quiz-progress">' + (cfg.label || '') + '</span>' +
        '<button class="btn btn--ink" type="button" data-next disabled>下一題 →</button></div>';

      root.innerHTML = html;
      bind(q, type);
      state = { q: q, type: type, done: false, picked: [], pairs: 0 };
    }

    function feedback(ok, text) {
      var fb = root.querySelector('[data-fb]');
      if (!fb) return;
      fb.className = 'feedback show ' + (ok ? 'ok' : 'no');
      fb.innerHTML = '<b>' + (ok ? '答對了！' : '再想一想') + '</b>' + text;
    }

    function lockNext() {
      var n = root.querySelector('[data-next]');
      if (n) n.disabled = false;
    }

    function finishQuestion(ok, explain) {
      if (state.done) return;
      state.done = true;
      if (ok) score++;
      answered.push(ok);
      feedback(ok, explain || '');
      lockNext();
    }

    function bind(q, type) {
      var i;
      if (type === 'mcq') {
        var opts = root.querySelectorAll('.opt');
        for (i = 0; i < opts.length; i++) {
          opts[i].addEventListener('click', function () {
            if (state.done) return;
            var pick = +this.getAttribute('data-i');
            var right = pick === q.answer;
            for (var k = 0; k < opts.length; k++) {
              opts[k].disabled = true;
              if (+opts[k].getAttribute('data-i') === q.answer) opts[k].classList.add('is-right');
            }
            if (!right) this.classList.add('is-wrong');
            finishQuestion(right, q.explain);
          });
        }
      }

      if (type === 'multi') {
        var mopts = root.querySelectorAll('.opt');
        var check = root.querySelector('[data-check]');
        for (i = 0; i < mopts.length; i++) {
          mopts[i].addEventListener('click', function () {
            if (state.done) return;
            var pick = +this.getAttribute('data-i');
            var pos = state.picked.indexOf(pick);
            if (pos >= 0) { state.picked.splice(pos, 1); this.classList.remove('is-pick'); this.setAttribute('aria-pressed', 'false'); }
            else { state.picked.push(pick); this.classList.add('is-pick'); this.setAttribute('aria-pressed', 'true'); }
            check.disabled = state.picked.length === 0;
          });
        }
        check.addEventListener('click', function () {
          if (state.done) return;
          var want = q.answers.slice().sort().join(',');
          var got = state.picked.slice().sort().join(',');
          var ok = want === got;
          for (var k = 0; k < mopts.length; k++) {
            var pi = +mopts[k].getAttribute('data-i');
            mopts[k].disabled = true;
            if (q.answers.indexOf(pi) >= 0) mopts[k].classList.add('is-right');
            else if (state.picked.indexOf(pi) >= 0) mopts[k].classList.add('is-wrong');
          }
          check.disabled = true;
          finishQuestion(ok, q.explain);
        });
      }

      if (type === 'order') {
        var slots = root.querySelectorAll('[data-slots] .slot');
        var pool = root.querySelectorAll('[data-pool] .pad');
        var placed = [];
        for (i = 0; i < pool.length; i++) {
          pool[i].addEventListener('click', function () {
            if (state.done) return;
            var id = +this.getAttribute('data-i');
            if (placed.indexOf(id) >= 0) return;
            placed.push(id);
            this.classList.add('is-lit');
            this.disabled = true;
            slots[placed.length - 1].textContent = q.items[id];
            slots[placed.length - 1].classList.add('is-filled');
            if (placed.length === q.items.length) {
              var ok = placed.join(',') === q.answer.join(',');
              finishQuestion(ok, q.explain);
              var n = root.querySelector('[data-next]');
              if (n) n.disabled = false;
            }
          });
        }
      }

      if (type === 'match') {
        var pickL = null;
        var left = root.querySelectorAll('[data-side="l"]');
        var right = root.querySelectorAll('[data-side="r"]');
        function pair(a, b) {
          var ok = a === b;
          if (ok) {
            left[a].classList.remove('is-pick');
            left[a].classList.add('is-done');
            right[b].classList.add('is-done');
            left[a].disabled = true; right[b].disabled = true;
            state.pairs++;
            if (state.pairs === q.left.length) {
              finishQuestion(true, q.explain);
            }
          } else {
            left[a].classList.add('is-pick');
            setTimeout(function () { if (left[a]) left[a].classList.remove('is-pick'); }, 420);
            score += 0;
          }
        }
        for (i = 0; i < left.length; i++) {
          left[i].addEventListener('click', function () {
            if (state.done || this.classList.contains('is-done')) return;
            var all = root.querySelectorAll('[data-side="l"]');
            for (var k = 0; k < all.length; k++) all[k].classList.remove('is-pick');
            this.classList.add('is-pick');
            pickL = +this.getAttribute('data-i');
          });
        }
        for (i = 0; i < right.length; i++) {
          right[i].addEventListener('click', function () {
            if (state.done || this.classList.contains('is-done')) return;
            if (pickL == null) return;
            pair(pickL, +this.getAttribute('data-i'));
            pickL = null;
          });
        }
      }

      var next = root.querySelector('[data-next]');
      if (next) {
        next.addEventListener('click', function () {
          if (!state.done) return;
          idx++;
          render();
          var top = root.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
      }

      var clips = root.querySelectorAll('.js-clip');
      for (i = 0; i < clips.length; i++) {
        clips[i].addEventListener('click', function () {
          w.Sound.playClip(this.getAttribute('data-clip'));
        });
      }
    }

    render();
    return { reset: function () { idx = 0; score = 0; render(); } };
  }

  Quiz.mount = mount;
  w.Quiz = Quiz;
})(window);
