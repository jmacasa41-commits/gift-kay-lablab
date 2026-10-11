import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ══════════════════════════════════════════════
   UNIFIED BOUQUET COORDINATES (PURE SVG)
   10 Tulips arranged in a rich, full, rounded bouquet crown:
   - Row 3: Crowning top tulips (y = -105 to -92)
   - Row 2: Middle wide tulips (y = -62 to -54)
   - Row 1: Bottom front tulips (y = -30 to -18)
   All stems connect down to waist (0, 85).
   Wrapper wings (x = ±88, y = -25) embrace the flowers.
══════════════════════════════════════════════ */
const flowerList = [
  // ── ROW 3: Top Crowning Row (Back) ──
  { id: 10, x: 0,   y: -102, sc: 0.90, tilt: 0,   p: '#ce93d8', p2: '#8e24aa', c: '#fff59d' },
  { id: 8,  x: -28, y: -90,  sc: 0.86, tilt: -7,  p: '#ba68c8', p2: '#7b1fa2', c: '#fff9c4' },
  { id: 9,  x: 28,  y: -90,  sc: 0.86, tilt: 7,   p: '#ab47bc', p2: '#6a1b9a', c: '#fff59d' },

  // ── ROW 2: Middle Row ──
  { id: 4,  x: -56, y: -55,  sc: 0.83, tilt: -13, p: '#9575cd', p2: '#512da8', c: '#fffde7' },
  { id: 5,  x: 56,  y: -55,  sc: 0.83, tilt: 13,  p: '#b39ddb', p2: '#7e57c2', c: '#fff59d' },
  { id: 6,  x: -19, y: -60,  sc: 0.88, tilt: -4,  p: '#e1bee7', p2: '#8e24aa', c: '#fff9c4' },
  { id: 7,  x: 19,  y: -60,  sc: 0.88, tilt: 4,   p: '#ce93d8', p2: '#7b1fa2', c: '#ffee58' },

  // ── ROW 1: Bottom / Front Row (resting right in the wrapper opening) ──
  { id: 2,  x: -33, y: -28,  sc: 0.86, tilt: -6,  p: '#ce93d8', p2: '#8e24aa', c: '#fff9c4' },
  { id: 3,  x: 33,  y: -28,  sc: 0.86, tilt: 6,   p: '#ab47bc', p2: '#6a1b9a', c: '#fff59d' },
  { id: 1,  x: 0,   y: -18,  sc: 0.90, tilt: 0,   p: '#ba68c8', p2: '#7b1fa2', c: '#fff59d' },
];

/* Leaves framing the bouquet on sides and behind (NO leaves at bottom) */
const leafList = [
  { id: 'l1', d: 'M-20,25 C-65,-15 -95,-65 -88,-120 C-78,-105 -55,-50 -16,30 Z', col1: '#4caf50', col2: '#1b5e20' },
  { id: 'l2', d: 'M20,25 C65,-15 95,-65 88,-120 C78,-105 55,-50 16,30 Z', col1: '#43a047', col2: '#1b5e20' },
  { id: 'l3', d: 'M-25,30 C-80,0 -100,-35 -92,-78 C-82,-62 -60,-15 -20,35 Z', col1: '#388e3c', col2: '#0d3810' },
  { id: 'l4', d: 'M25,30 C80,0 100,-35 92,-78 C82,-62 60,-15 20,35 Z', col1: '#4caf50', col2: '#1b5e20' },
  { id: 'l5', d: 'M-7,-50 C-18,-100 -12,-140 0,-155 C12,-140 18,-100 7,-50 Z', col1: '#43a047', col2: '#2e7d32' },
];

/* Floating fairy sparkles around bouquet */
const fairySparks = [
  { x: -95, y: -75, sz: 14, char: '✦', col: '#fff176', dly: 0.2 },
  { x: 92,  y: -65, sz: 12, char: '✧', col: '#ce93d8', dly: 0.8 },
  { x: -68, y: -130, sz: 15, char: '✨', col: '#ffffff', dly: 1.4 },
  { x: 70,  y: -125, sz: 13, char: '✦', col: '#f48fb1', dly: 0.5 },
  { x: 0,   y: -165, sz: 16, char: '✧', col: '#fff59d', dly: 1.9 },
  { x: -110, y: -15, sz: 12, char: '✨', col: '#ba68c8', dly: 1.1 },
  { x: 108, y: -10, sz: 14, char: '✦', col: '#ce93d8', dly: 0.7 },
  { x: -50, y: 35,  sz: 11, char: '✧', col: '#fff176', dly: 1.6 },
  { x: 50,  y: 35,  sz: 12, char: '✨', col: '#ffffff', dly: 2.1 },
  { x: -75, y: 85,  sz: 13, char: '✦', col: '#ce93d8', dly: 1.3 },
  { x: 75,  y: 85,  sz: 12, char: '✧', col: '#f48fb1', dly: 0.9 },
];

/* 32 Falling Petals with negative delays so the screen is instantly full of petals */
const fallingPetals = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: (i * 3.1 + (i % 7) * 2.3) % 96 + 2, // 2% to 98%
  size: 9 + (i % 5) * 2.5, // 9px to 19px
  dur: 7.5 + (i % 6) * 1.2, // 7.5s to 13.5s (dreamy slow motion)
  delay: -((i * 1.3) % 9), // NEGATIVE delay = already falling on screen immediately!
  swayDur: 2.6 + (i % 4) * 0.6,
  color: [
    'linear-gradient(135deg, #ce93d8, #ab47bc)',
    'linear-gradient(135deg, #e1bee7, #ba68c8)',
    'linear-gradient(135deg, #f48fb1, #ce93d8)',
    'linear-gradient(135deg, #ba68c8, #7b1fa2)',
    'linear-gradient(135deg, #d1c4e9, #9575cd)',
  ][i % 5],
  rotate: (i * 43) % 360,
}));

/* ══════════════════════════════════════════════
   3-D TULIP HEAD SVG PATHS
══════════════════════════════════════════════ */
function TulipHeadPaths({ uid, p, p2, c }) {
  return (
    <g>
      <defs>
        <radialGradient id={`bp-${uid}`} cx="38%" cy="28%" r="68%">
          <stop offset="0%"   stopColor={p}  stopOpacity="0.85" />
          <stop offset="45%"  stopColor={p2} stopOpacity="0.95" />
          <stop offset="85%"  stopColor={p2} stopOpacity="1" />
          <stop offset="100%" stopColor="#1a0028" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`sp-${uid}`} cx="32%" cy="22%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="18%"  stopColor={p}  stopOpacity="0.95" />
          <stop offset="65%"  stopColor={p2} stopOpacity="1" />
          <stop offset="100%" stopColor="#250042" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`fp-${uid}`} cx="30%" cy="18%" r="72%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="18%"  stopColor={p}  stopOpacity="1" />
          <stop offset="55%"  stopColor={p}  stopOpacity="1" />
          <stop offset="85%"  stopColor={p2} stopOpacity="1" />
          <stop offset="100%" stopColor="#2a0048" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`st-${uid}`} cx="35%" cy="25%" r="70%">
          <stop offset="0%"   stopColor="#fffde7" />
          <stop offset="50%"  stopColor={c} />
          <stop offset="100%" stopColor="#f57f17" />
        </radialGradient>
        <radialGradient id={`hl-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter id={`bl-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Back center petal */}
      <path d="M36 78 C28 58, 26 32, 32 8 C34 2, 38 -1, 40 3 C44 8, 44 32, 40 58 C38 68, 37 74, 36 78Z" fill={`url(#bp-${uid})`} opacity="0.9" />
      {/* Back left petal */}
      <path d="M36 82 C20 68, 4 44, 9 18 C12 5, 22 -1, 29 7 C33 13, 35 42, 36 82Z" fill={`url(#bp-${uid})`} />
      {/* Back right petal */}
      <path d="M36 82 C52 68, 68 44, 63 18 C60 5, 50 -1, 43 7 C39 13, 37 42, 36 82Z" fill={`url(#bp-${uid})`} />

      {/* Stamen glow */}
      <ellipse cx="36" cy="62" rx="11" ry="15" fill={`url(#st-${uid})`} opacity="0.9" />
      {[[-4,-4],[4,-3],[0,-6]].map(([dx,dy],i)=>(
        <circle key={i} cx={36+dx} cy={52+dy} r="1.6" fill={c} stroke="white" strokeWidth="0.5" opacity="0.9" />
      ))}

      {/* Side left petal */}
      <path d="M36 86 C18 72, 2 48, 7 18 C10 6, 22 -2, 30 7 C35 14, 36 48, 36 86Z" fill={`url(#sp-${uid})`} />
      <ellipse cx="17" cy="32" rx="6.5" ry="13" fill={`url(#hl-${uid})`} filter={`url(#bl-${uid})`} transform="rotate(-28 17 32)" opacity="0.5" />

      {/* Side right petal */}
      <path d="M36 86 C54 72, 70 48, 65 18 C62 6, 50 -2, 42 7 C37 14, 36 48, 36 86Z" fill={`url(#sp-${uid})`} />
      <ellipse cx="55" cy="32" rx="6.5" ry="13" fill={`url(#hl-${uid})`} filter={`url(#bl-${uid})`} transform="rotate(28 55 32)" opacity="0.45" />

      {/* Front center main petal */}
      <path d="M36 88 C27 76, 20 54, 23 28 C25 10, 31 2, 36 2 C41 2, 47 10, 49 28 C52 54, 45 76, 36 88Z" fill={`url(#fp-${uid})`} />
      {/* Gloss highlight */}
      <ellipse cx="29" cy="24" rx="8" ry="15" fill={`url(#hl-${uid})`} filter={`url(#bl-${uid})`} transform="rotate(-18 29 24)" opacity="0.75" />
      <ellipse cx="27" cy="17" rx="3.5" ry="6" fill="white" opacity="0.65" transform="rotate(-10 27 17)" />
      {/* Bottom base shadow */}
      <ellipse cx="36" cy="84" rx="14" ry="5" fill="#140024" opacity="0.65" />
    </g>
  );
}

/* ══════════════════════════════════════════════
   MASTER UNIFIED BOUQUET COMPONENT (100% PURE SVG)
   Contains leaves, stems, all 10 flowers, and wrapper
   in ONE single SVG with unified coordinates!
══════════════════════════════════════════════ */
function MasterBouquet() {
  const waistY = 85;

  return (
    <svg
      width="320"
      height="380"
      viewBox="-160 -175 320 380"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        {/* Gradients for wrapper */}
        <linearGradient id="p-wrap1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ba68c8" />
          <stop offset="35%"  stopColor="#9c27b0" />
          <stop offset="80%"  stopColor="#7b1fa2" />
          <stop offset="100%" stopColor="#4a148c" />
        </linearGradient>

        <linearGradient id="p-wrap2" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="#ce93d8" />
          <stop offset="30%"  stopColor="#ab47bc" />
          <stop offset="75%"  stopColor="#8e24aa" />
          <stop offset="100%" stopColor="#4a148c" />
        </linearGradient>

        <linearGradient id="p-tissue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%"  stopColor="#f3e5f5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ce93d8" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="p-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e1bee7" />
          <stop offset="40%"  stopColor="#ba68c8" />
          <stop offset="80%"  stopColor="#8e24aa" />
          <stop offset="100%" stopColor="#4a148c" />
        </linearGradient>

        <linearGradient id="stem-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4caf50" />
          <stop offset="40%"  stopColor="#388e3c" />
          <stop offset="85%"  stopColor="#2e7d32" />
          <stop offset="100%" stopColor="#1b5e20" />
        </linearGradient>

        <filter id="p-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#090014" floodOpacity="0.55" />
        </filter>
        <filter id="p-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ba68c8" floodOpacity="0.35" />
        </filter>
        <filter id="stem-shd" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0a2e0a" floodOpacity="0.4" />
        </filter>

        {leafList.map((lf) => (
          <linearGradient id={`leaf-grad-${lf.id}`} key={lf.id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={lf.col1} />
            <stop offset="100%" stopColor={lf.col2} />
          </linearGradient>
        ))}
      </defs>

      {/* ── LAYER 1: BACK TISSUE & WRAPPER FLAPS ── */}
      <path
        d="M-88,-25 L-20,85 L20,85 L88,-25 C50,-5 -50,-5 -88,-25 Z"
        fill="#4a148c"
        opacity="0.8"
      />
      <path
        d="M-80,-18 C-45,-5 -15,5 0,6 C15,5 45,-5 80,-18 C60,2 -60,2 -80,-18 Z"
        fill="url(#p-tissue)"
        opacity="0.85"
      />

      {/* ── LAYER 2: LEAVES FRAMING THE BOUQUET (SIDES & TOP) ── */}
      {leafList.map((lf) => (
        <path
          key={lf.id}
          d={lf.d}
          fill={`url(#leaf-grad-${lf.id})`}
          filter="url(#stem-shd)"
        />
      ))}

      {/* ── LAYER 3: STEMS CONVERGING DOWN TO WAIST ── */}
      {flowerList.map((f) => {
        const startX = f.x;
        const startY = f.y + 24;
        const ctrlX = f.x * 0.4;
        const ctrlY = (startY + waistY) * 0.52;
        const pathData = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${f.x * 0.1} ${waistY}`;

        return (
          <path
            key={f.id}
            d={pathData}
            fill="none"
            stroke="url(#stem-grad)"
            strokeWidth={f.id === 1 || f.id === 10 ? 5 : 4}
            strokeLinecap="round"
            filter="url(#stem-shd)"
          />
        );
      })}

      {/* ── LAYER 4: ALL 10 TULIP FLOWERS (PURE SVG TRANSLATE — NEVER COLLAPSE) ── */}
      {flowerList.map((f) => (
        <g
          key={f.id}
          transform={`translate(${f.x}, ${f.y}) rotate(${f.tilt}) scale(${f.sc})`}
          style={{ filter: 'drop-shadow(0 6px 14px rgba(13,0,26,0.48))' }}
        >
          <g transform="translate(-36, -46)">
            <TulipHeadPaths uid={`t_${f.id}`} p={f.p} p2={f.p2} c={f.c} />
          </g>
        </g>
      ))}

      {/* ── LAYER 5: FRONT OVERLAPPING PURPLE WRAPPER CONE (AROUND STEMS) ── */}
      {/* Left wrap fold */}
      <path
        d="M-88,-25 C-50,12 -30,52 -18,85 L18,85 C-4,48 -35,10 -65,-15 Z"
        fill="url(#p-wrap1)"
        filter="url(#p-shadow)"
      />
      {/* Right wrap fold (overlaps left) */}
      <path
        d="M88,-25 C50,12 30,52 18,85 L-18,85 C4,48 35,10 65,-15 Z"
        fill="url(#p-wrap2)"
        filter="url(#p-shadow)"
      />
      {/* Main front wrapping cone body */}
      <path
        d="M-72,-12 C-45,28 -26,62 -18,85 L18,85 C26,62 45,28 72,-12 C38,6 -38,6 -72,-12 Z"
        fill="url(#p-wrap1)"
        filter="url(#p-glow)"
      />
      {/* Crease fold lines */}
      <path d="M-70,-10 C-40,22 -22,58 -16,85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" fill="none" />
      <path d="M70,-10 C40,22 22,58 16,85" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" fill="none" />
      <path d="M0,0 L0,85" stroke="rgba(74,20,140,0.4)" strokeWidth="1.5" fill="none" />

      {/* ── LAYER 6: RIBBON BELT & BOW TIED AT WAIST ── */}
      {/* Ribbon belt */}
      <path
        d="M-24,82 C-8,78 8,78 24,82 L22,95 C8,98 -8,98 -22,95 Z"
        fill="url(#p-ribbon)"
        filter="url(#p-shadow)"
      />
      <path d="M-22,89 C-8,85 8,85 22,89" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" fill="none" />

      {/* Ribbon left loop */}
      <path
        d="M-4,88 C-20,74 -36,76 -34,87 C-32,96 -18,94 -4,90 Z"
        fill="#ba68c8"
        filter="url(#p-shadow)"
      />
      <path d="M-5,88 C-18,78 -30,80 -28,87" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />

      {/* Ribbon right loop */}
      <path
        d="M4,88 C20,74 36,76 34,87 C32,96 18,94 4,90 Z"
        fill="#ab47bc"
        filter="url(#p-shadow)"
      />
      <path d="M5,88 C18,78 30,80 28,87" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />

      {/* Center knot */}
      <ellipse cx="0" cy="89" rx="6.5" ry="5" fill="#6a1b9a" stroke="#ce93d8" strokeWidth="1.2" />

      {/* Hanging ribbon tails */}
      <path d="M-3,93 C-9,108 -15,124 -22,138 L-16,139 C-10,125 -5,109 -1,94 Z" fill="#9c27b0" />
      <path d="M3,93 C9,108 15,124 22,138 L16,139 C10,125 5,109 1,94 Z" fill="#8e24aa" />

      {/* ── LAYER 7: BOTTOM FLARED SKIRT & CUT STEM TIPS ── */}
      <path
        d="M-20,95 C-28,114 -40,134 -50,146 C-25,139 0,142 0,146 C0,142 25,139 50,146 C40,134 28,114 20,95 Z"
        fill="url(#p-wrap2)"
        filter="url(#p-shadow)"
      />
      <path d="M-18,97 L-40,142" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />
      <path d="M18,97 L40,142" stroke="rgba(74,20,140,0.35)" strokeWidth="1.2" fill="none" />
      <path d="M0,97 L0,146" stroke="rgba(74,20,140,0.45)" strokeWidth="1.4" fill="none" />

      {/* Cute clean cut stems at base */}
      {[ -6, -2, 2, 6 ].map((sx, idx) => (
        <line
          key={idx}
          x1={sx} y1={144}
          x2={sx * 1.3} y2={155}
          stroke="#2e7d32"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════
   STARS & SHOOTING STARS
══════════════════════════════════════════════ */
const stars = Array.from({ length: 55 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 80,
  sz: 1 + Math.random() * 2.5,
  d: Math.random() * 4, dur: 2.0 + Math.random() * 2.5,
}));

const shooting = [
  { x: 10, y: 8,  d: 2.5, angle: 35 },
  { x: 74, y: 5,  d: 6.8, angle: 40 },
  { x: 38, y: 15, d: 10.5, angle: 32 },
];

/* ══════════════════════════════════════════════
   HEART BURST TRANSITION
══════════════════════════════════════════════ */
function HeartBurst() {
  const pts = Array.from({ length: 20 }, (_, i) => {
    const ang = (i / 20) * 360;
    const rad = (ang * Math.PI) / 180;
    return {
      x: Math.cos(rad) * (90 + Math.random() * 80),
      y: Math.sin(rad) * (90 + Math.random() * 80),
      sz: 9 + Math.random() * 14,
      col: ['#ce93d8','#9c27b0','#ba68c8','#7c4dff','#fff176'][i % 5],
      d: Math.random() * 0.15,
    };
  });
  return (
    <>
      {pts.map((p, i) => (
        <motion.div key={i}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ delay: p.d, duration: 0.95, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            marginLeft: -p.sz / 2, marginTop: -p.sz / 2,
            width: p.sz, height: p.sz * 1.2,
            background: p.col, borderRadius: '50% 50% 40% 40%',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════
   HEART SCREEN (TAP TO OPEN)
══════════════════════════════════════════════ */
function HeartScreen({ onOpen }) {
  const [tapped, setTapped] = useState(false);
  const handleTap = () => { if (tapped) return; setTapped(true); setTimeout(onOpen, 900); };

  return (
    <motion.div
      key="heart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.5 }}
      onClick={handleTap}
      style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 50% 55%, #1a0828 0%, #0d001a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 50, overflow: 'hidden', cursor: 'pointer',
      }}
    >
      {stars.map(s => (
        <motion.div key={s.id}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ delay: s.d, duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            width: s.sz, height: s.sz, borderRadius: '50%',
            background: 'white', pointerEvents: 'none',
            boxShadow: `0 0 ${s.sz * 2}px white`,
          }}
        />
      ))}

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, #9c27b066, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(1.1rem, 5vw, 1.45rem)',
          fontWeight: 800, letterSpacing: '0.22em', color: '#fff',
          textShadow: '0 0 20px #ce93d8cc, 0 0 40px #9c27b066',
          marginBottom: 32, textTransform: 'uppercase',
        }}
      >
        Tap to Open
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={tapped
          ? { scale: [1, 1.4, 0], opacity: [1, 1, 0], rotate: [0, -10, 10, 0] }
          : { scale: [1, 1.08, 1], opacity: 1 }
        }
        transition={tapped
          ? { duration: 0.85 }
          : { delay: 0.3, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ position: 'relative' }}
      >
        {tapped && <HeartBurst />}
        <svg viewBox="0 0 100 90" width="min(58vw, 250px)" height="min(58vw, 250px)"
          style={{ filter: 'drop-shadow(0 0 28px #ce93d8bb) drop-shadow(0 0 55px #9c27b055)' }}>
          <defs>
            <radialGradient id="hg" cx="50%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#e040fb" />
              <stop offset="40%" stopColor="#9c27b0" />
              <stop offset="100%" stopColor="#4a148c" />
            </radialGradient>
            <radialGradient id="hs" cx="32%" cy="22%" r="38%">
              <stop offset="0%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 85 C50 85 5 55 5 28 C5 12 17 2 30 2 C38 2 45 7 50 13 C55 7 62 2 70 2 C83 2 95 12 95 28 C95 55 50 85 50 85Z" fill="url(#hg)" />
          <path d="M50 85 C50 85 5 55 5 28 C5 12 17 2 30 2 C38 2 45 7 50 13 C55 7 62 2 70 2 C83 2 95 12 95 28 C95 55 50 85 50 85Z" fill="url(#hs)" />
          <ellipse cx="36" cy="22" rx="13" ry="8" fill="white" opacity="0.2" transform="rotate(-15 36 22)" />
        </svg>
      </motion.div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', color: '#ce93d8', marginTop: 38 }}
      >
        🌷 for you, lablab 🌷
      </motion.p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   BOUQUET SCREEN (PERFECTLY ALIGNED & ABUNDANT PETALS)
══════════════════════════════════════════════ */
function BouquetScreen({ onBack }) {
  return (
    <motion.div
      key="bouquet"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(175deg, #090014 0%, #160030 30%, #0c1844 70%, #061028 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', zIndex: 50,
      }}
    >
      {/* CSS Animation Keyframes for Silky Smooth Falling Petals */}
      <style>{`
        @keyframes petalFallSlow {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes petalSwaySide {
          0% {
            margin-left: -20px;
          }
          50% {
            margin-left: 20px;
          }
          100% {
            margin-left: -20px;
          }
        }
      `}</style>

      {/* Background Starfield */}
      {stars.map(s => (
        <motion.div key={s.id}
          animate={{ opacity: [0.12, 0.9, 0.12] }}
          transition={{ delay: s.d, duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            width: s.sz, height: s.sz, borderRadius: '50%',
            background: 'white', pointerEvents: 'none',
            boxShadow: `0 0 ${s.sz * 2}px white`,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shooting.map((ss, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x: 140, y: 70 }}
          transition={{ delay: ss.d, duration: 1.4, repeat: Infinity, repeatDelay: 6.5 + i * 3, ease: 'easeIn' }}
          style={{
            position: 'absolute', left: `${ss.x}%`, top: `${ss.y}%`,
            width: 70, height: 2,
            background: 'linear-gradient(90deg, white, transparent)',
            borderRadius: 2, transform: `rotate(${ss.angle}deg)`, transformOrigin: 'left center',
            pointerEvents: 'none', boxShadow: '0 0 5px white',
          }}
        />
      ))}

      {/* 32 ABUNDANT SLOW-MOTION FALLING PETALS (Immediately active on entire screen) */}
      {fallingPetals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.35,
            background: p.color,
            borderRadius: '50% 50% 38% 38%',
            pointerEvents: 'none',
            zIndex: 4,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            animation: `petalFallSlow ${p.dur}s linear infinite, petalSwaySide ${p.swayDur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Title with Romantic Neon Glow */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: '3.5%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center', zIndex: 30, pointerEvents: 'none', whiteSpace: 'nowrap',
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
          fontSize: 'clamp(1.75rem, 6.5vw, 2.85rem)', fontWeight: 700,
          color: '#e1bee7',
          textShadow: '0 0 15px #ba68c8, 0 0 35px #9c27b0, 0 0 55px #7b1fa2, 0 2px 10px rgba(0,0,0,0.6)',
        }}>
          Flowers For You
        </div>
        <motion.div
          animate={{ scaleX: [0.75, 1.1, 0.75], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ height: 2, background: 'linear-gradient(90deg,transparent,#ce93d8,transparent)', borderRadius: 2, marginTop: 8 }}
        />
      </motion.div>

      {/* ═══ BOUQUET ASSEMBLY (PERFECTLY PANTAY & SLOW-MOTION FLOAT) ═══ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.78, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: 320,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        {/* Slow-motion floating drift (Whole bouquet moves as ONE unified entity) */}
        <motion.div
          animate={{
            y: [-6, 8, -6],
            rotate: [-0.6, 0.6, -0.6],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Dreamy Aura Backglow Effect */}
          <motion.div
            animate={{
              scale: [0.95, 1.14, 0.95],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: 320,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 50% 45%, rgba(186,104,200,0.4) 0%, rgba(123,31,162,0.18) 48%, transparent 72%)',
              filter: 'blur(18px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Fairy Sparkles & Glowing Dust */}
          {fairySparks.map((sp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.95, 0],
                scale: [0.4, 1.35, 0.4],
                y: [0, -18, -36],
              }}
              transition={{
                delay: sp.dly + 0.5,
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                left: `calc(50% + ${sp.x}px)`,
                top: `calc(50% + ${sp.y}px)`,
                fontSize: sp.sz,
                color: sp.col,
                textShadow: `0 0 8px ${sp.col}, 0 0 16px #ffffff`,
                pointerEvents: 'none',
                zIndex: 25,
              }}
            >
              {sp.char}
            </motion.div>
          ))}

          {/* THE MASTER BOUQUET (All 10 Flowers + Wrapper + Stems + Leaves) */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <MasterBouquet />
          </div>
        </motion.div>
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #9c27b0, #4a148c)',
          color: 'white', border: '1px solid rgba(206,147,216,0.3)', padding: '11px 32px',
          borderRadius: 30, fontFamily: "'Outfit', sans-serif",
          fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(156,39,176,0.55), 0 0 15px rgba(206,147,216,0.3)', zIndex: 60,
        }}
      >
        ← Back to Gift Box
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function FlowersModal({ onBack }) {
  const [opened, setOpened] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!opened
        ? <HeartScreen key="heart" onOpen={() => setOpened(true)} />
        : <BouquetScreen key="bouquet" onBack={onBack} />
      }
    </AnimatePresence>
  );
}
