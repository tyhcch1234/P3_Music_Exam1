/* ============================================================
   Unit 1 — Music and Atmosphere
   ============================================================ */
(function (w) {
  'use strict';
  w.LESSONS = w.LESSONS || [];

  var families = {
    strings: { zh: '弦樂', en: 'Strings', colour: '#e2603f' },
    woodwind: { zh: '木管', en: 'Woodwind', colour: '#12857f' },
    brass: { zh: '銅管', en: 'Brass', colour: '#c8862c' },
    percussion: { zh: '敲擊', en: 'Percussion', colour: '#6f5cc4' }
  };

  var orchestra = [
    { k: 'violin', zh: '小提琴', en: 'Violin', fam: 'strings', desc: '用弓拉弦，聲音明亮，是弦樂家族的高音。' },
    { k: 'cello', zh: '大提琴', en: 'Cello', fam: 'strings', desc: '體積較大，聲音低沉溫暖，像男低音在唱歌。' },
    { k: 'harp', zh: '豎琴', en: 'Harp', fam: 'strings', desc: '用手指撥弦，聲音像流水一樣晶瑩。' },
    { k: 'flute', zh: '長笛', en: 'Flute', fam: 'woodwind', desc: '橫著吹，聲音清亮，像小鳥的叫聲。' },
    { k: 'clarinet', zh: '單簧管', en: 'Clarinet', fam: 'woodwind', desc: '直著吹，聲音圓潤，低音時像貓咪。' },
    { k: 'trumpet', zh: '小號', en: 'Trumpet', fam: 'brass', desc: '用嘴唇震動發聲，聲音雄壯響亮。' },
    { k: 'trombone', zh: '長號', en: 'Trombone', fam: 'brass', desc: '用伸縮管改變音高，聲音厚重。' },
    { k: 'horn', zh: '法國號', en: 'French horn', fam: 'brass', desc: '捲成圓圈的銅管，聲音圓潤柔美。' },
    { k: 'timpani', zh: '定音鼓', en: 'Timpani', fam: 'percussion', desc: '可以調音的大鼓，一下一下推動樂曲。' },
    { k: 'snare', zh: '小鼓', en: 'Snare drum', fam: 'percussion', desc: '鼓底有響弦，聲音清脆有「沙沙」聲。' },
    { k: 'cymbals', zh: '鈸', en: 'Cymbals', fam: 'percussion', desc: '兩片金屬互擊，聲音響亮而長。' },
    { k: 'xylophone', zh: '木琴', en: 'Xylophone', fam: 'percussion', desc: '敲打木條發聲，聲音清脆，可以奏旋律。' }
  ];

  /* ---- named clips ---- */
  w.Sound.defineClip('meter-duple', function () {
    var c = w.Sound.unlock(); if (!c) return;
    var t = c.currentTime + 0.08;
    for (var i = 0; i < 8; i++) {
      w.Sound.perc(i % 2 === 0 ? 'woodblock' : 'claves', t + i * 0.5, i % 2 === 0 ? 1 : 0.5);
    }
  });
  w.Sound.defineClip('meter-triple', function () {
    var c = w.Sound.unlock(); if (!c) return;
    var t = c.currentTime + 0.08;
    for (var i = 0; i < 9; i++) {
      w.Sound.perc(i % 3 === 0 ? 'woodblock' : 'claves', t + i * 0.5, i % 3 === 0 ? 1 : 0.45);
    }
  });
  w.Sound.defineClip('dyn-pp', function () { playPhrase(0.06, 100); });
  w.Sound.defineClip('dyn-ff', function () { playPhrase(0.3, 100); });

  function playPhrase(gain, bpm) {
    var c = w.Sound.unlock(); if (!c) return;
    var beat = 60 / bpm;
    var notes = [[67, 1], [69, 1], [71, 1], [72, 2], [71, 1], [69, 1], [67, 3]];
    var t = c.currentTime + 0.1;
    notes.forEach(function (n, i) {
      w.Sound.tone(n[0], t, n[1] * beat * 0.95, { gain: gain, type: 'triangle', rich: true });
      t += n[1] * beat;
    });
  }

  w.LESSONS.push({
    id: 'unit1',
    tab: 'Unit 1',
    tabSub: '音樂與氣氛',
    kicker: 'Unit 1 · Music and Atmosphere',
    title: '音樂與氣氛',
    en: 'Time signature, conducting, the orchestra',
    accent: '#e2603f',
    soft: '#fbe6df',
    deep: '#b1452a',
    image: 'assets/img/unit1.webp',
    imageAlt: '小朋友指揮管弦樂團的插畫',
    desc: '二拍子的強弱、指揮的手勢、管弦樂團的四個家族，還有 pp 與 rit. 兩個記號——這一課教你聽出音樂的「氣氛」。',
    goals: ['2/4 拍號', '單二拍強弱', '2/4 指揮手勢', '樂團四大樂器家族', 'pp / rit.'],
    teachNote: '先玩節拍機，再學指揮，最後把樂器分入四個家族。',
    teach: `
      <article class="card">
        <h4>2/4 拍號是甚麼？ <span class="tag">Time signature</span></h4>
        <div class="split">
          <div>
            <p class="lead">拍號寫在樂譜開頭，看上去像一個分數。</p>
            <ul class="plain">
              <li><b>上面的 2</b>：每小節有 <b>2 拍</b>。</li>
              <li><b>下面的 4</b>：以 <b>四分音符</b>（crotchet）為一拍。</li>
            </ul>
            <p class="lead" style="margin-top:10px">所以 2/4 就是「每小節兩拍，每拍一個四分音符」，叫做 <b>單二拍</b>（simple duple time）。</p>
            <div class="tip"><b>強弱規律：</b>第一拍是<b>強拍</b>（strong），第二拍是<b>弱拍</b>（weak），一路重複：強—弱—強—弱。</div>
          </div>
          <div class="stage" style="margin-top:0">
            <div class="beat-vis" id="beatVis">
              <div class="beat-dot strong" data-b="0">1<small style="font-size:10px;display:block">強</small></div>
              <div class="beat-dot" data-b="1">2<small style="font-size:10px;display:block">弱</small></div>
            </div>
            <div class="btn-row" style="justify-content:center">
              <button class="btn btn--primary btn--sm" type="button" id="metroBtn">開始拍子機</button>
            </div>
            <div class="slider">
              <span>速度</span>
              <input type="range" id="metroTempo" min="60" max="152" step="4" value="96" aria-label="速度">
              <b id="metroBpm">96</b>
            </div>
            <p class="readout" id="metroOut" style="text-align:center">按一下開始，跟著強弱拍點頭。</p>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>2/4 的指揮手勢 <span class="tag">Conducting gesture</span></h4>
        <div class="split">
          <div>
            <p class="lead">指揮用右手畫出拍子，讓整個樂團一起呼吸。</p>
            <ol class="steps">
              <li><b>第一拍（強）：</b>手由上向<b>下</b>落，像把音樂「放」下去。</li>
              <li><b>第二拍（弱）：</b>手由下向<b>外、向上</b>彈起，準備下一小節。</li>
            </ol>
            <div class="btn-row">
              <button class="btn btn--primary btn--sm" type="button" id="conductBtn">跟著揮一次</button>
              <button class="btn btn--sm" type="button" id="conductLoop">連續練習</button>
            </div>
            <p class="readout" id="conductOut">每一小節：下、上。第 1 拍向下，第 2 拍向上。</p>
          </div>
          <div class="stage stage--tight" style="margin-top:0">
            <svg viewBox="0 0 300 220" style="width:100%;height:auto" role="img" aria-label="2/4 指揮手勢：第 1 拍向下，第 2 拍向上">
              <path id="conductPath" d="M150 34 C126 92 112 150 132 172 C154 194 210 176 232 138" fill="none" stroke="#e2603f" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round" opacity=".7"/>
              <circle cx="132" cy="172" r="15" fill="#fbe6df" stroke="#e2603f" stroke-width="2"/>
              <text x="132" y="178" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="15" font-weight="700" fill="#b1452a">1</text>
              <circle cx="232" cy="138" r="15" fill="#fff" stroke="#e2603f" stroke-width="2"/>
              <text x="232" y="144" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="15" font-weight="700" fill="#b1452a">2</text>
              <g id="handMark" transform="translate(150,34)">
                <circle r="13" fill="#e2603f" opacity=".18"/>
                <circle r="7" fill="#e2603f"/>
              </g>
              <text x="150" y="22" text-anchor="middle" font-size="11" fill="#b1452a">開始</text>
            </svg>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>管弦樂團的四個家族 <span class="tag">The orchestra</span></h4>
        <p class="lead">樂團裏的樂器按「怎樣發聲」分成四個家族。點一下樂器，聽聽它的音色，再看看它屬於哪一家。</p>
        <div class="chip-row" style="margin-top:12px" role="group" aria-label="樂器家族篩選">
          <button class="chip is-on" type="button" data-fam="all">全部</button>
          <button class="chip" type="button" data-fam="strings">弦樂 Strings</button>
          <button class="chip" type="button" data-fam="woodwind">木管 Woodwind</button>
          <button class="chip" type="button" data-fam="brass">銅管 Brass</button>
          <button class="chip" type="button" data-fam="percussion">敲擊 Percussion</button>
        </div>
        <div class="inst-grid" id="orchGrid"></div>
        <p class="readout" id="orchOut">點按任何一件樂器開始。</p>
      </article>

      <article class="card">
        <h4>力度與速度記號：pp 與 rit. <span class="tag">Dynamics &amp; tempo</span></h4>
        <div class="split">
          <div>
            <p class="lead"><b>pp</b>（pianissimo）是<b>極弱</b>，要輕輕地唱、細細地奏；<b>rit.</b>（ritardando）是<b>漸慢</b>，音樂慢慢停下來。</p>
            <p class="lead" style="margin-top:8px">在《Sleep Baby Sleep》裏，一開始是 <b>pp</b>，最後一句寫上 <b>rit.</b>，就像媽媽的歌聲慢慢遠去。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-dyn="0.06">pp 極弱</button>
              <button class="btn btn--sm" type="button" data-dyn="0.18">mf 中強</button>
              <button class="btn btn--sm" type="button" data-dyn="0.32">ff 極強</button>
              <button class="btn btn--sm" type="button" data-dyn="rit">加上 rit. 漸慢</button>
            </div>
            <p class="readout" id="dynOut">同一句旋律，三種力度聽起來完全不同。</p>
          </div>
          <div class="stage stage--tight" id="dynStage" style="margin-top:0">
            <div style="display:flex;align-items:center;justify-content:center;gap:18px;min-height:120px">
              <span id="dynMark" style="font-family:'Baloo 2',serif;font-size:52px;font-weight:800;color:#e2603f">pp</span>
              <span id="dynArrow" style="font-size:26px;color:#c9bda8">→</span>
              <span id="dynMark2" style="font-family:'Baloo 2',serif;font-size:52px;font-weight:800;color:#c9bda8">ff</span>
            </div>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>課本歌曲：Sleep Baby Sleep 與 Pitter Patter <span class="tag">Songs</span></h4>
        <div class="grid2">
          <div>
            <p class="lead"><b>Sleep Baby Sleep</b>（德國傳統搖籃曲）是 <b>3/4</b> 三拍子，每小節強—弱—弱，感覺像搖籃輕輕擺動。開頭 <b>pp</b>，結尾 <b>rit.</b>。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-meter="3">聽三拍子的強弱</button>
            </div>
            <details class="original"><summary>看課本原譜</summary><div class="inner">
              <img class="score-img" src="assets/img/score-sleep.webp" alt="Sleep Baby Sleep 樂譜" loading="lazy">
            </div></details>
          </div>
          <div>
            <p class="lead"><b>Pitter Patter</b>（英文童謠）是 <b>2/4</b> 二拍子，強—弱，像雨點「噼啪、噼啪」落下來，所以聽起來輕快。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" data-meter="2">聽二拍子的強弱</button>
            </div>
            <details class="original"><summary>看課本原譜</summary><div class="inner">
              <img class="score-img" src="assets/img/score-pitter.webp" alt="Pitter Patter 樂譜" loading="lazy">
            </div></details>
          </div>
        </div>
        <p class="readout" id="songOut">按「聽三拍子的強弱」或「聽二拍子的強弱」，感受不同的擺動。</p>
        <div class="tip"><b>怎樣分二拍子和三拍子？</b>跟著音樂點頭：如果感覺是「一左一右」擺動，多數是二拍子；如果是「圓圈式」轉動，多數是三拍子。</div>
      </article>
    `,

    init: function (root) {
      /* ---------- metronome 2/4 ---------- */
      var dots = root.querySelectorAll('#beatVis .beat-dot');
      var metroBtn = root.querySelector('#metroBtn');
      var tempo = root.querySelector('#metroTempo');
      var bpmOut = root.querySelector('#metroBpm');
      var metroOut = root.querySelector('#metroOut');
      var loop = null;
      var bars = 0;

      function stop() {
        if (loop) { loop.stop(); loop = null; }
        metroBtn.textContent = '開始拍子機';
        Array.prototype.forEach.call(dots, function (d) { d.classList.remove('is-on'); });
      }

      function start() {
        var bpm = +tempo.value;
        bars = 0;
        var beat = 60 / bpm;
        loop = w.Sound.loop({
          steps: 2, bpm: bpm, perBeat: 1,
          onStep: function (i, t) {
            w.Sound.click(i === 0, t);
            var delay = Math.max(0, (t - w.Sound.now()) * 1000);
            setTimeout(function () {
              Array.prototype.forEach.call(dots, function (d) { d.classList.remove('is-on'); });
              dots[i].classList.add('is-on');
              if (i === 0) { bars++; metroOut.innerHTML = '第 <b>' + bars + '</b> 小節：強 — 弱'; }
            }, delay);
          }
        });
        metroBtn.textContent = '停止';
        void beat;
      }

      metroBtn.addEventListener('click', function () {
        w.Sound.unlock();
        if (loop) { stop(); return; }
        start();
      });
      tempo.addEventListener('input', function () {
        bpmOut.textContent = this.value;
        if (loop) { stop(); start(); }
      });

      /* ---------- conducting ---------- */
      var path = root.querySelector('#conductPath');
      var hand = root.querySelector('#handMark');
      var cOut = root.querySelector('#conductOut');
      var cBtn = root.querySelector('#conductBtn');
      var cLoop = root.querySelector('#conductLoop');
      var raf = null, condTimeout = null, condRunning = false;

      function moveHand(frac) {
        if (!path || !path.getTotalLength) return;
        var len = path.getTotalLength();
        var pt = path.getPointAtLength(len * Math.min(1, Math.max(0, frac)));
        hand.setAttribute('transform', 'translate(' + pt.x + ',' + pt.y + ')');
      }

      function conductOnce(bpm) {
        var beat = 60 / (bpm || 84);
        var startT = performance.now();
        function frame() {
          var el = (performance.now() - startT) / 1000;
          var beatIndex = Math.floor(el / beat);
          var fracInBeat = (el % beat) / beat;
          // beat 1: 0 -> .5 of path ; beat 2: .5 -> 1
          var overall = ((beatIndex % 2) + fracInBeat) / 2;
          moveHand(overall);
          if (beatIndex !== lastBeat) {
            lastBeat = beatIndex;
            w.Sound.click(beatIndex % 2 === 0, null);
            cOut.innerHTML = beatIndex % 2 === 0 ? '<b>第 1 拍（強）</b>：手向下。' : '<b>第 2 拍（弱）</b>：手向上，準備下一小節。';
          }
          if (condRunning) raf = requestAnimationFrame(frame);
        }
        var lastBeat = -1;
        condRunning = true;
        frame();
      }

      function stopConduct() {
        condRunning = false;
        if (raf) cancelAnimationFrame(raf);
        if (condTimeout) clearTimeout(condTimeout);
        cBtn.textContent = '跟著揮一次';
        cLoop.textContent = '連續練習';
      }

      cBtn.addEventListener('click', function () {
        w.Sound.unlock();
        if (condRunning) { stopConduct(); return; }
        cBtn.textContent = '停止';
        conductOnce(88);
        condTimeout = setTimeout(function () { stopConduct(); moveHand(0); }, (60 / 88) * 1000 * 4);
      });
      cLoop.addEventListener('click', function () {
        w.Sound.unlock();
        if (condRunning) { stopConduct(); moveHand(0); return; }
        cLoop.textContent = '停止練習';
        conductOnce(+tempo.value);
      });

      /* ---------- orchestra ---------- */
      var grid = root.querySelector('#orchGrid');
      var out = root.querySelector('#orchOut');
      grid.innerHTML = orchestra.map(function (o) {
        return '<button class="inst" type="button" data-k="' + o.k + '" data-fam="' + o.fam + '">' +
          w.Icons.orch(o.k) + '<b>' + o.zh + '</b><small>' + o.en + '</small>' +
          '<span class="fam">' + families[o.fam].en + '</span></button>';
      }).join('');

      grid.addEventListener('click', function (e) {
        var b = e.target.closest('.inst');
        if (!b) return;
        var k = b.getAttribute('data-k');
        var o = orchestra.filter(function (x) { return x.k === k; })[0];
        grid.querySelectorAll('.inst').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        w.Sound.timbre(o.fam);
        out.innerHTML = '<b>' + o.zh + '（' + o.en + '）</b>屬於<b>' + families[o.fam].zh + '家族</b>。' + o.desc;
      });

      root.querySelectorAll('[data-fam]').forEach(function (chip) {
        if (chip.classList.contains('chip')) {
          chip.addEventListener('click', function () {
            var f = this.getAttribute('data-fam');
            root.querySelectorAll('.chip[data-fam]').forEach(function (c) { c.classList.remove('is-on'); });
            this.classList.add('is-on');
            grid.querySelectorAll('.inst').forEach(function (b) {
              b.style.display = (f === 'all' || b.getAttribute('data-fam') === f) ? '' : 'none';
            });
          });
        }
      });

      /* ---------- dynamics ---------- */
      var dynOut = root.querySelector('#dynOut');
      var dynMark = root.querySelector('#dynMark');
      var dynMark2 = root.querySelector('#dynMark2');
      var dynArrow = root.querySelector('#dynArrow');

      function setDyn(a, b) {
        dynMark.textContent = a || '';
        dynMark2.textContent = b || '';
        dynMark.style.display = a ? '' : 'none';
        dynMark2.style.display = b ? '' : 'none';
        dynArrow.style.display = (a && b) ? '' : 'none';
      }

      root.querySelectorAll('[data-dyn]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var v = this.getAttribute('data-dyn');
          w.Sound.unlock();
          if (v === 'rit') {
            setDyn('pp', 'rit.');
            dynMark2.style.fontSize = '34px';
            dynOut.innerHTML = '<b>rit.</b>（ritardando）＝ 漸慢。音樂速度慢慢減慢，通常出現在樂曲結尾。';
            var c = w.Sound.unlock(); if (!c) return;
            var beat = 60 / 96;
            var notes = [[67, 1], [69, 1], [71, 1], [72, 2], [71, 1], [69, 1], [67, 3]];
            var t = c.currentTime + 0.1;
            notes.forEach(function (n, i) {
              w.Sound.tone(n[0], t, n[1] * beat * 0.95, { gain: 0.18, rich: true });
              t += n[1] * beat * (1 + i * 0.14);
            });
          } else {
            var g = parseFloat(v);
            var label = g < 0.1 ? 'pp' : g < 0.25 ? 'mf' : 'ff';
            var zh = g < 0.1 ? '極弱' : g < 0.25 ? '中強' : '極強';
            dynMark2.style.fontSize = '52px';
            setDyn('', '');
            dynMark.textContent = label;
            dynMark.style.fontSize = '52px';
            dynMark.style.display = '';
            dynOut.innerHTML = '<b>' + label + '</b>（' + zh + '）：同一句旋律，力度改變，氣氛就完全不同。';
            playPhrase(g, 96);
          }
        });
      });

      /* ---------- song meters ---------- */
      var songLoop = null;
      root.querySelectorAll('[data-meter]').forEach(function (b) {
        b.addEventListener('click', function () {
          var m = +this.getAttribute('data-meter');
          w.Sound.unlock();
          if (songLoop) { songLoop.stop(); songLoop = null; }
          var accentText = m === 3 ? '強 — 弱 — 弱' : '強 — 弱';
          outSong(m, accentText);
          songLoop = w.Sound.loop({
            steps: m, bpm: m === 3 ? 108 : 116, perBeat: 1,
            onStep: function (i, t) { w.Sound.perc(i === 0 ? 'bass' : 'woodblock', t, i === 0 ? 0.9 : 0.35); }
          });
          var self = this;
          setTimeout(function () {
            if (songLoop) { songLoop.stop(); songLoop = null; }
          }, m === 3 ? 6000 : 5000);
          self.textContent = m === 3 ? '再聽一次（三拍）' : '再聽一次（二拍）';
        });
      });
      function outSong(m, text) {
        var el = root.querySelector('#songOut');
        if (el) el.innerHTML = '<b>' + m + '/4</b>：每小節 ' + m + ' 拍，' + text + '。';
      }
    },

    quiz: [
      {
        type: 'mcq',
        q: '拍號 <b>2/4</b> 代表甚麼？',
        options: ['每小節 2 拍，以四分音符為一拍', '每小節 4 拍，以二分音符為一拍', '每小節 2 拍，以八分音符為一拍', '每分鐘 2 拍'],
        answer: 0,
        explain: '上面的數字是每小節的拍數，下面的數字是以哪種音符為一拍（4 ＝ 四分音符）。'
      },
      {
        type: 'mcq',
        q: '2/4 是單二拍，它的強弱規律是？',
        options: ['弱—強', '強—弱', '強—弱—弱', '強—強'],
        answer: 1,
        explain: '第一拍強、第二拍弱，不斷重複。'
      },
      {
        type: 'mcq',
        q: '指揮 2/4 時，<b>第一拍</b>的手勢方向是？',
        options: ['向上', '向下', '向左', '向外畫圈'],
        answer: 1,
        explain: '第一拍（強拍）手由上向下；第二拍（弱拍）再由下向上彈起。'
      },
      {
        type: 'mcq',
        q: '<b>小提琴</b>屬於管弦樂團的哪一個家族？',
        options: ['弦樂家族', '木管家族', '銅管家族', '敲擊家族'],
        answer: 0,
        explain: '小提琴用弓拉弦發聲，是弦樂家族的一員。'
      },
      {
        type: 'multi',
        q: '以下哪些樂器屬於<b>銅管家族</b>？（可選多於一個）',
        options: ['小號 Trumpet', '長笛 Flute', '長號 Trombone', '法國號 French horn'],
        answers: [0, 2, 3],
        explain: '小號、長號、法國號都是用嘴唇震動發聲的銅管樂器；長笛屬於木管家族。'
      },
      {
        type: 'mcq',
        q: '樂譜上的 <b>pp</b> 是甚麼意思？',
        options: ['極強', '極弱', '漸慢', '漸快'],
        answer: 1,
        explain: 'pp 是 pianissimo，意思是極弱，要非常輕聲。'
      },
      {
        type: 'mcq',
        q: '<b>rit.</b> 這個記號提示演奏者要怎樣做？',
        options: ['愈來愈快', '愈來愈慢', '愈來愈大聲', '停下來'],
        answer: 1,
        explain: 'rit. 是 ritardando，即漸慢，通常在樂曲結尾出現。'
      },
      {
        type: 'mcq',
        q: '聽一聽，哪一段是<b>二拍子</b>（強—弱）？',
        audio: 'meter-duple',
        audioNote: '按「播放示範」聽一次，再作答。',
        options: ['第一段（每兩拍一個重音）', '第二段（每三拍一個重音）'],
        answer: 0,
        explain: '重音每兩拍出現一次，就是二拍子；每三拍一次就是三拍子。'
      },
      {
        type: 'mcq',
        q: '《Sleep Baby Sleep》是 3/4 拍，聽起來像搖籃擺動。它每小節的強弱是？',
        options: ['強—弱', '強—弱—弱', '弱—強—弱', '強—強—弱'],
        answer: 1,
        explain: '三拍子每小節三拍：第一拍強，第二、三拍弱。'
      }
    ]
  });
})(window);
