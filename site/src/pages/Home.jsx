import { Link } from "react-router-dom";

const ESSAYS = [
  {
    path: "/blockchain",
    title: "Blockchain Explained",
    description: "A walk-friendly guide to how blockchains work — from shared notebooks to proof of stake, with everyday analogies.",
    tag: "~25 min read",
    icon: "🔗",
    color: "#42b4f5",
  },
  {
    path: "/fine-tuning",
    title: "Why Is the Universe Just Right?",
    description: "Fine-tuning, the multiverse, and why the answer might be wrong. Based on David Deutsch's The Beginning of Infinity.",
    tag: "~30 min read",
    icon: "🎛️",
    color: "#a78bfa",
  },
  {
    path: "/monty-hall",
    title: "The Monty Hall Problem",
    description: "A probability paradox that fools almost everyone — why you should always switch doors.",
    tag: "~15 min read",
    icon: "🚪",
    color: "#f0c040",
  },
];

export default function Home() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 20px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Playfair+Display:wght@700;900&display=swap"
        rel="stylesheet"
      />

      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 36,
          fontWeight: 900,
          marginBottom: 8,
          background: "linear-gradient(135deg, #f0c040, #42b4f5, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SmartMe
      </h1>
      <p style={{ color: "#7a7a90", fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>
        Essays and interactive explainers for ideas worth understanding deeply.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ESSAYS.map((essay) => (
          <Link
            key={essay.path}
            to={essay.path}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              background: "#13131a",
              border: "1px solid #1e1e2e",
              borderRadius: 14,
              padding: "24px",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = essay.color + "66";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1e1e2e";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span style={{ fontSize: 32, flexShrink: 0 }}>{essay.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: essay.color, margin: 0 }}>
                    {essay.title}
                  </h2>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#4a4a5a",
                    flexShrink: 0,
                  }}>
                    {essay.tag}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "#7a7a90", lineHeight: 1.6, margin: 0 }}>
                  {essay.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
