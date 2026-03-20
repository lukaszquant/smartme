import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "ledger",
    title: "The Shared Ledger",
    subtitle: "Imagine a notebook everyone can read",
    icon: "📒",
  },
  {
    id: "blocks",
    title: "Blocks & Chains",
    subtitle: "Pages linked by fingerprints",
    icon: "🔗",
  },
  {
    id: "hash",
    title: "Cryptographic Hashing",
    subtitle: "The tamper-proof seal",
    icon: "🔏",
  },
  {
    id: "whynot",
    title: "Why Not One Writer?",
    subtitle: "The case for decentralization",
    icon: "🚫",
  },
  {
    id: "consensus",
    title: "Consensus",
    subtitle: "How the network agrees",
    icon: "🤝",
  },
  {
    id: "mining",
    title: "Mining & Proof of Work",
    subtitle: "The puzzle solvers",
    icon: "⛏️",
  },
  {
    id: "pos",
    title: "Proof of Stake",
    subtitle: "Security through skin in the game",
    icon: "🪙",
  },
  {
    id: "cheat",
    title: "Can You Cheat the Hash?",
    subtitle: "Why smarter guessing doesn't help",
    icon: "🎲",
  },
  {
    id: "uses",
    title: "Real-World Uses",
    subtitle: "Beyond cryptocurrency",
    icon: "🌍",
  },
  {
    id: "gitvs",
    title: "Blockchain vs. Git",
    subtitle: "Same DNA, different trust models",
    icon: "🔀",
  },
];

// --- Section: Shared Ledger ---
function LedgerViz() {
  const [entries, setEntries] = useState([
    { from: "Alice", to: "Bob", amount: 5 },
    { from: "Bob", to: "Charlie", amount: 2 },
  ]);
  const [newFrom, setNewFrom] = useState("Charlie");
  const [newTo, setNewTo] = useState("Alice");
  const [newAmt, setNewAmt] = useState(3);
  const [copies, setCopies] = useState([true, true, true]);

  const addEntry = () => {
    const entry = { from: newFrom, to: newTo, amount: newAmt };
    setEntries([...entries, entry]);
    setTimeout(() => setCopies([true, true, true]), 300);
  };

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        A blockchain is like a <strong style={{ color: "#f0c674" }}>shared notebook</strong> that
        thousands of people keep identical copies of. When someone writes a new entry, every copy
        updates simultaneously. Nobody can secretly erase or change a line — because everyone else's
        copy would immediately disagree.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        {["Node A", "Node B", "Node C"].map((name, i) => (
          <div
            key={name}
            style={{
              flex: "1 1 140px",
              background: copies[i] ? "rgba(129,199,132,0.10)" : "rgba(255,183,77,0.10)",
              border: `1px solid ${copies[i] ? "#66bb6a55" : "#ffa72655"}`,
              borderRadius: 12,
              padding: 14,
              fontSize: 13,
            }}
          >
            <div style={{ fontWeight: 700, color: copies[i] ? "#81c784" : "#ffb74d", marginBottom: 8 }}>
              💻 {name}
            </div>
            {entries.map((e, j) => (
              <div key={j} style={{ color: "#cfd8e6", padding: "3px 0", fontFamily: "monospace", fontSize: 12 }}>
                {e.from} → {e.to}: <span style={{ color: "#f0c674" }}>{e.amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <select value={newFrom} onChange={(e) => setNewFrom(e.target.value)} style={selStyle}>
          {["Alice", "Bob", "Charlie"].map((n) => <option key={n}>{n}</option>)}
        </select>
        <span style={{ color: "#667" }}>→</span>
        <select value={newTo} onChange={(e) => setNewTo(e.target.value)} style={selStyle}>
          {["Alice", "Bob", "Charlie"].map((n) => <option key={n}>{n}</option>)}
        </select>
        <input
          type="number"
          value={newAmt}
          onChange={(e) => setNewAmt(Number(e.target.value))}
          style={{ ...selStyle, width: 60 }}
          min={1}
        />
        <button onClick={addEntry} style={btnStyle}>
          Add Transaction
        </button>
      </div>
    </div>
  );
}

// --- Section: Blocks & Chains ---
function BlockChainViz() {
  const blocks = [
    { id: 0, txns: ["Genesis Block"], prev: "0000000", hash: "a3f8c1d" },
    { id: 1, txns: ["Alice → Bob: 5", "Charlie → Dave: 2"], prev: "a3f8c1d", hash: "7b2e9f4" },
    { id: 2, txns: ["Bob → Eve: 1", "Dave → Alice: 3"], prev: "7b2e9f4", hash: "e5d1a08" },
  ];
  const [hover, setHover] = useState(null);

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        Transactions are grouped into <strong style={{ color: "#ce93d8" }}>blocks</strong>. Each
        block carries a <strong style={{ color: "#4dd0e1" }}>fingerprint</strong> of the previous
        block — like a wax seal that references the last page. Change one block, and every
        fingerprint after it breaks.
      </p>
      <div style={{ display: "flex", gap: 0, alignItems: "center", overflowX: "auto", paddingBottom: 8 }}>
        {blocks.map((b, i) => (
          <div key={b.id} style={{ display: "flex", alignItems: "center" }}>
            <div
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: hover === i ? "rgba(206,147,216,0.15)" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${hover === i ? "#ce93d8" : "#3a4050"}`,
                borderRadius: 14,
                padding: "16px 18px",
                minWidth: 150,
                transition: "all 0.25s",
                transform: hover === i ? "translateY(-4px)" : "none",
              }}
            >
              <div style={{ fontWeight: 800, color: "#ce93d8", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                Block #{b.id}
              </div>
              {b.txns.map((t, j) => (
                <div key={j} style={{ color: "#cfd8e6", fontSize: 12, fontFamily: "monospace", padding: "2px 0" }}>
                  {t}
                </div>
              ))}
              <div style={{ marginTop: 10, borderTop: "1px solid #3a4050", paddingTop: 8 }}>
                <div style={{ fontSize: 11, color: "#4dd0e1" }}>
                  prev: <code style={{ color: "#ffa726" }}>{b.prev}</code>
                </div>
                <div style={{ fontSize: 11, color: "#4dd0e1" }}>
                  hash: <code style={{ color: "#81c784" }}>{b.hash}</code>
                </div>
              </div>
            </div>
            {i < blocks.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 4px" }}>
                <svg width="36" height="20">
                  <line x1="0" y1="10" x2="28" y2="10" stroke="#4dd0e188" strokeWidth="2" />
                  <polygon points="28,5 36,10 28,15" fill="#4dd0e1" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Section: Hashing ---
function HashViz() {
  const [input, setInput] = useState("Hello blockchain!");
  const simpleHash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(16).padStart(8, "0").slice(0, 8);
  };

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        A <strong style={{ color: "#4dd0e1" }}>hash function</strong> is like a magic blender: you
        put in any data and get a fixed-size "fingerprint." Change even one letter and the
        fingerprint changes completely. It's a one-way street — you can't reverse-engineer the
        original from the hash.
      </p>
      <div style={{ background: "rgba(77,208,225,0.06)", border: "1px solid #4dd0e133", borderRadius: 14, padding: 20 }}>
        <label style={{ color: "#4dd0e1", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2 }}>
          Input (try changing a letter!)
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            background: "rgba(0,0,0,0.3)",
            border: "1px solid #4dd0e144",
            borderRadius: 8,
            color: "#fff",
            padding: "10px 14px",
            fontSize: 15,
            fontFamily: "monospace",
            marginTop: 8,
            marginBottom: 16,
            outline: "none",
          }}
        />
        <label style={{ color: "#81c784", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.2 }}>
          Hash Output
        </label>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 28,
            color: "#81c784",
            letterSpacing: 4,
            marginTop: 8,
            background: "rgba(0,0,0,0.3)",
            padding: "12px 18px",
            borderRadius: 8,
            wordBreak: "break-all",
          }}
        >
          {simpleHash(input)}
        </div>
      </div>
    </div>
  );
}

// --- Section: Why Not One Writer? ---
function WhyNotViz() {
  const [scenario, setScenario] = useState("centralized");
  const scenarios = {
    centralized: {
      label: "One Fixed Writer",
      color: "#ef5350",
      nodes: [
        { name: "Writer Node", role: "writer", x: 50, y: 30 },
        { name: "Verifier A", role: "verify", x: 20, y: 70 },
        { name: "Verifier B", role: "verify", x: 50, y: 80 },
        { name: "Verifier C", role: "verify", x: 80, y: 70 },
      ],
      problems: [
        { icon: "🎯", title: "Single point of failure", desc: "Hack one machine and the whole network stops" },
        { icon: "🚫", title: "Censorship", desc: "The writer can refuse to include your transactions" },
        { icon: "🏦", title: "It's just a bank again", desc: "You're trusting one party — the whole point was to avoid that" },
        { icon: "🔀", title: "Transaction manipulation", desc: "The writer can reorder transactions to benefit themselves" },
      ],
    },
    decentralized: {
      label: "Rotating Random Writer",
      color: "#66bb6a",
      nodes: [
        { name: "Miner A", role: "candidate", x: 20, y: 30 },
        { name: "Miner B", role: "winner", x: 50, y: 25 },
        { name: "Miner C", role: "candidate", x: 80, y: 30 },
        { name: "Miner D", role: "candidate", x: 35, y: 75 },
        { name: "Miner E", role: "candidate", x: 65, y: 75 },
      ],
      benefits: [
        { icon: "🛡️", title: "No single target", desc: "Writer changes every block — no one to hack or bribe" },
        { icon: "📢", title: "Censorship-resistant", desc: "If this writer skips you, the next random one won't" },
        { icon: "🤝", title: "Truly trustless", desc: "No middleman, no authority, no permission needed" },
        { icon: "⚖️", title: "Fair ordering", desc: "Conflicting transactions resolved by neutral, random selection" },
      ],
    },
  };

  const s = scenarios[scenario];

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        Why can't one node always write the next block while everyone else just verifies?
        Because it <strong style={{ color: "#ef5350" }}>recreates the very problem</strong> blockchain
        was designed to solve. Toggle between the two approaches to see why.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Object.entries(scenarios).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setScenario(key)}
            style={{
              flex: 1,
              padding: "10px 16px",
              borderRadius: 10,
              border: `1.5px solid ${scenario === key ? val.color + "88" : "#3a4050"}`,
              background: scenario === key ? val.color + "18" : "rgba(255,255,255,0.03)",
              color: scenario === key ? val.color : "#6b7a8d",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {key === "centralized" ? "🚫 " : "✓ "}{val.label}
          </button>
        ))}
      </div>

      {/* Network visualization */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        position: "relative",
        height: 160,
      }}>
        {s.nodes.map((node, i) => {
          const isWriter = node.role === "writer" || node.role === "winner";
          const nodeColor = isWriter ? s.color : "#6b7a8d";
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              transition: "all 0.4s",
            }}>
              <div style={{
                width: isWriter ? 48 : 38,
                height: isWriter ? 48 : 38,
                borderRadius: "50%",
                background: nodeColor + "22",
                border: `2px solid ${nodeColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isWriter ? 22 : 16,
                margin: "0 auto 4px",
                transition: "all 0.3s",
                boxShadow: isWriter ? `0 0 16px ${nodeColor}44` : "none",
              }}>
                {isWriter ? "✍️" : "💻"}
              </div>
              <div style={{ fontSize: 10, color: nodeColor, fontWeight: isWriter ? 700 : 500 }}>
                {node.name}
              </div>
              {isWriter && (
                <div style={{
                  fontSize: 9,
                  color: s.color,
                  background: s.color + "22",
                  borderRadius: 6,
                  padding: "2px 6px",
                  marginTop: 2,
                  fontWeight: 700,
                }}>
                  {scenario === "centralized" ? "ALWAYS WRITES" : "THIS ROUND'S WRITER"}
                </div>
              )}
            </div>
          );
        })}

        {/* Draw lines from writer to others */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {s.nodes.filter(n => n.role === "writer" || n.role === "winner").map((writer) =>
            s.nodes.filter(n => n !== writer).map((other, j) => (
              <line
                key={j}
                x1={`${writer.x}%`} y1={`${writer.y}%`}
                x2={`${other.x}%`} y2={`${other.y}%`}
                stroke={s.color + "33"}
                strokeWidth="1"
                strokeDasharray={scenario === "centralized" ? "none" : "4,4"}
              />
            ))
          )}
        </svg>
      </div>

      {/* Problems / Benefits cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {(s.problems || s.benefits).map((item, i) => (
          <div key={i} style={{
            background: scenario === "centralized" ? "rgba(239,83,80,0.06)" : "rgba(102,187,106,0.06)",
            border: `1px solid ${s.color}22`,
            borderRadius: 10,
            padding: "10px 12px",
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 12, marginBottom: 3 }}>{item.title}</div>
            <div style={{ color: "#8a94a6", fontSize: 11, lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Section: Consensus ---
function ConsensusViz() {
  const [votes, setVotes] = useState([null, null, null, null, null]);
  const names = ["Node A", "Node B", "Node C", "Node D", "Node E"];
  const approved = votes.filter((v) => v === true).length;
  const rejected = votes.filter((v) => v === false).length;
  const total = votes.filter((v) => v !== null).length;

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        With no central authority, how does the network decide what's true? Through{" "}
        <strong style={{ color: "#ffa726" }}>consensus</strong> — a majority of nodes must agree a
        block is valid before it's added. Think of it like a jury: the majority rules.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        {names.map((n, i) => (
          <div
            key={n}
            style={{
              background:
                votes[i] === true
                  ? "rgba(129,199,132,0.12)"
                  : votes[i] === false
                  ? "rgba(239,83,80,0.12)"
                  : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${
                votes[i] === true ? "#66bb6a55" : votes[i] === false ? "#ef534f55" : "#3a4050"
              }`,
              borderRadius: 12,
              padding: "12px 16px",
              textAlign: "center",
              minWidth: 90,
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>💻</div>
            <div style={{ color: "#cfd8e6", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{n}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <button
                onClick={() => { const v = [...votes]; v[i] = true; setVotes(v); }}
                style={{
                  ...voteBtnStyle,
                  background: votes[i] === true ? "#66bb6a" : "rgba(102,187,106,0.15)",
                  color: votes[i] === true ? "#fff" : "#66bb6a",
                }}
              >
                ✓
              </button>
              <button
                onClick={() => { const v = [...votes]; v[i] = false; setVotes(v); }}
                style={{
                  ...voteBtnStyle,
                  background: votes[i] === false ? "#ef5350" : "rgba(239,83,80,0.15)",
                  color: votes[i] === false ? "#fff" : "#ef5350",
                }}
              >
                ✗
              </button>
            </div>
          </div>
        ))}
      </div>
      {total >= 3 && (
        <div
          style={{
            padding: "12px 18px",
            borderRadius: 10,
            background: approved > rejected ? "rgba(129,199,132,0.12)" : "rgba(239,83,80,0.12)",
            color: approved > rejected ? "#81c784" : "#ef5350",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {approved > rejected ? "✓ Consensus reached — block accepted!" : "✗ Block rejected by the network."}
          &nbsp;({approved} approved, {rejected} rejected)
        </div>
      )}
      {total > 0 && total < 3 && (
        <div style={{ color: "#78909c", fontSize: 13, fontStyle: "italic" }}>
          Waiting for more votes... ({total}/5 cast)
        </div>
      )}
    </div>
  );
}

// --- Section: Mining ---
function MiningViz() {
  const [mining, setMining] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [found, setFound] = useState(false);
  const intervalRef = useRef(null);

  const fakeHash = (n) => {
    let h = n * 2654435761;
    h = ((h >>> 16) ^ h) * 0x45d9f3b;
    h = ((h >>> 16) ^ h) * 0x45d9f3b;
    h = (h >>> 16) ^ h;
    return Math.abs(h).toString(16).padStart(8, "0");
  };

  const startMining = () => {
    setMining(true);
    setFound(false);
    setNonce(0);
    let n = 0;
    intervalRef.current = setInterval(() => {
      n++;
      setNonce(n);
      const hash = fakeHash(n);
      if (hash.startsWith("000")) {
        setFound(true);
        setMining(false);
        clearInterval(intervalRef.current);
      }
    }, 60);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const currentHash = fakeHash(nonce);

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        Miners compete to solve a puzzle: find a number (a <strong style={{ color: "#ffa726" }}>nonce</strong>)
        that, when hashed with the block data, produces a hash starting with a certain number of
        zeros. It's like trying billions of combinations on a lock — hard to find, but easy to verify.
      </p>
      <div style={{ background: "rgba(255,167,38,0.06)", border: "1px solid #ffa72633", borderRadius: 14, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ color: "#ffa726", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Target: hash must start with "000"
          </span>
          <button
            onClick={startMining}
            disabled={mining}
            style={{
              ...btnStyle,
              opacity: mining ? 0.5 : 1,
              background: mining ? "#444" : "linear-gradient(135deg, #ffa726, #ff7043)",
            }}
          >
            {mining ? "⛏️ Mining..." : found ? "Mine Again" : "⛏️ Start Mining"}
          </button>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 14, color: "#b0b8c8", marginBottom: 6 }}>
          Nonce tried: <span style={{ color: "#ffa726", fontWeight: 700 }}>{nonce.toLocaleString()}</span>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            color: found ? "#81c784" : "#ef5350",
            letterSpacing: 2,
            padding: "10px 14px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 8,
            transition: "color 0.2s",
          }}
        >
          {currentHash}
        </div>
        {found && (
          <div style={{ marginTop: 12, color: "#81c784", fontWeight: 700, fontSize: 14 }}>
            🎉 Valid hash found! Block can be added to the chain.
          </div>
        )}
      </div>

      {/* Add vs Trust distinction */}
      <div style={{ marginTop: 20 }}>
        <div style={{ color: "#ffa726", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
          One Nugget to Add, Every Nugget to Trust
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{
            background: "rgba(129,199,132,0.08)",
            border: "1px solid #66bb6a33",
            borderRadius: 12,
            padding: 14,
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>⛏️ → 1️⃣</div>
            <div style={{ color: "#81c784", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>To Add a Block</div>
            <div style={{ color: "#b0b8c8", fontSize: 12, lineHeight: 1.6 }}>
              The miner shows <strong style={{ color: "#81c784" }}>one proof</strong> — the nonce they just found. Previous blocks were already proven by other miners when they were added.
            </div>
            <div style={{
              display: "flex", gap: 4, marginTop: 10, alignItems: "center",
            }}>
              {["#3a4050","#3a4050","#3a4050","#3a4050"].map((c,i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#6b7a8d" }}>
                  ✓
                </div>
              ))}
              <svg width="20" height="16"><polygon points="4,3 4,13 16,8" fill="#6b7a8d"/></svg>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(129,199,132,0.25)", border: "2px solid #81c784", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#81c784", fontWeight: 700 }}>
                ✓
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#6b7a8d", marginTop: 4 }}>Only the new block needs proof</div>
          </div>
          <div style={{
            background: "rgba(77,208,225,0.08)",
            border: "1px solid #4dd0e133",
            borderRadius: 12,
            padding: 14,
          }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>🔍 → 🔗🔗🔗</div>
            <div style={{ color: "#4dd0e1", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>To Trust the Chain</div>
            <div style={{ color: "#b0b8c8", fontSize: 12, lineHeight: 1.6 }}>
              A new node checks <strong style={{ color: "#4dd0e1" }}>every proof</strong> from the genesis block forward — inspecting every nugget ever found before trusting the history.
            </div>
            <div style={{
              display: "flex", gap: 4, marginTop: 10, alignItems: "center",
            }}>
              {[0,1,2,3,4].map((i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: "rgba(77,208,225,0.20)",
                  border: "2px solid #4dd0e1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#4dd0e1", fontWeight: 700,
                  animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                }}>
                  🔍
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#6b7a8d", marginTop: 4 }}>Every historical block is verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Section: Proof of Stake ---
function PoSViz() {
  const [validators, setValidators] = useState([
    { name: "Alice", stake: 32, honest: true, selected: false, slashed: false },
    { name: "Bob", stake: 64, honest: true, selected: false, slashed: false },
    { name: "Charlie", stake: 32, honest: true, selected: false, slashed: false },
    { name: "Dave", stake: 128, honest: true, selected: false, slashed: false },
    { name: "Eve", stake: 48, honest: true, selected: false, slashed: false },
  ]);
  const [phase, setPhase] = useState("idle"); // idle, selecting, proposing, slashing, done
  const [message, setMessage] = useState(null);

  const totalStake = validators.reduce((s, v) => s + (v.slashed ? 0 : v.stake), 0);

  const reset = () => {
    setValidators(validators.map(v => ({ ...v, selected: false, slashed: false, honest: true })));
    setPhase("idle");
    setMessage(null);
  };

  const selectProposer = () => {
    const active = validators.filter(v => !v.slashed);
    const rand = Math.random() * active.reduce((s, v) => s + v.stake, 0);
    let cumulative = 0;
    let winner = active[0].name;
    for (const v of active) {
      cumulative += v.stake;
      if (rand <= cumulative) { winner = v.name; break; }
    }
    setValidators(validators.map(v => ({ ...v, selected: v.name === winner })));
    setPhase("proposing");
    setMessage({ text: `${winner} selected as proposer (${validators.find(v=>v.name===winner).stake} ETH staked)`, color: "#4dd0e1" });
  };

  const proposeHonest = () => {
    const proposer = validators.find(v => v.selected);
    setPhase("done");
    setMessage({ text: `${proposer.name} proposed a valid block and earned a reward! ✓`, color: "#81c784" });
  };

  const proposeFraud = () => {
    const proposer = validators.find(v => v.selected);
    setValidators(validators.map(v => v.selected ? { ...v, slashed: true, honest: false } : v));
    setPhase("slashing");
    setMessage({ text: `${proposer.name} proposed a fraudulent block — SLASHED! ${proposer.stake} ETH destroyed forever.`, color: "#ef5350" });
  };

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
        Instead of burning electricity on puzzles, Proof of Stake makes cheating expensive through{" "}
        <strong style={{ color: "#ffa726" }}>collateral</strong>. Validators lock up their own
        cryptocurrency. Cheat, and your deposit is <strong style={{ color: "#ef5350" }}>destroyed</strong>.
      </p>

      {/* Validators */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {validators.map((v) => {
          const pct = totalStake > 0 ? ((v.slashed ? 0 : v.stake) / totalStake * 100).toFixed(0) : 0;
          return (
            <div key={v.name} style={{
              flex: "1 1 100px",
              background: v.slashed ? "rgba(239,83,80,0.10)" : v.selected ? "rgba(77,208,225,0.12)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${v.slashed ? "#ef534f55" : v.selected ? "#4dd0e166" : "#2a2f3a"}`,
              borderRadius: 12,
              padding: "12px 10px",
              textAlign: "center",
              transition: "all 0.3s",
              opacity: v.slashed ? 0.5 : 1,
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{v.slashed ? "🔥" : v.selected ? "⭐" : "🪙"}</div>
              <div style={{ color: v.slashed ? "#ef5350" : v.selected ? "#4dd0e1" : "#cfd8e6", fontWeight: 700, fontSize: 12 }}>{v.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 14, color: v.slashed ? "#ef5350" : "#ffa726", fontWeight: 700, marginTop: 4 }}>
                {v.slashed ? "0" : v.stake} ETH
              </div>
              <div style={{ fontSize: 10, color: "#6b7a8d", marginTop: 2 }}>
                {v.slashed ? "SLASHED" : `${pct}% chance`}
              </div>
              {/* Stake bar */}
              <div style={{ marginTop: 6, height: 4, background: "#2a2f3a", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`,
                  height: "100%",
                  background: v.slashed ? "#ef5350" : v.selected ? "#4dd0e1" : "#ffa726",
                  borderRadius: 2,
                  transition: "width 0.4s",
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {phase === "idle" && (
          <button onClick={selectProposer} style={{
            background: "linear-gradient(135deg, #4dd0e1, #26a69a)",
            border: "none", borderRadius: 8, color: "#fff", padding: "9px 18px",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            Select Random Proposer
          </button>
        )}
        {phase === "proposing" && (
          <>
            <button onClick={proposeHonest} style={{
              background: "linear-gradient(135deg, #66bb6a, #43a047)",
              border: "none", borderRadius: 8, color: "#fff", padding: "9px 18px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>
              ✓ Propose Valid Block
            </button>
            <button onClick={proposeFraud} style={{
              background: "linear-gradient(135deg, #ef5350, #c62828)",
              border: "none", borderRadius: 8, color: "#fff", padding: "9px 18px",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>
              ✗ Attempt Fraud
            </button>
          </>
        )}
        {(phase === "done" || phase === "slashing") && (
          <button onClick={reset} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid #3a4050",
            borderRadius: 8, color: "#cfd8e6", padding: "9px 18px",
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>
            Reset Simulation
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: "12px 16px",
          borderRadius: 10,
          background: message.color + "12",
          border: `1px solid ${message.color}33`,
          color: message.color,
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 16,
        }}>
          {message.text}
        </div>
      )}

      {/* PoW vs PoS comparison */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
        <div style={{
          background: "rgba(255,167,38,0.06)",
          border: "1px solid #ffa72622",
          borderRadius: 12,
          padding: 14,
        }}>
          <div style={{ color: "#ffa726", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            ⛏️ Proof of Work
          </div>
          <div style={{ fontSize: 12, color: "#b0b8c8", lineHeight: 1.6 }}>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Cost to participate:</strong> Hardware + electricity</div>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Punishment for cheating:</strong> Wasted electricity, no reward</div>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Energy use:</strong> Massive</div>
            <div><strong style={{ color: "#cfd8e6" }}>Used by:</strong> Bitcoin</div>
          </div>
        </div>
        <div style={{
          background: "rgba(77,208,225,0.06)",
          border: "1px solid #4dd0e122",
          borderRadius: 12,
          padding: 14,
        }}>
          <div style={{ color: "#4dd0e1", fontWeight: 700, fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            🪙 Proof of Stake
          </div>
          <div style={{ fontSize: 12, color: "#b0b8c8", lineHeight: 1.6 }}>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Cost to participate:</strong> Lock up cryptocurrency</div>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Punishment for cheating:</strong> Deposit destroyed (slashed)</div>
            <div style={{ marginBottom: 6 }}><strong style={{ color: "#cfd8e6" }}>Energy use:</strong> ~99.9% less than PoW</div>
            <div><strong style={{ color: "#cfd8e6" }}>Used by:</strong> Ethereum</div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 12,
        padding: "10px 14px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid #2a2f3a",
        borderRadius: 10,
        fontSize: 12,
        color: "#8a94a6",
        lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: "#ffa726" }}>Key tradeoff:</strong> PoW trades electricity for security. PoS trades capital for security. Both make honest behavior profitable and cheating costly — just through different mechanisms.
      </div>
    </div>
  );
}

// --- Section: Can You Cheat the Hash? ---
function CheatViz() {
  const [strategy, setStrategy] = useState("sequential");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState({ sequential: null, random: null, pattern: null });
  const intervalRef = useRef(null);
  const attemptsRef = useRef(0);

  const fakeHash = (n) => {
    let h = n * 2654435761;
    h = ((h >>> 16) ^ h) * 0x45d9f3b;
    h = ((h >>> 16) ^ h) * 0x45d9f3b;
    h = (h >>> 16) ^ h;
    return Math.abs(h).toString(16).padStart(8, "0");
  };

  const strategies = {
    sequential: { label: "Sequential (1, 2, 3...)", color: "#4dd0e1", pick: (i) => i },
    random: { label: "Random Numbers", color: "#ce93d8", pick: () => Math.floor(Math.random() * 999999999) },
    pattern: { label: "\"Smart\" Pattern", color: "#ffa726", pick: (i) => i * 7 + 42 },
  };

  const [attempts, setAttempts] = useState(0);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState("--------");
  const [found, setFound] = useState(false);

  const startRace = () => {
    setRunning(true);
    setFound(false);
    attemptsRef.current = 0;
    setAttempts(0);
    const strat = strategies[strategy];
    let i = 0;

    intervalRef.current = setInterval(() => {
      i++;
      attemptsRef.current = i;
      const n = strat.pick(i);
      const h = fakeHash(n);
      setCurrentNonce(n);
      setCurrentHash(h);
      setAttempts(i);
      if (h.startsWith("000")) {
        setFound(true);
        setRunning(false);
        setResults((prev) => ({ ...prev, [strategy]: i }));
        clearInterval(intervalRef.current);
      }
    }, 40);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const resetAll = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setFound(false);
    setAttempts(0);
    setCurrentHash("--------");
    setCurrentNonce(0);
    setResults({ sequential: null, random: null, pattern: null });
  };

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
        Can a smarter guessing strategy crack the hash faster? <strong style={{ color: "#ef5350" }}>No.</strong>{" "}
        SHA-256 output is indistinguishable from random noise — every guess has{" "}
        <strong style={{ color: "#4dd0e1" }}>identical odds</strong> regardless of strategy. Try all
        three and see for yourself.
      </p>

      {/* Strategy selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(strategies).map(([key, s]) => (
          <button
            key={key}
            onClick={() => { if (!running) setStrategy(key); }}
            style={{
              flex: "1 1 120px",
              padding: "9px 14px",
              borderRadius: 10,
              border: `1.5px solid ${strategy === key ? s.color + "88" : "#3a4050"}`,
              background: strategy === key ? s.color + "15" : "rgba(255,255,255,0.03)",
              color: strategy === key ? s.color : "#6b7a8d",
              fontWeight: 700,
              fontSize: 12,
              cursor: running ? "default" : "pointer",
              transition: "all 0.2s",
              opacity: running && strategy !== key ? 0.4 : 1,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Mining area */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: strategies[strategy].color, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>
            Target: starts with "000"
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={startRace} disabled={running} style={{
              background: running ? "#444" : `linear-gradient(135deg, ${strategies[strategy].color}, ${strategies[strategy].color}aa)`,
              border: "none", borderRadius: 8, color: "#fff", padding: "7px 16px",
              fontSize: 12, fontWeight: 700, cursor: running ? "default" : "pointer", opacity: running ? 0.5 : 1,
            }}>
              {running ? "Guessing..." : "Run Strategy"}
            </button>
            <button onClick={resetAll} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid #3a4050",
              borderRadius: 8, color: "#6b7a8d", padding: "7px 12px", fontSize: 12, cursor: "pointer",
            }}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ fontFamily: "monospace", fontSize: 13, color: "#8a94a6", marginBottom: 4 }}>
          Nonce: <span style={{ color: strategies[strategy].color }}>{currentNonce.toLocaleString()}</span>
          {" · "}Attempts: <span style={{ color: "#cfd8e6" }}>{attempts.toLocaleString()}</span>
        </div>
        <div style={{
          fontFamily: "monospace", fontSize: 24, letterSpacing: 2,
          color: found ? "#81c784" : "#ef5350",
          background: "rgba(0,0,0,0.3)", padding: "10px 14px", borderRadius: 8,
          transition: "color 0.2s",
        }}>
          {currentHash}
        </div>
        {found && (
          <div style={{ marginTop: 10, color: "#81c784", fontWeight: 700, fontSize: 13 }}>
            🎉 Found in {attempts.toLocaleString()} attempts!
          </div>
        )}
      </div>

      {/* Results comparison */}
      {Object.values(results).some((v) => v !== null) && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: "#6b7a8d", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            Results So Far
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(strategies).map(([key, s]) => (
              results[key] !== null && (
                <div key={key} style={{
                  flex: "1 1 100px",
                  background: s.color + "11",
                  border: `1px solid ${s.color}33`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  textAlign: "center",
                }}>
                  <div style={{ color: s.color, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: "#cfd8e6", fontFamily: "monospace", fontSize: 18, fontWeight: 700 }}>
                    {results[key].toLocaleString()}
                  </div>
                  <div style={{ color: "#6b7a8d", fontSize: 10 }}>attempts</div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Key insight */}
      <div style={{
        padding: "12px 16px",
        background: "rgba(77,208,225,0.06)",
        border: "1px solid #4dd0e122",
        borderRadius: 10,
        fontSize: 13,
        color: "#8a94a6",
        lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: "#4dd0e1" }}>The takeaway:</strong> Run each strategy a few times.
        You'll see the attempt counts are in the same ballpark — no strategy consistently wins. It's
        a lottery where every ticket has equal odds. The only edge is buying more tickets per second
        (faster hardware).
      </div>

      {/* Lottery / Collision Section */}
      <div style={{ marginTop: 24 }}>
        <div style={{ color: "#ffa726", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>
          🎟️ But There Is One Subtle Edge — The Lottery Insight
        </div>
        <p style={{ color: "#b0b8c8", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
          In a lottery, every ticket has equal odds. But people cluster on birthdays (1–31).
          Pick <strong style={{ color: "#ffa726" }}>47</strong> and you're no more likely to win — but
          far more likely to <strong style={{ color: "#81c784" }}>win alone</strong>. Mining works the
          same way: different sequences don't change your odds, but they prevent wasted duplicate work.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {/* Same sequence problem */}
          <div style={{
            background: "rgba(239,83,80,0.06)",
            border: "1px solid #ef534f22",
            borderRadius: 12,
            padding: 14,
          }}>
            <div style={{ color: "#ef5350", fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              ✗ Same Starting Sequence
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              {["Miner A", "Miner B"].map((name) => (
                <div key={name} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#6b7a8d", marginBottom: 4 }}>{name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ef5350", lineHeight: 1.8 }}>
                    {["1 →", "2 →", "3 →", "4 →"].map((n, i) => (
                      <div key={i}>{n} <span style={{ color: "#6b7a8d" }}>❌</span></div>
                    ))}
                    <div style={{ color: "#81c784" }}>5 → <span>✓</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#ef5350", lineHeight: 1.5 }}>
              Both find nonce 5 at the same time — only one gets the reward. The other wasted all their work.
            </div>
          </div>

          {/* Different sequence benefit */}
          <div style={{
            background: "rgba(129,199,132,0.06)",
            border: "1px solid #66bb6a22",
            borderRadius: 12,
            padding: 14,
          }}>
            <div style={{ color: "#81c784", fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
              ✓ Different Starting Sequences
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#6b7a8d", marginBottom: 4 }}>Miner A</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#8a94a6", lineHeight: 1.8 }}>
                  {["1 →", "2 →", "3 →", "4 →", "5 →"].map((n, i) => (
                    <div key={i}>{n} <span style={{ color: i === 4 ? "#81c784" : "#6b7a8d" }}>{i === 4 ? "✓" : "❌"}</span></div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#6b7a8d", marginBottom: 4 }}>Miner B</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#8a94a6", lineHeight: 1.8 }}>
                  {[{ n: "90M →", ok: false }, { n: "90M+1 →", ok: false }, { n: "90M+2 →", ok: false }, { n: "90M+3 →", ok: false }, { n: "90M+4 →", ok: false }].map((item, i) => (
                    <div key={i}>{item.n} <span style={{ color: "#6b7a8d" }}>❌</span></div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#81c784", lineHeight: 1.5 }}>
              Different ranges = no overlap. Miner A finds it; Miner B explored unique territory (no wasted duplicates).
            </div>
          </div>
        </div>

        <div style={{
          padding: "12px 16px",
          background: "rgba(255,167,38,0.06)",
          border: "1px solid #ffa72622",
          borderRadius: 10,
          fontSize: 13,
          color: "#8a94a6",
          lineHeight: 1.6,
        }}>
          🎟️ <strong style={{ color: "#ffa726" }}>The accurate summary:</strong> Same odds of winning,
          but less wasted work by avoiding overlap. You're not buying a luckier ticket — you're making
          sure you're not holding a photocopy of someone else's. This is why mining pools assign each
          worker a different nonce range.
        </div>
      </div>
    </div>
  );
}

// --- Section: Uses ---
function UsesViz() {
  const uses = [
    { icon: "💰", name: "Cryptocurrency", desc: "Bitcoin, Ethereum — digital money without banks" },
    { icon: "📜", name: "Smart Contracts", desc: "Self-executing agreements when conditions are met" },
    { icon: "🏥", name: "Medical Records", desc: "Tamper-proof patient history across hospitals" },
    { icon: "📦", name: "Supply Chain", desc: "Track a product from farm to your front door" },
    { icon: "🗳️", name: "Voting Systems", desc: "Verifiable, auditable election records" },
    { icon: "🎨", name: "Digital Ownership", desc: "Prove you own a digital asset (NFTs, deeds)" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>
        Blockchain isn't just about crypto. Any situation where you need a{" "}
        <strong style={{ color: "#ce93d8" }}>trusted, shared, tamper-proof record</strong> is a
        candidate for blockchain technology.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
        {uses.map((u, i) => (
          <div
            key={u.name}
            onClick={() => setActive(i)}
            style={{
              cursor: "pointer",
              background: active === i ? "rgba(206,147,216,0.12)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${active === i ? "#ce93d866" : "#3a4050"}`,
              borderRadius: 12,
              padding: 14,
              transition: "all 0.2s",
              transform: active === i ? "scale(1.03)" : "none",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{u.icon}</div>
            <div style={{ color: active === i ? "#ce93d8" : "#cfd8e6", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              {u.name}
            </div>
            <div style={{ color: "#8a94a6", fontSize: 12, lineHeight: 1.5 }}>{u.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Section: Blockchain vs Git ---
function GitVsViz() {
  const comparisons = [
    {
      dimension: "History Model",
      icon: "📜",
      blockchain: "Blocks chained by hashes — linear, append-only",
      git: "Commits chained by hashes — supports branching & merging",
      same: true,
    },
    {
      dimension: "Distribution",
      icon: "🌐",
      blockchain: "Every node holds the full ledger",
      git: "Every clone holds the full repo history",
      same: true,
    },
    {
      dimension: "Tamper Evidence",
      icon: "🔏",
      blockchain: "Change one block → all downstream hashes break",
      git: "Change one commit → all downstream hashes break",
      same: true,
    },
    {
      dimension: "Trust Model",
      icon: "🤝",
      blockchain: "Trustless — assumes participants may cheat",
      git: "Trusted — maintainers decide what's merged",
      same: false,
    },
    {
      dimension: "Who Writes?",
      icon: "✍️",
      blockchain: "Random miner selected via expensive puzzle",
      git: "Anyone with permission; maintainer approves",
      same: false,
    },
    {
      dimension: "Forks",
      icon: "🔀",
      blockchain: "A crisis — the network fights to avoid them",
      git: "A feature — developers branch constantly",
      same: false,
    },
    {
      dimension: "Rewriting History",
      icon: "⏪",
      blockchain: "Practically impossible (would need to outpace entire network)",
      git: "Possible with force-push if you have access",
      same: false,
    },
    {
      dimension: "Consensus Needed?",
      icon: "⚖️",
      blockchain: "Yes — expensive proof of work / stake required",
      git: "No — trust and code review replace consensus",
      same: false,
    },
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div>
      <p style={{ color: "#b0b8c8", lineHeight: 1.7, marginBottom: 20, fontSize: 15 }}>
        Git and blockchain share real structural DNA — both use{" "}
        <strong style={{ color: "#4dd0e1" }}>hash chains</strong> and{" "}
        <strong style={{ color: "#4dd0e1" }}>distributed copies</strong>. But their trust models
        are polar opposites. Hover over each row to explore.
      </p>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 14, fontSize: 12 }}>
        <span style={{ color: "#66bb6a" }}>● Similar</span>
        <span style={{ color: "#ffa726" }}>● Different</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {comparisons.map((c, i) => {
          const isHovered = hoveredIdx === i;
          const accent = c.same ? "#66bb6a" : "#ffa726";
          return (
            <div
              key={c.dimension}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: isHovered
                  ? `${accent}11`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${isHovered ? accent + "44" : "#2a2f3a"}`,
                borderRadius: 12,
                padding: isHovered ? "14px 16px" : "10px 16px",
                transition: "all 0.25s",
                cursor: "default",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isHovered ? 10 : 0 }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <span style={{ color: accent, fontWeight: 700, fontSize: 13, flex: 1 }}>
                  {c.dimension}
                </span>
                <span style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: accent + "22",
                  color: accent,
                  fontWeight: 600,
                }}>
                  {c.same ? "SIMILAR" : "DIFFERENT"}
                </span>
              </div>

              {isHovered && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                  <div style={{
                    background: "rgba(206,147,216,0.08)",
                    borderRadius: 8,
                    padding: "8px 12px",
                  }}>
                    <div style={{ fontSize: 10, color: "#ce93d8", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                      ⛓️ Blockchain
                    </div>
                    <div style={{ fontSize: 12, color: "#cfd8e6", lineHeight: 1.5 }}>{c.blockchain}</div>
                  </div>
                  <div style={{
                    background: "rgba(255,152,0,0.08)",
                    borderRadius: 8,
                    padding: "8px 12px",
                  }}>
                    <div style={{ fontSize: 10, color: "#ff9800", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                      🔀 Git
                    </div>
                    <div style={{ fontSize: 12, color: "#cfd8e6", lineHeight: 1.5 }}>{c.git}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 16,
        padding: "12px 16px",
        background: "rgba(77,208,225,0.06)",
        border: "1px solid #4dd0e122",
        borderRadius: 10,
        fontSize: 13,
        color: "#8a94a6",
        lineHeight: 1.6,
      }}>
        💡 <strong style={{ color: "#4dd0e1" }}>The takeaway:</strong> Git is a shared notebook for
        a trusted team. Blockchain is a shared notebook for strangers who don't trust each other.
        That extra distrust is what makes blockchain so much more complex.
      </div>
    </div>
  );
}

const VIZMAP = {
  ledger: LedgerViz,
  blocks: BlockChainViz,
  hash: HashViz,
  whynot: WhyNotViz,
  consensus: ConsensusViz,
  mining: MiningViz,
  pos: PoSViz,
  cheat: CheatViz,
  uses: UsesViz,
  gitvs: GitVsViz,
};

const selStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid #3a4050",
  borderRadius: 8,
  color: "#cfd8e6",
  padding: "8px 12px",
  fontSize: 13,
  outline: "none",
};
const btnStyle = {
  background: "linear-gradient(135deg, #4dd0e1, #26a69a)",
  border: "none",
  borderRadius: 8,
  color: "#fff",
  padding: "8px 18px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
};
const voteBtnStyle = {
  border: "none",
  borderRadius: 6,
  padding: "6px 10px",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};

export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const section = SECTIONS[activeIdx];
  const Viz = VIZMAP[section.id];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#12151c",
        color: "#e0e6ef",
        fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "36px 28px 18px",
          background: "linear-gradient(180deg, rgba(77,208,225,0.08) 0%, transparent 100%)",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            margin: 0,
            background: "linear-gradient(135deg, #4dd0e1, #ce93d8, #ffa726)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.5,
          }}
        >
          Blockchain Explained
        </h1>
        <p style={{ color: "#6b7a8d", fontSize: 14, margin: "6px 0 0" }}>
          Interactive visual guide — tap each concept below
        </p>
      </div>

      {/* Navigation Pills */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "8px 28px 16px",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(i)}
            style={{
              flexShrink: 0,
              background: activeIdx === i ? "rgba(77,208,225,0.15)" : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${activeIdx === i ? "#4dd0e166" : "#2a2f3a"}`,
              borderRadius: 20,
              padding: "7px 16px",
              color: activeIdx === i ? "#4dd0e1" : "#6b7a8d",
              fontWeight: activeIdx === i ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Active Section */}
      <div style={{ padding: "0 28px 36px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #2a2f3a",
            borderRadius: 18,
            padding: "28px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 30 }}>{section.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#e0e6ef" }}>
                {section.title}
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "#6b7a8d" }}>{section.subtitle}</p>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Viz />
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width: activeIdx === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: activeIdx === i ? "#4dd0e1" : "#2a2f3a",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <button
            onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            style={{ ...btnStyle, opacity: activeIdx === 0 ? 0.3 : 1 }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveIdx(Math.min(SECTIONS.length - 1, activeIdx + 1))}
            disabled={activeIdx === SECTIONS.length - 1}
            style={{ ...btnStyle, opacity: activeIdx === SECTIONS.length - 1 ? 0.3 : 1 }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
