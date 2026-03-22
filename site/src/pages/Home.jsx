import { Link } from "react-router-dom";
import { useDocumentHead } from "../hooks";

const ESSAYS = [
  {
    path: "/blockchain",
    title: "Blockchain Explained",
    description: "A walk-friendly guide to how blockchains work — from shared notebooks to proof of stake, with everyday analogies.",
    tag: "~35 min listen",
    icon: "🔗",
    color: "#42b4f5",
  },
  {
    path: "/fine-tuning",
    title: "Why Is the Universe Just Right?",
    description: "Fine-tuning, the multiverse, and why the answer might be wrong. Based on David Deutsch's The Beginning of Infinity.",
    tag: "~10 min listen",
    icon: "🎛️",
    color: "#a78bfa",
  },
  {
    path: "/monty-hall",
    title: "The Monty Hall Problem",
    description: "A probability paradox that fools almost everyone — why you should always switch doors.",
    tag: "~12 min listen",
    icon: "🚪",
    color: "#f0c040",
  },
  {
    path: "/double-slit",
    title: "The Double Slit Experiment",
    description: "The most important experiment in physics — waves, particles, and why observation changes everything.",
    tag: "~22 min listen",
    icon: "🌊",
    color: "#e05050",
  },
];

export default function Home() {
  useDocumentHead(null, "Walking audiobooks on ideas worth understanding. Download the transcript, load it into a text-to-speech reader, and learn while you walk.");
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
      <p style={{ color: "#c8c8d8", fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
        I make these for myself using AI agents — <strong style={{ color: "#e8e8f0" }}>walking
        audiobook transcripts</strong> on topics I want to understand better or just
        find interesting. Just plug one into a text-to-speech app like Speechify and GO!
      </p>

      <div
        style={{
          background: "#13131a",
          border: "1px solid #1e1e2e",
          borderRadius: 10,
          padding: "16px 20px",
          marginBottom: 40,
          fontSize: 14,
          lineHeight: 1.7,
          color: "#7a7a90",
        }}
      >
        <span style={{ fontWeight: 700, color: "#e8e8f0" }}>How to use:</span>{" "}
        Read online, or download the .docx and load it into a text-to-speech reader
        for a walking companion. Each piece also has an interactive version
        with visualizations you can play with afterwards.
      </div>

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
