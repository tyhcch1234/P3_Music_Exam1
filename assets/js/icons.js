/* ============================================================
   Icons — inline SVG line art for instruments and hand signs
   ============================================================ */
(function (w) {
  'use strict';

  var OPEN = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var END = '</svg>';

  var Icons = {};

  function wrap(inner, cls) {
    return OPEN.replace('<svg ', '<svg class="' + (cls || 'ic') + '" ') + inner + END;
  }

  var P = {
    triangle: '<path d="M32 12 L16 46 L48 46 Z"/><path d="M38 8 L44 26"/><circle cx="44" cy="28" r="2.4" fill="currentColor" stroke="none"/>',
    tambourine: '<circle cx="32" cy="32" r="19"/><circle cx="32" cy="32" r="14" opacity=".45"/>' +
      '<circle cx="32" cy="14.5" r="2.2" fill="currentColor" stroke="none"/><circle cx="32" cy="49.5" r="2.2" fill="currentColor" stroke="none"/>' +
      '<circle cx="14.5" cy="32" r="2.2" fill="currentColor" stroke="none"/><circle cx="49.5" cy="32" r="2.2" fill="currentColor" stroke="none"/>',
    bassdrum: '<circle cx="31" cy="34" r="20"/><circle cx="31" cy="34" r="8" opacity=".5"/><path d="M31 34 L45 15"/><circle cx="46" cy="13" r="2.6" fill="currentColor" stroke="none"/>',
    castanets: '<path d="M14 24 q13 -10 20 2 q-3 14 -16 12 q-9 -3 -4 -14 z"/><path d="M33 40 q13 -8 19 4 q-2 12 -14 10 q-9 -2 -5 -14 z"/><path d="M22 20 q4 6 2 12"/>',
    snare: '<ellipse cx="32" cy="21" rx="18" ry="6"/><path d="M14 21 v18 c0 3.4 8 6 18 6 s18 -2.6 18 -6 V21"/><path d="M15 26 l34 10 M17 36 l30 -8" opacity=".55"/><path d="M22 12 L34 20 M44 10 L36 20" />',
    woodblock: '<rect x="14" y="26" width="36" height="16" rx="7"/><path d="M22 30 q10 -3 20 0" opacity=".6"/><path d="M44 18 L50 10"/><circle cx="51" cy="9" r="2.4" fill="currentColor" stroke="none"/>',
    gong: '<circle cx="32" cy="34" r="17"/><circle cx="32" cy="34" r="5"/><path d="M32 17 V8 M22 17 L20 9"/><path d="M8 22 L20 9 M56 22 L44 9" opacity=".4"/>',
    tomtom: '<ellipse cx="32" cy="22" rx="16" ry="6"/><path d="M16 22 v16 c0 3.4 7 6 16 6 s16 -2.6 16 -6 V22"/><path d="M18 30 v8 M46 30 v8"/><path d="M13 52 L17 39 M51 52 L47 39"/>',
    cymbals: '<ellipse cx="22" cy="30" rx="15" ry="4" transform="rotate(-18 22 30)"/><ellipse cx="42" cy="36" rx="15" ry="4" transform="rotate(-18 42 36)"/><circle cx="22" cy="30" r="1.8" fill="currentColor" stroke="none"/><circle cx="42" cy="36" r="1.8" fill="currentColor" stroke="none"/><path d="M32 40 v14 M24 54 h16"/>',
    bongos: '<ellipse cx="23" cy="24" rx="11" ry="4"/><path d="M12 24 v20 c0 2.4 5 4 11 4 s11 -1.6 11 -4 V24"/><ellipse cx="44" cy="30" rx="9" ry="3.4"/><path d="M35 30 v16 c0 2 4 3.6 9 3.6 s9 -1.6 9 -3.6 V30"/>',
    maracas: '<ellipse cx="22" cy="22" rx="8" ry="10" transform="rotate(-20 22 22)"/><path d="M26 31 L34 48"/><ellipse cx="43" cy="26" rx="8" ry="10" transform="rotate(18 43 26)"/><path d="M40 35 L34 48"/><path d="M20 14 q4 4 6 9" opacity=".5"/>',
    congas: '<ellipse cx="32" cy="16" rx="12" ry="4.4"/><path d="M20 16 v26 c0 4 5 7 12 7 s12 -3 12 -7 V16"/><path d="M24 49 L20 58 M40 49 L44 58"/><path d="M20 30 h24" opacity=".4"/>',
    claves: '<path d="M14 40 L38 20"/><path d="M26 46 L50 26"/>',

    violin: '<path d="M27 26 c-6 -3 -11 2 -9 8 c1.6 5 6 7 9 6 c3 6 3 12 -1 15 c-5 4 -12 0 -12 -6 c0 -3 2 -5 4 -6"/><path d="M27 26 L38 12"/><path d="M38 12 q4 -4 7 0 q2 4 -2 6"/><path d="M22 30 h6 M20 44 h7" opacity=".6"/><path d="M14 52 L54 14" opacity=".55"/>',
    cello: '<path d="M31 24 c-7 -4 -13 2 -10 9 c1.6 5 6 7 10 6 c3 7 2 13 -3 16 c-6 4 -13 -1 -13 -8 c0 -4 3 -6 6 -7"/><path d="M31 24 L42 8"/><path d="M42 8 q4 -4 7 0 q1 4 -3 5"/><path d="M31 56 v6 M26 62 h10"/>',
    flute: '<rect x="8" y="27" width="48" height="9" rx="4.5"/><circle cx="24" cy="31.5" r="2.6"/><circle cx="32" cy="31.5" r="2.6"/><circle cx="40" cy="31.5" r="2.6"/><path d="M14 31.5 h4"/>',
    clarinet: '<path d="M30 8 h6 l1 38 l8 8 l-6 4 l-10 -8 z"/><circle cx="31" cy="20" r="2.2"/><circle cx="32" cy="28" r="2.2"/><circle cx="33" cy="36" r="2.2"/><path d="M34 46 l7 6"/>',
    trumpet: '<path d="M8 28 h30 l8 -8 l6 12 l-6 12 l-8 -8 H8 z"/><path d="M48 24 v22" opacity=".5"/><path d="M22 26 v12 M28 26 v12 M34 26 v12"/><path d="M8 28 v12"/>',
    trombone: '<path d="M8 24 h24 v10 H8 z"/><path d="M32 26 h10 v16"/><path d="M42 34 q10 0 10 8 q0 6 -8 6"/><path d="M22 24 v-6 M28 24 v-6"/>',
    horn: '<path d="M14 32 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0"/><path d="M24 20 q10 8 0 24"/><path d="M38 18 q-6 14 4 26"/><path d="M30 10 v-4"/>',
    timpani: '<path d="M16 26 q16 8 32 0 v4 q-16 12 -32 0 z"/><path d="M16 30 v12 q16 10 32 0 V30"/><path d="M16 26 q16 -14 32 0"/><path d="M40 8 L34 26 M50 12 L42 26"/>',
    harp: '<path d="M20 52 V16 q0 -6 6 -6 h4"/><path d="M20 52 h24"/><path d="M44 52 q-4 -22 -14 -34"/><path d="M26 22 v22 M31 20 v24 M36 22 v22 M40 28 v18" opacity=".55"/>',
    xylophone: '<path d="M10 26 h44 M10 38 h44"/><path d="M16 26 v12 M26 26 v12 M36 26 v12 M46 26 v12"/><path d="M10 46 h44" opacity=".5"/><path d="M24 12 L34 22"/>'
  };

  /* ---------- orchestral families ---------- */
  Icons.perc = function (k) { return wrap(P[k] || P.woodblock); };
  Icons.orch = function (k) { return wrap(P[k] || P.violin); };

  /* ---------- sol-fa hand signs (schematic) ---------- */
  var HANDS = {
    do: { palm: 1, fingers: 'fist' },
    re: { palm: 1, fingers: 'ramp' },
    mi: { palm: 1, fingers: 'flat' },
    fa: { palm: 1, fingers: 'thumb-down' },
    sol: { palm: 1, fingers: 'vertical' },
    la: { palm: 1, fingers: 'droop' },
    ti: { palm: 1, fingers: 'point-up' }
  };

  function handSVG(name) {
    var cfg = HANDS[name] || HANDS.do;
    var g = '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    // forearm
    g += '<path d="M16 70 q8 -6 8 -14" opacity=".35"/>';
    // palm
    g += '<rect x="24" y="34" width="34" height="24" rx="11" fill="rgba(255,255,255,.5)"/>';
    switch (cfg.fingers) {
      case 'fist':
        g += '<path d="M30 34 v-3 M38 34 v-3 M46 34 v-3 M53 34 v-3" opacity=".55"/>';
        g += '<path d="M26 46 q6 4 12 0 q6 4 12 0" opacity=".45"/>';
        break;
      case 'ramp':
        g += '<path d="M30 34 l6 -12 M38 34 l6 -10 M46 34 l5 -7 M54 36 l3 -4"/>';
        break;
      case 'flat':
        g += '<path d="M58 40 h14 M58 46 h15 M58 52 h14 M56 58 h11"/>';
        break;
      case 'thumb-down':
        g += '<path d="M34 58 q4 8 2 14"/>';
        g += '<path d="M42 34 v-3 M50 34 v-3" opacity=".55"/>';
        break;
      case 'vertical':
        g += '<path d="M26 34 v-16 M34 34 v-20 M42 34 v-19 M50 34 v-14"/>';
        break;
      case 'droop':
        g += '<path d="M30 36 q-2 10 -10 14 M38 36 q-2 12 -9 17 M46 36 q0 12 -6 18 M53 38 q2 10 -2 16"/>';
        break;
      case 'point-up':
        g += '<path d="M38 34 v-22"/><path d="M38 12 l-4 5 M38 12 l4 5" opacity=".7"/>';
        g += '<path d="M46 34 v-3 M52 34 v-3" opacity=".55"/>';
        break;
    }
    g += '</svg>';
    return g;
  }
  Icons.hand = handSVG;

  /* ---------- misc ---------- */
  Icons.play = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  Icons.stop = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
  Icons.speaker = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 8.5a5 5 0 0 1 0 7"/></svg>';
  Icons.mute = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>';

  w.Icons = Icons;
})(window);
