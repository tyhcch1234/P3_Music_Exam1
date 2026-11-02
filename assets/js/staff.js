/* ============================================================
   Staff — SVG five-line staff renderer
   p = staff step, 0 = bottom line (E4 in treble clef)
   ============================================================ */
(function (w) {
  'use strict';

  var NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  var Staff = {
    gap: 14,
    top: 44,
    clefX: 20,
    startX: 96
  };

  /* clef tables: p = 0 is the bottom line of that clef */
  var CLEFS = {
    treble: { names: ['E', 'F', 'G', 'A', 'B', 'C', 'D'], base: 4, wrap: 5 },
    bass: { names: ['G', 'A', 'B', 'C', 'D', 'E', 'F'], base: 2, wrap: 3 },
    alto: { names: ['F', 'G', 'A', 'B', 'C', 'D', 'E'], base: 3, wrap: 4 }
  };

  Staff.pToName = function (p, clef) {
    var t = CLEFS[clef] || CLEFS.treble;
    var c = ((p % 7) + 7) % 7;
    var oct = t.base + Math.floor(p / 7) + (c >= t.wrap ? 1 : 0);
    var name = t.names[c];
    return { name: name, oct: oct, label: name + oct };
  };

  /* midi number of a staff position, used for playback */
  Staff.pToMidi = function (p, clef) {
    var n = Staff.pToName(p, clef);
    return Sound.midiOf(n.label);
  };

  Staff.yOf = function (p, top, gap) {
    top = top == null ? Staff.top : top;
    gap = gap == null ? Staff.gap : gap;
    return top + 4 * gap - p * gap / 2;
  };

  Staff.clefSVG = function (x, y0, gap) {
    // simple elegant treble clef path scaled to staff height
    var s = gap / 14;
    return '<g transform="translate(' + x + ',' + (y0 + 2.1 * gap) + ') scale(' + s + ')" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round">' +
      '<path d="M14 -26 C22 -18 22 -8 14 0 C6 8 2 14 4 20 C6 27 14 26 16 19 C18 12 10 8 4 12 C-2 16 -2 26 4 30 C10 34 18 32 20 24"/>' +
      '<path d="M14 -26 C10 -14 8 4 8 18 C8 30 10 36 12 40"/>' +
      '<circle cx="12" cy="42" r="3.4" fill="currentColor" stroke="none"/>' +
      '</g>';
  };

  Staff.bassSVG = function (x, y0, gap) {
    var s = gap / 14;
    return '<g transform="translate(' + x + ',' + (y0 + 1.2 * gap) + ') scale(' + s + ')" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M6 -14 C-2 -16 -4 -6 2 0 C8 6 18 8 22 2 C26 -4 20 -10 14 -6 C8 -2 10 10 18 16 C24 20 28 14 26 8"/>' +
      '<circle cx="4" cy="-4" r="2.6" fill="currentColor" stroke="none"/>' +
      '<circle cx="24" cy="12" r="2.6" fill="currentColor" stroke="none"/>' +
      '</g>';
  };

  Staff.altSVG = function (x, y0, gap) {
    var s = gap / 14;
    return '<g transform="translate(' + x + ',' + (y0 + 1.6 * gap) + ') scale(' + s + ')" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M-4 -16 L-4 16 M16 -16 L16 16"/>' +
      '<path d="M-4 0 L16 0"/>' +
      '<path d="M4 -16 C4 -8 8 -8 8 0 C8 8 4 8 4 16"/>' +
      '</g>';
  };

  function notePath(cx, cy, dur, p, color, accent) {
    var filled = dur !== 'h' && dur !== 'w';
    var head = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="7.6" ry="5.6" transform="rotate(-20 ' + cx + ' ' + cy + ')" ' +
      (filled ? 'fill="' + color + '"' : 'fill="#fffdf8" stroke="' + color + '" stroke-width="2"') + '/>';
    var stem = '';
    var flag = '';
    if (dur !== 'w') {
      var up = p < 4;
      var sx = up ? cx + 7 : cx - 7;
      var sy1 = cy + (up ? -1 : 1);
      var sy2 = sy1 + (up ? -32 : 32);
      stem = '<line x1="' + sx + '" y1="' + sy1 + '" x2="' + sx + '" y2="' + sy2 + '" stroke="' + color + '" stroke-width="1.9" stroke-linecap="round"/>';
      if (dur === 'e') {
        flag = '<path d="M' + sx + ' ' + sy2 + ' q 11 6 8 18" fill="none" stroke="' + color + '" stroke-width="2.4" stroke-linecap="round"/>';
      }
      if (dur === 'h') { /* open head already */ }
    }
    void accent;
    return head + stem + flag;
  }

  /* opts:
     notes: [{p, dur, label, accidental, colour, ghost}]
     width, height, clef, showNames, accent, labels: bool
  */
  Staff.render = function (opts) {
    opts = opts || {};
    var notes = opts.notes || [];
    var gap = opts.gap || Staff.gap;
    var top = opts.top || Staff.top;
    var width = opts.width || 520;
    var clef = opts.clef || 'treble';
    var color = opts.color || '#232733';
    var accent = opts.accent || '#12857f';
    var height = opts.height || (top + 4 * gap + 62);
    var x0 = 18;
    var x1 = width - 16;
    var bottom = top + 4 * gap;

    var s = '<svg class="staff-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="五線譜" style="color:' + color + ';width:100%;height:auto;display:block">';

    // staff lines
    for (var i = 0; i < 5; i++) {
      var y = top + i * gap;
      s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + color + '" stroke-width="1.4" opacity=".55"/>';
    }
    s += '<line x1="' + (x1 - 2) + '" y1="' + top + '" x2="' + (x1 - 2) + '" y2="' + bottom + '" stroke="' + color + '" stroke-width="1.6" opacity=".55"/>';
    s += '<line x1="' + (x1 - 9) + '" y1="' + top + '" x2="' + (x1 - 9) + '" y2="' + bottom + '" stroke="' + color + '" stroke-width="3" opacity=".55"/>';

    // clef
    if (clef === 'bass') s += Staff.bassSVG(Staff.clefX + 6, top, gap);
    else if (clef === 'alto') s += Staff.altSVG(Staff.clefX + 2, top, gap);
    else s += Staff.clefSVG(Staff.clefX + 2, top, gap);

    // time signature
    if (opts.time) {
      var tx = Staff.clefX + 52;
      s += '<text x="' + tx + '" y="' + (top + 1.55 * gap) + '" font-family="Baloo 2, sans-serif" font-size="' + (gap * 1.85) + '" font-weight="700" fill="' + color + '" text-anchor="middle">' + opts.time[0] + '</text>';
      s += '<text x="' + tx + '" y="' + (top + 3.5 * gap) + '" font-family="Baloo 2, sans-serif" font-size="' + (gap * 1.85) + '" font-weight="700" fill="' + color + '" text-anchor="middle">' + opts.time[1] + '</text>';
    }

    // notes
    var startX = opts.startX || (opts.time ? Staff.startX + 26 : Staff.startX);
    var span = Math.max(40, x1 - startX - 34);
    var stepX = notes.length > 1 ? Math.min(96, span / (notes.length - 1)) : 0;
    if (notes.length === 1) startX = (startX + x1) / 2 - 12;

    notes.forEach(function (n, idx) {
      var cx = startX + idx * stepX;
      var cy = Staff.yOf(n.p, top, gap);
      // ledger lines
      if (n.p <= -2) {
        for (var lp = -2; lp >= n.p; lp -= 2) {
          var ly = Staff.yOf(lp, top, gap);
          s += '<line x1="' + (cx - 15) + '" y1="' + ly + '" x2="' + (cx + 15) + '" y2="' + ly + '" stroke="' + color + '" stroke-width="1.4" opacity=".55"/>';
        }
      }
      if (n.p >= 10) {
        for (var hp = 10; hp <= n.p; hp += 2) {
          var hy = Staff.yOf(hp, top, gap);
          s += '<line x1="' + (cx - 15) + '" y1="' + hy + '" x2="' + (cx + 15) + '" y2="' + hy + '" stroke="' + color + '" stroke-width="1.4" opacity=".55"/>';
        }
      }
      if (n.ghost) {
        s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="11" ry="9" fill="none" stroke="' + accent + '" stroke-width="2" stroke-dasharray="4 4" opacity=".85"/>';
        s += '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + accent + '">?</text>';
      } else {
        if (n.accidental) {
          s += '<text x="' + (cx - 24) + '" y="' + (cy + 5) + '" font-size="17" font-weight="700" fill="' + color + '">' + n.accidental + '</text>';
        }
        s += notePath(cx, cy, n.dur || 'q', n.p, n.colour || color, accent);
      }
      if (n.label != null) {
        s += '<text x="' + cx + '" y="' + (bottom + 30) + '" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="14" font-weight="700" fill="' + (n.labelColour || accent) + '">' + n.label + '</text>';
      }
    });

    s += '</svg>';
    return s;
  };

  /* interactive explorer: lines & spaces clickable */
  Staff.explore = function (opts) {
    opts = opts || {};
    var gap = 16, top = 46, width = opts.width || 640;
    var height = top + 4 * gap + 40;
    var x0 = 18, x1 = width - 168;
    var color = '#232733';
    var s = '<svg class="staff-svg" viewBox="0 0 ' + width + ' ' + height + '" style="width:100%;height:auto;display:block" role="group" aria-label="點擊五線譜上的線與間">';

    for (var i = 0; i < 5; i++) {
      var y = top + i * gap;
      s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + color + '" stroke-width="1.4" opacity=".6"/>';
    }
    s += Staff.clefSVG(Staff.clefX + 2, top, gap);

    var startX = 118;
    for (var p = 0; p <= 8; p++) {
      var cy = Staff.yOf(p, top, gap);
      var isLine = p % 2 === 0;
      var label = Staff.pToName(p).label;
      s += '<g class="staff-hit" data-p="' + p + '" tabindex="0" role="button" aria-label="' + (isLine ? '第 ' + (p / 2 + 1) + ' 線，' : '第 ' + ((p - 1) / 2 + 1) + ' 間，') + label + '">' +
        '<rect x="' + (startX - 20) + '" y="' + (cy - 8) + '" width="' + (x1 - startX + 24) + '" height="16" fill="transparent" style="cursor:pointer"/>' +
        '<circle cx="' + startX + '" cy="' + cy + '" r="5" fill="#d9cdb6"/>' +
        '</g>';
    }

    // right-hand labels (lines and spaces in two columns, never overlapping)
    for (var lp = 0; lp <= 8; lp += 2) {
      var ly = Staff.yOf(lp, top, gap) + 4;
      s += '<text x="' + (x1 + 16) + '" y="' + ly + '" font-size="11" fill="#a99e8c">第 ' + (lp / 2 + 1) + ' 線</text>';
      s += '<text x="' + (x1 + 58) + '" y="' + ly + '" font-size="11" font-weight="700" fill="#8a7f6d">' + Staff.pToName(lp).label + '</text>';
    }
    for (var sp = 1; sp <= 7; sp += 2) {
      var sy = Staff.yOf(sp, top, gap) + 4;
      s += '<text x="' + (x1 + 90) + '" y="' + sy + '" font-size="11" fill="#a99e8c">第 ' + ((sp - 1) / 2 + 1) + ' 間</text>';
      s += '<text x="' + (x1 + 132) + '" y="' + sy + '" font-size="11" font-weight="700" fill="#8a7f6d">' + Staff.pToName(sp).label + '</text>';
    }
    s += '</svg>';
    return s;
  };

  w.Staff = Staff;
})(window);
