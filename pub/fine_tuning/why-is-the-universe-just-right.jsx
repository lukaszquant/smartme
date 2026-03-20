import { useState, useEffect, useCallback } from "react";

const CHAPTERS = [
  { id: "dials", title: "The Dials", icon: "🎛️", sub: "The fine-tuning problem" },
  { id: "fish", title: "The Fish", icon: "🐟", sub: "The anthropic principle" },
  { id: "dartboard", title: "The Dartboard", icon: "🎯", sub: "A testable prediction (one constant)" },
  { id: "cube", title: "The Cube", icon: "🧊", sub: "Why many constants change everything" },
  { id: "theories", title: "Four Theories", icon: "🔀", sub: "How each hypothesis is affected" },
  { id: "silence", title: "The Silence", icon: "🌌", sub: "Fermi's paradox resolved" },
  { id: "test", title: "Go Check", icon: "🔬", sub: "How to actually test it" },
  { id: "twist", title: "The Twist", icon: "🌀", sub: "Why Deutsch thinks this all fails" },
];

const mono = "'DM Mono', monospace";
const serif = "'Source Serif 4', Georgia, serif";
const display = "'Fraunces', serif";

function Prose({ children }) {
  return <p style={{ color: "#b8b8cc", fontSize: 15, lineHeight: 1.75, margin: "0 0 18px", fontFamily: serif }}>{children}</p>;
}
function Em({ children }) { return <em>{children}</em>; }
function Strong({ children, color }) {
  return <strong style={{ color: color || "#e0d6ff" }}>{children}</strong>;
}
function Card({ children, style }) {
  return <div style={{ background: "#0a0a14", borderRadius: 12, padding: "16px 18px", border: "1px solid #1e1e30", ...style }}>{children}</div>;
}
function Label({ children, color }) {
  return <div style={{ fontFamily: mono, fontSize: 10, color: color || "#555", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>{children}</div>;
}
function Callout({ children, color, icon }) {
  return (
    <div style={{ padding: "12px 16px", borderRadius: 10, margin: "16px 0", background: `${color}08`, border: `1.5px solid ${color}25`, display: "flex", gap: 10, alignItems: "flex-start" }}>
      {icon && <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>}
      <div style={{ fontFamily: serif, fontSize: 14, color: `${color}cc`, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 1: DIALS ═══════════════════════════════════════════ */
function ChapterDials() {
  const [gravity, setGravity] = useState(50);
  const [nuclear, setNuclear] = useState(50);
  const ok = v => v > 35 && v < 65;
  const alive = ok(gravity) && ok(nuclear);
  return (
    <div>
      <Prose>A guitar has tuning pegs. Turn them just right and the instrument produces music. Turn them wrong and you get noise. The universe has tuning pegs too — physicists call them <Strong>fundamental constants</Strong>. The strength of gravity, the nuclear force, the charge of an electron. There are roughly two dozen.</Prose>
      <Prose>Change almost any of them, even slightly, and the universe becomes sterile. Not just different — <Em>dead</Em>. Try it:</Prose>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", margin: "20px 0" }}>
        {[{ label: "Gravity", value: gravity, set: setGravity, color: "#f59e42" }, { label: "Nuclear Force", value: nuclear, set: setNuclear, color: "#42b4f5" }].map(d => (
          <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: `conic-gradient(${d.color} ${d.value*3.6}deg, #1a1a26 ${d.value*3.6}deg)`, display: "flex", alignItems: "center", justifyContent: "center", border: `2.5px solid ${d.color}44` }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", background: "#12121a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: d.color, fontFamily: mono }}>{d.value}</div>
            </div>
            <input type="range" min={0} max={100} value={d.value} onChange={e => d.set(+e.target.value)} style={{ width: 100, accentColor: d.color, cursor: "pointer" }} />
            <span style={{ fontFamily: mono, fontSize: 11, color: ok(d.value) ? "#6feba0" : "#f56b6b", fontWeight: 600 }}>{d.label}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "12px 24px", borderRadius: 10, margin: "0 auto 20px", maxWidth: 320, background: alive ? "#16322a" : "#321620", border: `2px solid ${alive ? "#6feba0" : "#f56b6b"}`, color: alive ? "#6feba0" : "#f56b6b", fontFamily: mono, fontSize: 15, fontWeight: 700, transition: "all 0.4s" }}>
        {alive ? "✨ Life is possible" : "💀 No life — universe is sterile"}
      </div>
      <Prose>The sweet spot is tiny. For the cosmological constant, the tuning is one part in 10¹²². This is the <Strong color="#f59e42">fine-tuning problem</Strong>: why are the dials set just right?</Prose>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 2: FISH ═══════════════════════════════════════════ */
function ChapterFish() {
  const universes = Array.from({ length: 35 }, (_, i) => ({ id: i, alive: i === 17, x: 12 + (i % 7) * 14, y: 10 + Math.floor(i / 7) * 18, hue: 210 + (i * 7) % 50 }));
  return (
    <div>
      <Prose>Imagine a fish marvelling that the cosmos is made of the one substance it needs. But it's not a coincidence — the fish couldn't exist anywhere else. It's a <Strong>selection effect</Strong>.</Prose>
      <Prose>If many universes exist with random settings, most are lifeless. We find ourselves in a life-friendly one because we couldn't exist in the others.</Prose>
      <svg viewBox="0 0 110 100" width="100%" style={{ maxWidth: 360, display: "block", margin: "16px auto" }}>
        {universes.map(u => (
          <g key={u.id}>
            <circle cx={u.x} cy={u.y} r={u.alive ? 7 : 5} fill={u.alive ? "#6feba0" : `hsl(${u.hue},35%,30%)`} opacity={u.alive ? 1 : 0.4} stroke={u.alive ? "#6feba0" : "none"} strokeWidth={u.alive ? 1.2 : 0}>
              {u.alive && <animate attributeName="r" values="7;8.5;7" dur="2s" repeatCount="indefinite" />}
            </circle>
            {u.alive && <text x={u.x} y={u.y+1.2} textAnchor="middle" fontSize="5" fontFamily={mono} fill="#12121a" fontWeight="800">US</text>}
          </g>
        ))}
        <text x="55" y="97" textAnchor="middle" fontSize="4.5" fill="#666" fontFamily={serif}>Each bubble = a universe with different laws</text>
      </svg>
      <Prose>This is <Strong color="#6feba0">anthropic reasoning</Strong>. But it sounds unfalsifiable — we can't visit other universes. So how is it better than invoking a designer? Because it makes a <Strong>testable prediction</Strong>.</Prose>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 3: DARTBOARD ═══════════════════════════════════════════ */
function ChapterDartboard() {
  const [darts, setDarts] = useState([]);
  const throwDart = () => { const a=Math.random()*Math.PI*2, r=Math.sqrt(Math.random())*38; setDarts(p=>[...p.slice(-25),{x:50+Math.cos(a)*r,y:50+Math.sin(a)*r,id:Date.now()}]); };
  useEffect(() => { setDarts(Array.from({length:6},(_,i)=>{const a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*38;return{x:50+Math.cos(a)*r,y:50+Math.sin(a)*r,id:i};})); }, []);
  return (
    <div>
      <Prose>Physicist Dennis Sciama proposed: the bull's-eye is the <Em>optimal</Em> value. A designer hits dead centre. A random draw from many universes lands <Em>somewhere</Em> on the board — life-permitting, but not optimal.</Prose>
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <svg viewBox="0 0 100 100" width="240" height="240" style={{ cursor: "crosshair" }} onClick={throwDart}>
          <circle cx="50" cy="50" r="42" fill="#1e2a38" stroke="#3a5068" strokeWidth="1" />
          <circle cx="50" cy="50" r="28" fill="#1e3328" stroke="#3a684a" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="14" fill="#2a1e1e" stroke="#684a3a" strokeWidth="0.7" />
          <circle cx="50" cy="50" r="5" fill="#f59e42" opacity="0.85"><animate attributeName="opacity" values="0.85;1;0.85" dur="1.5s" repeatCount="indefinite" /></circle>
          <text x="50" y="52" textAnchor="middle" fontSize="3.5" fill="#12121a" fontWeight="800" fontFamily={mono}>OPT</text>
          {darts.map(d=>{const dist=Math.sqrt((d.x-50)**2+(d.y-50)**2);return<circle key={d.id} cx={d.x} cy={d.y} r={dist<5?2:1.6} fill={dist<5?"#ff4444":"#e0d6ff"} opacity="0.85"/>;})}
          <text x="50" y="97" textAnchor="middle" fontSize="4" fill="#666" fontFamily={mono}>click to throw darts</text>
        </svg>
      </div>
      <Prose><Strong color="#f59e42">Design</Strong> predicts the optimum. <Strong color="#42b4f5">Multiverse</Strong> predicts not-optimal. A measurable difference.</Prose>
      <Callout color="#f59e42" icon="⚠️">
        <strong>Nuance:</strong> With just one constant, the multiverse only predicts "not the exact bull's-eye." The dart could land anywhere — middle or rim. Being near the edge is no more likely than the middle. The prediction is weak. To sharpen it, we need <em>many</em> constants.
      </Callout>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 4: CUBE ═══════════════════════════════════════════ */
function ChapterCube() {
  const [dim, setDim] = useState(1);
  const [simConstants, setSimConstants] = useState([]);
  const edge = 1 - Math.pow(0.8, dim);
  const pct = edge * 100;
  const runSim = useCallback(n => { setSimConstants(Array.from({length:n},(_,i)=>{const v=Math.random();return{id:i,value:v,nearEdge:v<0.1||v>0.9};})); }, []);
  useEffect(() => { runSim(dim); }, []);
  const nearEdgeCount = simConstants.filter(c=>c.nearEdge).length;
  return (
    <div>
      <Prose>With one constant, the prediction is weak. With many, geometry takes over. A point is "near the boundary" if <Strong color="#f56b6b">any one</Strong> coordinate is close to the edge. It's safe only if <Strong color="#6feba0">every single one</Strong> avoids the edge simultaneously.</Prose>
      <Card style={{ margin: "16px 0" }}>
        <Label>Drag: number of constants</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <input type="range" min={1} max={100} value={dim} onChange={e=>setDim(+e.target.value)} style={{ flex: 1, accentColor: "#42b4f5", cursor: "pointer" }} />
          <span style={{ fontFamily: mono, fontSize: 14, color: "#42b4f5", fontWeight: 700, minWidth: 30 }}>{dim}</span>
        </div>
        <div style={{ height: 32, borderRadius: 6, overflow: "hidden", display: "flex", border: "1px solid #222", marginTop: 12 }}>
          <div style={{ width: `${pct}%`, background: "linear-gradient(90deg,#f56b6b88,#f56b6bcc)", transition: "width 0.2s", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 10, color: "#fff", minWidth: pct>18?50:0 }}>{pct>18&&"EDGE"}</div>
          <div style={{ flex: 1, background: "#6feba015", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: 10, color: "#6feba0" }}>{pct<82&&"SAFE"}</div>
        </div>
        <div style={{ textAlign: "center", marginTop: 10, fontFamily: mono, fontSize: 15, fontWeight: 800, color: pct>50?"#f56b6b":"#6feba0" }}>
          {pct.toFixed(pct>99?(pct>99.99?6:2):1)}% chance at least one constant is near the edge
        </div>
      </Card>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "16px 0", flexWrap: "wrap" }}>
        {[{d:1,label:"1D",pct:"20%"},{d:2,label:"2D",pct:"36%"},{d:3,label:"3D",pct:"49%"},{d:100,label:"100D",pct:"99.99+%"}].map(m=>(
          <div key={m.d} onClick={()=>{setDim(m.d);runSim(m.d);}} style={{ padding:"8px 14px",borderRadius:8,cursor:"pointer",textAlign:"center",background:dim===m.d?"#1a2a3a":"#0a0a14",border:`1px solid ${dim===m.d?"#42b4f5":"#1a1a2a"}` }}>
            <div style={{fontFamily:mono,fontSize:10,color:"#888"}}>{m.label}</div>
            <div style={{fontFamily:display,fontSize:16,fontWeight:700,color:dim===m.d?"#42b4f5":"#555"}}>{m.pct}</div>
          </div>
        ))}
      </div>
      <Card style={{ margin: "20px 0", borderColor: "#42b4f533" }}>
        <Label color="#42b4f5">Simulation: each bar = one constant</Label>
        <div style={{ fontFamily: serif, fontSize: 13, color: "#9a9ab0", lineHeight: 1.5, marginBottom: 12 }}>
          <span style={{color:"#6feba0"}}>Green</span> = safe. <span style={{color:"#f56b6b"}}>Red</span> = near its edge. Universe is fragile if <strong style={{color:"#e0d6ff"}}>even one</strong> is red.
        </div>
        <button onClick={()=>runSim(dim)} style={{ background:"#1e1e30",border:"1px solid #333",borderRadius:7,color:"#aaa",padding:"7px 16px",cursor:"pointer",fontFamily:mono,fontSize:11,marginBottom:12 }}>
          Reshuffle {dim} constant{dim>1?"s":""}
        </button>
        <div style={{ display:"flex",flexWrap:"wrap",gap:3,marginBottom:12,maxHeight:200,overflowY:"auto" }}>
          {simConstants.map(c=>(
            <div key={c.id} style={{ position:"relative",width:dim>30?10:dim>10?18:36,height:dim>30?10:dim>10?18:36,borderRadius:3,overflow:"hidden",background:"#1a1a26",border:`1px solid ${c.nearEdge?"#f56b6b44":"#1e1e30"}` }}>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:`${c.value*100}%`,background:c.nearEdge?"#f56b6b":"#6feba066" }}/>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"10%",background:"#f56b6b22" }}/>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:"10%",background:"#f56b6b22" }}/>
            </div>
          ))}
        </div>
        <div style={{ padding:"10px 14px",borderRadius:8,textAlign:"center",fontFamily:mono,fontSize:13,fontWeight:700,background:nearEdgeCount>0?"#321620":"#16322a",color:nearEdgeCount>0?"#f56b6b":"#6feba0",border:`1.5px solid ${nearEdgeCount>0?"#f56b6b44":"#6feba044"}` }}>
          {nearEdgeCount===0?"✅ All safe — comfortably supports life":`⚠️ ${nearEdgeCount} of ${simConstants.length} near the edge — universe is fragile`}
        </div>
      </Card>
      <Callout color="#42b4f5" icon="💡">
        <strong>Key insight:</strong> The prediction is <em>not</em> that every constant is barely viable. Each has ~20% chance of being near its edge. With 100, you'd expect ~20 near their edges and ~80 comfortable. But <em>any single one</em> being precarious makes life fragile overall.
      </Callout>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 5: THEORIES ═══════════════════════════════════════════ */
const THEORIES = [
  { id:"multi",icon:"🫧",title:"Many Universes",color:"#42b4f5",pos:0.88,verdict:"STRENGTHENED",vc:"#6feba0",desc:"With many constants, it's virtually certain some sit near their failure points — making the universe fragile overall. Specific and testable.",pred:"Universe fragile (some near edge)"},
  { id:"design",icon:"✋",title:"Design",color:"#f59e42",pos:0.06,verdict:"CHALLENGED",vc:"#f56b6b",desc:"A competent designer would set ALL constants comfortably in their safe zones. Finding several near failure is the opposite of deliberate design.",pred:"All constants comfortably optimal"},
  { id:"law",icon:"⚛️",title:"Deeper Law",color:"#a78bfa",pos:0.45,verdict:"NEUTRAL",vc:"#a78bfa",desc:"A deeper law locks each constant wherever mathematics demands. The geometry of the life-permitting zone is irrelevant.",pred:"Wherever the math requires"},
  { id:"luck",icon:"🤷",title:"Coincidence",color:"#f56b8a",pos:0.5,verdict:"WEAKENED",vc:"#f56b6b",desc:"With many constants, the fine-tuning is dozens of independent values all landing in their life-permitting ranges simultaneously. The improbability multiplies.",pred:"No prediction"},
];
function ChapterTheories() {
  const [active, setActive] = useState(0);
  const th = THEORIES[active];
  return (
    <div>
      <Prose>The dimension argument acts as a <Em>multiplier</Em> that sharpens the differences between explanations.</Prose>
      <div style={{ display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",margin:"12px 0" }}>
        {THEORIES.map((t,i)=>(<button key={t.id} onClick={()=>setActive(i)} style={{ background:active===i?`${t.color}18`:"transparent",border:`1.5px solid ${active===i?t.color:"#222"}`,color:active===i?t.color:"#555",padding:"7px 12px",borderRadius:7,cursor:"pointer",fontFamily:mono,fontSize:11,fontWeight:500,transition:"all 0.2s" }}>{t.icon} {t.title}</button>))}
      </div>
      <Card key={th.id} style={{ borderColor:`${th.color}33`,animation:"fadeIn 0.3s" }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
          <span style={{fontSize:24}}>{th.icon}</span>
          <div>
            <div style={{fontFamily:display,fontSize:18,fontWeight:700,color:th.color}}>{th.title}</div>
            <div style={{fontFamily:mono,fontSize:11,color:th.vc,fontWeight:700}}>{th.verdict}</div>
          </div>
        </div>
        <Label>What the constants should look like</Label>
        <div style={{ position:"relative",height:30,marginBottom:14 }}>
          <div style={{ position:"absolute",top:10,left:0,right:0,height:8,borderRadius:4,background:"linear-gradient(90deg,#6feba022,#f59e4422 50%,#f56b6b33)" }}/>
          <div style={{ position:"absolute",top:4,left:`${th.pos*100}%`,transform:"translateX(-50%)",width:16,height:16,borderRadius:"50%",background:th.color,boxShadow:`0 0 10px ${th.color}66`,transition:"left 0.3s" }}/>
          <span style={{ position:"absolute",top:24,left:0,fontFamily:mono,fontSize:8,color:"#6feba066" }}>all optimal</span>
          <span style={{ position:"absolute",top:24,right:0,fontFamily:mono,fontSize:8,color:"#f56b6b66" }}>some at edge</span>
        </div>
        <div style={{fontFamily:mono,fontSize:12,color:th.color,fontWeight:600,marginBottom:10}}>Predicts: {th.pred}</div>
        <p style={{color:"#9a9ab0",fontSize:13,lineHeight:1.6,margin:0,fontFamily:serif}}>{th.desc}</p>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 6: SILENCE ═══════════════════════════════════════════ */
function ChapterSilence() {
  return (
    <div>
      <Prose>In 1950, Enrico Fermi asked: <Strong color="#a78bfa">"Where is everybody?"</Strong> The galaxy has billions of stars, billions of years. Alien civilisations should be everywhere. But we see nothing.</Prose>
      <svg viewBox="0 0 300 140" width="100%" style={{ maxWidth:400,display:"block",margin:"12px auto" }}>
        {Array.from({length:70},(_,i)=>(<circle key={i} cx={Math.random()*300} cy={Math.random()*140} r={0.5+Math.random()*1.5} fill="#e8e8f0" opacity={0.12+Math.random()*0.35}><animate attributeName="opacity" values={`${0.1+Math.random()*0.2};${0.4+Math.random()*0.3};${0.1+Math.random()*0.2}`} dur={`${2+Math.random()*3}s`} repeatCount="indefinite"/></circle>))}
        <circle cx="150" cy="70" r="4" fill="#6feba0"><animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite"/></circle>
        <text x="150" y="88" textAnchor="middle" fontSize="7" fill="#6feba0" fontFamily={mono} fontWeight="600">US</text>
        {[{x:50,y:30},{x:240,y:45},{x:90,y:115},{x:200,y:110},{x:35,y:80},{x:260,y:25}].map((p,i)=>(<text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="13" fill="#f59e4244" fontFamily={mono} fontWeight="700">?</text>))}
      </svg>
      <Prose>If some constants sit near their failure points, our universe is <Em>fragile</Em>. Civilisations are extraordinarily rare. The silence is <Strong color="#6feba0">expected</Strong>.</Prose>
      <Card style={{ margin:"16px 0" }}>
        <Label>One argument, two mysteries</Label>
        {[{t:"Fine-tuning: constants seem suspiciously precise",c:"#42b4f5"},{t:"Multiverse + many constants: some near failure points",c:"#f59e42"},{t:"Fragile universe → civilisations extremely rare",c:"#f56b8a"},{t:"Fermi's paradox: the silence is a prediction",c:"#6feba0"}].map((s,i)=>(
          <div key={i}><div style={{ display:"flex",gap:10,alignItems:"center",padding:"8px 10px",borderRadius:7,background:`${s.c}08`,border:`1px solid ${s.c}15` }}><span style={{fontFamily:mono,fontSize:11,color:`${s.c}88`,fontWeight:700}}>{i+1}</span><span style={{fontFamily:serif,fontSize:13,color:s.c,lineHeight:1.4}}>{s.t}</span></div>{i<3&&<div style={{textAlign:"center",color:"#2a2a3a",fontSize:12,padding:"2px 0"}}>↓</div>}</div>
        ))}
      </Card>
      <Prose>Elegant. But is it <Em>too</Em> elegant? The next chapter reveals why Deutsch thinks this argument ultimately fails.</Prose>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 7: GO CHECK ═══════════════════════════════════════════ */
function ChapterTest() {
  const [measured, setMeasured] = useState(137.036);
  const min=137,max=138,optimal=137.5;
  const pct=((measured-min)/(max-min))*100;
  const optPct=((optimal-min)/(max-min))*100;
  const distOpt=Math.abs(measured-optimal);
  return (
    <div>
      <Prose>The question "Why is the universe the way it is?" has <Strong>testable predictions</Strong>:</Prose>
      <div style={{ display:"flex",flexDirection:"column",gap:8,margin:"16px 0" }}>
        {[{n:"1",title:"Pick a constant",desc:"Like the fine-structure constant (1/α ≈ 137.036).",color:"#42b4f5"},{n:"2",title:"Calculate the life-permitting range",desc:"Simulate physics with altered values.",color:"#a78bfa"},{n:"3",title:"Find the theoretical optimum",desc:"Where does life have the highest probability?",color:"#f59e42"},{n:"4",title:"Measure the real value",desc:"In accelerators or astronomical observations.",color:"#6feba0"},{n:"5",title:"Repeat for many constants",desc:"Are more near their edges than design would allow?",color:"#e0d6ff"}].map(s=>(
          <div key={s.n} style={{ display:"flex",gap:12,alignItems:"flex-start",padding:"10px 14px",borderRadius:9,background:`${s.color}06`,border:`1px solid ${s.color}18` }}>
            <div style={{ width:24,height:24,borderRadius:"50%",flexShrink:0,background:`${s.color}20`,border:`1.5px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:mono,fontSize:12,fontWeight:700,color:s.color }}>{s.n}</div>
            <div><div style={{fontFamily:display,fontSize:14,fontWeight:700,color:s.color}}>{s.title}</div><div style={{fontFamily:serif,fontSize:13,color:"#9a9ab0",lineHeight:1.5,marginTop:2}}>{s.desc}</div></div>
          </div>
        ))}
      </div>
      <Card style={{ margin:"16px 0" }}>
        <Label>Simulated measurement of one constant</Label>
        <div style={{ position:"relative",height:65,marginBottom:6 }}>
          <div style={{ position:"absolute",top:28,left:0,right:0,height:7,borderRadius:4,background:"linear-gradient(90deg,#f56b6b44,#6feba022 15%,#f59e4444 50%,#6feba022 85%,#f56b6b44)" }}/>
          <div style={{ position:"absolute",top:8,left:`${optPct}%`,transform:"translateX(-50%)",textAlign:"center",fontFamily:mono,fontSize:9,color:"#f59e42" }}>optimal<br/>▼</div>
          <div style={{ position:"absolute",top:42,left:`${pct}%`,transform:"translateX(-50%)",textAlign:"center",fontFamily:mono,fontSize:9,color:"#6feba0",fontWeight:700,transition:"left 0.15s" }}>▲<br/>{measured.toFixed(3)}</div>
        </div>
        <input type="range" min={137000} max={138000} value={measured*1000} onChange={e=>setMeasured(+e.target.value/1000)} style={{ width:"100%",accentColor:"#6feba0",cursor:"pointer" }}/>
        <div style={{ display:"flex",justifyContent:"space-between",fontFamily:mono,fontSize:9,color:"#444",marginTop:4 }}><span>137 (edge)</span><span>138 (edge)</span></div>
      </Card>
      <Prose>But before celebrating this elegant framework, Deutsch reveals a problem with the whole approach...</Prose>
    </div>
  );
}

/* ═══════════════════════════════════════════ CH 8: THE TWIST ═══════════════════════════════════════════ */
function ChapterTwist() {
  const [showInner, setShowInner] = useState(false);

  return (
    <div>
      <Prose>
        Everything we've built so far — the dartboard, the cube, the edge prediction, Fermi's paradox — is elegant. But Deutsch argues it's ultimately a <Strong color="#f56b8a">bad explanation</Strong>. Here's why.
      </Prose>

      <Prose>
        The anthropic argument only considered universes with <Em>our laws of physics but different constants</Em>. But why stop there? There are infinitely many <Em>logically possible</Em> laws of physics — entirely different equations, different forces, different structures. If the multiverse includes all of these, the picture changes completely.
      </Prose>

      {/* ── The Sphere ── */}
      <Card style={{ margin: "16px 0", borderColor: "#f56b8a33" }}>
        <Label color="#f56b8a">The sphere of all possible universes</Label>
        <div style={{ textAlign: "center", margin: "12px 0" }}>
          <svg viewBox="0 0 280 280" width="100%" style={{ maxWidth: 300 }}>
            {/* Outer sphere - all logically possible universes */}
            <defs>
              <radialGradient id="sphereGrad" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#2a2a3a" />
                <stop offset="100%" stopColor="#0a0a14" />
              </radialGradient>
            </defs>
            <circle cx="140" cy="140" r="120" fill="url(#sphereGrad)" stroke="#3a3a5a" strokeWidth="1.5" />

            {/* Label: outer region */}
            <text x="140" y="30" textAnchor="middle" fontSize="9" fill="#666" fontFamily={mono}>all logically possible universes</text>

            {/* Chaotic region labels scattered around */}
            {[{x:60,y:70},{x:220,y:80},{x:50,y:200},{x:230,y:190},{x:140,y:240},{x:70,y:140},{x:210,y:140}].map((p,i)=>(
              <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="7" fill="#f56b8a44" fontFamily={mono}>chaos</text>
            ))}

            {/* Radiation / hostile labels */}
            {[{x:100,y:100},{x:180,y:100},{x:100,y:190},{x:180,y:190}].map((p,i)=>(
              <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="6" fill="#a78bfa33" fontFamily={mono}>alien laws</text>
            ))}

            {/* Our-type region - tiny dot */}
            <circle cx="140" cy="140" r={showInner ? 18 : 6} fill="#42b4f522" stroke="#42b4f5" strokeWidth="1" style={{ transition: "r 0.4s" }}>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </circle>

            {showInner && (
              <>
                {/* Our laws region label */}
                <text x="140" y="135" textAnchor="middle" fontSize="7" fill="#42b4f5" fontFamily={mono} fontWeight="600">our laws</text>
                <text x="140" y="145" textAnchor="middle" fontSize="6" fill="#42b4f5" fontFamily={mono}>(different constants)</text>
                {/* Us - tiny dot inside that */}
                <circle cx="140" cy="155" r="2" fill="#6feba0">
                  <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <text x="140" y="167" textAnchor="middle" fontSize="5" fill="#6feba0" fontFamily={mono} fontWeight="700">us</text>
              </>
            )}

            {!showInner && (
              <>
                <text x="140" y="155" textAnchor="middle" fontSize="7" fill="#42b4f5" fontFamily={mono}>our type</text>
                <text x="140" y="165" textAnchor="middle" fontSize="6" fill="#42b4f566" fontFamily={mono}>(tiny speck)</text>
              </>
            )}
          </svg>
        </div>

        <button onClick={() => setShowInner(!showInner)} style={{
          background: "#1e1e30", border: "1px solid #444", borderRadius: 7,
          color: "#aaa", padding: "8px 18px", cursor: "pointer",
          fontFamily: mono, fontSize: 11, display: "block", margin: "0 auto",
        }}>
          {showInner ? "Zoom out" : "Zoom into our region"}
        </button>

        <p style={{ fontFamily: serif, fontSize: 13, color: "#9a9ab0", lineHeight: 1.6, marginTop: 12, textAlign: "center" }}>
          Our laws of physics occupy a <em>tiny speck</em> in the space of all possible universes. The vast majority of the "edge" isn't our-laws-with-bad-constants — it's completely alien physics.
        </p>
      </Card>

      <Prose>
        Here's the devastating consequence. If we're randomly placed among <Em>all</Em> universes that can contain astrophysicists — not just those with our laws — then the anthropic argument predicts we should find ourselves in one of the chaotic, barely-coherent ones. A universe where your brain just happens to fluctuate into existence out of radiation for an instant before being destroyed. Not the stable, orderly, richly structured cosmos we actually inhabit.
      </Prose>

      <Callout color="#f56b8a" icon="💀">
        <strong>The prediction overshoots.</strong> Our universe is <em>too good</em>. Too orderly. Too stable. Too rich in structure. If pure anthropic selection were the explanation, we should be in far worse shape than we are. The fact that we're not means the anthropic explanation is missing something fundamental.
      </Callout>

      {/* ── Bad Explanations family ── */}
      <Card style={{ margin: "20px 0", borderColor: "#a78bfa33" }}>
        <Label color="#a78bfa">What Deutsch calls "bad explanations"</Label>
        <p style={{ fontFamily: serif, fontSize: 14, color: "#b0b0c8", lineHeight: 1.6, margin: "0 0 14px" }}>
          Deutsch argues that the anthropic explanation belongs to a family of theories that can account for <em>anything</em> without actually explaining <em>why</em>:
        </p>
        {[
          { name: "Anthropic reasoning", desc: "\"We exist, therefore the universe must permit us\" — true, but explains nothing specific", color: "#42b4f5", icon: "🫧" },
          { name: "Creationism", desc: "\"A designer made it this way\" — can explain any observation by adjusting the designer's intentions", color: "#f59e42", icon: "✋" },
          { name: "Lamarckism", desc: "\"Organisms adapt to what they need\" — matches observations but the mechanism is wrong", color: "#6feba0", icon: "🦒" },
          { name: "Spontaneous generation", desc: "\"Life just appears from non-life\" — accounts for observation without real explanation", color: "#a78bfa", icon: "🪱" },
        ].map((b, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "10px 12px", borderRadius: 8, marginBottom: 6,
            background: `${b.color}06`, border: `1px solid ${b.color}12`,
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{b.icon}</span>
            <div>
              <span style={{ fontFamily: mono, fontSize: 12, color: b.color, fontWeight: 600 }}>{b.name}</span>
              <p style={{ fontFamily: serif, fontSize: 12, color: "#888", margin: "3px 0 0", lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          </div>
        ))}
        <p style={{ fontFamily: serif, fontSize: 13, color: "#9a9ab0", lineHeight: 1.6, margin: "10px 0 0" }}>
          They share a trait: they're <strong style={{ color: "#e0d6ff" }}>easy to vary</strong>. You can adjust them to fit any observation, which means they don't really predict anything. A good explanation is hard to vary — change any detail and it no longer works.
        </p>
      </Card>

      {/* ── What's needed instead ── */}
      <Prose>
        So what <Em>does</Em> Deutsch think is needed? Not anthropic selection (too vague), not a designer (untestable), not coincidence (empty). What's needed are <Strong color="#6feba0">good explanations</Strong> — specific laws of nature that are <Em>hard to vary</Em>. Theories where every detail does real work, where changing any part would break the explanation.
      </Prose>

      {/* Progress of understanding */}
      <Card style={{ margin: "16px 0" }}>
        <Label>The journey of this chapter, reframed</Label>
        {[
          { t: "Fine-tuning is real and demands explanation", c: "#42b4f5", status: "✅ Still true" },
          { t: "Design is untestable (who designed the designer?)", c: "#f59e42", status: "✅ Still true" },
          { t: "Anthropic reasoning gives a testable prediction", c: "#a78bfa", status: "⚠️ Partially true" },
          { t: "The edge argument sharpens the prediction", c: "#f59e42", status: "⚠️ Only within our laws" },
          { t: "But it collapses when you include ALL possible laws", c: "#f56b8a", status: "❌ The twist" },
          { t: "We need good explanations, not selection effects", c: "#6feba0", status: "🔑 Deutsch's answer" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{
              display: "flex", gap: 8, alignItems: "center",
              padding: "8px 10px", borderRadius: 7,
              background: `${s.c}06`, border: `1px solid ${s.c}12`,
            }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: s.c, fontWeight: 700, minWidth: 42 }}>{s.status}</span>
              <span style={{ fontFamily: serif, fontSize: 13, color: `${s.c}cc`, lineHeight: 1.4 }}>{s.t}</span>
            </div>
            {i < 5 && <div style={{ textAlign: "center", color: "#222", fontSize: 12, padding: "1px 0" }}>↓</div>}
          </div>
        ))}
      </Card>

      <Prose>
        This is the real lesson of the chapter. The anthropic argument was a <Em>step forward</Em> — it took a philosophical question and tried to make it scientific. But it ultimately fails as an explanation because it's too easy to vary, it predicts we should be in worse shape than we are, and it doesn't tell us <Em>why</Em> the laws of physics are what they are.
      </Prose>

      <Prose>
        The answer isn't to retreat to design or coincidence. It's to keep looking for <Strong color="#6feba0">deeper, more specific, harder-to-vary explanations</Strong>. That's the beginning of infinity.
      </Prose>

      <div style={{
        textAlign: "center", fontFamily: display, fontSize: 20, fontWeight: 900,
        color: "#e0d6ff", margin: "24px 0 8px", lineHeight: 1.4,
      }}>
        The search continues.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */
const CHAPTER_COMPONENTS = [ChapterDials, ChapterFish, ChapterDartboard, ChapterCube, ChapterTheories, ChapterSilence, ChapterTest, ChapterTwist];

export default function App() {
  const [ch, setCh] = useState(0);
  const Chapter = CHAPTER_COMPONENTS[ch];
  return (
    <div style={{ minHeight:"100vh",background:"#12121a",color:"#e8e8f0",fontFamily:serif,display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 16px 60px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Source+Serif+4:ital,wght@0,400;0,700;1,400&family=Fraunces:wght@700;900&display=swap" rel="stylesheet"/>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <h1 style={{ fontFamily:display,fontSize:28,fontWeight:900,textAlign:"center",margin:"0 0 4px",background:"linear-gradient(135deg,#f59e42,#42b4f5,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Why Is the Universe Just Right?</h1>
      <p style={{ fontFamily:mono,fontSize:11,color:"#555",margin:"0 0 20px",textAlign:"center" }}>An interactive explainer in eight chapters</p>
      <div style={{ width:"100%",maxWidth:520 }}>
        <div style={{ display:"flex",gap:2,marginBottom:6 }}>
          {CHAPTERS.map((c,i)=>(<div key={c.id} onClick={()=>setCh(i)} style={{ flex:1,height:4,borderRadius:2,cursor:"pointer",background:i<=ch?"#42b4f5":"#1e1e30",transition:"background 0.3s" }}/>))}
        </div>
        <div style={{ display:"flex",gap:4,marginBottom:20,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none" }}>
          {CHAPTERS.map((c,i)=>(<button key={c.id} onClick={()=>setCh(i)} style={{ background:ch===i?"#1e1e30":"transparent",border:`1.5px solid ${ch===i?"#3a3a5a":"transparent"}`,color:ch===i?"#e8e8f0":"#444",padding:"6px 10px",borderRadius:7,cursor:"pointer",fontFamily:mono,fontSize:10,fontWeight:500,whiteSpace:"nowrap",transition:"all 0.2s" }}>{c.icon} {c.title}</button>))}
        </div>
        <div key={ch} style={{ background:"#16161e",borderRadius:16,border:"1px solid #1e1e30",padding:"24px 20px",boxShadow:"0 8px 40px #00000044",animation:"fadeIn 0.35s ease" }}>
          <div style={{ marginBottom:18 }}>
            <h2 style={{ fontFamily:display,fontSize:22,fontWeight:900,color:"#e0d6ff",margin:"0 0 2px" }}>{CHAPTERS[ch].icon} {CHAPTERS[ch].title}</h2>
            <p style={{ fontFamily:mono,fontSize:11,color:"#555",margin:0 }}>{CHAPTERS[ch].sub}</p>
          </div>
          <Chapter />
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",marginTop:14,gap:10 }}>
          <button onClick={()=>setCh(Math.max(0,ch-1))} disabled={ch===0} style={{ flex:1,padding:"11px",borderRadius:9,fontFamily:mono,fontSize:12,background:ch===0?"#12121a":"#1e1e30",border:`1px solid ${ch===0?"#1a1a22":"#333"}`,color:ch===0?"#2a2a3a":"#999",cursor:ch===0?"default":"pointer" }}>← Previous</button>
          <button onClick={()=>setCh(Math.min(CHAPTERS.length-1,ch+1))} disabled={ch===CHAPTERS.length-1} style={{ flex:1,padding:"11px",borderRadius:9,fontFamily:mono,fontSize:12,fontWeight:600,background:ch===CHAPTERS.length-1?"#12121a":"#42b4f518",border:`1px solid ${ch===CHAPTERS.length-1?"#1a1a22":"#42b4f566"}`,color:ch===CHAPTERS.length-1?"#2a2a3a":"#42b4f5",cursor:ch===CHAPTERS.length-1?"default":"pointer" }}>Next →</button>
        </div>
      </div>
    </div>
  );
}
