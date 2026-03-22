import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { path: "/blockchain", label: "Blockchain" },
  { path: "/fine-tuning", label: "Fine-Tuning" },
  { path: "/monty-hall", label: "Monty Hall" },
  { path: "/double-slit", label: "Double Slit" },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 20px",
          borderBottom: "1px solid #1e1e2e",
          background: "#0d0d14",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#e8e8f0",
            textDecoration: "none",
            marginRight: 16,
          }}
        >
          SmartMe
        </Link>

        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: pathname.startsWith(item.path) ? "#f0c040" : "#7a7a90",
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: 6,
              background: pathname.startsWith(item.path) ? "#f0c04010" : "transparent",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main style={{ flex: 1 }}>{children}</main>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #1e1e2e",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "#4a4a5a",
        }}
      >
        Made by lukaszquant ·{" "}
        <a
          href="https://github.com/lukaszquant/smartme"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#6a6a7a", textDecoration: "none" }}
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
