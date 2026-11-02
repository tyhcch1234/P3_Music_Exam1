/* ============================================================
   Unit 3 — Play the Recorder
   ============================================================ */
(function (w) {
  'use strict';
  w.LESSONS = w.LESSONS || [];

  var G4 = 67, A4 = 69, B4 = 71, D5 = 74;

  var FINGERINGS = {
    B: { label: 'B', midi: B4, p: 4, holes: ['T', '1'], tip: '左手拇指按住背後的小孔，左手食指按第 1 孔，其他手指放鬆。' },
    A: { label: 'A', midi: A4, p: 3, holes: ['T', '1', '2'], tip: '在 B 的指法上，加上左手中指按第 2 孔。' },
    G: { label: 'G', midi: G4, p: 2, holes: ['T', '1', '2', '3'], tip: '在 A 的指法上，再加上左手無名指按第 3 孔。' }
  };

  /* Mary Had a Little Lamb — B A G only, from the booklet score */
  var MARY = [
    [B4, .5], [A4, .5], [G4, .5], [A4, .5],
    [B4, .5], [B4, .5], [B4, 1.5],
    [A4, .5], [A4, .5], [A4, 1.5],
    [B4, .5], [D5, .5], [D5, 1.5],
    [B4, .5], [A4, .5], [G4, .5], [A4, .5],
    [B4, .5], [B4, .5], [B4, .5], [B4, .5],
    [A4, .5], [A4, .5], [B4, .5], [A4, .5],
    [G4, 2]
  ];
  var MARY_LETTERS = ['B', 'A', 'G', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'B', 'D', 'D', 'B', 'A', 'G', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'A', 'G'];

  w.Sound.defineClip('mary', function () {
    w.Sound.melody(MARY, { bpm: 104, gain: 0.17, type: 'triangle', rich: true });
  });

  w.LESSONS.push({
    id: 'unit3',
    tab: 'Unit 3',
    tabSub: '吹木笛',
    kicker: 'Unit 3 · Play the Recorder',
    title: '吹奏木笛',
    en: 'Tonguing, fingerings and notes B A G',
    accent: '#2f74b5',
    soft: '#e3eefa',
    deep: '#1f5687',
    image: 'assets/img/unit3.webp',
    imageAlt: '小朋友吹奏木笛的插畫',
    desc: '木笛（recorder）是我們第一件正式學習的樂器。這一課學握笛、運舌「tu」，還有 B、A、G 三個音的指法。',
    goals: ['握笛姿勢', '運舌法 tonguing', 'B 指法', 'A 指法', 'G 指法', '看譜吹奏'],
    teachNote: '先看握笛方法，再逐個音試按，最後跟著樂譜吹 Mary。',
    teach: `
      <article class="card">
        <h4>怎樣握木笛 <span class="tag">Holding your recorder</span></h4>
        <div class="split">
          <div>
            <ol class="steps">
              <li>把木笛放在身前，吹口（mouthpiece）向著自己。</li>
              <li><b>左手</b>放在<b>上面</b>，<b>右手</b>放在<b>下面</b>。</li>
              <li>左手拇指按住笛子背面的小孔，左手食指按住最接近吹口的第 1 孔。</li>
              <li>右手拇指托住笛身（在第 4 孔對面），幫助固定。</li>
              <li>手指要放鬆，不要移動位置；笛頭放在嘴唇之間，<b>不要碰到牙齒</b>。</li>
            </ol>
            <div class="tip"><b>為甚麼要左手在上？</b>因為大部分音都要用左手的孔，左手在上，手指就不會打結。</div>
          </div>
          <div class="stage" style="margin-top:0;display:grid;place-items:center">
            <svg viewBox="0 0 160 260" style="width:min(100%,190px);height:auto" aria-label="木笛握法示意圖">
              <rect x="60" y="10" width="26" height="34" rx="7" fill="#f6ead6" stroke="#b9925c" stroke-width="2"/>
              <path d="M56 44 h34 l6 168 q1 16 -14 20 h-18 q-15 -4 -14 -20 z" fill="#fbf1de" stroke="#b9925c" stroke-width="2"/>
              <path d="M66 44 v-6" stroke="#8a6b3e" stroke-width="2"/>
              <rect x="66" y="58" width="14" height="10" rx="3" fill="#e3cba6"/>
              <g>
                <circle cx="50" cy="96" r="5" fill="#fff" stroke="#8a6b3e" stroke-width="2"/>
                <text x="34" y="100" font-size="10" fill="#2f74b5">T</text>
              </g>
              <g fill="#fff" stroke="#8a6b3e" stroke-width="2">
                <circle cx="73" cy="108" r="6"/><circle cx="73" cy="128" r="6"/><circle cx="73" cy="148" r="6"/>
                <circle cx="73" cy="168" r="6"/><circle cx="73" cy="188" r="6"/><circle cx="73" cy="206" r="6"/>
              </g>
              <g fill="#8a6b3e" font-size="9" text-anchor="end">
                <text x="96" y="111">1</text><text x="96" y="131">2</text><text x="96" y="151">3</text>
                <text x="96" y="171">4</text><text x="96" y="191">5</text><text x="96" y="209">6</text>
              </g>
              <text x="30" y="180" font-size="10" fill="#2f74b5" transform="rotate(-90 30 180)">左手 Left</text>
              <text x="118" y="196" font-size="10" fill="#2f74b5" transform="rotate(-90 118 196)">右手 Right</text>
            </svg>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>運舌法：用「tu」開始每一個音 <span class="tag">Tonguing</span></h4>
        <div class="split">
          <div>
            <p class="lead">吹木笛不是「吹氣」那麼簡單。舌頭要像輕輕說 <b>「tu」</b>，把氣一下一下送出去，音才會清楚、整齊。這叫做<b>運舌法</b>（tonguing）。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-tongue="tu">tu tu tu tu（有運舌）</button>
              <button class="btn btn--sm" type="button" data-tongue="slur">一次吹完（沒有運舌）</button>
            </div>
            <p class="readout" id="tongueOut">同一個音吹四次：聽聽用「tu」和一口氣吹完的分別。</p>
          </div>
          <div class="stage" style="margin-top:0">
            <div style="display:flex;gap:10px;justify-content:center;align-items:center;min-height:96px" id="tongueVis">
              <span class="beat-dot strong">tu</span><span class="beat-dot">tu</span><span class="beat-dot">tu</span><span class="beat-dot">tu</span>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>三個音的指法：B、A、G <span class="tag">Fingerings</span></h4>
        <div class="split">
          <div>
            <div class="chip-row" role="group" aria-label="選擇音">
              <button class="chip is-on" type="button" data-note="B">B</button>
              <button class="chip" type="button" data-note="A">A</button>
              <button class="chip" type="button" data-note="G">G</button>
            </div>
            <div class="stage stage--tight" id="recStaff" style="margin-top:12px"></div>
            <p class="lead" id="recTip" style="margin-top:12px"></p>
            <p class="readout" id="recOut"></p>
          </div>
          <div class="stage" style="margin-top:0;display:grid;place-items:center">
            <svg viewBox="0 0 190 330" id="recSvg" style="width:min(100%,240px);height:auto" aria-label="木笛指法圖">
              <rect x="76" y="6" width="36" height="32" rx="9" fill="#f6ead6" stroke="#b9925c" stroke-width="2"/>
              <path d="M78 38 h32 l4 40 h-40 z" fill="#fdf6e8" stroke="#b9925c" stroke-width="2"/>
              <path d="M74 78 h40 l6 192 h-52 z" fill="#fbf1de" stroke="#b9925c" stroke-width="2"/>
              <path d="M68 268 h52 q8 0 10 9 l7 28 q3 11 -9 11 h-68 q-12 0 -9 -11 l7 -28 q2 -9 10 -9 z" fill="#fbf1de" stroke="#b9925c" stroke-width="2"/>
              <rect x="86" y="52" width="18" height="12" rx="4" fill="#e3cba6" stroke="#b9925c" stroke-width="1.4"/>
              <path d="M74 86 h40 M68 270 h52" stroke="#b9925c" stroke-width="1.4" opacity=".6"/>

              <g id="holeT">
                <circle cx="82" cy="112" r="8" fill="#fff" stroke="#8a6b3e" stroke-width="2" stroke-dasharray="3 2.5"/>
                <text x="82" y="116" text-anchor="middle" font-size="9" fill="#8a6b3e">T</text>
              </g>
              <g id="hole1"><circle cx="94" cy="104" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="108" font-size="11" fill="#8a6b3e">1</text></g>
              <g id="hole2"><circle cx="94" cy="132" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="136" font-size="11" fill="#8a6b3e">2</text></g>
              <g id="hole3"><circle cx="94" cy="160" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="164" font-size="11" fill="#8a6b3e">3</text></g>
              <g id="hole4"><circle cx="94" cy="196" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="200" font-size="11" fill="#8a6b3e">4</text></g>
              <g id="hole5"><circle cx="94" cy="224" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="228" font-size="11" fill="#8a6b3e">5</text></g>
              <g id="hole6"><circle cx="94" cy="252" r="9" fill="#fff" stroke="#8a6b3e" stroke-width="2.4"/><text x="120" y="256" font-size="11" fill="#8a6b3e">6</text></g>

              <path d="M52 96 v76" stroke="#2f74b5" stroke-width="1.4" opacity=".5"/>
              <text x="46" y="140" font-size="11" fill="#2f74b5" text-anchor="middle" transform="rotate(-90 46 140)">左手 Left</text>
              <path d="M142 188 v84" stroke="#2f74b5" stroke-width="1.4" opacity=".5"/>
              <text x="152" y="232" font-size="11" fill="#2f74b5" text-anchor="middle" transform="rotate(-90 152 232)">右手 Right</text>
            </svg>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>看譜吹奏：Mary Had a Little Lamb <span class="tag">Play along</span></h4>
        <p class="lead">這首歌只用 B、A、G 三個音（還有一次 D）。先寫出音名，再慢慢吹。聽示範時，留意每個音亮起來的位置。</p>
        <div class="stage">
          <div class="pads" id="maryPads" style="justify-content:center;gap:6px"></div>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary btn--sm" type="button" id="maryPlay">播放示範</button>
            <button class="btn btn--sm" type="button" id="maryStop">停止</button>
          </div>
          <div class="slider" style="justify-content:center">
            <span>速度</span><input type="range" id="maryTempo" min="60" max="140" step="4" value="96" aria-label="速度"><b id="maryBpm">96</b>
          </div>
        </div>
        <details class="original"><summary>看課本原譜</summary><div class="inner">
          <img class="score-img" src="assets/img/score-mary.webp" alt="Mary Had a Little Lamb 樂譜" loading="lazy">
        </div></details>
        <div class="tip"><b>練習方法：</b>先不用吹，只用手指按指法，嘴裏唱「tu tu tu」；手指熟了才真正吹。這樣音會更準。</div>
      </article>
    `,

    init: function (root) {
      /* ---------- tonguing ---------- */
      var tongueOut = root.querySelector('#tongueOut');
      var dots = root.querySelectorAll('#tongueVis .beat-dot');
      root.querySelectorAll('[data-tongue]').forEach(function (b) {
        b.addEventListener('click', function () {
          var kind = this.getAttribute('data-tongue');
          w.Sound.unlock();
          if (kind === 'tu') {
            var c = w.Sound.unlock(); if (!c) return;
            var t = c.currentTime + 0.1;
            for (var i = 0; i < 4; i++) {
              w.Sound.tone(B4, t + i * 0.42, 0.22, { gain: 0.18, type: 'triangle', rich: true, attack: 0.008, release: 0.06 });
            }
            tongueOut.innerHTML = '<b>tu tu tu tu</b>：每個音都有清楚的開始，四個音一粒一粒。';
            dots.forEach(function (d, i) {
              setTimeout(function () { d.classList.add('is-on'); }, 120 + i * 420);
              setTimeout(function () { d.classList.remove('is-on'); }, 360 + i * 420);
            });
          } else {
            var c2 = w.Sound.unlock(); if (!c2) return;
            w.Sound.tone(B4, c2.currentTime + 0.1, 1.75, { gain: 0.18, type: 'triangle', rich: true, attack: 0.03, release: 0.2 });
            tongueOut.innerHTML = '<b>一口氣吹完</b>：四個音連在一起，聽不出拍子。所以吹木笛一定要用「tu」。';
            dots.forEach(function (d) { d.classList.add('is-on'); });
            setTimeout(function () { dots.forEach(function (d) { d.classList.remove('is-on'); }); }, 1400);
          }
        });
      });

      /* ---------- fingerings ---------- */
      var recTip = root.querySelector('#recTip');
      var recOut = root.querySelector('#recOut');
      var recStaff = root.querySelector('#recStaff');
      var allHoles = ['T', '1', '2', '3', '4', '5', '6'];

      function showNote(name, play) {
        var f = FINGERINGS[name];
        allHoles.forEach(function (h) {
          var g = root.querySelector('#hole' + h);
          if (!g) return;
          var c = g.querySelector('circle');
          var covered = f.holes.indexOf(h) >= 0;
          c.setAttribute('fill', covered ? '#2f74b5' : '#fff');
          c.setAttribute('stroke', covered ? '#1f5687' : '#8a6b3e');
        });
        root.querySelectorAll('[data-note]').forEach(function (b) {
          b.classList.toggle('is-on', b.getAttribute('data-note') === name);
        });
        recStaff.innerHTML = w.Staff.render({
          notes: [{ p: f.p, dur: 'q', label: f.label }],
          width: 360, height: 190
        });
        recTip.innerHTML = '<b>' + f.label + '</b>：' + f.tip;
        recOut.innerHTML = '蓋住的孔：' + f.holes.map(function (h) { return h === 'T' ? '拇指孔' : '第 ' + h + ' 孔'; }).join('、') + '。';
        if (play !== false) w.Sound.tone(f.midi, null, 0.85, { gain: 0.2, type: 'triangle', rich: true, attack: 0.03 });
      }

      root.querySelectorAll('[data-note]').forEach(function (b) {
        b.addEventListener('click', function () { showNote(this.getAttribute('data-note')); });
      });
      showNote('B', false);

      /* ---------- Mary play along ---------- */
      var pads = root.querySelector('#maryPads');
      var tempo = root.querySelector('#maryTempo');
      var bpmOut = root.querySelector('#maryBpm');
      var playing = null;

      pads.innerHTML = MARY_LETTERS.map(function (s, i) {
        return '<button class="pad" type="button" data-i="' + i + '" style="min-width:42px;padding:6px 8px"><b style="font-size:14px">' + s + '</b></button>';
      }).join('');
      var padEls = pads.querySelectorAll('.pad');

      root.querySelector('#maryPlay').addEventListener('click', function () {
        if (playing) playing.stop();
        var bpm = +tempo.value;
        pads.querySelectorAll('.pad').forEach(function (p) { p.classList.remove('is-lit'); });
        playing = w.Sound.melody(MARY, {
          bpm: bpm, gain: 0.18, type: 'triangle', rich: true,
          onNote: function (i) {
            padEls.forEach(function (p) { p.classList.remove('is-lit'); });
            if (padEls[i]) padEls[i].classList.add('is-lit');
          }
        });
      });
      root.querySelector('#maryStop').addEventListener('click', function () {
        if (playing) { playing.stop(); playing = null; }
        w.Sound.stopAll();
        padEls.forEach(function (p) { p.classList.remove('is-lit'); });
      });
      tempo.addEventListener('input', function () { bpmOut.textContent = this.value; });

      padEls.forEach(function (p, i) {
        p.addEventListener('click', function () {
          var midi = MARY[i][0];
          w.Sound.tone(midi, null, 0.6, { gain: 0.18, type: 'triangle', rich: true });
          padEls.forEach(function (x) { x.classList.remove('is-lit'); });
          p.classList.add('is-lit');
        });
      });
    },

    quiz: [
      {
        type: 'mcq',
        q: '握木笛時，正確的姿勢是？',
        options: ['左手在上，右手在下', '右手在上，左手在下', '雙手都在最下面', '用一隻手拿就可以'],
        answer: 0,
        explain: '左手放在笛子上方按 1、2、3 孔，右手在下方按 4、5、6 孔。'
      },
      {
        type: 'mcq',
        q: '運舌法（tonguing）要我們用哪個聲音開始每一個音？',
        options: ['「ha」', '「tu」', '「ss」', '「mm」'],
        answer: 1,
        explain: '輕輕說「tu」，舌頭把氣一下一下送出去，音就會清楚。'
      },
      {
        type: 'mcq',
        q: '吹 <b>B</b> 音時，要按住哪些孔？',
        options: ['只有第 1 孔', '拇指孔和第 1 孔', '拇指孔、第 1、2 孔', '第 1、2、3 孔'],
        answer: 1,
        explain: 'B 是最容易的音：左手拇指按住背後的小孔，食指按第 1 孔。'
      },
      {
        type: 'mcq',
        q: '吹 <b>A</b> 音時，要按住哪些孔？',
        options: ['拇指孔和第 1 孔', '拇指孔、第 1、2 孔', '拇指孔、第 1、2、3 孔', '第 4、5、6 孔'],
        answer: 1,
        explain: 'A 在 B 的基礎上多加第 2 孔。'
      },
      {
        type: 'mcq',
        q: '吹 <b>G</b> 音時，要按住哪些孔？',
        options: ['拇指孔和第 1 孔', '拇指孔、第 1、2 孔', '拇指孔、第 1、2、3 孔', '全部六個孔'],
        answer: 2,
        explain: 'G 用拇指加第 1、2、3 孔：三個左手手指都用上了。'
      },
      {
        type: 'mcq',
        q: '圖中這個音（高音譜號）叫甚麼？',
        staff: [4],
        options: ['G', 'A', 'B', 'C'],
        answer: 2,
        explain: '高音譜號第三線（中間線）是 B。'
      },
      {
        type: 'mcq',
        q: '高音譜號的<b>第二線</b>是甚麼音？',
        options: ['E', 'G', 'B', 'D'],
        answer: 1,
        explain: '五線由下至上 E、G、B、D、F，第二線是 G，也就是木笛的 G 音。'
      },
      {
        type: 'mcq',
        q: '《Mary Had a Little Lamb》第一句「Ma-ry had a lit-tle」的四個音，順序是？',
        options: ['B A G A', 'G A B A', 'B A B G', 'A G A B'],
        answer: 0,
        explain: '課本上的唱名是 m r d r，即 B A G A。'
      },
      {
        type: 'mcq',
        q: '吹木笛時，笛頭應該放在哪裏？',
        options: ['放在牙齒上咬緊', '放在嘴唇之間，不要碰到牙齒', '只用手拿著，不碰嘴', '頂住上顎'],
        answer: 1,
        explain: '笛頭輕輕放在嘴唇之間，不要碰到牙齒，也不要咬。'
      }
    ]
  });
})(window);
