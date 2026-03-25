import { useState, useEffect } from "react";

const scenes = [
  { id: "menu",      label: "The Menu Problem" },
  { id: "vanish",    label: "The Vanishing" },
  { id: "clarity",   label: "Clear ≠ Strong" },
  { id: "trap",      label: "The Expert Trap" },
  { id: "quadrants", label: "Confidence × Effect" },
  { id: "intel",     label: "The Intelligence Paradox" },
];

// ─── Scene 1 ──────────────────────────────────────────────────────────────────
function MenuScene() {
  const [mode, setMode] = useState("expert");
  const [chosen, setChosen] = useState(null);
  const [faded, setFaded] = useState(false);
  const dishes = [
    { id:"A", name:"Roast Lamb",       desc:"Bold, memorable",  score:88 },
    { id:"B", name:"Sea Bass",         desc:"Lighter, refined", score:74 },
    { id:"C", name:"Mushroom Risotto", desc:"Earthy, rich",     score:71 },
    { id:"D", name:"Duck Confit",      desc:"Classic, intense", score:65 },
  ];
  function choose(d) {
    if (mode !== "expert") return;
    setMode("between"); setChosen(d.id);
    setTimeout(() => setFaded(true), 300);
  }
  function reset() {
    setFaded(false); setChosen(null);
    setTimeout(() => setMode("expert"), 400);
  }
  return (
    <div style={{fontFamily:"'Georgia',serif"}}>
      <p style={{fontSize:13,color:"#888",marginBottom:20,letterSpacing:".03em"}}>The expert sees all options simultaneously. The diner picks one — and the rest disappear.</p>
      <div style={{display:"flex",gap:8,marginBottom:24}}>
        {["expert","between"].map(m=>(
          <div key={m} style={{padding:"6px 16px",borderRadius:20,fontSize:12,fontFamily:"sans-serif",background:mode===m?"#1a1a2e":"#f0f0ec",color:mode===m?"#f5f0e8":"#888",transition:"all .4s",fontWeight:mode===m?600:400}}>
            {m==="expert"?"Expert mode":"Between-subject reality"}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
        {dishes.map(d=>{
          const isChosen=chosen===d.id, isOther=chosen&&!isChosen;
          return (
            <div key={d.id} onClick={()=>choose(d)} style={{padding:"20px 22px",border:isChosen?"1.5px solid #c8a96e":"1px solid #e0ddd5",borderRadius:12,cursor:mode==="expert"?"pointer":"default",opacity:isOther?(faded?0.12:0.5):1,transform:isChosen?"scale(1.02)":isOther?`scale(${faded?0.96:0.99})`:"scale(1)",transition:"all .6s cubic-bezier(.4,0,.2,1)",background:isChosen?"#fdf8f0":"white",position:"relative",filter:isOther&&faded?"grayscale(1)":"none"}}>
              {mode==="expert"&&!chosen&&<div style={{position:"absolute",top:10,right:12,background:"#1a1a2e",color:"#c8a96e",fontSize:11,fontFamily:"sans-serif",fontWeight:700,padding:"2px 8px",borderRadius:10}}>{d.score}</div>}
              {isChosen&&<div style={{position:"absolute",top:10,right:12,background:"#c8a96e",color:"white",fontSize:11,fontFamily:"sans-serif",fontWeight:700,padding:"2px 8px",borderRadius:10}}>chosen</div>}
              <div style={{fontSize:15,fontWeight:700,marginBottom:4,color:"#1a1a2e"}}>{d.name}</div>
              <div style={{fontSize:12,color:"#999",fontFamily:"sans-serif",fontStyle:"italic"}}>{d.desc}</div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:20,padding:"14px 18px",background:mode==="expert"?"#f0f0ec":"#fdf8f0",borderLeft:`3px solid ${mode==="expert"?"#1a1a2e":"#c8a96e"}`,borderRadius:"0 10px 10px 0",transition:"all .5s",fontSize:13,fontFamily:"sans-serif",lineHeight:1.6,color:"#444"}}>
        {mode==="expert"?"You can see all four dishes. The differences feel vivid. Click one to order.":faded?<span>You ordered. The unchosen dishes <strong>no longer exist</strong> for you. Whatever you got became your normal. The expert predicted you'd miss the others. You don't.</span>:"Ordering..."}
      </div>
      {chosen&&<button onClick={reset} style={{marginTop:12,padding:"7px 16px",fontSize:12,fontFamily:"sans-serif",border:"1px solid #ddd",borderRadius:8,cursor:"pointer",background:"transparent",color:"#888"}}>Reset</button>}
    </div>
  );
}

// ─── Scene 2 ──────────────────────────────────────────────────────────────────
function VanishScene() {
  const [step,setStep]=useState(0);
  const steps=[
    {title:"Day 1: Decision day",sub:"You compare Job A ($120k, commute) vs Job B ($95k, fully remote)",rightFade:false,rightGone:false,connector:"vs",insight:"The gap feels enormous. $25k! You agonise.",insightType:"gap"},
    {title:"Week 3: You chose Job A",sub:"Life has started. Job B is in the past.",rightFade:true,rightGone:false,connector:"",insight:"Job B still exists — but not in your world. You have stopped comparing.",insightType:"fade"},
    {title:"Month 6: Full adaptation",sub:"The salary is just your salary. The commute is just your commute.",rightFade:false,rightGone:true,connector:"",insight:"The $25k gap the expert predicted would affect you has been fully absorbed. This is between-subject reality.",insightType:"absorbed"},
  ];
  const s=steps[step];
  return (
    <div style={{fontFamily:"'Georgia',serif"}}>
      <p style={{fontSize:13,color:"#888",marginBottom:20,letterSpacing:".03em"}}>Watch what happens to alternatives after a decision is made.</p>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
        <div style={{flex:1,padding:"22px 20px",border:"1.5px solid #c8a96e",borderRadius:12,background:"#fdf8f0",transition:"all .5s"}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>Job A</div>
          <div style={{fontSize:12,color:"#666",fontFamily:"sans-serif"}}>$120k · commute · prestige</div>
        </div>
        <div style={{width:36,textAlign:"center",fontSize:18,color:"#aaa",fontFamily:"sans-serif",flexShrink:0,opacity:s.connector?1:0,transition:"opacity .4s"}}>{s.connector||"→"}</div>
        <div style={{flex:1,padding:"22px 20px",border:s.rightGone?"1px dashed #e8e8e8":s.rightFade?"1px solid #e8e8e8":"1.5px solid #1a1a2e",borderRadius:12,background:s.rightGone?"#fafafa":s.rightFade?"#f8f8f6":"white",opacity:s.rightGone?0.18:s.rightFade?0.45:1,transition:"all .7s cubic-bezier(.4,0,.2,1)",filter:(s.rightFade||s.rightGone)?"grayscale(.8)":"none",transform:s.rightGone?"scale(0.95)":"scale(1)"}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:6,color:(s.rightFade||s.rightGone)?"#aaa":"#1a1a2e"}}>Job B</div>
          <div style={{fontSize:12,color:"#bbb",fontFamily:"sans-serif"}}>$95k · remote · smaller brand</div>
        </div>
      </div>
      <div style={{padding:"10px 16px",background:"#1a1a2e",borderRadius:8,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"#f5f0e8"}}>{s.title}</div>
          <div style={{fontSize:11,color:"#888",fontFamily:"sans-serif",marginTop:2}}>{s.sub}</div>
        </div>
        <div style={{display:"flex",gap:6}}>{steps.map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i===step?"#c8a96e":"#333"}}/>)}</div>
      </div>
      <div style={{padding:"14px 16px",fontSize:13,fontFamily:"sans-serif",lineHeight:1.6,color:"#444",background:s.insightType==="gap"?"#f0f0ec":"#fdf5e8",borderLeft:`3px solid ${s.insightType==="gap"?"#1a1a2e":"#c8a96e"}`,borderRadius:"0 8px 8px 0"}}>{s.insight}</div>
      <div style={{display:"flex",gap:8,marginTop:16}}>
        <button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0} style={{padding:"8px 20px",border:"1px solid #ddd",borderRadius:8,cursor:step===0?"not-allowed":"pointer",fontSize:12,fontFamily:"sans-serif",background:"transparent",color:step===0?"#ccc":"#555"}}>← Back</button>
        <button onClick={()=>setStep(Math.min(steps.length-1,step+1))} disabled={step===steps.length-1} style={{padding:"8px 20px",border:"1px solid #1a1a2e",borderRadius:8,cursor:step===steps.length-1?"not-allowed":"pointer",fontSize:12,fontFamily:"sans-serif",background:step===steps.length-1?"transparent":"#1a1a2e",color:step===steps.length-1?"#ccc":"#f5f0e8"}}>Next →</button>
      </div>
    </div>
  );
}

// ─── Scene 3 ──────────────────────────────────────────────────────────────────
function ClarityScene() {
  const [selected,setSelected]=useState(null);
  const cases=[
    {id:"pm",label:"Product manager",scenario:"Redesigns onboarding from 5 steps to 2. Tests both versions side by side.",clearReason:"The improvement is obvious — they have lived in both versions for weeks.",strongReason:"New users never knew 5-step onboarding existed. They adapted in minutes and formed no opinion about the gap.",clarity:95,strength:30},
    {id:"econ",label:"Economist",scenario:"Models a wage subsidy. Compares economy with vs without on a spreadsheet.",clearReason:"The delta between modelled scenarios is visible, measurable, vivid.",strongReason:"Workers received the subsidy and adapted. Their baseline shifted. The predicted happiness gain mostly did not materialise.",clarity:88,strength:35},
    {id:"interviewer",label:"Interviewer",scenario:"Sees 12 candidates in a day. Forms clear ranked impressions by candidate 8.",clearReason:"Comparisons are direct and simultaneous — differences between candidates feel obvious.",strongReason:"Job performance barely correlates with holistic interview impressions. The clarity was comparison-generated, not signal.",clarity:90,strength:25},
    {id:"salary",label:"Salary negotiator",scenario:"Knows the market range: $80k–$120k. The gap seems enormous.",clearReason:"Holding both numbers at once, the $40k range feels life-changing.",strongReason:"Beyond a threshold, salary differences predict life satisfaction weakly. Hedonic adaptation closes the gap.",clarity:92,strength:42},
  ];
  const sel=cases.find(c=>c.id===selected);
  return (
    <div style={{fontFamily:"'Georgia',serif"}}>
      <p style={{fontSize:13,color:"#888",marginBottom:18,letterSpacing:".03em"}}>Select a scenario to see how a clear intuition can be a weak prediction.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:18}}>
        {cases.map(c=>(
          <div key={c.id} onClick={()=>setSelected(c.id===selected?null:c.id)} style={{padding:"14px 16px",border:`1.5px solid ${selected===c.id?"#c8a96e":"#e0ddd5"}`,borderRadius:10,cursor:"pointer",background:selected===c.id?"#fdf8f0":"white",transition:"all .25s"}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>{c.label}</div>
            <div style={{fontSize:11,color:"#999",fontFamily:"sans-serif",lineHeight:1.4}}>{c.scenario}</div>
          </div>
        ))}
      </div>
      {sel?(
        <div style={{animation:"fadeIn .3s ease"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            {[{label:"Intuition clarity",value:sel.clarity,color:"#3B8BD4",bg:"#E6F1FB",reason:sel.clearReason},{label:"Predictive strength",value:sel.strength,color:"#D85A30",bg:"#FAECE7",reason:sel.strongReason}].map(g=>(
              <div key={g.label} style={{padding:16,background:g.bg,borderRadius:10}}>
                <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:600,color:g.color,textTransform:"uppercase",letterSpacing:".06em",marginBottom:10}}>{g.label}</div>
                <div style={{fontSize:34,fontWeight:800,color:g.color,fontFamily:"sans-serif",marginBottom:8}}>{g.value}<span style={{fontSize:16}}>%</span></div>
                <div style={{background:"rgba(0,0,0,.07)",borderRadius:4,height:6,overflow:"hidden",marginBottom:10}}><div style={{width:`${g.value}%`,background:g.color,height:"100%",borderRadius:4,transition:"width .7s cubic-bezier(.4,0,.2,1)"}}/></div>
                <div style={{fontSize:11,color:"#555",fontFamily:"sans-serif",lineHeight:1.5}}>{g.reason}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"12px 16px",background:"#1a1a2e",borderRadius:10,fontSize:12,fontFamily:"sans-serif",color:"#f5f0e8",lineHeight:1.6}}><strong style={{color:"#c8a96e"}}>The gap: </strong>Clarity was generated by the comparison. Strength depends on what happens when there is no comparison. These are almost independent.</div>
        </div>
      ):(
        <div style={{padding:30,textAlign:"center",color:"#bbb",fontSize:13,fontFamily:"sans-serif",background:"#fafafa",borderRadius:10}}>Select a scenario above</div>
      )}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Scene 4 ──────────────────────────────────────────────────────────────────
function TrapScene() {
  const [activeStep,setActiveStep]=useState(null);
  const steps=[
    {n:1,color:"#3B8BD4",bg:"#E6F1FB",title:"Expert enters within-subject mode",body:"They see all options simultaneously. This is how design, modelling, and forecasting work. The comparison is structurally built in.",analogy:"Like a chef tasting all dishes before the menu is printed. The comparisons are explicit."},
    {n:2,color:"#BA7517",bg:"#FAEEDA",title:"Intuition becomes clear",body:"The differences are salient. The gap between options feels large. An answer crystallises. This feels like expertise — it has the phenomenology of insight.",analogy:"The chef says: 'Obviously the lamb is better — taste them side by side.'"},
    {n:3,color:"#D85A30",bg:"#FAECE7",title:"Clarity is mistaken for strength",body:"The expert assumes this vivid difference will produce a large real-world effect. The clarity feels like a reliable signal. It is not.",analogy:"The chef predicts diners will rate the lamb 20% higher. He is comparing; they will not be."},
    {n:4,color:"#993556",bg:"#FBEAF0",title:"Users live between-subject",body:"No comparison. No delta. The diner orders one dish and adapts to it. The gap the expert felt does not exist for them.",analogy:"Diners order, eat, move on. Most cannot say what the other dish tasted like."},
    {n:5,color:"#535AB7",bg:"#EEEDFE",title:"No calibration loop",body:"There is no mechanism to learn the prediction was off. The expert moves to the next decision, just as confident. The error is invisible and self-perpetuating.",analogy:"The chef never sees the satisfaction surveys. He keeps predicting the same way."},
  ];
  return (
    <div style={{fontFamily:"'Georgia',serif"}}>
      <p style={{fontSize:13,color:"#888",marginBottom:18,letterSpacing:".03em"}}>Five steps. Each feels reasonable. Together they create systematic overconfidence.</p>
      <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:20,overflowX:"auto"}}>
        {steps.map((s,i)=>(
          <div key={s.n} style={{display:"flex",alignItems:"center",flexShrink:0}}>
            <div onClick={()=>setActiveStep(activeStep===s.n?null:s.n)} style={{width:48,height:48,borderRadius:"50%",background:activeStep===s.n?s.color:s.bg,border:`2px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all .25s",fontSize:16,color:activeStep===s.n?"white":s.color,fontWeight:700,fontFamily:"sans-serif",boxShadow:activeStep===s.n?`0 0 0 4px ${s.bg}`:"none"}}>{s.n}</div>
            {i<steps.length-1&&<div style={{width:20,height:1.5,background:"#ddd",flexShrink:0}}/>}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:0,marginBottom:20}}>
        {steps.map((s,i)=>(
          <div key={s.n} onClick={()=>setActiveStep(activeStep===s.n?null:s.n)} style={{flex:1,fontSize:10,fontFamily:"sans-serif",color:activeStep===s.n?s.color:"#999",textAlign:"center",paddingRight:i<steps.length-1?4:0,fontWeight:activeStep===s.n?600:400,transition:"all .2s",lineHeight:1.3,cursor:"pointer"}}>{s.title}</div>
        ))}
      </div>
      {activeStep?((()=>{
        const s=steps[activeStep-1];
        return (
          <div style={{animation:"fadeIn .25s ease"}}>
            <div style={{padding:20,background:s.bg,borderRadius:12,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:16,fontFamily:"sans-serif"}}>{s.n}</div>
                <div style={{fontSize:15,fontWeight:700,color:"#1a1a2e"}}>{s.title}</div>
              </div>
              <div style={{fontSize:13,fontFamily:"sans-serif",lineHeight:1.65,color:"#333",marginBottom:12}}>{s.body}</div>
              <div style={{fontSize:12,fontFamily:"sans-serif",fontStyle:"italic",color:"#666",padding:"10px 12px",background:"rgba(255,255,255,.6)",borderRadius:8,borderLeft:`3px solid ${s.color}`}}>{s.analogy}</div>
            </div>
            {activeStep<5&&<button onClick={()=>setActiveStep(activeStep+1)} style={{padding:"8px 20px",border:`1px solid ${s.color}`,borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"sans-serif",background:"transparent",color:s.color}}>Next step →</button>}
          </div>
        );
      })()):(
        <div style={{padding:20,background:"#1a1a2e",borderRadius:12,fontSize:13,fontFamily:"sans-serif",color:"#f5f0e8",lineHeight:1.65}}><span style={{color:"#c8a96e",fontWeight:700}}>Kahneman: </span>"They are completely lost between clear intuitions and strong intuitions. We have no way of calibrating ourselves." — Click a step to explore it.</div>
      )}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Scene 5 ──────────────────────────────────────────────────────────────────
const quadrants=[
  {id:"hc-se",row:0,col:1,confidence:"High",effect:"Small",label:"The Expert Trap",color:"#D85A30",bg:"#FAECE7",border:"#F0997B",tag:"Most common failure",body:"Within-subject comparison inflates confidence. Between-subject adaptation shrinks the actual effect. Confident forecasters. Modest outcomes.",examples:["Product redesign satisfaction","Wage subsidy happiness","Interview-to-performance prediction"],mechanism:"Within-subject position generates clarity → mistaken for strength → adaptation erases the effect",arrow:"← Where the expert trap lands you"},
  {id:"hc-be",row:0,col:0,confidence:"High",effect:"Big",label:"Legitimate Expertise",color:"#0F6E56",bg:"#E1F5EE",border:"#5DCAA5",tag:"Rarer than believed",body:"Real expertise, earned through a feedback loop that closes. Confidence built from real-world outcome tracking, not comparison-generated clarity.",examples:["Experienced surgeon on outcomes","Meteorologist with daily feedback","Seasoned underwriter with loss data"],mechanism:"Confidence built from real-world outcome tracking, not comparison-generated clarity",arrow:null},
  {id:"lc-be",row:1,col:0,confidence:"Low",effect:"Big",label:"The Invisible Effect",color:"#185FA5",bg:"#E6F1FB",border:"#85B7EB",tag:"Most underrated",body:"Large effects that resist direct observation. No vivid comparison available, so intuition stays weak — but the effect is genuinely large. The absence of clarity is not evidence of a small effect.",examples:["Long-run effect of poverty on cognition","Compound damage of dysfunctional culture","Early design decisions in long-lived systems"],mechanism:"Cannot run the within-subject experiment → no clarity → underconfidence about a real, large effect",arrow:null},
  {id:"lc-se",row:1,col:1,confidence:"Low",effect:"Small",label:"Appropriate Uncertainty",color:"#5F5E5A",bg:"#F1EFE8",border:"#B4B2A9",tag:"No trap",body:"Small effects you are appropriately uncertain about. The calibration is roughly right.",examples:["Minor UI tweaks","Small wording changes","Marginal process improvements"],mechanism:"Low stakes, low confidence — the system is working as intended",arrow:null},
];

function QuadrantScene() {
  const [active,setActive]=useState(null);
  const sel=quadrants.find(q=>q.id===active);
  const grid=[[null,null],[null,null]];
  quadrants.forEach(q=>{grid[q.row][q.col]=q;});
  return (
    <div style={{fontFamily:"'Georgia',serif"}}>
      <p style={{fontSize:13,color:"#888",marginBottom:6,letterSpacing:".03em"}}>Confidence and effect size are independent. The within-subject trap pushes experts toward one specific quadrant.</p>
      <div style={{display:"grid",gridTemplateColumns:"64px 1fr 1fr",gap:6,marginBottom:4}}>
        <div/>
        {["Big effect","Small effect"].map(l=><div key={l} style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:"#888",textAlign:"center",textTransform:"uppercase",letterSpacing:".07em"}}>{l}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"64px 1fr 1fr",gridTemplateRows:"1fr 1fr",gap:6}}>
        {["High confidence","Low confidence"].map((label,i)=>(
          <div key={label} style={{gridColumn:1,gridRow:i+1,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
            <div style={{fontSize:10,fontFamily:"sans-serif",fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".07em",writingMode:"vertical-rl",transform:"rotate(180deg)",textAlign:"center"}}>{label}</div>
          </div>
        ))}
        {grid.map((row,ri)=>row.map((q,ci)=>(
          <div key={q.id} onClick={()=>setActive(active===q.id?null:q.id)} style={{gridColumn:ci+2,gridRow:ri+1,padding:"14px 16px",borderRadius:10,cursor:"pointer",background:active===q.id?q.color:q.bg,border:`1.5px solid ${active===q.id?q.color:q.border}`,transition:"all .25s",minHeight:90,transform:active===q.id?"scale(1.02)":"scale(1)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:700,color:active===q.id?"white":"#1a1a2e",lineHeight:1.2}}>{q.label}</div>
              <div style={{fontSize:10,padding:"2px 7px",borderRadius:8,background:active===q.id?"rgba(255,255,255,.25)":"rgba(0,0,0,.08)",color:active===q.id?"white":"#555",fontFamily:"sans-serif",fontWeight:700,whiteSpace:"nowrap",marginLeft:6,flexShrink:0}}>{q.tag}</div>
            </div>
            <div style={{fontSize:11,color:active===q.id?"rgba(255,255,255,.8)":"#888",fontFamily:"sans-serif",lineHeight:1.4}}>{q.confidence} confidence · {q.effect.toLowerCase()} effect</div>
            {q.arrow&&<div style={{marginTop:6,fontSize:10,fontFamily:"sans-serif",fontWeight:700,color:active===q.id?"rgba(255,255,255,.7)":q.color,fontStyle:"italic"}}>{q.arrow}</div>}
          </div>
        )))}
      </div>
      {sel&&(
        <div style={{marginTop:14,padding:18,background:sel.bg,borderRadius:12,border:`1px solid ${sel.border}`,animation:"fadeIn .25s ease"}}>
          <div style={{fontSize:14,fontWeight:700,color:sel.color,marginBottom:8}}>{sel.label}</div>
          <div style={{fontSize:13,fontFamily:"sans-serif",lineHeight:1.65,color:"#333",marginBottom:12}}>{sel.body}</div>
          <div style={{fontSize:11,fontFamily:"sans-serif",fontWeight:700,color:sel.color,textTransform:"uppercase",letterSpacing:".06em",marginBottom:6}}>Examples</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {sel.examples.map(e=><div key={e} style={{fontSize:11,padding:"3px 10px",borderRadius:8,background:"rgba(255,255,255,.7)",border:`1px solid ${sel.border}`,color:"#444",fontFamily:"sans-serif"}}>{e}</div>)}
          </div>
          <div style={{fontSize:11,fontFamily:"sans-serif",fontStyle:"italic",color:"#666",padding:"9px 12px",background:"rgba(255,255,255,.55)",borderRadius:8,borderLeft:`3px solid ${sel.color}`,lineHeight:1.5}}>{sel.mechanism}</div>
        </div>
      )}
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Scene 6: Intelligence Paradox ────────────────────────────────────────────
function IntelScene() {
  const [activeId, setActiveId] = useState(null);

  const mechanisms = [
    {
      id: "meta",
      title: "Meta-overconfidence",
      subtitle: "Knowing about bias → confidence you've escaped it",
      color: "#993556",
      bg: "#FBEAF0",
      border: "#ED93B1",
      icon: "◎",
      body: "Once you know about a cognitive trap, you become overconfident that you are avoiding it. The awareness itself becomes a source of false security. You think: I have considered the within-subject problem, therefore my confidence has survived scrutiny. But it has not — it has just been relabelled.",
      example: "\"I know about the expert trap. So when I feel this clear, it must be because the evidence is actually strong — not because I'm inside a comparison.\"",
      source: "Annie Duke, Knowledge Project ep. 37",
    },
    {
      id: "motivated",
      title: "Motivated reasoning amplified",
      subtitle: "More intelligence = better at fooling yourself",
      color: "#D85A30",
      bg: "#FAECE7",
      border: "#F0997B",
      icon: "⚙",
      body: "The smarter you are, the better you are at slicing and dicing evidence to fit your prior. You can find the framing, the caveat, the counterexample that makes your original intuition look defensible. A less intelligent person might simply be unable to manufacture that justification. You can — and do — and don't notice you're doing it. You are not lying. You are just better at fooling yourself.",
      example: "\"Yes, the effect might be smaller between-subject. But in this case, the delta is large enough that adaptation won't fully close it. Here's why...\"",
      source: "Annie Duke, drawing on Dan Kahan's numeracy research",
    },
  ];

  const kahanStudy = {
    title: "The Kahan numeracy study",
    body: "When shown data about a politically charged topic like gun control, more quantitatively adept participants did not do better at reading the data accurately. They did worse. The people highest in numeracy were most likely to fit the data to their pre-existing view. Greater analytical ability, applied to an emotionally charged question, produced greater bias — not less. The skill was being used in service of the prior, not in service of truth.",
    implication: "Intelligence is a tool. The question is which direction it is aimed.",
  };

  const solution = [
    { label: "Individual reflection", works: false, note: "More reflection → more sophisticated self-justification" },
    { label: "Knowing about biases", works: false, note: "Produces meta-overconfidence, not inoculation" },
    { label: "Good groups with required dissent", works: true, note: "Dissent as assigned role, not social cost" },
    { label: "Structured evidence protocols", works: true, note: "Between-subject data built into the process" },
    { label: "Pre-mortems and explicit doubt", works: true, note: "Changes social structure, not just individual thinking" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif" }}>
      <div style={{ padding: "12px 16px", background: "#1a1a2e", borderRadius: 10, marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, color: "#c8a96e", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Annie Duke · Knowledge Project ep. 37</div>
        <div style={{ fontSize: 14, color: "#f5f0e8", lineHeight: 1.6, fontStyle: "italic" }}>
          "There is a lot of evidence that smart people who know about biases are actually worse. They're overconfident — overconfident in thinking that they're avoiding things like overconfidence. And the smarter you are, the better you are at slicing and dicing the data to fit whatever your prior is."
        </div>
      </div>

      <p style={{ fontSize: 13, color: "#888", marginBottom: 14, letterSpacing: ".03em" }}>Two mechanisms explain why intelligence amplifies the trap rather than escaping it.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {mechanisms.map(m => (
          <div key={m.id} onClick={() => setActiveId(activeId === m.id ? null : m.id)}
            style={{ padding: "16px", border: `1.5px solid ${activeId === m.id ? m.color : m.border}`, borderRadius: 12, cursor: "pointer", background: activeId === m.id ? m.bg : "white", transition: "all .25s" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: "#1a1a2e" }}>{m.title}</div>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "sans-serif", lineHeight: 1.4 }}>{m.subtitle}</div>
          </div>
        ))}
      </div>

      {activeId && (() => {
        const m = mechanisms.find(x => x.id === activeId);
        return (
          <div style={{ padding: 18, background: m.bg, borderRadius: 12, border: `1px solid ${m.border}`, marginBottom: 16, animation: "fadeIn .25s ease" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: m.color, marginBottom: 10 }}>{m.title}</div>
            <div style={{ fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.65, color: "#333", marginBottom: 12 }}>{m.body}</div>
            <div style={{ fontSize: 12, fontFamily: "sans-serif", fontStyle: "italic", color: "#555", padding: "10px 12px", background: "rgba(255,255,255,.65)", borderRadius: 8, borderLeft: `3px solid ${m.color}`, marginBottom: 8, lineHeight: 1.5 }}>{m.example}</div>
            <div style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif" }}>{m.source}</div>
          </div>
        );
      })()}

      {/* Kahan study */}
      <div style={{ padding: "14px 16px", background: "#FAEEDA", border: "1px solid #FAC775", borderRadius: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, color: "#BA7517", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{kahanStudy.title}</div>
        <div style={{ fontSize: 12, fontFamily: "sans-serif", lineHeight: 1.6, color: "#444", marginBottom: 8 }}>{kahanStudy.body}</div>
        <div style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, color: "#BA7517", fontStyle: "italic" }}>{kahanStudy.implication}</div>
      </div>

      {/* What works / doesn't */}
      <div style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>What actually helps</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {solution.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: s.works ? "#E1F5EE" : "#F1EFE8", borderRadius: 8, border: `1px solid ${s.works ? "#9FE1CB" : "#D3D1C7"}` }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.works ? "#0F6E56" : "#B4B2A9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: "white", fontFamily: "sans-serif", fontWeight: 700, marginTop: 1 }}>{s.works ? "✓" : "✗"}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.works ? "#0F6E56" : "#5F5E5A", fontFamily: "sans-serif" }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#666", fontFamily: "sans-serif", lineHeight: 1.4 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  useEffect(() => { setTimeout(() => setEntered(true), 80); }, []);
  const panels = [<MenuScene />, <VanishScene />, <ClarityScene />, <TrapScene />, <QuadrantScene />, <IntelScene />];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "'Georgia',serif", opacity: entered ? 1 : 0, transform: entered ? "none" : "translateY(10px)", transition: "all .5s ease" }}>
      <div style={{ background: "#1a1a2e", padding: "28px 28px 22px", borderRadius: "16px 16px 0 0" }}>
        <div style={{ fontSize: 10, letterSpacing: ".14em", color: "#c8a96e", fontFamily: "sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Kahneman · Annie Duke · The Knowledge Project</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#f5f0e8", lineHeight: 1.25, marginBottom: 6 }}>The Expert's Blind Spot</div>
        <div style={{ fontSize: 13, color: "#7a7a8a", fontFamily: "sans-serif", lineHeight: 1.5 }}>Why clear intuitions are often weak predictions — and why intelligence makes the trap worse, not better</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", background: "#12121e", borderBottom: "1px solid #2a2a3e", gap: 2 }}>
        {scenes.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} style={{ flexShrink: 0, padding: "11px 14px", border: "none", cursor: "pointer", fontFamily: "sans-serif", fontSize: 11, background: active === i ? "#1a1a2e" : "transparent", color: active === i ? "#c8a96e" : "#555", fontWeight: active === i ? 700 : 400, borderTop: active === i ? "2px solid #c8a96e" : "2px solid transparent", transition: "all .2s", letterSpacing: ".02em", whiteSpace: "nowrap" }}>{s.label}</button>
        ))}
      </div>

      <div style={{ padding: 24, background: "white", borderRadius: "0 0 16px 16px", border: "1px solid #e8e8e0", borderTop: "none", minHeight: 360 }}>
        {panels[active]}
      </div>

      <div style={{ marginTop: 12, padding: "16px 20px", background: "#fdf8f0", border: "1px solid #e8dfc8", borderRadius: 12, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, color: "#3B8BD4", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 4 }}>Clear intuition</div>
          <div style={{ fontSize: 12, fontFamily: "sans-serif", color: "#555", lineHeight: 1.4 }}>Obvious when<br />comparing options</div>
        </div>
        <div style={{ fontSize: 22, color: "#c8a96e", fontWeight: 700 }}>≠</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, color: "#D85A30", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 4 }}>Strong intuition</div>
          <div style={{ fontSize: 12, fontFamily: "sans-serif", color: "#555", lineHeight: 1.4 }}>Predictive when<br />no comparison exists</div>
        </div>
      </div>
    </div>
  );
}
