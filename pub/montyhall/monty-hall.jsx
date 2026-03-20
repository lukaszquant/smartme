import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: "intro",
    title: "The Setup",
    transcript:
      "Okay, picture this. You're on a game show. The host — Monty Hall — shows you three doors. Behind one of them: a shiny new car. Behind the other two: goats. You want the car. Simple enough, right? Three doors, one prize. Let's see where your gut takes you.",
  },
  {
    id: "pick",
    title: "Make Your Choice",
    transcript:
      "You pick Door 1. Now pause — before anything else happens, let's just sit with this moment. You pointed at one door out of three. What are the chances you nailed it? One in three. That means there's a two-in-three chance the car is behind one of the doors you didn't pick. Not 50/50 — two-thirds of the time, you're wrong right now. Hold that feeling. It matters.",
  },
  {
    id: "reveal",
    title: "Monty Opens a Door",
    transcript:
      "Now here's where it gets interesting. Monty walks over to the doors you didn't pick and opens one of them — Door 3 — revealing a goat. But here's the thing most people miss: Monty isn't choosing randomly. He knows where the car is, and he will always show you a goat. He's not helping you by accident. He's following a rule. So when he opens that door, he's not giving you new random information — he's filtering. And that matters enormously.",
  },
  {
    id: "switch",
    title: "The Key Insight",
    transcript:
      "Here's the intuition that makes it click. When you first picked Door 1, you split the world into two groups: your door (1/3 chance) and \"everything else\" (2/3 chance). Monty opening a goat door doesn't reshuffle those odds. It just tells you which of the \"everything else\" doors to focus on. All that 2/3 probability that used to be spread across two doors? It's now sitting entirely behind Door 2. Your door didn't get better — the other side just got more specific.",
  },
  {
    id: "result",
    title: "Should You Switch?",
    transcript:
      "So should you switch? Absolutely. Every time. Here's the simplest way to feel it in your bones: you only lose by switching if you happened to pick the car on your very first guess. How often does that happen? One time in three. The other two times out of three, your first pick was a goat — and switching hands you the car. Staying is betting you were right from the start. Switching is betting you were wrong. And you were probably wrong.",
  },
  {
    id: "sim",
    title: "See It in Action",
    transcript:
      "If your gut still says 50/50, that's okay — this problem famously tripped up thousands of PhD mathematicians when it first went viral. But numbers don't care about intuition. Hit the buttons below and watch what happens over dozens, hundreds, thousands of games. You'll see switching converge right around 67% wins. Not because of a trick — because when you switch, you're riding the two-thirds wave instead of fighting it.",
  },
];

const COLORS = {
  bg: "#0a0a0f",
  card: "#13131a",
  accent: "#f0c040",
  accentDim: "#b8922e",
  goat: "#e05050",
  car: "#40d080",
  text: "#e8e8f0",
  muted: "#7a7a90",
  door: "#2a2a3a",
  doorHover: "#3a3a4f",
  panel: "#1a1a25",
};

function Door({ index, state, carBehind, onClick, small, highlight }) {
  const isOpen = state === "open" || state === "revealed";
  const w = small ? 64 : 110;
  const h = small ? 90 : 155;
  const r = small ? 8 : 12;

  return (
    <div
      onClick={onClick}
      style={{
        width: w,
        height: h,
        perspective: 600,
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* highlight ring */}
      {highlight && (
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: r + 4,
            border: `2px solid ${highlight}`,
            boxShadow: `0 0 16px ${highlight}55`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      )}

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
          transform: isOpen ? "rotateY(-110deg)" : "rotateY(0)",
          transformOrigin: "left center",
        }}
      >
        {/* front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: `linear-gradient(170deg, #3e3654 0%, #252033 100%)`,
            borderRadius: r,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #4a4a5a",
            boxShadow: "inset 0 2px 8px rgba(255,255,255,.06), 0 4px 20px rgba(0,0,0,.5)",
          }}
        >
          <span
            style={{
              fontSize: small ? 14 : 22,
              fontWeight: 800,
              color: COLORS.accent,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {index + 1}
          </span>
          <div
            style={{
              width: small ? 8 : 12,
              height: small ? 8 : 12,
              borderRadius: "50%",
              background: COLORS.accent,
              marginTop: small ? 6 : 12,
              boxShadow: `0 0 8px ${COLORS.accent}66`,
            }}
          />
        </div>

        {/* back (revealed content behind door) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#1a1a25",
            borderRadius: r,
          }}
        />
      </div>

      {/* prize behind */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: r,
            background: COLORS.panel,
            border: `1px solid ${carBehind ? COLORS.car : COLORS.goat}33`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
        >
          <span style={{ fontSize: small ? 28 : 48 }}>{carBehind ? "🚗" : "🐐"}</span>
          <span
            style={{
              fontSize: small ? 9 : 12,
              color: carBehind ? COLORS.car : COLORS.goat,
              fontWeight: 700,
              marginTop: 4,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {carBehind ? "Car!" : "Goat"}
          </span>
        </div>
      )}
    </div>
  );
}

function ProbBar({ label, value, color, maxW }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <span style={{ width: 56, fontSize: 12, color: COLORS.muted, textAlign: "right", fontFamily: "monospace" }}>
        {label}
      </span>
      <div style={{ flex: 1, maxWidth: maxW || 200, height: 18, background: "#1a1a25", borderRadius: 9, overflow: "hidden" }}>
        <div
          style={{
            width: `${value * 100}%`,
            height: "100%",
            background: color,
            borderRadius: 9,
            transition: "width 0.4s ease",
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color, width: 44, fontFamily: "monospace" }}>
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

export default function MontyHall() {
  const [step, setStep] = useState(0);
  const [simResults, setSimResults] = useState({ switchWins: 0, stayWins: 0, total: 0 });
  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [step]);

  const current = STEPS[step];

  const doorStates = () => {
    const carDoor = 0;
    switch (current.id) {
      case "intro":
        return [
          { state: "closed", car: false },
          { state: "closed", car: false },
          { state: "closed", car: false },
        ];
      case "pick":
        return [
          { state: "closed", car: true, highlight: COLORS.accent },
          { state: "closed", car: false },
          { state: "closed", car: false },
        ];
      case "reveal":
        return [
          { state: "closed", car: true, highlight: COLORS.accent },
          { state: "closed", car: false },
          { state: "open", car: false, highlight: COLORS.goat },
        ];
      case "switch":
      case "result":
        return [
          { state: "closed", car: true, highlight: "#7a7a9055" },
          { state: "closed", car: false, highlight: COLORS.car },
          { state: "open", car: false },
        ];
      case "sim":
        return [
          { state: "open", car: true },
          { state: "open", car: false },
          { state: "open", car: false },
        ];
      default:
        return [
          { state: "closed", car: false },
          { state: "closed", car: false },
          { state: "closed", car: false },
        ];
    }
  };

  const probabilities = () => {
    switch (current.id) {
      case "intro":
        return [
          { label: "Door 1", value: 1 / 3, color: COLORS.muted },
          { label: "Door 2", value: 1 / 3, color: COLORS.muted },
          { label: "Door 3", value: 1 / 3, color: COLORS.muted },
        ];
      case "pick":
        return [
          { label: "Door 1", value: 1 / 3, color: COLORS.accent },
          { label: "Others", value: 2 / 3, color: COLORS.muted },
        ];
      case "reveal":
        return [
          { label: "Door 1", value: 1 / 3, color: COLORS.accent },
          { label: "Door 2", value: 2 / 3, color: COLORS.car },
          { label: "Door 3", value: 0, color: COLORS.goat },
        ];
      case "switch":
      case "result":
        return [
          { label: "Stay", value: 1 / 3, color: COLORS.goat },
          { label: "Switch", value: 2 / 3, color: COLORS.car },
        ];
      default:
        return [];
    }
  };

  const runSim = (n) => {
    let sw = 0,
      st = 0;
    for (let i = 0; i < n; i++) {
      const car = Math.floor(Math.random() * 3);
      const pick = Math.floor(Math.random() * 3);
      if (pick === car) st++;
      else sw++;
    }
    setSimResults((p) => ({
      switchWins: p.switchWins + sw,
      stayWins: p.stayWins + st,
      total: p.total + n,
    }));
  };

  const doors = doorStates();
  const probs = probabilities();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32,
            fontWeight: 900,
            margin: 0,
            background: `linear-gradient(135deg, ${COLORS.accent}, #f8e080)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.5,
          }}
        >
          The Monty Hall Problem
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 14, margin: "6px 0 0" }}>
          A probability paradox that fools almost everyone
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              width: i === step ? 32 : 10,
              height: 10,
              borderRadius: 5,
              border: "none",
              background: i === step ? COLORS.accent : i < step ? COLORS.accentDim : "#2a2a3a",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Main visual area */}
      <div
        style={{
          background: COLORS.card,
          borderRadius: 20,
          padding: "32px 28px",
          maxWidth: 520,
          width: "100%",
          border: "1px solid #2a2a3a",
          boxShadow: "0 8px 40px rgba(0,0,0,.4)",
          marginBottom: 20,
        }}
      >
        {/* Step title */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: COLORS.accent,
              fontWeight: 700,
            }}
          >
            Step {step + 1} of {STEPS.length}
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 22,
              margin: "6px 0 0",
              fontWeight: 700,
            }}
          >
            {current.title}
          </h2>
        </div>

        {/* Doors */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24 }}>
          {doors.map((d, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Door index={i} state={d.state} carBehind={d.car} highlight={d.highlight} />
              {current.id === "pick" && i === 0 && (
                <span
                  style={{
                    fontSize: 10,
                    color: COLORS.accent,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Your Pick
                </span>
              )}
              {current.id === "reveal" && i === 2 && (
                <span style={{ fontSize: 10, color: COLORS.goat, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                  Monty Opens
                </span>
              )}
              {(current.id === "switch" || current.id === "result") && i === 1 && (
                <span style={{ fontSize: 10, color: COLORS.car, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                  Switch Here!
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Probability bars */}
        {probs.length > 0 && current.id !== "sim" && (
          <div
            style={{
              background: COLORS.bg,
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: COLORS.muted,
                fontWeight: 700,
                display: "block",
                marginBottom: 10,
              }}
            >
              Probabilities
            </span>
            {probs.map((p, i) => (
              <ProbBar key={i} {...p} maxW={260} />
            ))}
          </div>
        )}

        {/* Simulation panel */}
        {current.id === "sim" && (
          <div
            style={{
              background: COLORS.bg,
              borderRadius: 12,
              padding: "18px 18px",
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              {[10, 100, 1000].map((n) => (
                <button
                  key={n}
                  onClick={() => runSim(n)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "none",
                    background: COLORS.accent,
                    color: COLORS.bg,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Run {n} Games
                </button>
              ))}
              <button
                onClick={() => setSimResults({ switchWins: 0, stayWins: 0, total: 0 })}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.muted}`,
                  background: "transparent",
                  color: COLORS.muted,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Reset
              </button>
            </div>
            {simResults.total > 0 && (
              <div>
                <p style={{ fontSize: 12, color: COLORS.muted, margin: "0 0 10px" }}>
                  After <strong style={{ color: COLORS.text }}>{simResults.total.toLocaleString()}</strong> games:
                </p>
                <ProbBar
                  label="Switch"
                  value={simResults.switchWins / simResults.total}
                  color={COLORS.car}
                  maxW={280}
                />
                <ProbBar
                  label="Stay"
                  value={simResults.stayWins / simResults.total}
                  color={COLORS.goat}
                  maxW={280}
                />
                <p style={{ fontSize: 11, color: COLORS.muted, margin: "10px 0 0", lineHeight: 1.5 }}>
                  Switch won{" "}
                  <strong style={{ color: COLORS.car }}>{simResults.switchWins.toLocaleString()}</strong> times vs Stay{" "}
                  <strong style={{ color: COLORS.goat }}>{simResults.stayWins.toLocaleString()}</strong> times
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Transcript panel */}
      <div
        ref={transcriptRef}
        style={{
          maxWidth: 520,
          width: "100%",
          background: COLORS.card,
          borderRadius: 16,
          padding: "20px 24px",
          border: "1px solid #2a2a3a",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: COLORS.accent,
            fontWeight: 700,
            display: "block",
            marginBottom: 10,
          }}
        >
          Transcript
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {STEPS.slice(0, step + 1).map((s, i) => (
            <div
              key={i}
              style={{
                opacity: i === step ? 1 : 0.5,
                transition: "opacity 0.3s",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: i === step ? COLORS.text : COLORS.muted,
                }}
              >
                <strong style={{ color: i === step ? COLORS.accent : COLORS.accentDim }}>
                  {s.title}:
                </strong>{" "}
                {s.transcript}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, maxWidth: 520, width: "100%" }}>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: 10,
            border: `1px solid ${step === 0 ? "#2a2a3a" : COLORS.muted}`,
            background: "transparent",
            color: step === 0 ? "#2a2a3a" : COLORS.text,
            fontWeight: 600,
            fontSize: 14,
            cursor: step === 0 ? "default" : "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back
        </button>
        <button
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: 10,
            border: "none",
            background: step === STEPS.length - 1 ? "#2a2a3a" : COLORS.accent,
            color: step === STEPS.length - 1 ? "#5a5a6a" : COLORS.bg,
            fontWeight: 700,
            fontSize: 14,
            cursor: step === STEPS.length - 1 ? "default" : "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
