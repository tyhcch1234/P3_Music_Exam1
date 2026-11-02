/* ============================================================
   Unit 2 — World Music
   ============================================================ */
(function (w) {
  'use strict';
  w.LESSONS = w.LESSONS || [];

  var solfa = [
    { name: 'do', zh: 'Do', semi: 0, hand: '握拳', tip: '拳頭緊緊握住，像一顆圓圓的 do。' },
    { name: 're', zh: 'Re', semi: 2, hand: '拳頭斜向上', tip: '拳頭，手指斜斜向上，像一條往上走的滑梯。' },
    { name: 'mi', zh: 'Mi', semi: 4, hand: '手掌平放', tip: '手掌平放，掌心向下，像托著一塊平板。' },
    { name: 'fa', zh: 'Fa', semi: 5, hand: '大拇指指向下', tip: '握拳，大拇指指向下方，提醒你 fa 有點「沉」。' },
    { name: 'sol', zh: 'Sol', semi: 7, hand: '手掌直立', tip: '手掌直立，掌心向自己，像一道牆。' },
    { name: 'la', zh: 'La', semi: 9, hand: '手指向下垂', tip: '手放鬆，手指向下垂，像水滴。' },
    { name: 'ti', zh: 'Ti', semi: 11, hand: '食指指向天', tip: '握拳，食指指向天空，準備回到 do。' }
  ];

  /* ---------- clips ---------- */
  w.Sound.defineClip('scale-up', function () {
    var notes = [0, 2, 4, 5, 7, 9, 11, 12].map(function (s) { return [60 + s, 0.5]; });
    w.Sound.melody(notes, { bpm: 120, gain: 0.16 });
  });
  w.Sound.defineClip('scale-down', function () {
    var notes = [12, 11, 9, 7, 5, 4, 2, 0].map(function (s) { return [60 + s, 0.5]; });
    w.Sound.melody(notes, { bpm: 120, gain: 0.16 });
  });
  w.Sound.defineClip('form-AB', function () { playForm('AB'); });
  w.Sound.defineClip('form-ABA', function () { playForm('ABA'); });

  var A = [[60, 1], [62, 1], [64, 1], [65, 2], [64, 1], [62, 1], [60, 2]];
  var B = [[67, 1], [69, 1], [67, 1], [64, 2], [65, 1], [64, 1], [62, 2]];

  function playForm(kind) {
    var seq = [];
    var map = { A: A, B: B };
    kind.split('').forEach(function (k) {
      seq = seq.concat(map[k].map(function (n) { return [n[0], n[1]]; }));
    });
    w.Sound.melody(seq, { bpm: 132, gain: 0.16, type: 'triangle' });
  }

  w.Sound.defineClip('ostinato-demo', function () {
    var c = w.Sound.unlock(); if (!c) return;
    var t = c.currentTime + 0.1;
    var beat = 0.5;
    for (var bar = 0; bar < 4; bar++) {
      // ostinato: ta - ti-ti ta
      w.Sound.perc('woodblock', t + bar * 4 * beat, 1);
      w.Sound.perc('woodblock', t + (bar * 4 + 2) * beat, 0.7);
      w.Sound.perc('woodblock', t + (bar * 4 + 3) * beat, 0.7);
      w.Sound.perc('woodblock', t + (bar * 4 + 4 - 0.02) * beat, 0.9);
      // melody on top
      var mel = [72, 74, 76, 74];
      w.Sound.tone(mel[bar % 4], t + bar * 4 * beat, beat * 1.6, { gain: 0.13, rich: true });
    }
  });

  w.LESSONS.push({
    id: 'unit2',
    tab: 'Unit 2',
    tabSub: '世界音樂',
    kicker: 'Unit 2 · World Music',
    title: '世界音樂',
    en: 'Sol-fa, musical form and ostinato',
    accent: '#12857f',
    soft: '#e0f2ef',
    deep: '#0b6661',
    image: 'assets/img/unit2.webp',
    imageAlt: '不同文化的小朋友一起唱歌、做手號的插畫',
    desc: '用 do re mi 唱名和手號把音高「畫」出來，再認識二段體、三段體和節奏頻現句——世界各地的小朋友都是這樣學音樂的。',
    goals: ['唱名 sol-fa', '手號 hand signs', '大調音階', '二段體／三段體', '節奏頻現句', 'quaver / fermata / anacrusis'],
    teachNote: '先由 do re mi 開始，再聽曲式，最後玩節奏頻現句。',
    teach: `
      <article class="card">
        <h4>唱名與手號 <span class="tag">Sol-fa &amp; hand signs</span></h4>
        <p class="lead">唱名（sol-fa name）是我們唱歌時用的音名：<b>do re mi fa sol la ti</b>。每個音都有一個手號（hand sign），把手的高低做出來，音高就會唱得準。</p>
        <div class="stage">
          <div class="pads" id="solfaPads" style="justify-content:center">
            ${solfa.map(function (s, i) {
              return '<button class="pad" type="button" data-sol="' + i + '" style="min-width:64px"><b>' + s.zh + '</b><small>' + s.hand + '</small></button>';
            }).join('')}
          </div>
          <div style="display:flex;align-items:center;gap:18px;justify-content:center;margin-top:16px;flex-wrap:wrap">
            <div id="handBox" style="width:120px;color:#0b6661"></div>
            <div style="max-width:38ch">
              <p class="q-stem" id="solfaName" style="font-size:17px">點一個唱名</p>
              <p class="q-note" id="solfaTip">手號可以幫助我們記住音高的距離。</p>
            </div>
          </div>
        </div>
        <div class="btn-row">
          <button class="btn btn--primary btn--sm" type="button" id="scaleUp">音階上行 ↑</button>
          <button class="btn btn--sm" type="button" id="scaleDown">音階下行 ↓</button>
          <span class="q-note">大調音階由 do 唱到高八度的 do，共 8 個音。</span>
        </div>
      </article>

      <article class="card">
        <h4>二段體與三段體 <span class="tag">Binary &amp; ternary form</span></h4>
        <div class="split">
          <div>
            <p class="lead"><b>二段體</b>（binary form）由兩段不同的音樂組成：<b>A + B</b>。<br>
            <b>三段體</b>（ternary form / three-part form）則是 <b>A + B + A</b>，最後會回到第一段。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-form="AB">聽二段體 A B</button>
              <button class="btn btn--sm" type="button" data-form="ABA">聽三段體 A B A</button>
            </div>
            <p class="readout" id="formOut">留意 A 段和 B 段的分別：A 段較平穩，B 段音較高。</p>
          </div>
          <div class="stage" style="margin-top:0">
            <div class="form-strip" id="formStrip"></div>
            <p class="hint" id="formHint" style="text-align:center">A 段與 B 段用不同顏色表示。</p>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>節奏頻現句 <span class="tag">Rhythmic ostinato</span></h4>
        <p class="lead">節奏頻現句（rhythmic ostinato）是一段<b>不斷重複</b>的節奏，像一個循環的底座，上面可以加旋律。試試把兩層分開聽。</p>
        <div class="stage">
          <div class="form-strip" id="ostiStrip" style="gap:5px"></div>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary btn--sm" type="button" id="ostiBtn">開始循環</button>
            <button class="btn btn--sm" type="button" id="ostiMelody" aria-pressed="true">旋律層：開</button>
          </div>
          <div class="slider" style="justify-content:center">
            <span>速度</span><input type="range" id="ostiTempo" min="70" max="150" step="4" value="100" aria-label="速度"><b id="ostiBpm">100</b>
          </div>
          <p class="readout" id="ostiOut" style="text-align:center">黃色是節奏頻現句，藍色是上面的旋律。</p>
        </div>
      </article>

      <article class="card">
        <h4>四個常用符號 <span class="tag">Symbols</span></h4>
        <div class="grid4">
          <div class="stage" style="margin-top:0;text-align:center">
            <svg viewBox="0 0 120 90" style="width:100%;height:80px"><g fill="none" stroke="#12857f" stroke-width="3" stroke-linecap="round"><ellipse cx="52" cy="62" rx="9" ry="7" fill="#12857f" transform="rotate(-20 52 62)"/><path d="M60 60 V18"/><path d="M60 18 q16 6 10 22"/></g></svg>
            <p style="font-size:13px;margin-top:6px"><b>Quaver</b> 八分音符<br><span class="zh">＝ 半拍</span></p>
          </div>
          <div class="stage" style="margin-top:0;text-align:center">
            <svg viewBox="0 0 120 90" style="width:100%;height:80px"><path d="M56 20 q14 6 0 16 q-14 10 0 18 q10 6 2 16" fill="none" stroke="#12857f" stroke-width="4" stroke-linecap="round"/></svg>
            <p style="font-size:13px;margin-top:6px"><b>Crotchet rest</b><br><span class="zh">四分休止符（停一拍）</span></p>
          </div>
          <div class="stage" style="margin-top:0;text-align:center">
            <svg viewBox="0 0 120 90" style="width:100%;height:80px"><path d="M28 52 q32 -34 64 0" fill="none" stroke="#12857f" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="5" fill="#12857f"/></svg>
            <p style="font-size:13px;margin-top:6px"><b>Fermata</b> 延長號<br><span class="zh">把這個音延長</span></p>
          </div>
          <div class="stage" style="margin-top:0;text-align:center">
            <svg viewBox="0 0 140 90" style="width:100%;height:80px"><g fill="none" stroke="#12857f" stroke-width="3"><path d="M34 64 h72"/><path d="M90 24 v40"/><ellipse cx="58" cy="60" rx="7" ry="5.5" fill="#12857f" transform="rotate(-20 58 60)"/><path d="M65 59 V30"/><path d="M34 46 h34" stroke-dasharray="4 5" opacity=".5"/></g></svg>
            <p style="font-size:13px;margin-top:6px"><b>Anacrusis</b> 弱拍起<br><span class="zh">第一小節未滿，由弱拍開始</span></p>
          </div>
        </div>
        <div class="tip"><b>小提示：</b>《The Riddle》和《There was a Crooked Man》都是從弱拍開始，第一個音之前有一小段「未滿」的小節，那就是 anacrusis（upbeat）。</div>
      </article>

      <article class="card">
        <h4>課本歌曲 <span class="tag">Songs</span></h4>
        <p class="lead">Unit 2 的三首歌都來自不同地方：美國的《Yankee Doodle》、英國民歌《The Riddle》，還有英文童謠《There was a Crooked Man》。點開原譜，找找 anacrusis 和反覆記號。</p>
        <div class="grid3" style="margin-top:14px">
          <figure class="figure"><img class="score-img" src="assets/img/score-yankee.webp" alt="Yankee Doodle 樂譜" loading="lazy"><figcaption>Yankee Doodle · 美國傳統歌曲（2/4）</figcaption></figure>
          <figure class="figure"><img class="score-img" src="assets/img/score-riddle.webp" alt="The Riddle 樂譜" loading="lazy"><figcaption>The Riddle · 英國民歌（弱拍起）</figcaption></figure>
          <figure class="figure"><img class="score-img" src="assets/img/score-crooked.webp" alt="There was a Crooked Man 樂譜" loading="lazy"><figcaption>There was a Crooked Man · 英文童謠</figcaption></figure>
        </div>
      </article>
    `,

    init: function (root) {
      /* ---------- sol-fa ---------- */
      var pads = root.querySelectorAll('#solfaPads .pad');
      var handBox = root.querySelector('#handBox');
      var nameEl = root.querySelector('#solfaName');
      var tipEl = root.querySelector('#solfaTip');

      function showSol(i, play) {
        var s = solfa[i];
        handBox.innerHTML = w.Icons.hand(s.name);
        nameEl.innerHTML = '<b>' + s.zh + '</b> <span class="zh">唱名 ' + s.name + '</span>';
        tipEl.textContent = s.tip;
        pads.forEach(function (p, k) { p.classList.toggle('is-lit', k === i); });
        if (play !== false) w.Sound.tone(60 + s.semi, null, 0.7, { gain: 0.2, rich: true });
      }
      pads.forEach(function (p, i) {
        p.addEventListener('click', function () { showSol(i); });
      });
      showSol(0, false);

      root.querySelector('#scaleUp').addEventListener('click', function () {
        var notes = solfa.concat([{ semi: 12 }]).map(function (s) { return [60 + s.semi, 0.5]; });
        w.Sound.melody(notes, {
          bpm: 120, gain: 0.17,
          onNote: function (i) { if (i < 7) showSol(i, false); else showSol(0, false); }
        });
      });
      root.querySelector('#scaleDown').addEventListener('click', function () {
        var list = solfa.concat([{ semi: 12 }]).reverse();
        var notes = list.map(function (s) { return [60 + s.semi, 0.5]; });
        w.Sound.melody(notes, {
          bpm: 120, gain: 0.17,
          onNote: function (i) { if (i < 7) showSol(6 - i, false); }
        });
      });

      /* ---------- form ---------- */
      var strip = root.querySelector('#formStrip');
      var formOut = root.querySelector('#formOut');
      var colours = { A: '#12857f', B: '#e9a13b' };

      function drawStrip(kind) {
        strip.innerHTML = kind.split('').map(function (k) {
          return '<div class="form-seg" data-k="' + k + '" style="background:' + colours[k] + '">' + k + '</div>';
        }).join('');
      }
      drawStrip('ABA');

      root.querySelectorAll('[data-form]').forEach(function (b) {
        b.addEventListener('click', function () {
          var kind = this.getAttribute('data-form');
          drawStrip(kind);
          var segs = strip.querySelectorAll('.form-seg');
          var notes = [];
          kind.split('').forEach(function (k) {
            notes = notes.concat((k === 'A' ? A : B).map(function (n) { return [n[0], n[1]]; }));
          });
          var counts = kind.split('').map(function (k) { return (k === 'A' ? A : B).length; });
          var starts = [];
          var acc = 0;
          counts.forEach(function (c) { starts.push(acc); acc += c; });
          w.Sound.melody(notes, {
            bpm: 132, gain: 0.16,
            onNote: function (i) {
              var segIdx = 0;
              for (var k = 0; k < starts.length; k++) if (i >= starts[k]) segIdx = k;
              segs.forEach(function (s, j) { s.classList.toggle('is-on', j === segIdx); });
            }
          });
          formOut.innerHTML = kind === 'AB'
            ? '<b>二段體 A B</b>：兩段不同的音樂，聽完 B 段就結束。'
            : '<b>三段體 A B A</b>：B 段之後，A 段再次出現，前後包住中間。';
        });
      });

      /* ---------- ostinato ---------- */
      var ostiStrip = root.querySelector('#ostiStrip');
      var ostiBtn = root.querySelector('#ostiBtn');
      var ostiOut = root.querySelector('#ostiOut');
      var ostiTempo = root.querySelector('#ostiTempo');
      var ostiBpm = root.querySelector('#ostiBpm');
      var melBtn = root.querySelector('#ostiMelody');
      var melOn = true;
      var ostiLoop = null;
      var pattern = [1, 0, 1, 1, 1, 0, 1, 1]; // 8 eighth notes
      var melody = [72, null, 74, null, 76, null, 74, null];

      ostiStrip.innerHTML = pattern.map(function (_, i) {
        return '<div class="form-seg" data-step="' + i + '" style="background:' + (i < 4 ? '#e9a13b' : '#12857f') + ';font-size:11px">' + (i + 1) + '</div>';
      }).join('');
      var steps = ostiStrip.querySelectorAll('.form-seg');

      melBtn.addEventListener('click', function () {
        melOn = !melOn;
        this.setAttribute('aria-pressed', melOn ? 'true' : 'false');
        this.textContent = '旋律層：' + (melOn ? '開' : '關');
        ostiOut.innerHTML = melOn ? '黃色是節奏頻現句，藍色是上面的旋律。' : '現在只剩節奏頻現句——同一段節奏不停重複。';
      });

      function stopOsti() {
        if (ostiLoop) { ostiLoop.stop(); ostiLoop = null; }
        ostiBtn.textContent = '開始循環';
        steps.forEach(function (s) { s.classList.remove('is-on'); });
      }

      ostiBtn.addEventListener('click', function () {
        w.Sound.unlock();
        if (ostiLoop) { stopOsti(); return; }
        ostiBtn.textContent = '停止';
        var bpm = +ostiTempo.value;
        ostiLoop = w.Sound.loop({
          steps: 8, bpm: bpm, perBeat: 2,
          onStep: function (i, t) {
            if (pattern[i]) w.Sound.perc('woodblock', t, i === 0 ? 1 : 0.7);
            if (melOn && melody[i] != null) w.Sound.tone(melody[i], t, 0.3, { gain: 0.13, rich: true });
            var delay = Math.max(0, (t - w.Sound.now()) * 1000);
            setTimeout(function () {
              steps.forEach(function (s) { s.classList.remove('is-on'); });
              if (steps[i]) steps[i].classList.add('is-on');
            }, delay);
          }
        });
      });

      ostiTempo.addEventListener('input', function () {
        ostiBpm.textContent = this.value;
        if (ostiLoop) { stopOsti(); ostiBtn.click(); }
      });
    },

    quiz: [
      {
        type: 'mcq',
        q: '唱名 <b>do re mi fa sol la ti</b> 之中，<b>第四個</b>音是？',
        options: ['mi', 'fa', 'sol', 'la'],
        answer: 1,
        explain: '順序是 do、re、mi、fa、sol、la、ti，第四個是 fa。'
      },
      {
        type: 'mcq',
        q: '哪一個唱名的手號是<b>握緊拳頭</b>？',
        options: ['do', 'mi', 'la', 'ti'],
        answer: 0,
        explain: 'do 的手號是拳頭；ti 是食指指天，la 是手指下垂。'
      },
      {
        type: 'mcq',
        q: '聽一聽，這段音階是<b>上行</b>還是<b>下行</b>？',
        audio: 'scale-up',
        options: ['上行（由低至高）', '下行（由高至低）'],
        answer: 0,
        explain: '音一個比一個高，就是上行的大調音階。'
      },
      {
        type: 'mcq',
        q: '<b>二段體</b>（binary form）的結構是？',
        options: ['A A', 'A B', 'A B A', 'A B C'],
        answer: 1,
        explain: '二段體由兩個不同的樂段組成：A + B。'
      },
      {
        type: 'mcq',
        q: '聽一聽這段音樂，它是哪一種曲式？',
        audio: 'form-ABA',
        options: ['二段體（A B）', '三段體（A B A）'],
        answer: 1,
        explain: 'B 段之後又回到 A 段，所以是 A B A 三段體。'
      },
      {
        type: 'mcq',
        q: '<b>節奏頻現句</b>（rhythmic ostinato）是甚麼？',
        options: ['一段不斷重複的節奏', '樂曲最快的一句', '樂曲最後一個音', '用嘴唱的旋律'],
        answer: 0,
        explain: 'ostinato 是「固執地重複」的意思，同一段節奏會一直循環。'
      },
      {
        type: 'mcq',
        q: '以四分音符為一拍時，一個 <b>quaver</b>（八分音符）有多長？',
        options: ['兩拍', '一拍', '半拍', '四拍'],
        answer: 2,
        explain: '兩個八分音符等於一個四分音符，所以一個 quaver 是半拍。'
      },
      {
        type: 'mcq',
        q: '<b>Fermata</b>（延長號）提示演奏者要怎樣做？',
        options: ['把這個音延長', '把這個音唱短一些', '立即停止', '加快速度'],
        answer: 0,
        explain: 'fermata 是延長記號，通常會把那個音或休止符拉長。'
      },
      {
        type: 'mcq',
        q: '樂曲由<b>弱拍</b>開始，這種寫法叫甚麼？',
        options: ['Anacrusis（upbeat）弱拍起', 'Fermata 延長', 'Ostinato 頻現句', 'Crescendo 漸強'],
        answer: 0,
        explain: 'anacrusis 又叫 upbeat，即是樂曲第一個音之前那一小段「未滿」的小節。'
      },
      {
        type: 'mcq',
        q: '哪一個符號代表<b>四分休止符</b>（停一拍）？',
        html: '<div style="display:flex;gap:34px;justify-content:center;align-items:flex-end;flex-wrap:wrap">' +
          '<div style="text-align:center"><svg viewBox="0 0 60 80" width="60" height="80"><path d="M28 18 q12 6 2 16 q-12 10 0 18 q10 8 2 16" fill="none" stroke="#232733" stroke-width="5" stroke-linecap="round"/></svg><div style="font-size:11px;color:#7d8698">①</div></div>' +
          '<div style="text-align:center"><svg viewBox="0 0 60 80" width="60" height="80"><g stroke="#232733" stroke-width="4" fill="none" stroke-linecap="round"><ellipse cx="24" cy="58" rx="8" ry="6" fill="#232733" transform="rotate(-20 24 58)"/><path d="M31 57 V18"/><path d="M31 18 q14 6 8 20"/></g></svg><div style="font-size:11px;color:#7d8698">②</div></div>' +
          '<div style="text-align:center"><svg viewBox="0 0 60 80" width="60" height="80"><path d="M8 46 q22 -26 44 0" fill="none" stroke="#232733" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="54" r="5" fill="#232733"/></svg><div style="font-size:11px;color:#7d8698">③</div></div>' +
          '<div style="text-align:center"><svg viewBox="0 0 60 80" width="60" height="80"><g stroke="#232733" stroke-width="4" fill="none" stroke-linecap="round"><ellipse cx="26" cy="58" rx="9" ry="7" fill="#232733" transform="rotate(-20 26 58)"/><path d="M35 57 V18"/></g></svg><div style="font-size:11px;color:#7d8698">④</div></div>' +
          '</div>',
        options: ['① 四分休止符', '② 八分音符', '③ 延長號', '④ 四分音符'],
        answer: 0,
        explain: '四分休止符要停一拍，甚麼都不唱、不奏。'
      }
    ]
  });
})(window);
