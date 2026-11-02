/* ============================================================
   Sound — tiny Web Audio synth (no samples, no downloads)
   ============================================================ */
(function (w) {
  'use strict';

  var Sound = {
    enabled: true,
    ready: false,
    ctx: null,
    master: null,
    bus: null,
    noiseBuf: null,
    timers: [],
    _pending: 0
  };

  var A4 = 440;
  var SOLFA = { d: 0, r: 2, m: 4, f: 5, s: 7, l: 9, t: 11 };
  var LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  Sound.init = function () {
    if (Sound.ctx) return Sound.ctx;
    var C = w.AudioContext || w.webkitAudioContext;
    if (!C) return null;
    Sound.ctx = new C();
    Sound.master = Sound.ctx.createGain();
    Sound.master.gain.value = Sound.enabled ? 0.85 : 0;
    Sound.master.connect(Sound.ctx.destination);
    Sound.bus = Sound.ctx.createGain();
    Sound.bus.gain.value = 1;
    Sound.bus.connect(Sound.master);
    Sound.ready = true;
    return Sound.ctx;
  };

  Sound.unlock = function () {
    var c = Sound.init();
    if (c && c.state === 'suspended') c.resume();
    return c;
  };

  Sound.setEnabled = function (on) {
    Sound.enabled = !!on;
    if (Sound.master) Sound.master.gain.value = on ? 0.85 : 0;
    if (on) Sound.unlock();
  };

  Sound.now = function () {
    return Sound.ctx ? Sound.ctx.currentTime : 0;
  };

  Sound.freq = function (midi) {
    return A4 * Math.pow(2, (midi - 69) / 12);
  };

  /* ---------- helpers ---------- */
  function gainEnv(g, t0, dur, peak, attack, release) {
    attack = attack == null ? 0.012 : attack;
    release = release == null ? Math.min(0.35, dur * 0.6) : release;
    var hold = Math.max(0.008, dur - attack - release);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + attack);
    g.gain.setValueAtTime(peak, t0 + attack + hold);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + hold + release);
  }

  function noiseBuffer() {
    if (Sound.noiseBuf) return Sound.noiseBuf;
    var c = Sound.init();
    var len = Math.floor(c.sampleRate * 1.2);
    var buf = c.createBuffer(1, len, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    Sound.noiseBuf = buf;
    return buf;
  }

  /* ---------- basic tone ---------- */
  Sound.tone = function (midi, when, dur, opts) {
    opts = opts || {};
    var c = Sound.unlock();
    if (!c || !Sound.enabled) return;
    var t0 = (when == null ? c.currentTime + 0.02 : when);
    var peak = opts.gain == null ? 0.18 : opts.gain;
    var type = opts.type || 'triangle';

    var g = c.createGain();
    g.connect(Sound.bus);

    var o1 = c.createOscillator();
    o1.type = type;
    o1.frequency.value = Sound.freq(midi);
    if (opts.detune) o1.detune.value = opts.detune;

    var o2 = null;
    if (opts.rich) {
      o2 = c.createOscillator();
      o2.type = 'sine';
      o2.frequency.value = Sound.freq(midi + 12) * 1.002;
      var g2 = c.createGain();
      g2.gain.value = 0.32;
      o2.connect(g2); g2.connect(g);
      o2.start(t0); o2.stop(t0 + dur + 0.4);
    }

    if (opts.vibrato) {
      var lfo = c.createOscillator();
      var lg = c.createGain();
      lfo.frequency.value = opts.vibrato;
      lg.gain.value = opts.vibratoDepth || 6;
      lfo.connect(lg); lg.connect(o1.frequency);
      lfo.start(t0); lfo.stop(t0 + dur + 0.4);
    }

    var lp = null;
    if (opts.cutoff) {
      lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = opts.cutoff;
      lp.Q.value = 0.7;
    }

    o1.connect(g);
    if (lp) { g.disconnect(); g.connect(lp); lp.connect(Sound.bus); }

    gainEnv(g, t0, dur, peak, opts.attack, opts.release);
    o1.start(t0);
    o1.stop(t0 + dur + 0.35);
  };

  /* ---------- note name helper ---------- */
  Sound.midiOf = function (name) {
    var m = /^([A-Ga-g])([#b]?)(-?\d)$/.exec(String(name).trim());
    if (!m) return 60;
    var v = LETTER[m[1].toUpperCase()] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
    return v + (parseInt(m[3], 10) + 1) * 12;
  };

  /* sol-fa token: d r m f s l t, with optional ' (up) or , (down) */
  Sound.solMidi = function (token, doMidi) {
    doMidi = doMidi == null ? 60 : doMidi;
    var s = String(token).trim();
    var up = (s.match(/'/g) || []).length;
    var down = (s.match(/,/g) || []).length;
    var key = s.replace(/[',]/g, '').toLowerCase();
    var semi = SOLFA[key];
    if (semi == null) return doMidi;
    return doMidi + semi + (up - down) * 12;
  };

  /* ---------- melody ---------- */
  /* notes: [[midi, beats], ...] */
  Sound.melody = function (notes, opts) {
    opts = opts || {};
    var c = Sound.unlock();
    if (!c) return { stop: function () {} };
    var bpm = opts.bpm || 100;
    var beat = 60 / bpm;
    var t0 = c.currentTime + (opts.delay == null ? 0.12 : opts.delay);
    var offset = opts.offset || 0;
    var timers = [];

    var acc = 0;
    notes.forEach(function (n, i) {
      var midi = n[0], beats = n[1] || 1;
      var t = t0 + offset + acc * beat;
      if (midi != null) Sound.tone(midi, t, Math.max(0.09, beats * beat * 0.94), {
        type: opts.type || 'triangle',
        gain: opts.gain == null ? 0.16 : opts.gain,
        attack: opts.attack || 0.015,
        release: opts.release == null ? 0.08 : opts.release,
        rich: opts.rich !== false,
        vibrato: opts.vibrato || 0
      });
      if (opts.onNote) {
        var ms = Math.max(0, (t - c.currentTime) * 1000);
        (function (idx, m, b) {
          timers.push(setTimeout(function () { opts.onNote(idx, m, b); }, ms));
        })(i, midi, beats);
      }
      acc += beats;
    });
    var total = acc * beat;
    if (opts.onEnd) timers.push(setTimeout(opts.onEnd, (total + 0.25) * 1000));

    return {
      stop: function () { timers.forEach(clearTimeout); }
    };
  };

  /* ---------- metronome ---------- */
  Sound.click = function (strong, when) {
    var c = Sound.unlock();
    if (!c || !Sound.enabled) return;
    var t0 = when == null ? c.currentTime + 0.01 : when;
    var g = c.createGain();
    g.connect(Sound.bus);
    var o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(strong ? 1250 : 900, t0);
    o.frequency.exponentialRampToValueAtTime(strong ? 700 : 520, t0 + 0.05);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(strong ? 0.32 : 0.16, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.11);
    o.connect(g); o.start(t0); o.stop(t0 + 0.14);
  };

  /* ---------- percussion ---------- */
  function burst(opts) {
    var c = Sound.unlock();
    if (!c || !Sound.enabled) return;
    var t0 = opts.t, src = c.createBufferSource();
    src.buffer = noiseBuffer();
    src.playbackRate.value = opts.rate || 1;
    var f = c.createBiquadFilter();
    f.type = opts.filter || 'bandpass';
    f.frequency.value = opts.freq || 2000;
    f.Q.value = opts.q == null ? 1 : opts.q;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(opts.gain == null ? 0.3 : opts.gain, t0 + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + (opts.dur || 0.12));
    src.connect(f); f.connect(g); g.connect(Sound.bus);
    src.start(t0); src.stop(t0 + (opts.dur || 0.12) + 0.05);
  }

  function ping(freq, t0, dur, gain, type) {
    var c = Sound.unlock();
    if (!c || !Sound.enabled) return;
    var g = c.createGain();
    g.connect(Sound.bus);
    var o = c.createOscillator();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (o.frequency.exponentialRampToValueAtTime) o.frequency.exponentialRampToValueAtTime(freq * 0.55, t0 + dur * 0.9);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); o.start(t0); o.stop(t0 + dur + 0.05);
  }

  Sound.perc = function (kind, when, vel) {
    var c = Sound.unlock();
    if (!c) return;
    var t0 = when == null ? c.currentTime + 0.02 : when;
    var v = vel == null ? 1 : vel;
    switch (kind) {
      case 'triangle':
        ping(2600, t0, 1.4, 0.16 * v);
        ping(3900, t0, 1.1, 0.07 * v);
        burst({ t: t0, freq: 7000, q: 0.8, dur: 0.05, gain: 0.08 * v, filter: 'highpass' });
        break;
      case 'tambourine':
        burst({ t: t0, freq: 6800, q: 0.6, dur: 0.16, gain: 0.22 * v, filter: 'highpass' });
        burst({ t: t0 + 0.06, freq: 8200, q: 0.7, dur: 0.1, gain: 0.12 * v, filter: 'highpass' });
        break;
      case 'bass':
        ping(96, t0, 0.5, 0.5 * v);
        burst({ t: t0, freq: 220, q: 0.8, dur: 0.09, gain: 0.16 * v, filter: 'lowpass' });
        break;
      case 'castanets':
        burst({ t: t0, freq: 2700, q: 3, dur: 0.05, gain: 0.3 * v });
        burst({ t: t0 + 0.085, freq: 3100, q: 3, dur: 0.05, gain: 0.24 * v });
        break;
      case 'snare':
        ping(190, t0, 0.16, 0.22 * v, 'triangle');
        burst({ t: t0, freq: 1900, q: 0.7, dur: 0.18, gain: 0.26 * v });
        break;
      case 'woodblock':
        ping(1150, t0, 0.09, 0.26 * v, 'square');
        burst({ t: t0, freq: 2200, q: 4, dur: 0.04, gain: 0.14 * v });
        break;
      case 'gong':
        ping(120, t0, 2.6, 0.34 * v);
        ping(181, t0, 2.2, 0.14 * v);
        burst({ t: t0, freq: 900, q: 0.5, dur: 0.9, gain: 0.1 * v, filter: 'lowpass' });
        break;
      case 'tom':
        ping(168, t0, 0.34, 0.36 * v);
        break;
      case 'cymbals':
        burst({ t: t0, freq: 5200, q: 0.4, dur: 1.5, gain: 0.24 * v, filter: 'highpass' });
        burst({ t: t0, freq: 3200, q: 0.5, dur: 1.1, gain: 0.12 * v });
        break;
      case 'bongos':
        ping(390, t0, 0.13, 0.3 * v);
        break;
      case 'maracas':
        burst({ t: t0, freq: 6200, q: 0.9, dur: 0.1, gain: 0.24 * v, filter: 'highpass' });
        break;
      case 'congas':
        ping(230, t0, 0.26, 0.34 * v);
        burst({ t: t0, freq: 500, q: 1, dur: 0.06, gain: 0.1 * v });
        break;
      case 'claves':
        ping(2100, t0, 0.09, 0.22 * v, 'sine');
        break;
      default:
        burst({ t: t0, freq: 3000, dur: 0.1, gain: 0.2 * v });
    }
  };

  /* ---------- instrument timbres (orchestra) ---------- */
  Sound.timbre = function (family, when) {
    var c = Sound.unlock();
    if (!c) return;
    var t0 = when == null ? c.currentTime + 0.05 : when;
    var k = { strings: [62, 65, 69, 72], woodwind: [72, 74, 76, 79], brass: [55, 59, 62, 67], percussion: [0, 0, 0, 0] };
    if (family === 'strings') {
      [62, 69, 74].forEach(function (m, i) {
        Sound.tone(m, t0, 1.1, { type: 'sawtooth', gain: 0.07, attack: 0.22, release: 0.4, cutoff: 2200, detune: i * 4 });
      });
    } else if (family === 'woodwind') {
      Sound.tone(74, t0, 0.9, { type: 'sine', gain: 0.15, attack: 0.05, release: 0.18 });
      Sound.tone(79, t0 + 0.12, 0.7, { type: 'sine', gain: 0.08, attack: 0.04 });
    } else if (family === 'brass') {
      [55, 62, 67].forEach(function (m) {
        Sound.tone(m, t0, 0.85, { type: 'square', gain: 0.09, attack: 0.05, release: 0.2, cutoff: 1800 });
      });
    } else {
      Sound.perc('bass', t0);
      Sound.perc('cymbals', t0 + 0.01, 0.7);
    }
    void k;
  };

  /* ---------- transport for loops ---------- */
  Sound.loop = function (opts) {
    var steps = opts.steps || 8;
    var bpm = opts.bpm || 100;
    var stepDur = (60 / bpm) / (opts.perBeat || 2);
    var ctx0 = Sound.unlock();
    if (!ctx0) return { stop: function () {} };
    var running = true;
    var step = 0;
    var nextTime = ctx0.currentTime + 0.1;
    var timer = null;
    var vtimer = null;
    var c = Sound.ctx;

    function tick() {
      if (!running) return;
      while (nextTime < c.currentTime + 0.25) {
        if (opts.onStep) opts.onStep(step % steps, nextTime);
        nextTime += stepDur;
        step++;
      }
      timer = setTimeout(tick, 40);
    }
    // visual callback on a separate clock
    var vStart = performance.now() + 100;
    function visual() {
      if (!running) return;
      var idx = Math.floor((performance.now() - vStart) / (stepDur * 1000));
      if (idx >= 0 && opts.onVisual) opts.onVisual(idx % steps);
      if (opts.onBar) opts.onBar(Math.floor(idx / steps));
      vtimer = setTimeout(visual, Math.max(20, stepDur * 1000 / 2));
    }
    tick(); visual();

    return {
      stop: function () {
        running = false;
        clearTimeout(timer);
        clearTimeout(vtimer);
      }
    };
  };

  /* ---------- global stop ---------- */
  Sound.stopAll = function () {
    Sound.timers.forEach(clearTimeout);
    Sound.timers = [];
    if (!Sound.ctx || !Sound.bus) return;
    var c = Sound.ctx;
    var old = Sound.bus;
    try {
      old.gain.cancelScheduledValues(c.currentTime);
      old.gain.setValueAtTime(old.gain.value, c.currentTime);
      old.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.05);
    } catch (e) { /* ignore */ }
    setTimeout(function () { try { old.disconnect(); } catch (e) { /* ignore */ } }, 120);
    Sound.bus = c.createGain();
    Sound.bus.gain.value = 1;
    Sound.bus.connect(Sound.master);
  };

  /* ---------- named clips ---------- */
  Sound.clips = {};
  Sound.defineClip = function (name, fn) { Sound.clips[name] = fn; };
  Sound.playClip = function (name) {
    var fn = Sound.clips[name];
    if (typeof fn === 'function') fn();
  };

  w.Sound = Sound;
})(window);
