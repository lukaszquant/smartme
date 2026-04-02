import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#0a0e17", surface: "#111827", surfaceHover: "#1a2235",
  border: "#1e293b", text: "#e2e8f0", textMuted: "#94a3b8",
  accent: "#3b82f6", accentGlow: "rgba(59,130,246,0.12)",
  green: "#22c55e", greenGlow: "rgba(34,197,94,0.12)",
  amber: "#f59e0b", amberGlow: "rgba(245,158,11,0.12)",
  red: "#ef4444", redGlow: "rgba(239,68,68,0.12)",
  purple: "#a78bfa", purpleGlow: "rgba(167,139,250,0.12)",
  cyan: "#06b6d4", cyanGlow: "rgba(6,182,212,0.12)",
  pink: "#f472b6",
};

const tabs = [
  { id: "compaction", label: "Compaction" },
  { id: "notes", label: "Structured Notes" },
  { id: "claudemd", label: "CLAUDE.md" },
  { id: "mentions", label: "@-Mentions" },
  { id: "subagents", label: "Sub-Agents" },
  { id: "workflows", label: "Power Workflows" },
  { id: "mistakes", label: "Common Mistakes" },
];

function Mono({ children, color }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.7,
      background: `${color || C.accent}0a`, border: `1px solid ${color || C.accent}22`,
      borderRadius: 6, padding: "10px 12px", color: C.textMuted,
      whiteSpace: "pre-wrap", overflowX: "auto",
    }}>{children}</div>
  );
}

function Prompt({ text, label, color }) {
  return (
    <div style={{ marginTop: 10 }}>
      {label && <div style={{ fontSize: 9, color: color || C.green, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.6,
        background: `${color || C.green}11`, border: `1px solid ${color || C.green}33`,
        borderRadius: 6, padding: "8px 12px", color: color || C.green,
      }}>&gt; {text}</div>
    </div>
  );
}

function InfoBox({ color, title, children }) {
  return (
    <div style={{ background: `${color}11`, border: `1px solid ${color}33`, borderRadius: 8, padding: 14, marginBottom: 10 }}>
      {title && <div style={{ fontSize: 12, color, fontWeight: 700, marginBottom: 6 }}>{title}</div>}
      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

// ─── COMPACTION SIMULATOR ───
function CompactionTab() {
  const [step, setStep] = useState(0);
  const maxTokens = 200;

  const timeline = [
    { label: "Start session", tokens: [
      { name: "System + CLAUDE.md", size: 12, color: C.accent },
      { name: "Tool definitions", size: 8, color: C.purple },
    ]},
    { label: "Explore codebase (15 files read)", tokens: [
      { name: "System + CLAUDE.md", size: 12, color: C.accent },
      { name: "Tool defs", size: 8, color: C.purple },
      { name: "File contents (15 files)", size: 45, color: C.cyan },
      { name: "Your questions", size: 5, color: C.green },
      { name: "Claude's analysis", size: 15, color: C.amber },
    ]},
    { label: "Plan refactor + 3 rounds of edits", tokens: [
      { name: "System + CLAUDE.md", size: 12, color: C.accent },
      { name: "Tool defs", size: 8, color: C.purple },
      { name: "File contents", size: 45, color: C.cyan },
      { name: "Plan", size: 10, color: C.green },
      { name: "Code diffs (3 rounds)", size: 30, color: C.amber },
      { name: "Test outputs", size: 20, color: C.pink },
      { name: "Conversation", size: 25, color: "#fb923c" },
      { name: "\u26A0 Context rot zone", size: 30, color: C.red },
    ]},
    { label: "After /compact", tokens: [
      { name: "System + CLAUDE.md", size: 12, color: C.accent },
      { name: "Tool defs", size: 8, color: C.purple },
      { name: "Compacted summary", size: 15, color: C.green },
      { name: "5 recent files", size: 18, color: C.cyan },
      { name: "Current task state", size: 5, color: C.amber },
    ]},
  ];

  const current = timeline[step];
  const total = current.tokens.reduce((a, t) => a + t.size, 0);
  const pct = Math.round((total / maxTokens) * 100);
  const isRotten = pct > 80;

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Watch context fill up during a real session, then see what <span style={{ color: C.green, fontWeight: 700 }}>/compact</span> does.
      </div>

      {/* Step buttons */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {timeline.map((t, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            background: step === i ? (i === 3 ? C.green : C.accent) : C.surface,
            color: step === i ? "#fff" : C.textMuted,
            border: `1px solid ${step === i ? (i === 3 ? C.green : C.accent) : C.border}`,
            padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 10, fontWeight: 600,
            fontFamily: "inherit",
          }}>{i === 3 ? "\u2713 /compact" : `Step ${i + 1}`}</button>
        ))}
      </div>

      {/* Context bar */}
      <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: C.textMuted }}>{current.label}</span>
        <span style={{ fontSize: 11, color: isRotten ? C.red : C.green, fontWeight: 600 }}>
          {total}K / {maxTokens}K ({pct}%) {isRotten ? "\u26A0 ROT" : "\u2713 OK"}
        </span>
      </div>
      <div style={{ background: C.surface, borderRadius: 8, height: 32, display: "flex", overflow: "hidden", border: `1px solid ${isRotten ? C.red : C.border}`, marginBottom: 10 }}>
        {current.tokens.map((t, i) => (
          <div key={i} style={{
            width: `${(t.size / maxTokens) * 100}%`, background: t.color, opacity: 0.8,
            transition: "width 0.5s ease",
          }} />
        ))}
        <div style={{ flex: 1, background: C.bg }} />
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {current.tokens.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 2, background: t.color }} />
            <span style={{ fontSize: 10, color: C.textMuted }}>{t.name} ({t.size}K)</span>
          </div>
        ))}
      </div>

      {step === 2 && (
        <InfoBox color={C.red} title="Context Rot in Action">
          At 90%+ usage, Claude starts repeating itself, forgetting earlier decisions, and contradicting its own plan.
          The old file contents and test outputs are stale but still eating attention.
        </InfoBox>
      )}
      {step === 3 && (
        <InfoBox color={C.green} title="After /compact: 29% usage">
          Exploration summarized. Old test outputs cleared. Only the 5 most recently accessed files kept.
          Claude's next response will be dramatically sharper — full attention on what matters now.
        </InfoBox>
      )}

      <Prompt label="Sports modelling example" text="I've been analyzing why my xG model underperforms on recent data. We identified the stale shot features issue. Before I ask you to implement the fix, let me /compact first so you have a fresh attention budget." />
    </div>
  );
}

// ─── STRUCTURED NOTES TAB ───
function NotesTab() {
  const [day, setDay] = useState(1);
  const noteContent = `# Player Rating Model Notes
## Last updated: Day ${day}

### Decisions Made
${day >= 1 ? "- Bayesian Elo with time-decay chosen over standard Elo\n- Sport: football (soccer), top 5 European leagues\n- Lookback: 38 matchdays rolling, home/away split" : ""}
${day >= 2 ? "- Features: xG contribution, progressive passes, pressures, minutes\n- Evaluation: Brier score, calibration curve, log-loss by league\n- Cap Elo deltas at 50 points per match to limit outliers" : ""}
${day >= 3 ? "- Evaluation: Brier 0.198, well-calibrated 20-80% range\n- Test seasons: 2023-24, 2024-25 held out\n- Predictions: pre-match, refreshed weekly" : ""}

### Completed
${day >= 1 ? "- [x] Elo system design and data sources" : ""}
${day >= 2 ? "- [x] Elo engine + unit tests (incl. promoted teams)" : ""}
${day >= 3 ? "- [x] Full evaluation on holdout seasons" : ""}

### Next Steps
${day === 1 ? "- [ ] Implement Elo rating engine\n- [ ] Build feature engineering pipeline\n- [ ] Integrate with prediction model" : ""}
${day === 2 ? "- [ ] Integrate with prediction model\n- [ ] Run full evaluation on holdout seasons\n- [ ] Analyze performance by league" : ""}
${day === 3 ? "- [ ] Performance by league and home/away\n- [ ] Calibration by match importance\n- [ ] Write documentation" : ""}`;

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Notes survive across sessions. Day 1 decisions are available on Day 3 without any context window cost.
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[1, 2, 3].map(d => (
          <button key={d} onClick={() => setDay(d)} style={{
            background: day === d ? C.green : C.surface,
            color: day === d ? "#fff" : C.textMuted,
            border: `1px solid ${day === d ? C.green : C.border}`,
            padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
            fontFamily: "inherit",
          }}>Day {d}</button>
        ))}
      </div>

      <Mono color={C.green}>{noteContent}</Mono>

      <Prompt label={`Day ${day} session start`}
        text={day === 1
          ? "Let's build a player rating model. I want Bayesian Elo with time-decay for top 5 European leagues. Start by defining the approach."
          : `Read @PLAYER_RATING_NOTES.md and continue where we left off. Today we're working on ${day === 2 ? "the Elo engine" : "analyzing evaluation results by league"}.`
        } />

      <Prompt label={`Day ${day} session end`}
        text="Update @PLAYER_RATING_NOTES.md with everything we decided and completed today."
        color={C.amber} />

      <InfoBox color={C.purple} title="Why This Beats Raw Conversation">
        A 3-day project's conversation history might be 50K+ tokens. These notes are ~500 tokens. Same information,
        100x more token-efficient. And they're always at the top of context where the model pays the most attention.
      </InfoBox>
    </div>
  );
}

// ─── CLAUDE.MD TAB ───
function ClaudeMdTab() {
  const [section, setSection] = useState("full");
  const sections = {
    full: `# CLAUDE.md — Quant Strategy Project

## Project
Predictive models for sports outcomes and player performance.
Core abstractions: Model, FeaturePipeline, Evaluator, MatchDataset.
models/ has one file per model. data/ has match and event data via API.

## Commands
- Tests: \`pytest -v\`
- Lint: \`ruff check .\`
- Type check: \`mypy src\`
- Evaluate: \`python evaluate.py --model xg_v2 --league EPL --seasons 2022-2024\`

## Conventions
- All timestamps UTC. Never timezone-naive datetimes.
- Never mutate input DataFrames — return new copies.
- Model files: docstring with modelling approach, target variable, features, calibration range.
- Imports: stdlib → third-party → local, separated by blank lines.
- Log returns for time aggregation, simple returns for cross-section.

## Common Mistakes (grows over time)
- Don't use close price for gap analysis → use adjusted close.
- Test period must NOT overlap training period (look-ahead bias).
- Elo must be initialized per-team per-season with regression-to-mean.
- Factor exposures: winsorize at 3 std before regression.

## Verification
Before presenting code:
1. Run type checker — no errors
2. Run test suite — all pass
3. If model changed, run calibration check, verify Brier score within 5%`,
    scoped: `# .claude/rules/strategies.md
# Applies to: models/**/*.py

Every model file must have:
- Docstring with modelling approach
- Target variable and feature set
- Expected calibration range
- A predict() method returning probabilities between 0 and 1

When modifying a model, always run:
  python run_backtest.py --strategy <name> --start 2023-01-01

---

# .claude/rules/data_pipeline.md
# Applies to: data/**/*.py

Always validate row counts before AND after any transformation.
Log counts: logger.info(f"Rows: {before} → {after}")
Never drop NaN silently — always log how many were dropped.
Data fetches must have a timeout of 30 seconds.`,
    mistake: `## Adding a mistake-driven rule

You: "You just used pd.Timestamp('2024-01-01') without timezone.
     Write a rule in CLAUDE.md so this never happens again."

Claude adds to Common Mistakes:
- Always use pd.Timestamp('2024-01-01', tz='UTC').
  Never create timezone-naive timestamps.
  If converting from string: pd.to_datetime(s, utc=True).
  If from datetime: dt.replace(tzinfo=timezone.utc).`,
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Your most important file. ~100 lines, ~2,500 tokens. Every line must earn its place.
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {[
          { id: "full", label: "Full Example" },
          { id: "scoped", label: "Path-Scoped Rules" },
          { id: "mistake", label: "Mistake → Rule" },
        ].map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            background: section === s.id ? C.purple : C.surface,
            color: section === s.id ? "#fff" : C.textMuted,
            border: `1px solid ${section === s.id ? C.purple : C.border}`,
            padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600,
            fontFamily: "inherit",
          }}>{s.label}</button>
        ))}
      </div>

      <Mono color={C.purple}>{sections[section]}</Mono>

      {section === "full" && (
        <InfoBox color={C.amber} title="Boris Cherny's Golden Rule">
          For each line: "Would removing this cause Claude to make a mistake?" If not, cut it.
          This example is ~80 lines. The Common Mistakes section grows as you work.
        </InfoBox>
      )}
      {section === "scoped" && (
        <InfoBox color={C.cyan} title="Path-Scoped = Context Engineering">
          These rules only load when Claude works on matching files. Your strategies/ rules don't
          pollute context when Claude is editing data pipelines. Lean always-on + deep on-demand.
        </InfoBox>
      )}
    </div>
  );
}

// ─── @-MENTIONS TAB ───
function MentionsTab() {
  const examples = [
    {
      label: "Bad: vague request",
      prompt: "Add shot angle as a feature to the xG model.",
      result: "Claude reads 12 files searching for the model. 40K tokens consumed exploring. Might find the wrong file.",
      color: C.red,
    },
    {
      label: "Good: targeted @-mentions",
      prompt: "Add shot angle to @src/models/xg_model.py using the same pattern as @src/features/shot_features.py",
      result: "Claude reads exactly 2 files. ~3K tokens. Follows the existing pattern. Faster, more accurate.",
      color: C.green,
    },
    {
      label: "Directory overview",
      prompt: "What strategies do we have? @src/strategies/",
      result: "Claude reads the directory listing (~200 tokens) instead of loading every file. Gets the map, then decides what to open.",
      color: C.cyan,
    },
    {
      label: "Line-specific (Option+K)",
      prompt: "Refactor the probability calibration logic in @xg_model.py#145-180",
      result: "Only 35 lines loaded instead of 500. Surgical context engineering. Claude focuses exclusively on what matters.",
      color: C.purple,
    },
  ];

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Every @-mention is a context engineering decision — you're directing the model's attention to high-signal information.
      </div>

      {examples.map((ex, i) => (
        <div key={i} style={{ background: `${ex.color}08`, border: `1px solid ${ex.color}22`, borderRadius: 8, padding: 14, marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: ex.color, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{ex.label}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.text,
            background: `${ex.color}11`, borderRadius: 4, padding: "6px 10px", marginBottom: 8,
          }}>&gt; {ex.prompt}</div>
          <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{ex.result}</div>
        </div>
      ))}

      <InfoBox color={C.accent} title="Agentic Search: When You Don't Know Where to Look">
        Claude uses grep, find, head, tail autonomously. Your directory structure IS context engineering —
        well-named folders and files help Claude navigate efficiently. Anthropic recommends agentic search
        over vector embeddings: more accurate, more transparent, easier to maintain.
      </InfoBox>
    </div>
  );
}

// ─── SUB-AGENTS TAB ───
function SubAgentsTab() {
  const [phase, setPhase] = useState(0);
  const phases = [
    {
      label: "Without sub-agents",
      main: "Main context: 180K / 200K tokens",
      detail: "Claude read 25 files exploring Brier score calculation, calibration utilities, and feature pipeline for missing events. Context is 90% full before writing a single line of code.",
      color: C.red,
      boxes: [
        { name: "Main Session", tokens: "180K / 200K", items: ["25 file contents", "exploration reasoning", "dead-end traces", "your questions", "\u26A0 No room for implementation"], color: C.red },
      ],
    },
    {
      label: "With sub-agents",
      main: "Main context: 45K / 200K tokens",
      detail: "3 sub-agents explored independently. Each returned a 1-2K token summary. Main context has clean summaries + full room for implementation.",
      color: C.green,
      boxes: [
        { name: "Sub-agent 1: Evaluation scoring", tokens: "35K (isolated)", items: ["Read evaluation pipeline", "Traced Brier score calculation", "Found BrierScoreCalculator class"], color: C.cyan },
        { name: "Sub-agent 2: Calibration tools", tokens: "28K (isolated)", items: ["Searched calibration/", "Found CalibrationPlotter", "No reliability-weighted calibration yet"], color: C.purple },
        { name: "Sub-agent 3: Features→Evaluation", tokens: "22K (isolated)", items: ["Traced feature pipeline", "Found MissingEventHandler", "Imputation applied pre-prediction"], color: C.amber },
        { name: "Main Session", tokens: "45K / 200K", items: ["3 summaries (~5K total)", "Full room for implementation", "\u2713 Clean, focused context"], color: C.green },
      ],
    },
  ];

  const current = phases[phase];

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Sub-agents explore in their own contexts. Only summaries flow back. Your main session stays clean.
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {phases.map((p, i) => (
          <button key={i} onClick={() => setPhase(i)} style={{
            background: phase === i ? p.color : C.surface,
            color: phase === i ? "#fff" : C.textMuted,
            border: `1px solid ${phase === i ? p.color : C.border}`,
            padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
            fontFamily: "inherit",
          }}>{p.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {current.boxes.map((box, i) => (
          <div key={i} style={{ background: `${box.color}0a`, border: `1px solid ${box.color}33`, borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: box.color, fontWeight: 700 }}>{box.name}</span>
              <span style={{ fontSize: 10, color: C.textMuted, fontFamily: "monospace" }}>{box.tokens}</span>
            </div>
            {box.items.map((item, j) => (
              <div key={j} style={{ fontSize: 11, color: C.textMuted, paddingLeft: 8, lineHeight: 1.6 }}>{item}</div>
            ))}
          </div>
        ))}
      </div>

      <Prompt label="Trigger sub-agents" text="Use sub-agents to investigate how our evaluation pipeline calculates Brier scores, whether we have calibration utilities, and how the feature pipeline handles missing events. Report back with a summary." />

      <Prompt label="Sub-agent for verification" text="Use a sub-agent to review the changes I just made and check for data leakage or look-ahead bias in feature construction." color={C.amber} />
    </div>
  );
}

// ─── POWER WORKFLOWS TAB ───
function WorkflowsTab() {
  const [selected, setSelected] = useState(0);
  const workflows = [
    {
      name: "Plan \u2192 Review \u2192 Execute",
      color: C.accent,
      steps: [
        { step: "1. Plan", prompt: "I want to build a match outcome model using Elo, form, home advantage, rest days, and availability to predict win-draw-loss probabilities. Create a phased plan with tests for each phase." },
        { step: "2. Review (new session)", prompt: "Review this plan as a staff quant. Identify gaps, edge cases, look-ahead bias risks, and missing error handling. @PAIRS_PLAN.md" },
        { step: "3. Execute phase-by-phase", prompt: "Implement Phase 1 from @PAIRS_PLAN.md. Run the tests after implementation. Don't move to Phase 2 until all tests pass." },
      ],
      insight: "The review step catches real bugs. A reviewer might flag: \"Your plan calculates Elo on the full history then evaluates on the same period — that's massive look-ahead bias. Phase 1 needs a default Elo for promoted teams and rolling estimation.\"",
    },
    {
      name: "Interview Technique",
      color: C.green,
      steps: [
        { step: "1. Initiate", prompt: "I want to build a live in-play model that updates win probabilities as events happen during a match. Interview me in detail using the AskUserQuestion tool." },
        { step: "2. Answer questions", prompt: "(Claude asks: What defines a regime? How many regimes? Lookback period? Transition logic — hard switch or gradual? Turnover constraints?)" },
        { step: "3. Fresh session + spec", prompt: "Implement the specification in @REGIME_SPEC.md. Follow it exactly." },
      ],
      insight: "Claude reverse-engineers a detailed spec from your rough intuition. The fresh session gets a clean context with a clear brief — no ambiguity, no wasted tokens on clarification.",
    },
    {
      name: "Verification + Hooks",
      color: C.purple,
      steps: [
        { step: "1. Prove it works", prompt: "Write the implementation and then prove to me it works. Run the tests. Show me the output. Fix failures before presenting." },
        { step: "2. PostToolUse hook", prompt: '// .claude/settings.json\n"hooks": { "PostToolUse": [{\n  "matcher": "Edit|Write",\n  "hooks": [{ "command": "ruff check $FILE" }]\n}]}' },
        { step: "3. Stop hook", prompt: '// Runs after every Claude response\n"Stop": [{ "hooks": [{\n  "command": "pytest tests/ -x --tb=short"\n}]}]' },
      ],
      insight: "CLAUDE.md is advisory (~80% compliance). Hooks are deterministic (100%). Use CLAUDE.md for guidance, hooks for non-negotiable quality gates.",
    },
    {
      name: "Parallel + Fork",
      color: C.amber,
      steps: [
        { step: "Session A (feature)", prompt: "claude -w  # starts in isolated git worktree\nImplement the Elo update and form calculation logic." },
        { step: "Session B (review)", prompt: "claude -w  # separate worktree\nReview PR #47 for bugs and security issues." },
        { step: "/branch mid-session", prompt: "/branch  # fork current conversation\n# Try approach A in this branch\n# Try approach B in the fork\n# Keep whichever works" },
      ],
      insight: "Boris runs 10-15 sessions simultaneously. Each worktree has its own files and branch. Changes never collide. /branch lets you try two approaches from the same starting point.",
    },
    {
      name: "Clear-and-Rebuild",
      color: C.red,
      steps: [
        { step: "\u26A0 The anti-pattern", prompt: "(You correct Claude twice. It's still wrong. Context is polluted with 2 failed attempts + 2 corrections. Claude is attending to all that noise.)" },
        { step: "\u2713 The fix", prompt: "/clear\n\n# Now write a better prompt incorporating what you learned:\n\"Implement the z-score calculator. Important: use a rolling window of 252 days, NOT the full dataset. Return NaN for the first 251 rows.\"" },
        { step: "Session hygiene", prompt: "# One task per session\n# /clear between unrelated tasks\n# After 2 failed corrections → /clear + better prompt\n# Clean context + good prompt > cluttered context + perfect prompt" },
      ],
      insight: "A clean context with a good prompt will outperform a cluttered context with a perfect prompt every single time. Context pollution from failed attempts is worse than starting fresh.",
    },
  ];

  const w = workflows[selected];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
        {workflows.map((wf, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? wf.color : C.surface,
            color: selected === i ? "#fff" : C.textMuted,
            border: `1px solid ${selected === i ? wf.color : C.border}`,
            padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600,
            fontFamily: "inherit", transition: "all 0.15s",
          }}>{wf.name}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {w.steps.map((s, i) => (
          <div key={i} style={{ background: `${w.color}08`, border: `1px solid ${w.color}22`, borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 11, color: w.color, fontWeight: 700, marginBottom: 6 }}>{s.step}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.text,
              background: `${w.color}11`, borderRadius: 4, padding: "6px 10px",
              whiteSpace: "pre-wrap", lineHeight: 1.6,
            }}>{s.prompt}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, padding: 12, background: `${w.color}0a`, borderRadius: 8, border: `1px solid ${w.color}22` }}>
        <div style={{ fontSize: 10, color: w.color, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>Key insight</div>
        <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{w.insight}</div>
      </div>
    </div>
  );
}

// ─── COMMON MISTAKES TAB ───
function MistakesTab() {
  const [expanded, setExpanded] = useState(null);
  const mistakes = [
    {
      num: 1, name: "Kitchen Sink Session", severity: "critical",
      desc: "Start fixing a bug, ask about an unrelated API, go back to the bug. Context is polluted with irrelevant noise.",
      fix: "One task per session. /clear between unrelated tasks.",
      example: 'Session: fix auth bug → "what\'s the weather API rate limit?" → back to auth bug. Claude now has weather API docs eating your context.',
      color: C.red,
    },
    {
      num: 2, name: "Correcting Over and Over", severity: "critical",
      desc: "Claude gets it wrong. You correct. Wrong again. Correct again. Context has the original error + 2 failed attempts + 2 corrections.",
      fix: "After 2 failed corrections → /clear. Write a better initial prompt incorporating what you learned.",
      example: '"Use UTC" → wrong → "I said UTC" → still wrong → now 4 messages of failure noise. /clear and write: "Implement X. IMPORTANT: all timestamps must be pd.Timestamp(..., tz=\'UTC\')"',
      color: C.red,
    },
    {
      num: 3, name: "Over-Specified CLAUDE.md", severity: "high",
      desc: "500+ line CLAUDE.md. Claude ignores half because important rules drown in noise. More rules → less compliance per rule.",
      fix: "Prune to ~100 lines. For each line: 'Would removing this cause Claude to make a mistake?' If not, cut it.",
      example: "A focused 30-line file outperforms a 200-line file every time. Boris Cherny's is ~100 lines for a major Anthropic project.",
      color: C.amber,
    },
    {
      num: 4, name: "Negation in Rules", severity: "medium",
      desc: '"Do NOT use default exports" — LLMs struggle with negation. The concept gets activated even when negated.',
      fix: "Phrase rules as what TO do, not what to avoid.",
      example: '❌ "Never use console.log in production"\n✓ "Use the logger utility (src/lib/logger.ts) for all logging"',
      color: C.amber,
    },
    {
      num: 5, name: "Skipping the Plan", severity: "high",
      desc: "Jumping straight into code feels productive but creates downstream pain. You refactor the same feature 3 times.",
      fix: "Always start in plan mode. Get the plan reviewed in a 2nd session before executing.",
      example: "Plan → Review as staff engineer → Execute phase-by-phase with tests. The 10 min planning investment saves 2 hours of refactoring.",
      color: C.amber,
    },
    {
      num: 6, name: "Trusting Output Without Review", severity: "critical",
      desc: "Claude writes plausible code. 2026 research: AI code has more security vulnerabilities than human code, especially auth and input validation.",
      fix: "Treat Claude's output like a junior dev's PR. Always manually review auth, payments, data mutations, destructive DB ops.",
      example: "Claude generates an auth flow that stores tokens in localStorage instead of httpOnly cookies. Plausible-looking. Insecure.",
      color: C.red,
    },
    {
      num: 7, name: "No Verification Criteria", severity: "high",
      desc: "If Claude can't check its own work, you're the only safety net. No feedback loop means errors compound.",
      fix: 'Give verification criteria: "Run tests. Show output. Fix failures before presenting." Set up hooks for automated checks.',
      example: "CLAUDE.md (advisory ~80%): 'run calibration after model changes'\nHook (deterministic 100%): PostToolUse → pytest on models/",
      color: C.amber,
    },
    {
      num: 8, name: "Mixing Exploration and Execution", severity: "medium",
      desc: "Explore and execute in the same session → tangents. Hours later, 3 things built that you didn't need.",
      fix: "Explore in one session → write spec → execute in fresh session.",
      example: "Exploration session discovers 3 approaches. Spec picks one. Execution session implements with clean context + clear brief.",
      color: C.purple,
    },
    {
      num: 9, name: "Too Many Skills/Tools", severity: "medium",
      desc: "Research shows task performance degrades as available tools increase beyond what's needed. More tools → more confusion.",
      fix: "Start with bare minimum (file system + shell). Add tools one at a time only when you hit specific friction.",
      example: "15 MCP servers loaded → Claude wastes tokens deciding which tool to use. 3 focused tools → Claude acts decisively.",
      color: C.purple,
    },
    {
      num: 10, name: "Not Using Sub-Agents", severity: "high",
      desc: "Every codebase investigation in your main session eats your context. Reading 20 files for research = no room for implementation.",
      fix: 'Any investigation reading 5+ files → sub-agent. "Use sub-agents to investigate X."',
      example: "Without: 180K/200K tokens after investigation, no room to code.\nWith: sub-agents return 5K of summaries, 155K free for implementation.",
      color: C.amber,
    },
    {
      num: 11, name: "Not @-Mentioning Known Files", severity: "medium",
      desc: "You know which file Claude needs, but you describe it vaguely. Claude searches 12 files, burning context tokens.",
      fix: "When you know the target, always @-mention it directly with the specific file path.",
      example: '❌ "Add shot angle to the xG model" (reads 12 files, 40K tokens)\n✓ "Add shot angle to @src/models/xg_model.py" (reads 1 file, 3K tokens)',
      color: C.purple,
    },
    {
      num: 12, name: "Never Updating CLAUDE.md", severity: "high",
      desc: "You hit the same errors session after session because lessons aren't captured. CLAUDE.md is frozen at initial setup.",
      fix: '"You just made X error. Write a rule in CLAUDE.md so this never happens again." Version-control it. Share with team.',
      example: "Week 1: Claude uses naive timestamps → you add UTC rule.\nWeek 3: look-ahead bias → add evaluation validation rule.\nWeek 8: 15 accumulated rules = Claude rarely makes project-specific errors.",
      color: C.amber,
    },
  ];

  const severityColors = { critical: C.red, high: C.amber, medium: C.purple };
  const severityLabels = { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM" };

  return (
    <div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>
        Every mistake is a context engineering failure. Recognizing these patterns is the fastest path to better results.
      </div>

      {/* Summary bar */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["critical", "high", "medium"].map(s => {
          const count = mistakes.filter(m => m.severity === s).length;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: severityColors[s] }} />
              <span style={{ fontSize: 11, color: severityColors[s], fontWeight: 600 }}>{count} {severityLabels[s]}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {mistakes.map((m, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            background: expanded === i ? `${m.color}0a` : C.surface,
            border: `1px solid ${expanded === i ? m.color : C.border}`,
            borderRadius: 8, padding: "10px 14px", cursor: "pointer", transition: "all 0.15s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: "#fff", background: m.color,
                width: 20, height: 20, borderRadius: 4, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
              }}>{m.num}</span>
              <span style={{ fontSize: 12, color: expanded === i ? m.color : C.text, fontWeight: 600, flex: 1 }}>{m.name}</span>
              <span style={{
                fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 6,
                background: `${severityColors[m.severity]}22`, color: severityColors[m.severity],
                border: `1px solid ${severityColors[m.severity]}33`,
              }}>{severityLabels[m.severity]}</span>
              <span style={{ color: C.textMuted, fontSize: 14 }}>{expanded === i ? "\u2212" : "+"}</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: 10, paddingLeft: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{m.desc}</div>
                <div style={{ background: C.greenGlow, borderRadius: 6, padding: "8px 10px", border: `1px solid ${C.green}33` }}>
                  <div style={{ fontSize: 10, color: C.green, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 3 }}>Fix</div>
                  <div style={{ fontSize: 12, color: C.green, lineHeight: 1.5 }}>{m.fix}</div>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: C.textMuted,
                  background: `${m.color}08`, borderRadius: 4, padding: "6px 10px",
                  whiteSpace: "pre-wrap", lineHeight: 1.6, border: `1px solid ${m.color}15`,
                }}>{m.example}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function ClaudeCodeMastery() {
  const [activeTab, setActiveTab] = useState("compaction");

  const renderTab = () => {
    switch (activeTab) {
      case "compaction": return <CompactionTab />;
      case "notes": return <NotesTab />;
      case "claudemd": return <ClaudeMdTab />;
      case "mentions": return <MentionsTab />;
      case "subagents": return <SubAgentsTab />;
      case "workflows": return <WorkflowsTab />;
      case "mistakes": return <MistakesTab />;
      default: return null;
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ padding: "24px 20px 0", textAlign: "center" }}>
        <div style={{ fontSize: 10, color: C.green, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Interactive Guide</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.3 }}>Claude Code as Your Agent</h1>
        <p style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>Every feature is a context engineering decision</p>
      </div>
      <div style={{ display: "flex", gap: 4, padding: "16px 12px 0", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? C.green : C.surface,
            color: activeTab === tab.id ? "#fff" : C.textMuted,
            border: `1px solid ${activeTab === tab.id ? C.green : C.border}`,
            padding: "7px 11px", borderRadius: 6, cursor: "pointer",
            fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "inherit",
          }}>{tab.label}</button>
        ))}
      </div>
      <div style={{ padding: "20px 16px 40px" }}>{renderTab()}</div>
    </div>
  );
}
