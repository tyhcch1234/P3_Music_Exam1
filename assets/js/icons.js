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

    violin: '<path d="M32 20 C26 20 22 24 22 29 C22 32 24 34 22 37 C19 41 20 49 25 52 C29 54 31 53 32 57 C33 53 35 54 39 52 C44 49 45 41 42 37 C40 34 42 32 42 29 C42 24 38 20 32 20 Z"/><path d="M32 20 V10"/><circle cx="32" cy="7" r="3.2"/><path d="M29 24 V50 M35 24 V50" opacity=".4"/><path d="M26.5 33 q3 2 1 5 M37.5 33 q-3 2 -1 5" opacity=".55"/>',
    cello: '<path d="M32 22 C26 22 22 26 22 31 C22 34 24 36 22 39 C19 43 20 50 25 52 C28 54 31 53 32 56 C33 53 36 54 39 52 C44 50 45 43 42 39 C40 36 42 34 42 31 C42 26 38 22 32 22 Z"/><path d="M32 22 V9"/><circle cx="32" cy="6.5" r="3"/><path d="M32 56 V63 M26 63 H38" stroke-width="2.6"/><path d="M30 28 V48" opacity=".4"/>',
    flute: '<rect x="8" y="27" width="48" height="9" rx="4.5"/><circle cx="24" cy="31.5" r="2.6"/><circle cx="32" cy="31.5" r="2.6"/><circle cx="40" cy="31.5" r="2.6"/><path d="M14 31.5 h4"/>',
    clarinet: '<path d="M30 8 h6 l1 38 l8 8 l-6 4 l-10 -8 z"/><circle cx="31" cy="20" r="2.2"/><circle cx="32" cy="28" r="2.2"/><circle cx="33" cy="36" r="2.2"/><path d="M34 46 l7 6"/>',
    trumpet: '<path d="M8 28 h30 l8 -8 l6 12 l-6 12 l-8 -8 H8 z"/><path d="M48 24 v22" opacity=".5"/><path d="M22 26 v12 M28 26 v12 M34 26 v12"/><path d="M8 28 v12"/>',
    trombone: '<path d="M8 24 h24 v10 H8 z"/><path d="M32 26 h10 v16"/><path d="M42 34 q10 0 10 8 q0 6 -8 6"/><path d="M22 24 v-6 M28 24 v-6"/>',
    horn: '<circle cx="25" cy="36" r="12"/><circle cx="25" cy="36" r="5" opacity=".45"/><path d="M35 28 L57 17 L57 43 L35 35 Z"/><path d="M57 17 q4 13 0 26"/><path d="M22 24 v-5 M28 23 v-6" opacity=".55"/>',
    timpani: '<path d="M16 26 q16 8 32 0 v4 q-16 12 -32 0 z"/><path d="M16 30 v12 q16 10 32 0 V30"/><path d="M16 26 q16 -14 32 0"/><path d="M40 8 L34 26 M50 12 L42 26"/>',
    harp: '<path d="M16 56 L32 10 L52 56 Z"/><path d="M21 56 V41 M26 56 V28 M32 56 V12 M38 56 V24 M44 56 V39" opacity=".45"/><path d="M14 56 H54" stroke-width="3"/>',
    xylophone: '<path d="M12 24 H52 L58 46 H6 Z"/><path d="M16 30 H48 M13 36 H51 M10 42 H54" opacity=".6"/><path d="M22 14 L32 24 M46 12 L38 22"/>'
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
    var s = '<svg class="hand-ic" viewBox="0 0 100 114" fill="#fffdf8" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true">';
    function R(x, y, w, h, r, rot, cx, cy) {
      var t = rot ? ' transform="rotate(' + rot + ' ' + (cx == null ? x + w / 2 : cx) + ' ' + (cy == null ? y + h / 2 : cy) + ')"' : '';
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '"' + t + '/>';
    }
    s += '<path d="M39 86 h22 v13 q0 4 -4 4 h-14 q-4 0 -4 -4 z" fill="#fffdf8" stroke="currentColor" stroke-width="2.4"/>';
    s += '<path d="M42 103 v6 M58 103 v6" stroke-width="2" opacity=".35"/>';
    if (name === 'do') {
      s += '<g>' + R(34, 52, 32, 36, 13) + R(36, 44, 8, 12, 4) + R(45, 42, 8, 14, 4) + R(54, 43, 8, 13, 4) + R(63, 45, 7, 11, 4) + R(36, 65, 27, 8, 4) + '</g>';
    } else if (name === 're') {
      s += '<g transform="rotate(-18 50 74)">' + R(34, 52, 32, 36, 13) + R(36, 44, 8, 12, 4) + R(45, 42, 8, 14, 4) + R(54, 43, 8, 13, 4) + R(63, 45, 7, 11, 4) + R(36, 66, 27, 8, 4) + '</g>';
    } else if (name === 'mi') {
      s += R(28, 48, 38, 30, 13);
      s += R(66, 50, 26, 7.5, 3.6) + R(66, 59, 28, 7.5, 3.6) + R(66, 68, 26, 7.5, 3.6) + R(63, 76.5, 23, 7.5, 3.6);
      s += R(26, 78, 7.5, 17, 3.6, 28, 30, 78);
    } else if (name === 'fa') {
      s += R(34, 50, 32, 36, 13) + R(36, 42, 8, 12, 4) + R(45, 40, 8, 14, 4) + R(54, 41, 8, 13, 4) + R(63, 43, 7, 11, 4);
      s += R(55, 84, 8, 20, 4, 8, 59, 94);
    } else if (name === 'sol') {
      s += R(42, 44, 22, 44, 11);
      s += R(42, 20, 7, 26, 3.6) + R(50.5, 15, 7, 31, 3.6) + R(59, 18, 7, 28, 3.6) + R(66, 25, 6, 21, 3);
    } else if (name === 'la') {
      s += R(34, 26, 34, 32, 13);
      s += R(36, 56, 7, 28, 3.6, 10, 39, 70) + R(45, 58, 7, 30, 3.6, 4, 48, 73) + R(54, 58, 7, 30, 3.6, -4, 57, 73) + R(62, 56, 7, 28, 3.6, -10, 65, 70);
      s += R(24, 28, 7, 16, 3.6, -28, 28, 36);
    } else if (name === 'ti') {
      s += R(34, 52, 32, 36, 13);
      s += R(45.5, 18, 8.5, 36, 4.2);
      s += R(56, 44, 8, 12, 4) + R(64, 46, 7, 10, 4) + R(36, 66, 25, 8, 4);
    }
    s += '</svg>';
    return s;
  }
  Icons.hand = handSVG;

  /* ---------- misc ---------- */
  Icons.play = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
  Icons.stop = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
  Icons.speaker = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 8.5a5 5 0 0 1 0 7"/></svg>';
  Icons.mute = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>';

  w.Icons = Icons;
})(window);
