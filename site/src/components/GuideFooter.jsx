import { Link } from "react-router-dom";

export function GuideTranscriptBar({ transcriptPath, downloadFile, color }) {
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
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4a4a5a" }}>
        Companion transcript:
      </span>
      <Link
        to={transcriptPath}
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
        Read transcript
      </Link>
      <a
        href={downloadFile}
        download
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: "#7a7a90",
          textDecoration: "none",
          padding: "6px 14px",
          borderRadius: 7,
          border: "1px solid #2a2a3a",
        }}
      >
        Download .docx
      </a>
    </div>
  );
}

export default GuideTranscriptBar;
