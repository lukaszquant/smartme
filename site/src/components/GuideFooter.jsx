import { Link } from "react-router-dom";

export function GuideTranscriptBar({ essayPath, color }) {
  return (
    <div
      style={{
        maxWidth: 520,
        width: "100%",
        margin: "0 auto",
        padding: "12px 16px",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        to={essayPath}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: color || "#f0c040",
          textDecoration: "none",
          padding: "6px 14px",
          borderRadius: 7,
          border: `1px solid ${(color || "#f0c040")}44`,
          background: `${(color || "#f0c040")}08`,
        }}
      >
        ← Read the essay
      </Link>
    </div>
  );
}

export default GuideTranscriptBar;
