/* ============================================================
   Lesson 0 — 五線譜 Stave
   ============================================================ */
(function (w) {
  'use strict';
  w.LESSONS = w.LESSONS || [];

  var lineNotes = [
    { p: 0, label: 'E', extra: 'E4' }, { p: 2, label: 'G', extra: 'G4' }, { p: 4, label: 'B', extra: 'B4' },
    { p: 6, label: 'D', extra: 'D5' }, { p: 8, label: 'F', extra: 'F5' }
  ];
  var spaceNotes = [
    { p: 1, label: 'F', extra: 'F4' }, { p: 3, label: 'A', extra: 'A4' },
    { p: 5, label: 'C', extra: 'C5' }, { p: 7, label: 'E', extra: 'E5' }
  ];

  function noteChips(list, cls) {
    return list.map(function (n) {
      return '<button class="pad ' + cls + '" type="button" data-p="' + n.p + '"><b>' + n.label + '</b><small>' + n.extra + '</small></button>';
    }).join('');
  }

  w.LESSONS.push({
    id: 'stave',
    tab: '五線譜',
    tabSub: 'Stave',
    kicker: '課前基礎 · Stave',
    title: '五線譜入門',
    en: 'Reading the stave',
    accent: '#6f5cc4',
    soft: '#efebfb',
    deep: '#4c3d94',
    image: 'assets/img/stave.webp',
    imageAlt: '五線譜與高音譜號的插畫',
    desc: '五條線、四個間，是記錄音高的地方。學會看線和間，之後看任何一首歌的譜都會容易很多。',
    goals: ['五線四間', '高音譜號 E G B D F', '四個間 F A C E', '附加線', '三種譜號'],
    teachNote: '點按五線譜上的每一條線和每一個間，聽聽它的音高。',
    teach: `
      <article class="card">
        <h4>五線四間 <span class="tag">點擊試聽</span></h4>
        <p class="lead">音符放在線上或間中，位置越高，聲音越高。點一下任何一條線或一個間，看看它的名字。</p>
        <div class="stage" id="staveExplore"></div>
        <p class="readout" id="staveReadout">提示：先由最低的一條線開始試。</p>
        <div class="tip"><b>記住：</b>五條線由下向上數是第 1 線到第 5 線；四個間由下向上數是第 1 間到第 4 間。線和間是交替排列的。</div>
      </article>

      <div class="grid2">
        <article class="card">
          <h4>線上的音 <span class="tag">Lines</span></h4>
          <p class="lead">高音譜號（treble clef）五條線，由下至上：<b>E G B D F</b>。</p>
          <div class="pads" style="margin-top:12px">${noteChips(lineNotes, 'line-pad')}</div>
          <p class="hint">英文口訣：<i>Every Good Boy Does Fine</i>（每個好孩子都做得好）。點一下聽音高。</p>
        </article>
        <article class="card">
          <h4>間上的音 <span class="tag">Spaces</span></h4>
          <p class="lead">四個間由下至上：<b>F A C E</b>，串起來就是英文的「面」字。</p>
          <div class="pads" style="margin-top:12px">${noteChips(spaceNotes, 'space-pad')}</div>
          <p class="hint">把 FACE 由下向上讀一次，再點擊試聽，很快就不會忘記。</p>
        </article>
      </div>

      <article class="card">
        <h4>附加線與三種譜號 <span class="tag">Ledger lines &amp; clefs</span></h4>
        <div class="split">
          <div>
            <p class="lead">當音符太高或太低，超出五線譜的範圍，就要加一條短短的<b>附加線</b>（ledger line）。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-ledger="m">中央 C（middle C）</button>
              <button class="btn btn--sm" type="button" data-ledger="h">高音 A</button>
            </div>
            <div class="stage stage--tight" id="ledgerStage" style="margin-top:14px"></div>
            <p class="hint" id="ledgerReadout">中央 C 寫在高音譜號下方第一條附加線上。</p>
          </div>
          <div>
            <p class="lead">同一首樂曲，可以用不同的譜號記寫。以下三個「C」都是同一個中央 C。</p>
            <div class="chip-row" style="margin-top:10px" role="group" aria-label="選擇譜號">
              <button class="chip is-on" type="button" data-clef="treble">高音譜號 Treble</button>
              <button class="chip" type="button" data-clef="alto">中音譜號 Alto</button>
              <button class="chip" type="button" data-clef="bass">低音譜號 Bass</button>
            </div>
            <div class="stage stage--tight" id="clefStage" style="margin-top:12px"></div>
            <p class="hint" id="clefReadout">高音譜號又叫 G 譜號，因為它的圈圈繞著第二線 G。</p>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>音符偵探 <span class="tag">小練習</span></h4>
        <p class="lead">看看音符在哪一條線或間，選出正確的音名。連續答對會有星星。</p>
        <div class="stage stage--tight" id="drillStage" style="margin-top:12px"></div>
        <div class="pads" id="drillOpts" style="margin-top:14px"></div>
        <p class="readout" id="drillReadout">按「開始」隨機出題。</p>
        <div class="btn-row"><button class="btn btn--primary btn--sm" type="button" id="drillStart">開始出題</button>
        <span class="q-note" id="drillScore"></span></div>
      </article>
    `,

    init: function (root) {
      var explore = root.querySelector('#staveExplore');
      explore.innerHTML = w.Staff.explore({ width: 620 });
      var readout = root.querySelector('#staveReadout');
      var hits = explore.querySelectorAll('.staff-hit');
      Array.prototype.forEach.call(hits, function (g) {
        var p = +g.getAttribute('data-p');
        var nm = w.Staff.pToName(p);
        function pick() {
          Array.prototype.forEach.call(hits, function (o) {
            var c = o.querySelector('circle');
            if (c) { c.setAttribute('fill', '#c9bda8'); c.setAttribute('r', 3); }
          });
          var dot = g.querySelector('circle');
          dot.setAttribute('fill', '#12857f');
          dot.setAttribute('r', 6);
          var isLine = p % 2 === 0;
          readout.innerHTML = '這是第 <b>' + (isLine ? (p / 2 + 1) + ' 線' : ((p - 1) / 2 + 1) + ' 間') + '</b>，音名是 <b>' + nm.name + '</b>（' + nm.label + '）。';
          w.Sound.tone(w.Staff.pToMidi(p), null, 0.7, { gain: 0.2, rich: true });
        }
        g.addEventListener('click', pick);
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
      });

      root.querySelectorAll('.pad[data-p]').forEach(function (b) {
        b.addEventListener('click', function () {
          var p = +this.getAttribute('data-p');
          var nm = w.Staff.pToName(p);
          w.Sound.tone(w.Staff.pToMidi(p), null, 0.8, { gain: 0.2, rich: true });
          this.classList.add('is-lit');
          var self = this;
          setTimeout(function () { self.classList.remove('is-lit'); }, 320);
          readout.innerHTML = '音名 <b>' + nm.name + '</b>（' + nm.label + '）。';
        });
      });

      /* ledger demo */
      var ledgerStage = root.querySelector('#ledgerStage');
      var ledgerOut = root.querySelector('#ledgerReadout');
      function drawLedger(kind) {
        var p = kind === 'm' ? -2 : 10;
        ledgerStage.innerHTML = w.Staff.render({ notes: [{ p: p, dur: 'q', label: w.Staff.pToName(p).label }], width: 420, height: 220 });
        ledgerOut.innerHTML = kind === 'm'
          ? '中央 C（middle C）寫在高音譜號下方<b>第一條附加線</b>上，是 C4。'
          : '高音 A（A5）寫在高音譜號上方<b>第一條附加線</b>上。';
        w.Sound.tone(w.Staff.pToMidi(p), null, 0.9, { gain: 0.2, rich: true });
      }
      root.querySelectorAll('[data-ledger]').forEach(function (b) {
        b.addEventListener('click', function () { drawLedger(this.getAttribute('data-ledger')); });
      });
      drawLedger('m');

      /* clefs */
      var clefStage = root.querySelector('#clefStage');
      var clefOut = root.querySelector('#clefReadout');
      var clefData = {
        treble: { p: -2, text: '高音譜號又叫 G 譜號：圈圈繞著第二線 G，常用來寫女聲、小提琴、木笛等較高的樂器。' },
        alto: { p: 4, text: '中音譜號又叫 C 譜號：中央 C 剛好在中間那一線，中提琴常用。' },
        bass: { p: 10, text: '低音譜號又叫 F 譜號：兩個點夾著第四線 F，常用來寫大提琴、低音大提琴等較低的樂器。' }
      };
      function drawClef(kind) {
        var c = clefData[kind];
        clefStage.innerHTML = w.Staff.render({
          clef: kind,
          notes: [{ p: c.p, dur: 'q', label: 'C' }],
          width: 420, height: 230
        });
        clefOut.innerHTML = c.text;
        var midi = kind === 'bass' ? 48 : 60;
        w.Sound.tone(midi, null, 0.9, { gain: 0.2, rich: true });
      }
      root.querySelectorAll('[data-clef]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-clef]').forEach(function (o) { o.classList.remove('is-on'); });
          this.classList.add('is-on');
          drawClef(this.getAttribute('data-clef'));
        });
      });
      drawClef('treble');

      /* drill */
      var drillStage = root.querySelector('#drillStage');
      var drillOpts = root.querySelector('#drillOpts');
      var drillOut = root.querySelector('#drillReadout');
      var drillScoreEl = root.querySelector('#drillScore');
      var streak = 0, best = 0, currentP = 4, locked = true;
      var pool = [0, 1, 2, 3, 4, 5, 6, 7, 8];

      function ask() {
        locked = false;
        var options = pool.slice();
        currentP = options[Math.floor(Math.random() * options.length)];
        drillStage.innerHTML = w.Staff.render({ notes: [{ p: currentP, dur: 'q' }], width: 460, height: 200 });
        var right = w.Staff.pToName(currentP).name;
        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        var picks = [right];
        while (picks.length < 4) {
          var cand = letters[Math.floor(Math.random() * 7)];
          if (picks.indexOf(cand) < 0) picks.push(cand);
        }
        picks.sort();
        drillOpts.innerHTML = picks.map(function (l) {
          return '<button class="pad" type="button" data-ans="' + l + '"><b>' + l + '</b></button>';
        }).join('');
        drillOpts.querySelectorAll('[data-ans]').forEach(function (b) {
          b.addEventListener('click', function () {
            if (locked) return;
            locked = true;
            var pick = this.getAttribute('data-ans');
            var ok = pick === right;
            w.Sound.tone(w.Staff.pToMidi(currentP), null, 0.6, { gain: 0.18 });
            if (ok) {
              streak++; best = Math.max(best, streak);
              drillOut.innerHTML = '答對了！這個音是 <b>' + right + '</b>。';
              drillScoreEl.textContent = '連續答對 ' + streak + ' 題（最佳 ' + best + '）';
              setTimeout(ask, 700);
            } else {
              streak = 0;
              drillOut.innerHTML = '這個音是 <b>' + right + '</b>，再試一次。';
              drillScoreEl.textContent = '連續答對 ' + streak + ' 題（最佳 ' + best + '）';
              setTimeout(ask, 1100);
            }
          });
        });
      }
      root.querySelector('#drillStart').addEventListener('click', ask);
    },

    quiz: [
      {
        type: 'mcq',
        q: '五線譜一共有幾條線？',
        options: ['3 條', '4 條', '5 條', '6 條'],
        answer: 2,
        explain: '五線譜有五條線，線與線之間形成四個間。'
      },
      {
        type: 'mcq',
        q: '高音譜號（treble clef）中，<b>由下至上第一線</b>的音名是甚麼？',
        options: ['E', 'G', 'B', 'D'],
        answer: 0,
        explain: '五條線由下至上是 E、G、B、D、F。'
      },
      {
        type: 'mcq',
        q: '高音譜號的四個間，由下至上依次是？',
        options: ['E G B D', 'F A C E', 'G B D F', 'A C E G'],
        answer: 1,
        explain: '四個間是 F A C E，串起來就是英文的 FACE。'
      },
      {
        type: 'mcq',
        q: '圖中的音符叫甚麼名字？',
        staff: [4],
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explain: '它在第三線（中間那一線）上，高音譜號第三線是 B。'
      },
      {
        type: 'mcq',
        q: '中央 C（middle C）寫在高音譜號的哪個位置？',
        options: ['第一線', '下方第一條附加線', '第三間', '上方第一條附加線'],
        answer: 1,
        explain: '中央 C 超出五線譜下方，要加一條附加線來記寫。'
      },
      {
        type: 'mcq',
        q: '低音譜號（bass clef）又叫甚麼譜號？',
        options: ['C 譜號', 'F 譜號', 'G 譜號', 'A 譜號'],
        answer: 1,
        explain: '低音譜號的兩個點夾著第四線 F，所以又叫 F 譜號。'
      },
      {
        type: 'mcq',
        q: '高音譜號中的 G 音，位於第幾線？',
        options: ['第一線', '第二線', '第四線', '第五線'],
        answer: 1,
        explain: '高音譜號的圈圈繞著第二線，那一線就是 G，所以又叫 G 譜號。'
      }
    ]
  });
})(window);
