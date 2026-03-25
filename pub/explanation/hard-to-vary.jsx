import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a26",
  accent: "#e8c547",
  accentDim: "#b8992e",
  bad: "#e05555",
  badDim: "#a03333",
  good: "#47c78e",
  goodDim: "#2a8a5e",
  text: "#e8e6e1",
  textDim: "#8a877f",
  border: "#2a2a3a",
  cardBg: "#15151f",
};

const explanations = {
  persephone: {
    title: "Persephone Myth",
    type: "bad",
    summary: "Demeter grieves when her daughter Persephone is in the underworld, so the world grows cold.",
    parts: [
      { label: "Who goes underground", value: "Persephone", alternatives: ["Apollo", "Athena", "Hermes", "Any god"] },
      { label: "Who grieves", value: "Demeter", alternatives: ["Zeus", "Hera", "Poseidon", "Any god"] },
      { label: "Emotion causing winter", value: "Grief", alternatives: ["Anger", "Boredom", "Jealousy", "Any emotion"] },
      { label: "Why they return", value: "Zeus intervenes", alternatives: ["Gets bored", "Misses sunlight", "Makes a deal", "Any reason"] },
    ],
  },
  tilt: {
    title: "Axial Tilt",
    type: "good",
    summary: "Earth's 23.5° tilt causes varying sun angles throughout its orbit, creating seasons.",
    parts: [
      { label: "Tilt angle", value: "23.5°", breakNote: "No tilt → no seasons. Different angle → different severity." },
      { label: "Orbital path", value: "Elliptical orbit around Sun", breakNote: "No orbit → no changing angle relative to the Sun." },
      { label: "Hemispheric geometry", value: "Tilt toward/away from Sun", breakNote: "Without this geometry, both hemispheres get equal light always." },
      { label: "Energy distribution", value: "Angle of incidence of sunlight", breakNote: "Remove this physics → no temperature difference from angle changes." },
    ],
  },
};

function TiltedEarthDiagram() {
  const [season, setSeason] = useState("summer");
  const isSummer = season === "summer";

  const TILT = 23.5;
  const earthR = 32;

  // Sun rays helper
  const rays = (cx, cy, count, innerR, outerR, color) => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      lines.push(
        <line key={i}
          x1={cx + Math.cos(a) * innerR} y1={cy + Math.sin(a) * innerR}
          x2={cx + Math.cos(a) * outerR} y2={cy + Math.sin(a) * outerR}
          stroke={color} strokeWidth={1.5} opacity={0.5}
        />
      );
    }
    return lines;
  };

  // Earth with tilt
  const EarthSVG = ({ cx, cy, tiltTowardSun, label, sublabel }) => {
    const tiltRad = (TILT * Math.PI) / 180;
    const axisDir = tiltTowardSun ? -1 : 1;
    const axTop = { x: cx + Math.sin(tiltRad) * (earthR + 14) * axisDir * -1, y: cy - Math.cos(tiltRad) * (earthR + 14) };
    const axBot = { x: cx + Math.sin(tiltRad) * (earthR + 14) * axisDir, y: cy + Math.cos(tiltRad) * (earthR + 14) };

    // Lit half: the side facing the sun (left side since sun is center-left)
    const sunAngle = Math.atan2(0, -cx + 250);

    return (
      <g>
        {/* Axis line */}
        <line x1={axTop.x} y1={axTop.y} x2={axBot.x} y2={axBot.y}
          stroke={COLORS.textDim} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
        {/* N label */}
        <text x={axTop.x} y={axTop.y - 6} textAnchor="middle" fill={COLORS.accent}
          fontSize={9} fontFamily="'JetBrains Mono', monospace" fontWeight={700}>N</text>

        {/* Earth body */}
        <defs>
          <clipPath id={`earth-clip-${cx}`}>
            <circle cx={cx} cy={cy} r={earthR} />
          </clipPath>
          <linearGradient id={`earth-lit-${cx}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2a7ab5" />
            <stop offset="50%" stopColor="#1a5a8a" />
            <stop offset="100%" stopColor="#0d2d44" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={earthR} fill={`url(#earth-lit-${cx})`} stroke={COLORS.border} strokeWidth={1} />

        {/* Continent hints */}
        <ellipse cx={cx - 6} cy={cy - 8} rx={10} ry={7} fill="#3a9a5a" opacity={0.35}
          transform={`rotate(${tiltTowardSun ? -TILT : TILT}, ${cx}, ${cy})`}
          clipPath={`url(#earth-clip-${cx})`} />
        <ellipse cx={cx + 5} cy={cy + 10} rx={8} ry={5} fill="#3a9a5a" opacity={0.25}
          transform={`rotate(${tiltTowardSun ? -TILT : TILT}, ${cx}, ${cy})`}
          clipPath={`url(#earth-clip-${cx})`} />

        {/* Equator line */}
        <ellipse cx={cx} cy={cy} rx={earthR} ry={6} fill="none"
          stroke={COLORS.textDim} strokeWidth={0.5} strokeDasharray="2 2" opacity={0.4}
          transform={`rotate(${tiltTowardSun ? -TILT : TILT}, ${cx}, ${cy})`} />

        {/* Shadow hemisphere (away from sun) */}
        <path d={`M ${cx} ${cy - earthR} A ${earthR} ${earthR} 0 0 1 ${cx} ${cy + earthR} A ${earthR * 0.6} ${earthR} 0 0 0 ${cx} ${cy - earthR}`}
          fill="rgba(0,0,0,0.4)" clipPath={`url(#earth-clip-${cx})`} />

        {/* Tilt angle arc */}
        <path d={`M ${cx} ${cy - earthR - 6} A 8 8 0 0 ${tiltTowardSun ? 0 : 1} ${axTop.x > cx ? cx + 5 : cx - 5} ${cy - earthR - 4}`}
          fill="none" stroke={COLORS.accent} strokeWidth={1} opacity={0.6} />
        <text x={cx + (tiltTowardSun ? -16 : 16)} y={cy - earthR - 8} textAnchor="middle"
          fill={COLORS.accent} fontSize={8} fontFamily="'JetBrains Mono', monospace" opacity={0.8}>
          23.5°
        </text>

        {/* Sunlight arrows */}
        {[-18, -6, 6, 18].map((offset, i) => (
          <line key={i}
            x1={cx - 70} y1={cy + offset} x2={cx - earthR - 6} y2={cy + offset}
            stroke={COLORS.accent} strokeWidth={1} opacity={0.25}
            markerEnd="url(#arrowhead)"
          />
        ))}

        {/* Label */}
        <text x={cx} y={cy + earthR + 30} textAnchor="middle" fill={COLORS.text}
          fontSize={13} fontFamily="'Libre Baskerville', serif" fontWeight={700}>
          {label}
        </text>
        <text x={cx} y={cy + earthR + 44} textAnchor="middle" fill={COLORS.textDim}
          fontSize={10} fontFamily="'JetBrains Mono', monospace">
          {sublabel}
        </text>
      </g>
    );
  };

  return (
    <div style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 16,
      padding: "24px 20px 16px",
      marginBottom: 20,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "0 8px" }}>
        <div>
          <div style={{ fontSize: 11, color: COLORS.good, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
            Why it's hard to vary
          </div>
          <div style={{ fontSize: 17, color: COLORS.text, fontWeight: 700, fontFamily: "'Libre Baskerville', serif" }}>
            Earth's Axial Tilt → Seasons
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["summer", "winter"].map(s => (
            <button key={s} onClick={() => setSeason(s)} style={{
              background: season === s ? `${COLORS.accent}20` : "transparent",
              border: `1px solid ${season === s ? COLORS.accent : COLORS.border}`,
              color: season === s ? COLORS.accent : COLORS.textDim,
              borderRadius: 6, padding: "5px 14px", cursor: "pointer",
              fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}>
              {s === "summer" ? "☀ Northern Summer" : "❄ Northern Winter"}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 500 220" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill={COLORS.accent} opacity="0.4" />
          </marker>
          <radialGradient id="sun-glow">
            <stop offset="0%" stopColor="#e8c547" stopOpacity="1" />
            <stop offset="40%" stopColor="#e8a030" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#e8a030" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit path */}
        <ellipse cx={250} cy={110} rx={200} ry={60} fill="none"
          stroke={COLORS.border} strokeWidth={1} strokeDasharray="6 4" opacity={0.5} />

        {/* Sun */}
        <circle cx={250} cy={110} r={40} fill="url(#sun-glow)" />
        <circle cx={250} cy={110} r={18} fill="#e8c547" />
        {rays(250, 110, 12, 20, 30, "#e8c547")}
        <text x={250} y={165} textAnchor="middle" fill={COLORS.textDim}
          fontSize={10} fontFamily="'JetBrains Mono', monospace">SUN</text>

        {isSummer ? (
          <>
            {/* Summer: Earth on right, N tilted toward sun */}
            <EarthSVG cx={420} cy={110} tiltTowardSun={true}
              label="Northern Summer" sublabel="N. hemisphere tilted toward Sun" />
            {/* Faded opposite position */}
            <circle cx={80} cy={110} r={14} fill={COLORS.border} opacity={0.2} />
            <text x={80} y={110 + 26} textAnchor="middle" fill={COLORS.textDim} fontSize={8}
              fontFamily="'JetBrains Mono', monospace" opacity={0.4}>6 months later</text>
          </>
        ) : (
          <>
            {/* Winter: Earth on left, N tilted away from sun */}
            <EarthSVG cx={80} cy={110} tiltTowardSun={false}
              label="Northern Winter" sublabel="N. hemisphere tilted away from Sun" />
            {/* Faded opposite position */}
            <circle cx={420} cy={110} r={14} fill={COLORS.border} opacity={0.2} />
            <text x={420} y={110 + 26} textAnchor="middle" fill={COLORS.textDim} fontSize={8}
              fontFamily="'JetBrains Mono', monospace" opacity={0.4}>6 months later</text>
          </>
        )}
      </svg>

      <div style={{
        display: "flex", gap: 16, padding: "12px 8px 4px", flexWrap: "wrap",
      }}>
        {[
          { label: "Tilt", detail: "23.5° — change it and seasons change or vanish", color: COLORS.good },
          { label: "Orbit", detail: "Yearly path changes which hemisphere faces the Sun", color: COLORS.good },
          { label: "Geometry", detail: "Angle of sunlight determines energy per area", color: COLORS.good },
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1, minWidth: 130,
            padding: "8px 12px",
            background: `${item.color}08`,
            borderLeft: `2px solid ${item.color}40`,
            borderRadius: "0 6px 6px 0",
          }}>
            <div style={{ fontSize: 11, color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.4, marginTop: 2 }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const analogies = [
  {
    icon: "🏗️",
    title: "The Load-Bearing Wall",
    bad: "A decorative screen — you can swap it for a curtain, a bookshelf, or remove it entirely. The building stands either way.",
    good: "A load-bearing wall — remove it and the ceiling collapses. Every structural element is there for a reason you can't just swap out.",
    insight: "In a good explanation, every detail is load-bearing. Remove one and the whole structure falls.",
  },
  {
    icon: "🧬",
    title: "The Locked Combination",
    bad: "A suitcase with no lock — any combination of items can go in or out. Nothing constrains the contents.",
    good: "A combination lock — change any one digit and it stops working. The specific sequence is the only one that opens it.",
    insight: "A hard-to-vary explanation is like a lock: only the precise combination of details works.",
  },
  {
    icon: "🧩",
    title: "The Jigsaw Puzzle",
    bad: "A pile of generic square tiles — any tile can go anywhere, and you'll always fill the frame.",
    good: "A jigsaw puzzle — each piece has a unique shape that interlocks with specific neighbors. Swap one and nothing fits.",
    insight: "Good explanations have interlocking parts. Each constrains the others.",
  },
];

function PartCard({ part, type, index, swapped, onSwap }) {
  const isGood = type === "good";
  const [showBreak, setShowBreak] = useState(false);

  return (
    <div
      style={{
        background: swapped ? (isGood ? "rgba(224,85,85,0.08)" : "rgba(232,197,71,0.06)") : COLORS.cardBg,
        border: `1px solid ${swapped ? (isGood ? COLORS.bad : COLORS.accent) : COLORS.border}`,
        borderRadius: 12,
        padding: "16px 20px",
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>
        {part.label}
      </div>
      <div style={{ fontSize: 17, color: swapped ? (isGood ? COLORS.bad : COLORS.accent) : COLORS.text, fontWeight: 600, marginBottom: 10, transition: "color 0.3s", fontFamily: "'Libre Baskerville', serif" }}>
        {swapped && !isGood ? part.alternatives[Math.floor(Math.random() * part.alternatives.length)] : part.value}
      </div>

      {!isGood && (
        <button
          onClick={() => onSwap(index)}
          style={{
            background: swapped ? `${COLORS.accent}18` : "transparent",
            border: `1px solid ${swapped ? COLORS.accent : COLORS.border}`,
            color: swapped ? COLORS.accent : COLORS.textDim,
            borderRadius: 6,
            padding: "5px 12px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          {swapped ? "⟳ swapped — still 'explains' seasons" : "swap this detail →"}
        </button>
      )}

      {isGood && (
        <button
          onClick={() => { onSwap(index); setShowBreak(!showBreak); }}
          style={{
            background: showBreak ? `${COLORS.bad}18` : "transparent",
            border: `1px solid ${showBreak ? COLORS.bad : COLORS.border}`,
            color: showBreak ? COLORS.bad : COLORS.textDim,
            borderRadius: 6,
            padding: "5px 12px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          {showBreak ? "✕ breaks the explanation" : "try removing this →"}
        </button>
      )}

      {isGood && showBreak && (
        <div style={{
          marginTop: 10,
          padding: "10px 14px",
          background: `${COLORS.bad}10`,
          borderRadius: 8,
          fontSize: 13,
          color: COLORS.bad,
          lineHeight: 1.5,
          fontFamily: "'Source Serif 4', serif",
          borderLeft: `3px solid ${COLORS.bad}`,
        }}>
          {part.breakNote}
        </div>
      )}
    </div>
  );
}

function ExplanationPanel({ data, side }) {
  const [swapped, setSwapped] = useState({});
  const isGood = data.type === "good";
  const swapCount = Object.values(swapped).filter(Boolean).length;

  const handleSwap = (idx) => {
    setSwapped(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{
      flex: 1,
      minWidth: 320,
      background: COLORS.surface,
      borderRadius: 16,
      border: `1px solid ${COLORS.border}`,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "20px 24px",
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: isGood ? COLORS.good : COLORS.bad,
          boxShadow: `0 0 12px ${isGood ? COLORS.good : COLORS.bad}60`,
        }} />
        <div>
          <div style={{ fontSize: 11, color: isGood ? COLORS.good : COLORS.bad, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
            {isGood ? "Hard to Vary" : "Easy to Vary"}
          </div>
          <div style={{ fontSize: 20, color: COLORS.text, fontWeight: 700, fontFamily: "'Libre Baskerville', serif" }}>
            {data.title}
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
        <p style={{ color: COLORS.textDim, fontSize: 14, lineHeight: 1.6, margin: 0, fontFamily: "'Source Serif 4', serif" }}>
          {data.summary}
        </p>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {data.parts.map((part, i) => (
          <PartCard key={i} part={part} type={data.type} index={i} swapped={!!swapped[i]} onSwap={handleSwap} />
        ))}
      </div>

      {!isGood && swapCount > 0 && (
        <div style={{
          margin: "0 20px 20px",
          padding: "14px 18px",
          background: `${COLORS.accent}10`,
          borderRadius: 10,
          borderLeft: `3px solid ${COLORS.accent}`,
        }}>
          <div style={{ fontSize: 14, color: COLORS.accent, fontWeight: 600, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
            {swapCount} detail{swapCount > 1 ? "s" : ""} swapped
          </div>
          <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5, fontFamily: "'Source Serif 4', serif" }}>
            The "explanation" still works — any god, any emotion, any reason. Because the details are arbitrary, this myth explains nothing specific. It could explain anything, which means it explains nothing.
          </div>
        </div>
      )}

      {isGood && swapCount > 0 && (
        <div style={{
          margin: "0 20px 20px",
          padding: "14px 18px",
          background: `${COLORS.good}10`,
          borderRadius: 10,
          borderLeft: `3px solid ${COLORS.good}`,
        }}>
          <div style={{ fontSize: 14, color: COLORS.good, fontWeight: 600, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
            Explanation breaks with any change
          </div>
          <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5, fontFamily: "'Source Serif 4', serif" }}>
            Every detail is functionally connected. Change one, and the explanation no longer predicts what we observe. This tight interlocking is the hallmark of a good explanation.
          </div>
        </div>
      )}
    </div>
  );
}

function AnalogyCard({ analogy, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "22px 24px",
        cursor: "pointer",
        transition: "all 0.3s",
        minWidth: 280,
        flex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 28 }}>{analogy.icon}</span>
        <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, fontFamily: "'Libre Baskerville', serif" }}>{analogy.title}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: COLORS.bad, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, minWidth: 68 }}>EASY TO VARY</span>
          <span style={{ color: COLORS.textDim, fontSize: 13, lineHeight: 1.5, fontFamily: "'Source Serif 4', serif" }}>{analogy.bad}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: COLORS.good, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, minWidth: 68 }}>HARD TO VARY</span>
          <span style={{ color: COLORS.textDim, fontSize: 13, lineHeight: 1.5, fontFamily: "'Source Serif 4', serif" }}>{analogy.good}</span>
        </div>
      </div>

      {flipped && (
        <div style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: `1px solid ${COLORS.border}`,
          fontSize: 14,
          color: COLORS.accent,
          lineHeight: 1.6,
          fontFamily: "'Source Serif 4', serif",
          fontStyle: "italic",
        }}>
          {analogy.insight}
        </div>
      )}
      <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 10, fontFamily: "'JetBrains Mono', monospace" }}>
        {flipped ? "click to collapse" : "click for insight →"}
      </div>
    </div>
  );
}

function Spectrum() {
  const items = [
    { label: "\"God wills it\"", x: 4, color: COLORS.bad },
    { label: "Persephone myth", x: 12, color: COLORS.bad },
    { label: "\"Bad vibes\"", x: 20, color: COLORS.bad },
    { label: "Conspiracy theories", x: 30, color: COLORS.badDim },
    { label: "Folk remedies", x: 42, color: COLORS.textDim },
    { label: "Newtonian gravity", x: 68, color: COLORS.goodDim },
    { label: "Germ theory", x: 76, color: COLORS.good },
    { label: "Axial tilt / seasons", x: 84, color: COLORS.good },
    { label: "General relativity", x: 93, color: COLORS.good },
  ];

  return (
    <div style={{ position: "relative", height: 140, margin: "10px 0" }}>
      <div style={{
        position: "absolute", top: 60, left: 0, right: 0, height: 4,
        background: `linear-gradient(to right, ${COLORS.bad}, ${COLORS.textDim}, ${COLORS.good})`,
        borderRadius: 2,
      }} />
      <div style={{ position: "absolute", top: 72, left: 0, fontSize: 10, color: COLORS.bad, fontFamily: "'JetBrains Mono', monospace" }}>EASY TO VARY</div>
      <div style={{ position: "absolute", top: 72, right: 0, fontSize: 10, color: COLORS.good, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>HARD TO VARY</div>
      {items.map((item, i) => (
        <div key={i} style={{ position: "absolute", left: `${item.x}%`, top: i % 2 === 0 ? 10 : 90, transform: "translateX(-50%)" }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: item.color,
            boxShadow: `0 0 8px ${item.color}50`,
            position: "absolute",
            left: "50%",
            top: i % 2 === 0 ? 38 : -20,
            transform: "translateX(-50%)",
          }} />
          <div style={{
            fontSize: 11, color: item.color, whiteSpace: "nowrap",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
          }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HardToVary() {
  const [activeTab, setActiveTab] = useState("compare");

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'Source Serif 4', serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "48px 40px 32px",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div style={{ fontSize: 11, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
          David Deutsch · The Beginning of Infinity
        </div>
        <h1 style={{
          fontSize: 38, fontWeight: 700, margin: "0 0 12px",
          fontFamily: "'Libre Baskerville', serif",
          lineHeight: 1.2,
          background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          The Hard-to-Vary Criterion
        </h1>
        <p style={{ fontSize: 18, color: COLORS.textDim, margin: 0, maxWidth: 700, lineHeight: 1.6 }}>
          A good explanation is one whose parts are so tightly interlocked that changing any detail destroys the explanation. If you can freely swap components and it still "works," it explains nothing.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 0 }}>
          {[
            { id: "compare", label: "Compare Explanations" },
            { id: "analogies", label: "Analogies" },
            { id: "spectrum", label: "Spectrum" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? COLORS.accent : "transparent"}`,
                color: activeTab === tab.id ? COLORS.accent : COLORS.textDim,
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                transition: "all 0.2s",
                letterSpacing: "0.03em",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Compare Tab */}
        {activeTab === "compare" && (
          <div>
            <div style={{ fontSize: 14, color: COLORS.textDim, marginBottom: 20, lineHeight: 1.6 }}>
              Both try to explain <strong style={{ color: COLORS.text }}>why we have seasons</strong>. Click the buttons to try swapping or removing details from each.
            </div>
            <TiltedEarthDiagram />
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <ExplanationPanel data={explanations.persephone} side="left" />
              <ExplanationPanel data={explanations.tilt} side="right" />
            </div>
          </div>
        )}

        {/* Analogies Tab */}
        {activeTab === "analogies" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 14, color: COLORS.textDim, marginBottom: 8, lineHeight: 1.6 }}>
              Three ways to think about the hard-to-vary criterion in everyday terms.
            </div>
            {analogies.map((a, i) => (
              <AnalogyCard key={i} analogy={a} index={i} />
            ))}
          </div>
        )}

        {/* Spectrum Tab */}
        {activeTab === "spectrum" && (
          <div>
            <div style={{ fontSize: 14, color: COLORS.textDim, marginBottom: 20, lineHeight: 1.6 }}>
              Explanations exist on a spectrum. The further right, the more tightly interlocked the details — and the closer to genuine understanding.
            </div>
            <div style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: "30px 40px",
              overflow: "hidden",
            }}>
              <Spectrum />
            </div>

            <div style={{
              marginTop: 28,
              padding: "22px 26px",
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent, marginBottom: 10, fontFamily: "'Libre Baskerville', serif" }}>
                Deutsch's Key Insight
              </div>
              <p style={{ color: COLORS.textDim, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                The test for a good explanation is not whether it sounds plausible, nor whether it matches the data. Many bad explanations match the data perfectly — they're just designed to do that. The real test is whether you can tinker with the explanation's internal parts and have it still work. If you can — if the details are "free parameters" you can swap at will — then the explanation is bad, no matter how convincing it seems. Only when the details are locked together, each one constraining the others, do you have a genuine explanation of anything.
              </p>
            </div>
          </div>
        )}

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
