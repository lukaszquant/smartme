import { Link } from "react-router-dom";

export default function TranscriptPage({ title, subtitle, html, guidePath, downloadFile, color }) {
  return (
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "40px 20px 60px",
        fontFamily: "'Source Serif 4', Georgia, serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Source+Serif+4:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <div style={{ marginBottom: 32 }}>
        <Link
          to={guidePath}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: color || "#7a7a90",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
          }}
        >
          ← Back to interactive guide
        </Link>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#e8e8f0",
            lineHeight: 1.3,
            marginBottom: 6,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p style={{ fontSize: 16, color: "#7a7a90", margin: "0 0 16px" }}>{subtitle}</p>
        )}

        <a
          href={downloadFile}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: color || "#f0c040",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: 8,
            border: `1px solid ${(color || "#f0c040")}44`,
            background: `${(color || "#f0c040")}08`,
          }}
        >
          Download transcript (.docx)
        </a>
      </div>

      <article
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          color: "#c8c8d8",
          fontSize: 17,
          lineHeight: 1.8,
        }}
      />

      <style>{`
        article p { margin: 0 0 18px; }
        article strong { color: #e0d6ff; }
        article em { color: #b8b8cc; }
        article h1, article h2, article h3 {
          font-family: 'DM Sans', sans-serif;
          color: #e8e8f0;
          margin: 36px 0 12px;
        }
        article h1 { font-size: 28px; }
        article h2 { font-size: 22px; }
        article h3 { font-size: 18px; }
        article blockquote {
          border-left: 3px solid ${color || "#f0c040"}66;
          padding: 12px 20px;
          margin: 20px 0;
          background: ${(color || "#f0c040")}08;
          border-radius: 0 8px 8px 0;
        }
        article blockquote p { margin: 0; }
        article ul, article ol { margin: 0 0 18px; padding-left: 24px; }
        article li { margin-bottom: 6px; }
      `}</style>
    </div>
  );
}
