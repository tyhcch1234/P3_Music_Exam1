/* ============================================================
   Unit 4 — Play Music Together for Christmas
   ============================================================ */
(function (w) {
  'use strict';
  w.LESSONS = w.LESSONS || [];

  var perc = [
    { k: 'triangle', zh: '三角鐵', en: 'Triangle', timbre: '叮——清脆、餘音很長', use: '輕輕一敲，聲音會在空氣中停留。' },
    { k: 'tambourine', zh: '鈴鼓', en: 'Tambourine', timbre: '沙沙、叮叮，熱鬧', use: '可以搖，也可以用手掌拍鼓面。' },
    { k: 'bassdrum', zh: '大鼓', en: 'Bass drum', timbre: '低沉、厚實', use: '一下一下，像心跳，支撐整個樂團。' },
    { k: 'castanets', zh: '響板', en: 'Castanets', timbre: '噠噠，短而清脆', use: '用手指一夾，發出兩下短短的聲響。' },
    { k: 'snare', zh: '小鼓', en: 'Snare drum', timbre: '清脆，有「沙沙」的響弦聲', use: '鼓底有響弦，節奏感很強。' },
    { k: 'woodblock', zh: '木魚', en: 'Chinese wood block', timbre: '篤篤，乾脆', use: '像木頭敲擊的聲音，常用來打拍子。' },
    { k: 'gong', zh: '鑼', en: 'Tam tam / Gong', timbre: '宏亮、低沉、餘音裊裊', use: '一敲之下，聲音久久不散。' },
    { k: 'tomtom', zh: '筒鼓', en: 'Tom tom', timbre: '圓潤、有音高的感覺', use: '比小鼓低，比大鼓高。' },
    { k: 'cymbals', zh: '鈸', en: 'Cymbals', timbre: '鏘——尖銳、非常響', use: '兩片金屬互擊，或用鼓棍打。' },
    { k: 'bongos', zh: '邦哥鼓', en: 'Bongos', timbre: '高高、咚咚', use: '兩個相連的小鼓，用手指拍。' },
    { k: 'maracas', zh: '沙槌', en: 'Maracas', timbre: '沙沙沙', use: '搖動時裏面的種子互相碰撞。' },
    { k: 'congas', zh: '康加鼓', en: 'Congas', timbre: '低沉、有彈性', use: '高高的手鼓，用手掌拍出節奏。' }
  ];

  perc.forEach(function (p) {
    w.Sound.defineClip('perc-' + p.k, function () { w.Sound.perc(p.k, null, 1); });
  });

  w.LESSONS.push({
    id: 'unit4',
    tab: 'Unit 4',
    tabSub: '聖誕合奏',
    kicker: 'Unit 4 · Play Music Together for Christmas',
    title: '聖誕合奏',
    en: 'Untuned percussion',
    accent: '#2c7a4b',
    soft: '#e3f1e7',
    deep: '#1d5836',
    image: 'assets/img/unit4.webp',
    imageAlt: '小朋友在聖誕樹前演奏三角鐵、鈴鼓和沙槌的插畫',
    desc: '聖誕合奏不一定需要旋律樂器。無固定音高的敲擊樂器只奏節奏，但一樣可以把氣氛推得熱熱鬧鬧。',
    goals: ['無固定音高敲擊樂器', '12 件樂器音色', '節奏合奏', 'We Wish You a Merry Christmas'],
    teachNote: '先聽齊 12 件樂器的音色，再做聽音練習，最後一起合奏。',
    teach: `
      <article class="card">
        <h4>甚麼是「無固定音高」？ <span class="tag">Untuned percussion</span></h4>
        <div class="split">
          <div>
            <p class="lead">敲擊樂器分成兩類：能奏出準確音高的（例如木琴、定音鼓），和<b>不能奏旋律、只可以奏節奏</b>的——後者叫<b>無固定音高敲擊樂器</b>（untuned percussion instruments）。</p>
            <ul class="plain">
              <li>它們沒有 do re mi，只有「甚麼時候響、響幾下」。</li>
              <li>但它們的<b>音色</b>（timbre）各有特色：清脆、低沉、沙沙、鏘鏘。</li>
              <li>合奏時，不同音色疊在一起，就是聖誕歌的熱鬧氣氛。</li>
            </ul>
          </div>
          <div class="stage" style="margin-top:0;text-align:center">
            <div style="font-size:13px;color:#1d5836;font-weight:700;margin-bottom:6px">無固定音高 · 只有節奏</div>
            <div style="display:flex;gap:6px;justify-content:center;align-items:flex-end;height:64px">
              <span style="display:block;width:16px;height:22px;background:#2c7a4b;border-radius:4px"></span>
              <span style="display:block;width:16px;height:40px;background:#2c7a4b;border-radius:4px"></span>
              <span style="display:block;width:16px;height:16px;background:#8fc4a5;border-radius:4px"></span>
              <span style="display:block;width:16px;height:34px;background:#2c7a4b;border-radius:4px"></span>
              <span style="display:block;width:16px;height:22px;background:#2c7a4b;border-radius:4px"></span>
            </div>
            <p class="hint">節奏有長有短，但沒有高低。</p>
          </div>
        </div>
      </article>

      <article class="card">
        <h4>12 件敲擊樂器 <span class="tag">點擊試聽</span></h4>
        <p class="lead">點一下樂器，聽它的音色，再讀一讀它的形容。這些樂器在聖誕合奏中常常一起出現。</p>
        <div class="inst-grid" id="percGrid"></div>
        <p class="readout" id="percOut">點按任何一件樂器開始。</p>
      </article>

      <article class="card">
        <h4>聽音猜樂器 <span class="tag">小練習</span></h4>
        <p class="lead">老師會把樂器藏在白板後面敲。現在換你：聽一段聲音，選出正確的樂器。</p>
        <div class="stage">
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--primary btn--sm" type="button" id="earPlay">播放聲音</button>
            <span class="q-note" id="earScore">答對 0 題</span>
          </div>
          <div class="pads" id="earOpts" style="justify-content:center;margin-top:14px"></div>
          <p class="readout" id="earOut" style="text-align:center">按「播放聲音」開始。</p>
        </div>
      </article>

      <article class="card">
        <h4>一起合奏：節奏格子 <span class="tag">Ensemble</span></h4>
        <p class="lead">每一行是一件樂器，每一格是半拍（八分音符）。點格子決定哪裏響，再按播放，聽兩層節奏疊在一起。</p>
        <div class="stage">
          <div id="gridRows"></div>
          <div class="btn-row" style="justify-content:center;margin-top:14px">
            <button class="btn btn--primary btn--sm" type="button" id="ensPlay">播放合奏</button>
            <button class="btn btn--sm" type="button" id="ensClear">清空</button>
          </div>
          <div class="slider" style="justify-content:center">
            <span>速度</span><input type="range" id="ensTempo" min="70" max="140" step="4" value="100" aria-label="速度"><b id="ensBpm">100</b>
          </div>
        </div>
        <div class="tip"><b>合奏秘訣：</b>先數「1 2 3 4」，聽著拍子才開始；眼睛看指揮，耳朵聽別人，不要愈打愈快。</div>
      </article>

      <article class="card">
        <h4>We Wish You a Merry Christmas <span class="tag">3/4</span></h4>
        <div class="split">
          <div>
            <p class="lead">這首歌是 <b>3/4</b> 三拍子，每小節強—弱—弱。可以用鈴鼓搖三下、三角鐵在第一拍敲一下，做成簡單的伴奏。</p>
            <div class="btn-row">
              <button class="btn btn--sm" type="button" id="wishPlay">聽三拍伴奏</button>
            </div>
            <p class="readout" id="wishOut">第一拍用三角鐵，第二、三拍用鈴鼓。</p>
          </div>
          <div>
            <img class="score-img" src="assets/img/score-wewish.webp" alt="We Wish You a Merry Christmas 樂譜" loading="lazy">
          </div>
        </div>
      </article>
    `,

    init: function (root) {
      /* ---------- gallery ---------- */
      var grid = root.querySelector('#percGrid');
      var out = root.querySelector('#percOut');
      grid.innerHTML = perc.map(function (p) {
        return '<button class="inst" type="button" data-k="' + p.k + '">' +
          w.Icons.perc(p.k) + '<b>' + p.zh + '</b><small>' + p.en + '</small></button>';
      }).join('');

      grid.addEventListener('click', function (e) {
        var b = e.target.closest('.inst');
        if (!b) return;
        var p = perc.filter(function (x) { return x.k === b.getAttribute('data-k'); })[0];
        grid.querySelectorAll('.inst').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        w.Sound.perc(p.k, null, 1);
        out.innerHTML = '<b>' + p.zh + '（' + p.en + '）</b>：' + p.timbre + '。' + p.use;
      });

      /* ---------- ear training ---------- */
      var earOpts = root.querySelector('#earOpts');
      var earOut = root.querySelector('#earOut');
      var earScore = root.querySelector('#earScore');
      var earPlay = root.querySelector('#earPlay');
      var current = null, locked = true, right = 0, round = 0;

      function newRound() {
        var pool = perc.slice();
        // pick 4 including answer
        var picks = [];
        var answer = pool[Math.floor(Math.random() * pool.length)];
        picks.push(answer);
        while (picks.length < 4) {
          var cand = pool[Math.floor(Math.random() * pool.length)];
          if (picks.indexOf(cand) < 0) picks.push(cand);
        }
        picks.sort(function () { return Math.random() - 0.5; });
        current = answer;
        locked = false;
        earOpts.innerHTML = picks.map(function (p) {
          return '<button class="pad" type="button" data-ans="' + p.k + '"><b>' + p.zh + '</b></button>';
        }).join('');
        earOpts.querySelectorAll('[data-ans]').forEach(function (b) {
          b.addEventListener('click', function () {
            if (locked) return;
            locked = true;
            var ok = this.getAttribute('data-ans') === current.k;
            if (ok) { right++; round++; }
            earScore.textContent = '答對 ' + right + ' / ' + round + ' 題';
            earOut.innerHTML = ok
              ? '答對了！這是 <b>' + current.zh + '</b>：' + current.timbre + '。'
              : '這是 <b>' + current.zh + '</b>：' + current.timbre + '。再聽一次。';
            w.Sound.perc(current.k, null, 1);
            setTimeout(function () { newRound(); w.Sound.perc(current.k, null, 1); }, ok ? 900 : 1600);
          });
        });
      }

      earPlay.addEventListener('click', function () {
        if (!current) newRound();
        w.Sound.perc(current.k, null, 1);
      });

      /* ---------- ensemble grid ---------- */
      var rowsEl = root.querySelector('#gridRows');
      var instruments = ['triangle', 'tambourine', 'bassdrum', 'woodblock', 'maracas', 'snare'];
      var labels = { triangle: '三角鐵', tambourine: '鈴鼓', bassdrum: '大鼓', woodblock: '木魚', maracas: '沙槌', snare: '小鼓' };
      var patterns = [
        { inst: 'triangle', on: [1, 0, 0, 0, 1, 0, 0, 0] },
        { inst: 'tambourine', on: [0, 0, 1, 0, 0, 0, 1, 0] }
      ];
      var ensLoop = null;
      var tempoEl = root.querySelector('#ensTempo');
      var bpmEl = root.querySelector('#ensBpm');

      function buildRows() {
        rowsEl.innerHTML = patterns.map(function (row, ri) {
          var opts = instruments.map(function (k) {
            return '<option value="' + k + '"' + (k === row.inst ? ' selected' : '') + '>' + labels[k] + '</option>';
          }).join('');
          var cells = row.on.map(function (v, ci) {
            return '<button class="ens-cell' + (v ? ' is-on' : '') + '" type="button" data-r="' + ri + '" data-c="' + ci + '" aria-label="第 ' + (ri + 1) + ' 行第 ' + (ci + 1) + ' 格"></button>';
          }).join('');
          return '<div class="ens-row" data-row="' + ri + '">' +
            '<select class="ens-select" data-sel="' + ri + '" aria-label="選擇樂器">' + opts + '</select>' +
            '<div class="ens-cells">' + cells + '</div></div>';
        }).join('');

        rowsEl.querySelectorAll('.ens-cell').forEach(function (b) {
          b.addEventListener('click', function () {
            var r = +this.getAttribute('data-r');
            var c = +this.getAttribute('data-c');
            patterns[r].on[c] = patterns[r].on[c] ? 0 : 1;
            this.classList.toggle('is-on', !!patterns[r].on[c]);
            if (patterns[r].on[c]) w.Sound.perc(patterns[r].inst, null, 1);
          });
        });
        rowsEl.querySelectorAll('.ens-select').forEach(function (s) {
          s.addEventListener('change', function () {
            patterns[+this.getAttribute('data-sel')].inst = this.value;
          });
        });
      }
      buildRows();

      function stopEns() {
        if (ensLoop) { ensLoop.stop(); ensLoop = null; }
        root.querySelector('#ensPlay').textContent = '播放合奏';
        rowsEl.querySelectorAll('.ens-cell').forEach(function (c) { c.classList.remove('is-now'); });
      }

      root.querySelector('#ensPlay').addEventListener('click', function () {
        w.Sound.unlock();
        if (ensLoop) { stopEns(); return; }
        this.textContent = '停止';
        var cells = rowsEl.querySelectorAll('.ens-cell');
        ensLoop = w.Sound.loop({
          steps: 8, bpm: +tempoEl.value, perBeat: 2,
          onStep: function (i, t) {
            patterns.forEach(function (row) {
              if (row.on[i]) w.Sound.perc(row.inst, t, 1);
            });
            var delay = Math.max(0, (t - w.Sound.now()) * 1000);
            setTimeout(function () {
              cells.forEach(function (c) { c.classList.remove('is-now'); });
              rowsEl.querySelectorAll('.ens-cell[data-c="' + i + '"]').forEach(function (c) { c.classList.add('is-now'); });
            }, delay);
          }
        });
      });

      root.querySelector('#ensClear').addEventListener('click', function () {
        patterns.forEach(function (r) { r.on = [0, 0, 0, 0, 0, 0, 0, 0]; });
        buildRows();
      });

      tempoEl.addEventListener('input', function () {
        bpmEl.textContent = this.value;
        if (ensLoop) { stopEns(); root.querySelector('#ensPlay').click(); }
      });

      /* ---------- We wish you ---------- */
      var wishLoop = null;
      var wishOut = root.querySelector('#wishOut');
      root.querySelector('#wishPlay').addEventListener('click', function () {
        w.Sound.unlock();
        if (wishLoop) { wishLoop.stop(); wishLoop = null; this.textContent = '聽三拍伴奏'; return; }
        this.textContent = '停止';
        var self = this;
        wishLoop = w.Sound.loop({
          steps: 3, bpm: 108, perBeat: 1,
          onStep: function (i, t) {
            if (i === 0) w.Sound.perc('triangle', t, 1);
            else w.Sound.perc('tambourine', t, 0.8);
          }
        });
        wishOut.innerHTML = '強—弱—弱：第一拍三角鐵「叮」，第二、三拍鈴鼓「沙沙」。';
        setTimeout(function () {
          if (wishLoop) { wishLoop.stop(); wishLoop = null; }
          self.textContent = '聽三拍伴奏';
        }, 9000);
      });
    },

    quiz: [
      {
        type: 'mcq',
        q: '「無固定音高敲擊樂器」（untuned percussion）可以做到甚麼？',
        options: ['奏出準確的旋律', '只可以奏節奏，不能奏旋律', '只可以吹奏', '只可以拉弦'],
        answer: 1,
        explain: '它們沒有固定的 do re mi，只有節奏；旋律要由有音高的樂器負責。'
      },
      {
        type: 'multi',
        q: '以下哪些是<b>無固定音高</b>敲擊樂器？（可選多於一個）',
        options: ['三角鐵 Triangle', '木琴 Xylophone', '響板 Castanets', '沙槌 Maracas'],
        answers: [0, 2, 3],
        explain: '木琴可以敲出準確的音高、奏旋律，所以不屬於無固定音高樂器。'
      },
      {
        type: 'mcq',
        q: '聽一聽，這是哪一件樂器？',
        audio: 'perc-triangle',
        options: ['三角鐵', '大鼓', '沙槌', '響板'],
        answer: 0,
        explain: '「叮——」一聲，清脆而且餘音很長，就是三角鐵。'
      },
      {
        type: 'mcq',
        q: '哪一件樂器的聲音<b>最低沉、最厚</b>？',
        options: ['三角鐵', '大鼓', '響板', '沙槌'],
        answer: 1,
        explain: '大鼓體積最大，聲音最低沉，像心跳一樣支撐樂團。'
      },
      {
        type: 'mcq',
        q: '鈴鼓（tambourine）可以怎樣演奏？',
        options: ['用弓拉', '搖動或用手掌拍', '用嘴吹', '用手指撥弦'],
        answer: 1,
        explain: '鈴鼓可以搖出「沙沙」聲，也可以拍鼓面打出節奏。'
      },
      {
        type: 'mcq',
        q: '聖誕歌裏常用、聲音像小雪橇鈴鐺的是？',
        options: ['Sleigh bell 馬鈴', 'Bass drum 大鼓', 'Gong 鑼', 'Congas 康加鼓'],
        answer: 0,
        explain: 'Sleigh bell（馬鈴／雪橇鈴）聲音細碎，聖誕歌曲常用來營造雪地氣氛。'
      },
      {
        type: 'mcq',
        q: '《We Wish You a Merry Christmas》是幾拍子？',
        options: ['2/4 二拍子', '3/4 三拍子', '4/4 四拍子', '6/8 六拍子'],
        answer: 1,
        explain: '它是 3/4 三拍子，每小節強—弱—弱。'
      },
      {
        type: 'mcq',
        q: '幾個人一起合奏敲擊樂器時，最重要的規則是？',
        options: ['愈快愈好', '跟著拍子、看指揮、聽別人', '只管自己最大聲', '自己喜歡幾時敲就幾時敲'],
        answer: 1,
        explain: '合奏要整齊：數拍子、看指揮、用耳朵聽其他聲部。'
      }
    ]
  });
})(window);
