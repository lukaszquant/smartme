import { Link } from "react-router-dom";
import { useDocumentHead } from "../hooks";

export default function NotFound() {
  useDocumentHead("Page not found");
  return (
    <div
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "80px 20px",
        textAlign: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Page not found</h1>
      <p style={{ color: "#7a7a90", fontSize: 15, marginBottom: 24 }}>
        This page doesn't exist. Maybe it went for a walk.
      </p>
      <Link
        to="/"
        style={{
          color: "#f0c040",
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600,
          padding: "10px 20px",
          borderRadius: 8,
          border: "1px solid #f0c04044",
          background: "#f0c04008",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
