import { useState, useEffect } from "react";

const BIG_IDEAS = [
  {
    id: "entropy",
    title: "Falling Apart Is the Default",
    subtitle: "Why your mind, your team, and your civilisation degrade without maintenance",
    color: "#B44D3A",
    accent: "#F8E8E0",
    icon: "🌡",
    layers: [
      {
        title: "The Physics",
        content: "There are astronomically more ways for things to go wrong than right. A house doesn't fall apart because someone attacks it — it falls apart because that's what matter does. A fair legal system, a body of reliable knowledge, a good decision — these are fantastically improbable arrangements that require constant energy to maintain.",
        example: "The International Space Station needs about 2 hours of maintenance for every 1 hour of science. Not because it's badly built — because entropy is relentless. Your thinking requires the same upkeep.",
        source: "Pinker grounds this in the second law of thermodynamics. Deutsch extends it: without error-correction, ALL information degrades."
      },
      {
        title: "Your Brain's Built-In Decay",
        content: "Your mind doesn't just passively degrade — it actively deceives you. When things go well, you take credit. When they go badly, you blame the environment. You feel confident about things you barely understand. And smart people are worse at this, not better, because they build more convincing justifications.",
        example: "In 2008, 93% of American drivers rated themselves above average. The same overconfidence shows up in surgeons, fund managers, and CEOs. Kahneman tested insurance underwriters on identical cases — they differed by 50%. Not bias. Noise. Random scatter, invisible and uncorrectable without outside input.",
        source: "Duke calls this motivated reasoning. Kahneman calls it System 1 + noise. Both point to the same conclusion: your unassisted mind is an unreliable instrument."
      },
      {
        title: "Teams Decay Too",
        content: "Groups don't automatically fix the problem — they can make it worse. When the first person in a meeting shares an opinion, everyone anchors to it. Disagreement feels disloyal. The group rewards confidence and punishes doubt. Over time, the range of acceptable ideas narrows until the group is just an echo chamber with a conference room.",
        example: "The Challenger disaster. Engineers at Morton Thiokol recommended against launching in cold weather — the O-ring data was clear. But NASA managers pushed back, and the engineering recommendation was reversed. The group structure rewarded agreement with authority over accuracy. Seven people died because the dissent mechanism failed.",
        source: "Duke calls this confirmatory thought. Kahneman calls it herding. The mechanism is the same: without deliberate structure, groups amplify existing beliefs instead of correcting them."
      },
      {
        title: "Civilisations Decay Too",
        content: "About 10,000 years ago, rising seas cut Tasmania off from mainland Australia. The isolated population of a few thousand didn't just stop innovating — they went backwards. They lost bone tools, fishing, and warm clothing. Technologies their ancestors mastered simply disappeared. The group was too small to maintain its knowledge base.",
        example: "The same pattern appears everywhere. The Library of Alexandria burned and centuries of knowledge vanished. The Roman Empire's concrete formula was lost for a thousand years. More recently: NASA can't build Saturn V rockets anymore — the institutional knowledge of how to manufacture certain components no longer exists.",
        source: "Ridley uses Tasmania to show that the network IS the intelligence. Shrink it below a critical threshold and capabilities don't stagnate — they actively reverse."
      }
    ]
  },
  {
    id: "collective",
    title: "Connection Multiplies Intelligence",
    subtitle: "How exchange, specialisation, and shared stories create capabilities no individual has",
    color: "#2D6A4F",
    accent: "#D8F3DC",
    icon: "🧠",
    layers: [
      {
        title: "No One Makes a Mouse",
        content: "No single person on Earth knows how to build a computer mouse from scratch. Mining the copper, refining the plastic, designing the optical sensor, writing the firmware, manufacturing the switches — each is a lifetime of specialised knowledge, distributed across thousands of people in dozens of countries, connected only by trade.",
        example: "Leonard Read's famous 1958 essay 'I, Pencil' made the same point about a simple pencil. The cedar comes from Oregon, the graphite from Sri Lanka, the rubber from Malaysia, the brass ferrule from zinc and copper mines on different continents. No single person directs this. The coordination happens through exchange.",
        source: "Ridley's core argument: human intelligence isn't located in individual brains. It's in the network between them. Trade lets each brain go deep instead of staying shallow."
      },
      {
        title: "Stories as Operating Systems",
        content: "Exchange needs trust. Trust needs shared stories. Money only works because millions of strangers believe the same fiction simultaneously. Legal systems work because everyone agrees to play by the same rules. Religions, nations, corporations — they're all coordination technologies built from shared narratives that organise strangers into functioning networks.",
        example: "The entire modern banking system rests on a shared fiction: that the numbers in your account represent something real. In 2008, when confidence in that story briefly wavered, the global economy nearly collapsed. The story wasn't less 'true' on September 14 than September 12 — but the network's belief in it cracked, and coordination broke down.",
        source: "Harari's key insight: information's primary function isn't truth — it's connection. The question to ask about any story isn't 'is it accurate?' but 'what network does it create?'"
      },
      {
        title: "Ideas Having Sex",
        content: "When diverse specialisations collide through exchange, they recombine into innovations no single mind could produce. The printing press combined wine-press technology with movable type. The iPhone combined touchscreen, GPS, camera, and internet — each invented by different teams for different purposes. Progress happens when ideas from different domains mate.",
        example: "Penicillin was discovered because a biologist (Fleming) noticed mould killing bacteria, but it took a biochemist (Chain) and a pathologist (Florey) to turn it into medicine, and an entire industrial apparatus to mass-produce it. No single discipline could have done it alone. The breakthrough required collision between different kinds of expertise.",
        source: "Ridley: prosperity comes from the size and connectivity of the trading network. More connections = more collisions = more recombinations = more innovation."
      },
      {
        title: "The Minimum Viable Network",
        content: "If connection multiplies intelligence, then isolation divides it. There's a minimum group size below which knowledge can't be maintained, let alone created. This applies at every scale — from a team too small to sustain diverse perspectives, to a civilisation too isolated to maintain its technologies.",
        example: "Open-source software demonstrates this vividly. Linux, maintained by thousands of contributors across the world, has become the backbone of the internet. No single company could have built something this robust. But niche open-source projects with only 1-2 maintainers regularly die — not because the code is bad, but because the correction network is too small to sustain it.",
        source: "The lesson from Tasmania, from dying open-source projects, from isolated research labs: below a certain network size, you're not just slower. You're actively losing ground."
      }
    ]
  },
  {
    id: "correction",
    title: "Error-Correction Is Everything",
    subtitle: "Why the group only works when it's structured to destroy bad ideas",
    color: "#5C4B99",
    accent: "#E8E0F0",
    icon: "🔬",
    layers: [
      {
        title: "How Knowledge Actually Works",
        content: "The intuition is that knowledge comes from observation — you look at the world, see patterns, form theories. Deutsch argues this is backwards. Observations are meaningless without a theory to interpret them. Knowledge is created by conjecture and criticism: you guess boldly, then try to destroy the guess. What survives is knowledge — provisional, always improvable, never above further criticism.",
        example: "Darwin didn't derive evolution by staring at finches. He arrived with a bold conjecture — that species change over time through natural selection — and spent decades trying to find evidence that could destroy it. He actively sought disconfirmation. The theory survived not because it was obvious but because it withstood relentless attempts at destruction.",
        source: "Deutsch, building on Popper: all knowledge is conjectural. The only way to improve it is criticism. This makes criticism not just useful but THE mechanism of progress."
      },
      {
        title: "The Group IS the Chisel",
        content: "You can't effectively criticise your own ideas. You're too invested. Your brain has already constructed a coherent story and confused it with truth. You need other minds — ideally diverse ones who see different flaws from different angles. The group's job is not to brainstorm or validate. It's to try to break your best ideas. What survives the group is stronger than what any individual could produce alone.",
        example: "Pixar's 'Braintrust' is a real-world truth-seeking group. Every few months, the director shows a rough cut to a small group of peers. The rules: candour is mandatory, but the director retains full authority. Nobody pulls rank. The goal is to find every problem while there's still time to fix it. Every Pixar film has been, in the Braintrust's own words, terrible in its early versions. The process of criticism is what makes them great.",
        source: "Duke describes the same structure in her poker group — candour rewarded, ego managed, no bad-beat stories. The Braintrust is Duke's truth-seeking group with a $200 million production budget."
      },
      {
        title: "Structure or Destruction",
        content: "An unstructured group doesn't just fail to help — it actively makes things worse. Without rules, the loudest voice wins. The first opinion anchors everyone. Dissent feels like betrayal. The group drifts toward consensus on whatever feels most comfortable rather than what's most true. You get the illusion of collective wisdom while actually amplifying individual bias.",
        example: "Amazon's 6-page memo culture attacks this directly. Before any meeting, the proposer writes a structured narrative. The meeting begins with everyone reading it silently for 30 minutes — no PowerPoint, no charismatic presenter biasing the room. Questions and criticism happen only after independent reading. This is Kahneman's decision hygiene implemented as corporate policy: independence, decomposition, delayed judgment.",
        source: "The contrast with most corporate meetings is stark. A typical meeting: someone presents slides, the most senior person reacts first, everyone else aligns. That's confirmatory thought with a projector. Amazon's format is exploratory thought with a mandate."
      },
      {
        title: "Static vs. Dynamic",
        content: "Deutsch draws the sharpest possible line: societies that suppress criticism stop learning. Societies that institutionalise it have no ceiling. The difference isn't resources, geography, or intelligence — it's whether the culture allows error-correction. The Enlightenment succeeded where Athens failed because it built criticism into institutions that could sustain it across generations, not just individual lifetimes.",
        example: "Compare the Soviet Union and the post-war West. Both had brilliant scientists, vast resources, and motivated populations. The Soviet system suppressed criticism — dissenters were sent to gulags, failed policies were hidden, data was falsified to match ideology. The West institutionalised criticism through free press, independent courts, and open scientific debate. One system collapsed in 70 years. The other is still self-correcting.",
        source: "Deutsch: 'Without error-correction all information processing, and hence all knowledge-creation, is necessarily bounded. Error-correction is the beginning of infinity.' A system that can correct itself has no ceiling. A system that can't will always hit a wall."
      }
    ]
  }
];

function IdeaCard({ idea, isActive, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: isActive ? idea.color : `${idea.color}12`,
      border: `2px solid ${idea.color}`,
      borderRadius: 16, padding: "16px 20px", cursor: "pointer",
      transition: "all 0.3s ease",
      transform: isActive ? "scale(1.02)" : "scale(1)",
      flex: 1, minWidth: 180,
    }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{idea.icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? "#fff" : idea.color,
        fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.25 }}>{idea.title}</div>
      <div style={{ fontSize: 11, color: isActive ? "rgba(255,255,255,0.7)" : "#888",
        marginTop: 4, lineHeight: 1.3 }}>{idea.subtitle}</div>
    </div>
  );
}

function IdeaExplorer({ idea }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const layer = idea.layers[activeLayer];
  return (
    <div style={{ background: `linear-gradient(135deg, ${idea.accent}66, ${idea.accent}33)`,
      borderRadius: 20, padding: 28, border: `1px solid ${idea.color}25` }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {idea.layers.map((l, i) => (
          <button key={i} onClick={() => setActiveLayer(i)} style={{
            padding: "9px 16px", borderRadius: 24,
            border: `1.5px solid ${idea.color}${activeLayer === i ? "" : "40"}`,
            background: activeLayer === i ? idea.color : "transparent",
            color: activeLayer === i ? "#fff" : idea.color,
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease",
            fontFamily: "'Source Sans 3', sans-serif",
          }}>{l.title}</button>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 14, padding: 24,
        border: `1px solid ${idea.color}12`, marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: 18, color: idea.color,
          fontFamily: "'Playfair Display', Georgia, serif" }}>{layer.title}</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#333",
          fontFamily: "'Source Sans 3', sans-serif" }}>{layer.content}</p>
      </div>
      <div style={{ background: `${idea.color}08`, borderRadius: 14, padding: 20,
        borderLeft: `4px solid ${idea.color}`, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
          color: idea.color, marginBottom: 8, fontFamily: "'Source Sans 3', sans-serif" }}>
          Real-World Example</div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#444",
          fontFamily: "'Source Sans 3', sans-serif" }}>{layer.example}</p>
      </div>
      <div style={{ background: "transparent", borderRadius: 14, padding: "8px 0 0 0" }}>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "#888",
          fontStyle: "italic", fontFamily: "'Source Sans 3', sans-serif" }}>{layer.source}</p>
      </div>
    </div>
  );
}

export default function PowerOfTheGroup() {
  const [activeIdea, setActiveIdea] = useState(0);
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: 3, color: "#999", marginBottom: 8 }}>Deep Dive</div>
          <h1 style={{ margin: "0 0 10px 0", fontSize: 34, fontWeight: 900, color: "#1a1a2e",
            fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.15 }}>
            The Power of the Group</h1>
          <p style={{ margin: 0, fontSize: 15, color: "#777", maxWidth: 480,
            marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>
            Three ideas that explain why individual minds fail, why connection multiplies, and why only error-correction creates real progress</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          {BIG_IDEAS.map((idea, i) => (
            <IdeaCard key={idea.id} idea={idea} isActive={activeIdea === i}
              onClick={() => setActiveIdea(i)} />
          ))}
        </div>
        <IdeaExplorer idea={BIG_IDEAS[activeIdea]} />
        <div style={{ marginTop: 36, textAlign: "center", padding: "24px 32px",
          background: "#f0ede8", borderRadius: 16 }}>
          <p style={{ margin: 0, fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.6,
            fontFamily: "'Playfair Display', Georgia, serif" }}>
            "Without error-correction all information processing, and hence all knowledge-creation, is necessarily bounded. Error-correction is the beginning of infinity."</p>
          <p style={{ margin: "8px 0 0 0", fontSize: 12, color: "#999" }}>— David Deutsch</p>
        </div>
      </div>
    </div>
  );
}
