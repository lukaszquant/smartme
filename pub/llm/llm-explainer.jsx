import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "core", title: "What Is an LLM?", subtitle: "The World's Most Sophisticated Autocomplete" },
  { id: "training", title: "How It Learns", subtitle: "Two Acts of Training" },
  { id: "tokens", title: "Tokens & Prediction", subtitle: "Thinking in Puzzle Pieces" },
  { id: "transformers", title: "Transformers", subtitle: "The Architecture That Changed Everything" },
  { id: "attention", title: "Attention Deep Dive", subtitle: "How Words Talk to Each Other" },
  { id: "emergent", title: "Emergent Abilities", subtitle: "When Quantity Becomes Quality" },
  { id: "limits", title: "Limits & Illusions", subtitle: "The Confident Stranger" },
];

const M = "'JetBrains Mono', monospace";
const dk = "#1a1a2e";
const ac = "#e94560";
const gd = "#d4a253";
const bl = "#0f3460";
const pn = "#16213e";
const mt = "#7f8fa6";
const tx = "#c8d6e5";

const Label = ({ children }) => <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: mt, marginBottom: 14, fontFamily: M }}>{children}</div>;
const P = ({ children }) => <p style={{ color: tx, lineHeight: 1.85, fontSize: 15, marginBottom: 14 }}>{children}</p>;
const B = ({ children, color = ac }) => <strong style={{ color }}>{children}</strong>;
const Card = ({ children }) => <div style={{ background: dk, borderRadius: 16, padding: 24, marginTop: 16 }}>{children}</div>;
const Analogy = ({ emoji, title, desc }) => (
  <div style={{ background: `linear-gradient(135deg, ${pn}, ${dk})`, border: "1px solid #2d3f65", borderRadius: 14, padding: 20 }}>
    <div style={{ fontSize: 26, marginBottom: 6 }}>{emoji}</div>
    <div style={{ fontSize: 13, fontWeight: 700, color: ac, marginBottom: 5, fontFamily: M }}>{title}</div>
    <div style={{ fontSize: 12.5, color: "#a0aec0", lineHeight: 1.55 }}>{desc}</div>
  </div>
);

const PhaseTransitionDiagram = () => (
  <Card>
    <Label>Phase transition: same mechanism, different scale</Label>
    <svg viewBox="0 0 700 200" style={{ width: "100%" }}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1"><stop offset="0%" stopColor="#3a7ca5"/><stop offset="100%" stopColor={ac}/></linearGradient>
        <marker id="arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={mt}/></marker>
      </defs>
      <line x1="60" y1="170" x2="640" y2="170" stroke="#2d3f65" strokeWidth="2" markerEnd="url(#arrow)"/>
      <line x1="60" y1="170" x2="60" y2="20" stroke="#2d3f65" strokeWidth="2" markerEnd="url(#arrow)"/>
      <text x="350" y="198" fill={mt} fontSize="11" fontFamily={M} textAnchor="middle">Scale (parameters + data)</text>
      <text x="15" y="95" fill={mt} fontSize="11" fontFamily={M} textAnchor="middle" transform="rotate(-90 15 95)">Capability</text>
      <path d="M 80 155 Q 200 150 300 145 Q 350 140 380 120 Q 420 80 480 50 Q 540 35 620 28" stroke="url(#g1)" strokeWidth="3" fill="none"/>
      <circle cx="370" cy="128" r="5" fill={ac}/>
      <text x="370" y="118" fill={ac} fontSize="11" fontFamily={M} textAnchor="middle" fontWeight="600">Phase transition</text>
      <text x="150" y="140" fill="#556677" fontSize="10" fontFamily={M} textAnchor="middle">Pattern matching</text>
      <text x="540" y="55" fill="#8cb4d0" fontSize="10" fontFamily={M} textAnchor="middle">Reasoning, creativity, code</text>
      <rect x="85" y="18" width="120" height="36" rx="8" fill={pn} stroke="#2d3f65"/>
      <text x="145" y="40" fill={mt} fontSize="10" fontFamily={M} textAnchor="middle">Simple molecules</text>
      <rect x="500" y="65" width="120" height="36" rx="8" fill={pn} stroke={ac} strokeOpacity="0.4"/>
      <text x="560" y="87" fill={ac} fontSize="10" fontFamily={M} textAnchor="middle">Emergent structure</text>
    </svg>
  </Card>
);

const TrainingPipeline = () => {
  const [active, setActive] = useState(null);
  const steps = [
    { label: "Raw Text", sub: "Trillions of words", color: "#3a7ca5", detail: "Books, web, code, conversations — the entire written record of human thought" },
    { label: "Tokenization", sub: "Text → numbers", color: "#4a8db7", detail: "Split into sub-word tokens. 'Understanding' → ['Under','stand','ing']" },
    { label: "Pre-training", sub: "Predict next token \xD7B", color: gd, detail: "Model sees tokens, predicts the next one, adjusts weights when wrong. Billions of iterations." },
    { label: "Fine-tuning", sub: "Human feedback", color: ac, detail: "Humans rate outputs — helpful? Harmful? Accurate? Model aligns to human preferences via RLHF." },
    { label: "Aligned Model", sub: "Ready to use", color: "#58d68d", detail: "Raw capability shaped by human judgment. Taste first, then manners." },
  ];
  return (
    <Card>
      <Label>Training pipeline — click any stage</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div onClick={() => setActive(active === i ? null : i)} style={{
              padding: "14px 16px", borderRadius: 12, cursor: "pointer", textAlign: "center", minWidth: 95, transition: "all 0.25s",
              background: active === i ? `${s.color}33` : pn, border: active === i ? `2px solid ${s.color}` : "2px solid #2d3f65",
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: M }}>{s.label}</div>
              <div style={{ fontSize: 10, color: mt, fontFamily: M, marginTop: 3 }}>{s.sub}</div>
            </div>
            {i < steps.length - 1 && <span style={{ color: "#2d3f65", fontSize: 20 }}>→</span>}
          </div>
        ))}
      </div>
      {active !== null && (
        <div style={{ marginTop: 14, padding: 14, background: pn, borderRadius: 10, fontSize: 13, color: tx, fontFamily: M, lineHeight: 1.6, borderLeft: `3px solid ${steps[active].color}` }}>
          {steps[active].detail}
        </div>
      )}
    </Card>
  );
};

const ScaleChart = () => (
  <Card>
    <Label>The scaling explosion</Label>
    <svg viewBox="0 0 700 220" style={{ width: "100%" }}>
      {[
        { name: "GPT-2", year: "2019", p: "1.5B", h: 18, x: 80 },
        { name: "GPT-3", year: "2020", p: "175B", h: 55, x: 210 },
        { name: "PaLM", year: "2022", p: "540B", h: 90, x: 340 },
        { name: "GPT-4", year: "2023", p: "~1.8T", h: 150, x: 470 },
        { name: "Claude 3+", year: "2024", p: "?", h: 130, x: 600 },
      ].map((m, i) => (
        <g key={i}>
          <rect x={m.x - 25} y={190 - m.h} width={50} height={m.h} rx={6}
            fill={i === 3 ? ac : i === 4 ? gd : `rgba(58,124,165,${0.5 + i * 0.15})`} />
          <text x={m.x} y={185 - m.h} fill={mt} fontSize="10" fontFamily={M} textAnchor="middle">{m.p}</text>
          <text x={m.x} y={205} fill="#ccc" fontSize="11" fontFamily={M} textAnchor="middle" fontWeight="600">{m.name}</text>
          <text x={m.x} y={218} fill="#536179" fontSize="10" fontFamily={M} textAnchor="middle">{m.year}</text>
        </g>
      ))}
    </svg>
  </Card>
);

const TokenDemo = () => {
  const [input, setInput] = useState("The cat sat on the");
  const [predictions, setPredictions] = useState([]);
  const pm = {
    the: [{ t: "mat", p: 0.31 }, { t: "floor", p: 0.18 }, { t: "roof", p: 0.14 }, { t: "table", p: 0.11 }, { t: "bed", p: 0.09 }],
    a: [{ t: "chair", p: 0.22 }, { t: "hill", p: 0.18 }, { t: "rock", p: 0.15 }, { t: "log", p: 0.12 }, { t: "wall", p: 0.08 }],
    my: [{ t: "lap", p: 0.28 }, { t: "head", p: 0.15 }, { t: "shoulder", p: 0.13 }, { t: "hand", p: 0.11 }, { t: "desk", p: 0.08 }],
    mat: [{ t: ".", p: 0.42 }, { t: "and", p: 0.18 }, { t: ",", p: 0.14 }, { t: "was", p: 0.09 }, { t: "while", p: 0.06 }],
    floor: [{ t: ".", p: 0.38 }, { t: "and", p: 0.2 }, { t: ",", p: 0.16 }, { t: "was", p: 0.08 }, { t: "of", p: 0.06 }],
    bed: [{ t: ".", p: 0.4 }, { t: "and", p: 0.17 }, { t: ",", p: 0.15 }, { t: "was", p: 0.1 }, { t: "all", p: 0.05 }],
    table: [{ t: ".", p: 0.35 }, { t: "and", p: 0.2 }, { t: ",", p: 0.15 }, { t: "was", p: 0.1 }, { t: "with", p: 0.06 }],
    roof: [{ t: ".", p: 0.36 }, { t: "and", p: 0.19 }, { t: ",", p: 0.14 }, { t: "was", p: 0.1 }, { t: "of", p: 0.07 }],
    cat: [{ t: "sat", p: 0.24 }, { t: "was", p: 0.2 }, { t: "is", p: 0.15 }, { t: ",", p: 0.11 }, { t: "and", p: 0.08 }],
    sat: [{ t: "on", p: 0.35 }, { t: "down", p: 0.22 }, { t: "in", p: 0.15 }, { t: "by", p: 0.09 }, { t: "quietly", p: 0.05 }],
    on: [{ t: "the", p: 0.45 }, { t: "a", p: 0.2 }, { t: "my", p: 0.1 }, { t: "his", p: 0.08 }, { t: "top", p: 0.05 }],
    ".": [{ t: "The", p: 0.32 }, { t: "It", p: 0.2 }, { t: "He", p: 0.12 }, { t: "She", p: 0.1 }, { t: "A", p: 0.08 }],
    ",": [{ t: "and", p: 0.3 }, { t: "but", p: 0.18 }, { t: "the", p: 0.14 }, { t: "which", p: 0.1 }, { t: "then", p: 0.08 }],
  };
  useEffect(() => {
    const raw = input.trim();
    const lastChar = raw.slice(-1);
    const w = lastChar === "." || lastChar === "," ? lastChar : raw.split(" ").pop().toLowerCase();
    setPredictions(pm[w] || [{ t: ".", p: 0.25 }, { t: "the", p: 0.18 }, { t: "and", p: 0.14 }, { t: "is", p: 0.1 }, { t: "was", p: 0.08 }]);
  }, [input]);
  return (
    <Card>
      <Label>Type a sentence — see next-token probabilities</Label>
      <input value={input} onChange={e => setInput(e.target.value)}
        style={{ width: "100%", background: pn, border: "1px solid #2d3f65", borderRadius: 10, padding: "12px 16px", color: "#e8e8e8", fontSize: 16, fontFamily: M, outline: "none", boxSizing: "border-box" }} />
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {predictions.map((p, i) => (
          <button key={i} onClick={() => setInput(v => p.t === "." || p.t === "," ? v + p.t : v + " " + p.t)}
            style={{ background: bl, border: "none", borderRadius: 8, padding: "10px 16px", color: "#fff", cursor: "pointer", fontFamily: M, fontSize: 14, transition: "all 0.2s" }}>
            {p.t} <span style={{ opacity: 0.4, fontSize: 11, marginLeft: 6 }}>{(p.p * 100).toFixed(0)}%</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

const TokenizationViz = () => (
  <Card>
    <Label>How tokenization works</Label>
    <svg viewBox="0 0 700 160" style={{ width: "100%" }}>
      <rect x="30" y="20" width="220" height="44" rx="10" fill={pn} stroke="#2d3f65"/>
      <text x="140" y="47" fill="#fff" fontSize="16" fontFamily={M} textAnchor="middle" fontWeight="600">Understanding</text>
      <text x="280" y="47" fill={mt} fontSize="22" textAnchor="middle">{"→"}</text>
      {[["Under", ac], ["stand", gd], ["ing", "#5dade2"]].map(([t, c], i) => (
        <g key={i}>
          <rect x={310 + i * 120} y="20" width={100} height="44" rx="10" fill={`${c}22`} stroke={c}/>
          <text x={360 + i * 120} y="47" fill={c} fontSize="15" fontFamily={M} textAnchor="middle" fontWeight="600">{t}</text>
        </g>
      ))}
      <rect x="30" y="90" width="220" height="44" rx="10" fill={pn} stroke="#2d3f65"/>
      <text x="140" y="117" fill="#fff" fontSize="16" fontFamily={M} textAnchor="middle" fontWeight="600">The</text>
      <text x="280" y="117" fill={mt} fontSize="22" textAnchor="middle">{"→"}</text>
      <rect x="310" y="90" width="100" height="44" rx="10" fill="#58d68d22" stroke="#58d68d"/>
      <text x="360" y="117" fill="#58d68d" fontSize="15" fontFamily={M} textAnchor="middle" fontWeight="600">The</text>
      <text x="440" y="117" fill="#536179" fontSize="11" fontFamily={M}>{"← common word = 1 token"}</text>
    </svg>
  </Card>
);

const BeforeAfter = () => {
  const [mode, setMode] = useState("rnn");
  const words = ["She", "told", "him", "that", "the", "deal", "was", "off"];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (words.length + 2)), 700);
    return () => clearInterval(t);
  }, [mode]);
  const keys = [0, 5, 7];
  return (
    <Card>
      <Label>Before vs After: How models read text</Label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["rnn", "transformer"].map(m => (
          <button key={m} onClick={() => { setMode(m); setStep(0); }}
            style={{ background: mode === m ? ac : bl, border: "none", borderRadius: 8, padding: "10px 20px", color: "#fff", cursor: "pointer", fontFamily: M, fontSize: 13, fontWeight: 600 }}>
            {m === "rnn" ? "RNN (Before)" : "Transformer (After)"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", minHeight: 55, alignItems: "center" }}>
        {words.map((w, i) => {
          const on = mode === "rnn" ? i === step : step > 0;
          const fade = mode === "rnn" && i < step - 2;
          return (
            <span key={i} style={{
              padding: "10px 14px", borderRadius: 8, fontFamily: M, fontSize: 15, fontWeight: 600, transition: "all 0.35s",
              background: on ? (mode === "transformer" ? `rgba(233,69,96,${0.3 + (keys.includes(i) ? 0.5 : 0.1)})` : ac) : pn,
              color: on ? "#fff" : "#445566", opacity: fade ? 0.25 : 1,
              transform: on && mode === "rnn" && i === step ? "scale(1.15)" : "scale(1)",
              border: mode === "transformer" && step > 0 && keys.includes(i) ? `2px solid ${ac}` : "2px solid transparent",
            }}>{w}</span>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 12, color: mt, fontFamily: M, textAlign: "center" }}>
        {mode === "rnn" ? "Sequential: information fades like a telephone game" : "Parallel: every word sees every other word directly"}
      </div>
    </Card>
  );
};

const ArchitectureDiagram = () => {
  const [active, setActive] = useState(null);
  const layers = [
    { y: 20, label: "Input Embedding", sub: "Words → vectors", color: "#3a7ca5", detail: "Each token becomes a point in high-dimensional space. Similar meanings cluster together." },
    { y: 70, label: "Positional Encoding", sub: "+ position signal", color: "#4a8db7", detail: "Position injected via sine/cosine signals — like GPS coordinates for each word, since processing is parallel." },
    { y: 135, label: "Multi-Head Attention", sub: "Words attend to words", color: ac, detail: "Each word asks 'who matters to me?' via Q-K-V. 32–128 heads run in parallel, each finding different relationships.", rep: true },
    { y: 185, label: "Add & Normalize", sub: "Residual + LayerNorm", color: "#58d68d", detail: "Original input added back (residual skip). Like an express elevator — layers can be bypassed if not needed.", rep: true },
    { y: 235, label: "Feed-Forward Network", sub: "Per-token processing", color: gd, detail: "Each token independently passes through a small neural network — digesting what attention gathered.", rep: true },
    { y: 285, label: "Add & Normalize", sub: "Residual + LayerNorm", color: "#58d68d", detail: "Second residual connection stabilizes the output before the next layer.", rep: true },
    { y: 340, label: "Output Projection", sub: "→ probability over vocab", color: "#e8e8e8", detail: "Final representation mapped to a probability distribution over ~100K possible next tokens." },
  ];
  return (
    <Card>
      <Label>Transformer architecture — click any block</Label>
      <svg viewBox="0 0 700 400" style={{ width: "100%" }}>
        <line x1="580" y1="150" x2="580" y2="310" stroke={mt} strokeWidth="1.5" strokeDasharray="4"/>
        <text x="600" y="230" fill={mt} fontSize="11" fontFamily={M} transform="rotate(90 600 230)">{"× 96 layers"}</text>
        <path d="M 575 150 L 585 150" stroke={mt} strokeWidth="1.5"/>
        <path d="M 575 310 L 585 310" stroke={mt} strokeWidth="1.5"/>
        {layers.slice(0, -1).map((l, i) => (
          <line key={i} x1="280" y1={l.y + 32} x2="280" y2={layers[i + 1].y} stroke="#2d3f65" strokeWidth="1.5" markerEnd="url(#arrowD)"/>
        ))}
        <defs><marker id="arrowD" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#2d3f65"/></marker></defs>
        {layers.map((l, i) => (
          <g key={i} onClick={() => setActive(active === i ? null : i)} style={{ cursor: "pointer" }}>
            <rect x="100" y={l.y} width="360" height="32" rx="8"
              fill={active === i ? `${l.color}33` : pn}
              stroke={active === i ? l.color : "#2d3f65"} strokeWidth={active === i ? 2 : 1}/>
            <text x="120" y={l.y + 21} fill={l.color} fontSize="12" fontFamily={M} fontWeight="600">{l.label}</text>
            <text x="440" y={l.y + 21} fill="#536179" fontSize="10" fontFamily={M} textAnchor="end">{l.sub}</text>
          </g>
        ))}
      </svg>
      {active !== null && (
        <div style={{ padding: 14, background: pn, borderRadius: 10, fontSize: 13, color: tx, fontFamily: M, lineHeight: 1.6, borderLeft: `3px solid ${layers[active].color}`, marginTop: -8 }}>
          {layers[active].detail}
        </div>
      )}
    </Card>
  );
};

const QKVFlowDiagram = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Query", emoji: "🔍", color: ac, desc: "Each word asks: 'What am I looking for?'" },
    { label: "Key", emoji: "🔑", color: gd, desc: "Each word advertises: 'Here’s what I offer.'" },
    { label: "Q × K", emoji: "⚡", color: "#5dade2", desc: "Dot product → how well does each Query match each Key?" },
    { label: "Softmax", emoji: "📊", color: "#af7ac5", desc: "Raw scores → probability distribution (sums to 1)" },
    { label: "× Value", emoji: "💎", color: "#58d68d", desc: "Weighted blend of Value vectors → context-enriched output" },
  ];
  return (
    <Card>
      <Label>Attention computation flow</Label>
      <svg viewBox="0 0 700 130" style={{ width: "100%" }}>
        {steps.map((s, i) => {
          const x = 60 + i * 145;
          return (
            <g key={i} onClick={() => setStep(i)} style={{ cursor: "pointer" }}>
              <rect x={x - 48} y="15" width="96" height="56" rx="12"
                fill={step === i ? `${s.color}33` : pn}
                stroke={step === i ? s.color : "#2d3f65"} strokeWidth={step === i ? 2.5 : 1}/>
              <text x={x} y="38" fill={s.color} fontSize="18" textAnchor="middle">{s.emoji}</text>
              <text x={x} y="58" fill={step === i ? s.color : mt} fontSize="11" fontFamily={M} textAnchor="middle" fontWeight="600">{s.label}</text>
              {i < steps.length - 1 && <text x={x + 65} y="47" fill="#2d3f65" fontSize="18" textAnchor="middle">{"→"}</text>}
            </g>
          );
        })}
        <rect x="12" y="90" rx="8" width="676" height="30" fill={pn}/>
        <text x="350" y="110" fill={tx} fontSize="12" fontFamily={M} textAnchor="middle">{steps[step].desc}</text>
      </svg>
    </Card>
  );
};

const AttentionViz = () => {
  const [hov, setHov] = useState(null);
  const words = ["The", "bank", "by", "the", "river", "was", "steep"];
  const aw = {
    0: [1, 0.2, 0.05, 0.05, 0.1, 0.05, 0.05], 1: [0.15, 1, 0.1, 0.1, 0.6, 0.2, 0.3],
    2: [0.05, 0.15, 1, 0.3, 0.2, 0.05, 0.05], 3: [0.1, 0.1, 0.15, 1, 0.55, 0.05, 0.05],
    4: [0.1, 0.5, 0.15, 0.2, 1, 0.1, 0.15], 5: [0.05, 0.3, 0.05, 0.05, 0.15, 1, 0.5],
    6: [0.05, 0.6, 0.05, 0.05, 0.3, 0.3, 1],
  };
  return (
    <Card>
      <Label>Hover a word — see what it attends to</Label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((w, i) => {
          const wt = hov !== null ? aw[hov][i] : 0;
          const isH = hov === i;
          return (
            <span key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ padding: "12px 18px", borderRadius: 10, cursor: "pointer", fontFamily: M, fontSize: 19, fontWeight: 600, transition: "all 0.25s",
                background: isH ? ac : hov !== null ? `rgba(233,69,96,${wt * 0.7})` : pn,
                color: isH || wt > 0.4 ? "#fff" : "#8899aa", transform: isH ? "scale(1.1)" : "scale(1)",
                boxShadow: wt > 0.3 ? `0 0 ${wt * 18}px rgba(233,69,96,${wt * 0.4})` : "none" }}>
              {w}
            </span>
          );
        })}
      </div>
      {hov !== null && (
        <div style={{ marginTop: 14, textAlign: "center", color: mt, fontSize: 12, fontFamily: M }}>
          "{words[hov]}" attends most to: <strong style={{ color: ac }}>
            {words[aw[hov].indexOf(Math.max(...aw[hov].filter((_, j) => j !== hov)))]}
          </strong>{hov === 1 && " — 'river' + 'steep' resolve 'bank' as riverbank, not financial"}
        </div>
      )}
    </Card>
  );
};

const MultiHeadDemo = () => {
  const [h, setH] = useState(0);
  const heads = [
    { name: "Grammar", color: ac, hl: [0.1, 0.8, 0.4, 0.15, 0.05, 0.05, 0.05, 0.7, 0.3] },
    { name: "Meaning", color: gd, hl: [0.05, 0.7, 0.05, 0.4, 0.1, 0.05, 0.55, 0.05, 0.85] },
    { name: "Position", color: "#5dade2", hl: [0.05, 0.15, 0.1, 0.15, 0.2, 0.3, 0.8, 0.85, 0.2] },
    { name: "Reference", color: "#58d68d", hl: [0.15, 0.85, 0.9, 0.1, 0.05, 0.05, 0.05, 0.15, 0.1] },
  ];
  const words = ["The", "cats", "that", "sat", "on", "the", "mat", "were", "purring"];
  const cur = heads[h];
  const rgb = { [ac]: "233,69,96", [gd]: "212,162,83", "#5dade2": "93,173,226", "#58d68d": "88,214,141" };
  return (
    <Card>
      <Label>Multi-head attention — same sentence, 4 lenses</Label>
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {heads.map((hd, i) => (
          <button key={i} onClick={() => setH(i)}
            style={{ background: h === i ? hd.color : bl, border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", cursor: "pointer", fontFamily: M, fontSize: 12, fontWeight: 600 }}>
            {hd.name}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {words.map((w, i) => (
          <span key={`${h}-${i}`} style={{
            padding: "9px 14px", borderRadius: 8, fontFamily: M, fontSize: 15, fontWeight: 600, transition: "all 0.3s",
            background: `rgba(${rgb[cur.color]}, ${cur.hl[i] * 0.65})`,
            color: cur.hl[i] > 0.4 ? "#fff" : "#667788",
            boxShadow: cur.hl[i] > 0.6 ? `0 0 10px rgba(${rgb[cur.color]}, 0.3)` : "none",
          }}>{w}</span>
        ))}
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: "#536179", fontFamily: M, textAlign: "center" }}>
        Real models: 32–128 heads per layer × 96 layers = thousands of simultaneous perspectives
      </div>
    </Card>
  );
};

const LayerDepthDiagram = () => (
  <Card>
    <Label>What each layer depth captures</Label>
    <svg viewBox="0 0 700 170" style={{ width: "100%" }}>
      {[
        { x: 40, w: 180, label: "Layers 1–20", sub: "Syntax & grammar", color: "#3a7ca5", ex: "noun, verb, clause start" },
        { x: 260, w: 180, label: "Layers 20–60", sub: "Meaning & semantics", color: gd, ex: "topic, relationships, entities" },
        { x: 480, w: 180, label: "Layers 60–96", sub: "Abstract reasoning", color: ac, ex: "irony, logic, implications" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="20" width={s.w} height="80" rx="12" fill={`${s.color}18`} stroke={s.color} strokeWidth="1.5"/>
          <text x={s.x + s.w / 2} y="48" fill={s.color} fontSize="13" fontFamily={M} textAnchor="middle" fontWeight="700">{s.label}</text>
          <text x={s.x + s.w / 2} y="68" fill="#ccc" fontSize="11" fontFamily={M} textAnchor="middle">{s.sub}</text>
          <text x={s.x + s.w / 2} y="88" fill="#536179" fontSize="10" fontFamily={M} textAnchor="middle" fontStyle="italic">{s.ex}</text>
          {i < 2 && <text x={s.x + s.w + 20} y="60" fill="#2d3f65" fontSize="22" textAnchor="middle">{"→"}</text>}
        </g>
      ))}
      <text x="350" y="135" fill={mt} fontSize="11" fontFamily={M} textAnchor="middle">Same word through all layers: raw token {"→"} rich contextual representation</text>
      <text x="350" y="155" fill="#536179" fontSize="10" fontFamily={M} textAnchor="middle" fontStyle="italic">Quadratic cost: 2× sequence length = 4× computation</text>
    </svg>
  </Card>
);

const EmergenceChart = () => (
  <Card>
    <Label>Emergence: abilities appear suddenly at scale thresholds</Label>
    <svg viewBox="0 0 700 250" style={{ width: "100%" }}>
      <defs><marker id="arrowE" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={mt}/></marker></defs>
      <line x1="60" y1="210" x2="660" y2="210" stroke="#2d3f65" strokeWidth="2" markerEnd="url(#arrowE)"/>
      <line x1="60" y1="210" x2="60" y2="20" stroke="#2d3f65" strokeWidth="2" markerEnd="url(#arrowE)"/>
      <text x="360" y="245" fill={mt} fontSize="11" fontFamily={M} textAnchor="middle">Model size (parameters)</text>
      <text x="18" y="115" fill={mt} fontSize="11" fontFamily={M} textAnchor="middle" transform="rotate(-90 18 115)">Accuracy on task</text>
      {[
        { label: "Arithmetic", color: ac, path: "M 80 200 L 250 198 Q 290 195 310 140 Q 330 55 400 45 L 620 42", cx: 310, cy: 140 },
        { label: "Chain-of-thought", color: gd, path: "M 80 200 L 310 198 Q 360 195 390 120 Q 420 50 470 42 L 620 40", cx: 390, cy: 120 },
        { label: "Translation (rare)", color: "#5dade2", path: "M 80 200 L 380 198 Q 430 195 460 130 Q 490 60 530 48 L 620 45", cx: 460, cy: 130 },
      ].map((l, i) => (
        <g key={i}>
          <path d={l.path} stroke={l.color} strokeWidth="2.5" fill="none" opacity="0.85"/>
          <circle cx={l.cx} cy={l.cy} r="4" fill={l.color}/>
          <rect x="90" y={30 + i * 20} width="10" height="10" rx="2" fill={l.color}/>
          <text x="105" y={39 + i * 20} fill={tx} fontSize="11" fontFamily={M}>{l.label}</text>
        </g>
      ))}
      {["1B", "10B", "100B", "1T"].map((s, i) => (
        <text key={i} x={120 + i * 150} y="225" fill="#536179" fontSize="10" fontFamily={M} textAnchor="middle">{s}</text>
      ))}
    </svg>
  </Card>
);

const LimitsDiagram = () => (
  <Card>
    <Label>LLM strengths vs limitations</Label>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div style={{ background: "#58d68d12", border: "1px solid #58d68d33", borderRadius: 12, padding: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#58d68d", fontFamily: M, marginBottom: 10 }}>{"✓"} Strengths</div>
        {["Pattern recognition at scale", "Fluid natural language", "Code generation", "Reasoning (with prompting)", "Multilingual transfer", "Creative synthesis"].map((s, i) => (
          <div key={i} style={{ fontSize: 12, color: tx, fontFamily: M, padding: "5px 0", borderBottom: i < 5 ? "1px solid #ffffff08" : "none" }}>{s}</div>
        ))}
      </div>
      <div style={{ background: `${ac}12`, border: `1px solid ${ac}33`, borderRadius: 12, padding: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: ac, fontFamily: M, marginBottom: 10 }}>{"✗"} Limitations</div>
        {["Hallucination (confident errors)", "No ground truth access", "Training data biases", "Quadratic context cost", "No persistent memory", "Understanding vs mimicry (?)"].map((s, i) => (
          <div key={i} style={{ fontSize: 12, color: tx, fontFamily: M, padding: "5px 0", borderBottom: i < 5 ? "1px solid #ffffff08" : "none" }}>{s}</div>
        ))}
      </div>
    </div>
  </Card>
);

const sections = {
  core: (<>
    <P>A Large Language Model predicts the next word in a sequence. At sufficient scale, that simple objective produces emergent reasoning, creativity, and conversation — a <B>phase transition</B> from pattern matching to something qualitatively new.</P>
    <PhaseTransitionDiagram />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"📱"} title={"Autocomplete × 10⁹"} desc="Your phone predicts next words from thousands of messages. An LLM does it from trillions — and that difference in scale creates a difference in kind." />
      <Analogy emoji={"🏙️"} title="A City, Not a Building" desc="No single neuron 'knows' anything. Knowledge emerges from billions of connections, like a city's intelligence from millions of interactions." />
    </div>
  </>),

  training: (<>
    <P><B>Pre-training</B> = learn by predicting (taste every dish). <B color={gd}>Fine-tuning</B> = align with humans (learn judgment from a master chef).</P>
    <TrainingPipeline />
    <ScaleChart />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"📚"} title="Apprentice Chef" desc="Pre-training: taste every dish on Earth. Fine-tuning: a master chef says 'too much salt' or 'perfect balance.'" />
      <Analogy emoji={"🪨"} title="Sculptor's Two Passes" desc="Rough chisel (pre-training) carves the shape. Fine chisel (RLHF) reveals the expression." />
    </div>
  </>),

  tokens: (<>
    <P>LLMs think in <B>tokens</B> — sub-word fragments. Common words are one token; rare words split into pieces. Like Lego bricks: small, universal, combinable.</P>
    <TokenizationViz />
    <TokenDemo />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"🧩"} title="Lego Bricks" desc="'Unhappiness' = 'un' + 'happiness'. Sub-word pieces let the model handle any text, even made-up words." />
      <Analogy emoji={"🎲"} title="Weighted Dice" desc="Each prediction is a loaded die with ~100K faces. Temperature controls how loaded: low = conservative, high = creative." />
    </div>
  </>),

  transformers: (<>
    <P>Before 2017: RNNs read word-by-word like a telephone game — information fades. The <B>Transformer</B> sees everything at once, in parallel. That single shift enabled the entire scaling revolution.</P>
    <BeforeAfter />
    <ArchitectureDiagram />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"📞"} title={"Telephone → Round Table"} desc="RNNs pass compressed messages down a chain. Transformers seat everyone at a table — direct communication, no degradation." />
      <Analogy emoji={"🏗️"} title="Repeating Floor" desc="Each floor: meeting room (attention) + workshop (feed-forward). Floor 1: grammar. Floor 40: irony. Floor 90: reasoning." />
      <Analogy emoji={"🚀"} title="Express Elevator" desc="Residual connections let information skip irrelevant layers. Without them, training 96 layers deep would be impossible." />
    </div>
  </>),

  attention: (<>
    <P>Attention lets each word ask <B>"who matters to me?"</B> via three projections — Query, Key, Value. Multiple heads run in parallel, each finding different relationship types.</P>
    <QKVFlowDiagram />
    <AttentionViz />
    <MultiHeadDemo />
    <LayerDepthDiagram />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"🔑"} title="Molecular Binding" desc="Query = receptor. Key = binding site. High dot product = match → Value payload delivered. The chemistry is learned, not programmed." />
      <Analogy emoji={"🧅"} title="Onion Layers" desc="Layer 1: 'noun.' Layer 20: 'subject of a clause.' Layer 80: 'ironic implication.' Same word, deepening understanding." />
    </div>
  </>),

  emergent: (<>
    <P>At certain scale thresholds, LLMs acquire <B>entirely new abilities</B> nobody programmed — arithmetic, chain-of-thought reasoning, rare-language translation.</P>
    <EmergenceChart />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"🐜"} title="Ant Colony" desc="One ant follows chemical rules. A million build bridges and farms. Intelligence emerges from scale." />
      <Analogy emoji={"🌊"} title="Sand Avalanche" desc="Grain after grain, nothing happens… then one triggers a collapse. Emergent abilities arrive the same way." />
      <Analogy emoji={"🧠"} title={"Neurons → Mind"} desc="One neuron fires or doesn't. 86 billion produce Shakespeare and 'what is consciousness?' Mechanism → meaning." />
    </div>
  </>),

  limits: (<>
    <P>An LLM is a <B>cognitive amplifier</B> — a telescope that extends thinking but can show mirages. Powerful tool; judgment must remain yours.</P>
    <LimitsDiagram />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
      <Analogy emoji={"🎭"} title="Confident Stranger" desc="Speaks fluently about everything but only read about life in books. Often insightful — sometimes wrong with identical confidence." />
      <Analogy emoji={"🪞"} title="Funhouse Mirror" desc="Reflects training data including its distortions. The mirror doesn’t know what’s accurate." />
      <Analogy emoji={"🔭"} title="Telescope, Not Oracle" desc="Extends thinking enormously but can generate plausible nonsense. The tool is powerful; the judgment must remain yours." />
    </div>
  </>),
};

export default function LLMExplainer() {
  const [sec, setSec] = useState("core");
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", color: "#e8e8e8", fontFamily: "'Libre Baskerville', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 4, color: ac, fontFamily: M, marginBottom: 10 }}>Visual Explainer</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, lineHeight: 1.2, background: "linear-gradient(135deg, #e8e8e8, #7f8fa6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Large Language Models</h1>
          <p style={{ color: "#536179", marginTop: 10, fontSize: 14, fontStyle: "italic" }}>From autocomplete to emergent intelligence</p>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSec(s.id)}
              style={{ background: sec === s.id ? ac : pn, border: sec === s.id ? `1px solid ${ac}` : "1px solid #2d3f65", borderRadius: 10, padding: "9px 16px", color: sec === s.id ? "#fff" : mt, cursor: "pointer", fontFamily: M, fontSize: 11, fontWeight: 600, transition: "all 0.25s" }}>
              {s.title}
            </button>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#fff" }}>{SECTIONS.find(s => s.id === sec).title}</h2>
          <div style={{ fontSize: 13, color: ac, fontFamily: M, marginTop: 3, fontStyle: "italic" }}>{SECTIONS.find(s => s.id === sec).subtitle}</div>
        </div>
        {sections[sec]}
        <div style={{ marginTop: 48, textAlign: "center", color: "#2d3f65", fontSize: 11, fontFamily: M, borderTop: "1px solid #16213e", paddingTop: 20 }}>
          Pair with the walking audio script for full internalization
        </div>
      </div>
    </div>
  );
}
