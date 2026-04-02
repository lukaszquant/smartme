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
  {
    path: "/clear-vs-strong",
    title: "The Expert Blind Spot",
    description: "Why clear intuitions are often weak predictions — and why intelligence makes the trap worse, not better. Based on Kahneman & Duke.",
    tag: "~18 min listen",
    icon: "🧠",
    color: "#c8a96e",
  },
  {
    path: "/hard-to-vary",
    title: "The Hard-to-Vary Criterion",
    description: "What separates good explanations from bad ones — and why matching the data is nowhere near enough. Based on David Deutsch.",
    tag: "~16 min listen",
    icon: "🧩",
    color: "#e8c547",
  },
  {
    path: "/group-power",
    title: "The Power of the Group",
    description: "Why groups make better decisions — when structured right. Based on Kahneman, Duke, and Deutsch.",
    tag: "~20 min listen",
    icon: "👥",
    color: "#3a9e6e",
  },
  {
    path: "/llm",
    title: "How LLMs Work",
    description: "From autocomplete to emergent intelligence — what large language models actually do under the hood.",
    tag: "~25 min listen",
    icon: "🤖",
    color: "#e94560",
  },
  {
    path: "/agentic-ai",
    title: "Claude Code as Your Agent",
    description: "Mastering Claude Code's agentic capabilities — compaction, sub-agents, CLAUDE.md, and power workflows.",
    tag: "~24 min listen",
    icon: "🤝",
    color: "#3b82f6",
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
        Walking <strong style={{ color: "#e8e8f0" }}>audiobook transcripts</strong> on
        topics I want to understand better or just find interesting. Sharing them
        here in case you find them useful. Just plug one into a text-to-speech app
        like Speechify and GO!
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
        for a walking companion. Each piece also has an{" "}
        <strong style={{ color: "#e8e8f0" }}>interactive version</strong> with
        visualizations you can play with afterwards.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {ESSAYS.map((essay) => (
          <Link
            key={essay.path}
            to={essay.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
              color: "inherit",
              background: "#13131a",
              border: "1px solid #1e1e2e",
              borderRadius: 12,
              padding: "16px 18px",
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
            <span style={{ fontSize: 24, flexShrink: 0 }}>{essay.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: essay.color, margin: 0, lineHeight: 1.3 }}>
                {essay.title}
              </h2>
              <span style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#4a4a5a",
              }}>
                {essay.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
