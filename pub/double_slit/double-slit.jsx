import { useState, useEffect, useRef, useCallback } from "react";

const TAU = Math.PI * 2;

function sampleInterference(slitGap, screenH) {
  const center = screenH / 2;
  for (let i = 0; i < 200; i++) {
    const y = Math.random() * screenH;
    const dy = (y - center) / screenH;
    const phase = dy * slitGap * 2.5;
    if (Math.random() < Math.cos(phase * TAU * 0.4) ** 2 * Math.exp(-dy * dy * 18)) return y;
  }
  return center + (Math.random() - 0.5) * 30;
}

function sampleTwoBlobs(slitGap, screenH) {
  const center = screenH / 2;
  const which = Math.random() < 0.5 ? -1 : 1;
  return center + which * slitGap * 0.6 + (Math.random() - 0.5) * slitGap * 0.7;
}

// ==================== WAVE CANVAS ====================
function WaveCanvas({ slitSeparation, wavelength, mode, showPaths, animating }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);
    const wallX = W * 0.28, screenX = W * 0.72, sourceX = W * 0.05, centerY = H / 2;
    const slitGap = slitSeparation * 2.5, sw = 8, wl = wavelength * 1.8, t = timeRef.current;
    const isSingle = mode === "single";
    const lY = centerY - slitGap / 2, rY = centerY + slitGap / 2;

    ctx.fillStyle = "#1a1a2e"; ctx.strokeStyle = "#3a3a5e"; ctx.lineWidth = 1;
    if (isSingle) {
      ctx.fillRect(wallX - 4, 0, 8, centerY - sw); ctx.strokeRect(wallX - 4, 0, 8, centerY - sw);
      ctx.fillRect(wallX - 4, centerY + sw, 8, H - centerY - sw); ctx.strokeRect(wallX - 4, centerY + sw, 8, H - centerY - sw);
      ctx.fillStyle = "rgba(100,180,255,0.25)"; ctx.fillRect(wallX - 3, centerY - sw, 6, sw * 2);
    } else {
      ctx.fillRect(wallX - 4, 0, 8, lY - sw); ctx.strokeRect(wallX - 4, 0, 8, lY - sw);
      ctx.fillRect(wallX - 4, lY + sw, 8, (rY - sw) - (lY + sw)); ctx.strokeRect(wallX - 4, lY + sw, 8, (rY - sw) - (lY + sw));
      ctx.fillRect(wallX - 4, rY + sw, 8, H - rY - sw); ctx.strokeRect(wallX - 4, rY + sw, 8, H - rY - sw);
      ctx.fillStyle = "rgba(100,180,255,0.25)"; ctx.fillRect(wallX - 3, lY - sw, 6, sw * 2); ctx.fillRect(wallX - 3, rY - sw, 6, sw * 2);
    }
    ctx.fillStyle = "#14142a"; ctx.fillRect(screenX, 0, 4, H);

    for (let x = sourceX; x < wallX - 6; x += 3) for (let y = 0; y < H; y += 3) {
      const b = Math.max(0, Math.sin((x / wl) * TAU - t)) * 0.35;
      if (b > 0.02) { ctx.fillStyle = `rgba(80,140,255,${b})`; ctx.fillRect(x, y, 2.5, 2.5); }
    }

    const src = [];
    if (isSingle) { for (let i = 0; i < 12; i++) src.push({ x: wallX, y: centerY - sw + 2 * sw * (i / 11) }); }
    else { for (let i = 0; i < 8; i++) { const f = i / 7; src.push({ x: wallX, y: lY - sw + 2 * sw * f }); src.push({ x: wallX, y: rY - sw + 2 * sw * f }); } }

    for (let x = wallX + 6; x < screenX - 2; x += 3) for (let y = 0; y < H; y += 3) {
      let a = 0; for (const s of src) { const d = Math.sqrt((x - s.x) ** 2 + (y - s.y) ** 2); a += Math.sin((d / wl) * TAU - t) / Math.sqrt(Math.max(d, 1) * 0.08); }
      a /= Math.sqrt(src.length); const b = Math.max(0, a) * 0.15;
      if (b > 0.015) { ctx.fillStyle = `rgba(80,150,255,${Math.min(b, 0.55)})`; ctx.fillRect(x, y, 2.5, 2.5); }
    }

    const sd = screenX - wallX;
    for (let y = 0; y < H; y++) {
      let I; if (isSingle) { const dy = y - centerY; const s = dy === 0 ? 1 : Math.sin(Math.PI * dy * sw / (wl * 40)) / (Math.PI * dy * sw / (wl * 40)); I = s * s; }
      else { const d1 = Math.sqrt(sd ** 2 + (y - lY) ** 2), d2 = Math.sqrt(sd ** 2 + (y - rY) ** 2); I = Math.cos(TAU * (d2 - d1) / wl / 2) ** 2; const dy = y - centerY; const s = dy === 0 ? 1 : Math.sin(Math.PI * dy * sw / (wl * 40)) / (Math.PI * dy * sw / (wl * 40)); I *= s * s; }
      ctx.fillStyle = `rgba(${Math.round(60 + I * 195)},${Math.round(100 + I * 155)},${Math.round(200 + I * 55)},${I * 0.95 + 0.05})`; ctx.fillRect(screenX + 1, y, 3, 1);
    }

    if (showPaths && !isSingle) {
      [{y: centerY, l:"Equal → bright"}, {y: centerY - wl * sd / slitGap * 0.5, l:"½λ → dark"}, {y: centerY - wl * sd / slitGap, l:"1λ → bright"}].forEach((pt, i) => {
        if (pt.y < 20 || pt.y > H - 20) return;
        [[lY,"255,120,80"],[rY,"80,255,180"]].forEach(([sy,col]) => { ctx.beginPath(); ctx.moveTo(wallX+4,sy); ctx.lineTo(screenX,pt.y); ctx.strokeStyle=`rgba(${col},0.7)`; ctx.lineWidth=1.5; ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]); });
        ctx.font="10px monospace"; ctx.fillStyle="rgba(220,220,240,0.85)"; ctx.fillText(pt.l, screenX+8, pt.y+4);
        ctx.beginPath(); ctx.arc(screenX+2,pt.y,3,0,TAU); ctx.fillStyle=i===1?"rgba(255,60,60,0.9)":"rgba(100,255,160,0.9)"; ctx.fill();
      });
    }

    const fvX=screenX+16,fvW=W-fvX-10,fvH=H-40,fvY=32;
    ctx.fillStyle="rgba(10,12,25,0.9)"; ctx.strokeStyle="rgba(100,140,255,0.2)"; ctx.lineWidth=1; ctx.beginPath(); ctx.roundRect(fvX-4,fvY-4,fvW+8,fvH+8,8); ctx.fill(); ctx.stroke();
    ctx.font="bold 10px monospace"; ctx.fillStyle="rgba(255,200,100,0.7)"; ctx.fillText("FRONT VIEW",fvX+4,fvY+12);
    const fCY=fvY+42,fCH=fvH-50,fCW=fvW-8;
    for(let px=0;px<fCW;px++){let I;if(isSingle){const dx=(px-fCW/2)/(fCW*0.3);I=dx===0?1:(Math.sin(Math.PI*dx)/(Math.PI*dx))**2;}else{const dx=(px-fCW/2)/(fCW*0.08);const fr=Math.cos(dx*slitGap*0.02*TAU)*0.5+0.5;const ed=(px-fCW/2)/(fCW*0.3);const s=ed===0?1:Math.sin(Math.PI*ed)/(Math.PI*ed);I=fr*s*s;}if(I>0.02){ctx.fillStyle=`rgba(${Math.round(50+I*205)},${Math.round(90+I*165)},${Math.round(180+I*75)},${I*0.85})`;ctx.fillRect(fvX+4+px,fCY+4,1,fCH-8);}}

    ctx.font="bold 11px monospace"; ctx.fillStyle="rgba(180,180,220,0.7)"; ctx.fillText("LASER",sourceX,18); ctx.fillText("BARRIER",wallX-18,18); ctx.fillText("SCREEN",screenX-14,18);
    ctx.font="9px monospace"; ctx.fillStyle="rgba(255,200,100,0.45)"; ctx.fillText("BIRD'S-EYE VIEW (looking down)",sourceX,H-8);
    ctx.fillStyle="rgba(200,200,240,0.3)"; ctx.fillText("← left",8,H*0.15); ctx.fillText("→ right",8,H*0.88);
    if(!isSingle){ctx.font="9px monospace";ctx.fillStyle="rgba(150,200,255,0.7)";ctx.fillText("left slit",wallX+10,lY-6);ctx.fillText("right slit",wallX+10,rY+14);}
    ctx.font="bold 12px monospace"; ctx.fillStyle="rgba(255,200,100,0.55)"; ctx.fillText(isSingle?"SINGLE SLIT":"DOUBLE SLITS",wallX+60,18);
    if(animating){timeRef.current+=0.08;frameRef.current=requestAnimationFrame(draw);}
  },[slitSeparation,wavelength,mode,showPaths,animating]);

  useEffect(()=>{const c=canvasRef.current;c.width=c.offsetWidth*1.5;c.height=c.offsetHeight*1.5;frameRef.current=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frameRef.current);},[draw]);
  useEffect(()=>{if(animating)frameRef.current=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frameRef.current);},[animating,draw]);
  return <canvas ref={canvasRef} style={{width:"100%",height:"100%",borderRadius:12}}/>;
}

// ==================== PARTICLE CANVAS ====================
function ParticleCanvas({slitSeparation,mode,speed,eraserFilter}){
  const canvasRef=useRef(null);const frameRef=useRef(0);const particlesRef=useRef([]);

  const draw=useCallback(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");const W=canvas.width,H=canvas.height;
    const slitGap=slitSeparation;const isDet=mode==="detector";const isEr=mode==="eraser";

    for(let i=0;i<speed;i++){
      if(particlesRef.current.length>=6000)break;
      let y,tag=null;
      if(isDet){y=sampleTwoBlobs(slitGap,H);tag="kept";}
      else if(isEr){if(Math.random()<0.5){y=sampleTwoBlobs(slitGap,H);tag="kept";}else{y=sampleInterference(slitGap,H);tag="erased";}}
      else{y=sampleInterference(slitGap,H);}
      particlesRef.current.push({x:30+Math.random()*(W-60),y,tag});
    }

    ctx.fillStyle="#0a0a0f";ctx.fillRect(0,0,W,H);

    if(isEr&&eraserFilter==="split"){
      // ===== SIDE BY SIDE =====
      const midX=W/2;
      ctx.fillStyle="rgba(20,20,40,0.8)";ctx.fillRect(20,30,midX-28,H-50);ctx.fillRect(midX+8,30,midX-28,H-50);
      ctx.strokeStyle="rgba(100,220,160,0.2)";ctx.lineWidth=1;ctx.strokeRect(20,30,midX-28,H-50);
      ctx.strokeStyle="rgba(255,120,90,0.2)";ctx.strokeRect(midX+8,30,midX-28,H-50);

      ctx.font="bold 10px monospace";
      ctx.fillStyle="rgba(100,220,160,0.8)";ctx.fillText("TAGS ERASED → interference",28,24);
      ctx.fillStyle="rgba(255,120,90,0.8)";ctx.fillText("TAGS KEPT → two blobs",midX+14,24);

      const lW=midX-28,rW=midX-28;
      for(const p of particlesRef.current){
        if(p.tag==="erased"){ctx.fillStyle="rgba(100,220,160,0.7)";ctx.fillRect(20+(p.x/W)*lW,p.y,1.5,1.5);}
        else if(p.tag==="kept"){ctx.fillStyle="rgba(255,120,90,0.7)";ctx.fillRect(midX+8+(p.x/W)*rW,p.y,1.5,1.5);}
      }

      const bins=100,hE=new Array(bins).fill(0),hK=new Array(bins).fill(0);
      for(const p of particlesRef.current){const b=Math.floor((p.y/H)*bins);if(b>=0&&b<bins){if(p.tag==="erased")hE[b]++;else hK[b]++;}}
      const mE=Math.max(1,...hE),mK=Math.max(1,...hK);const hw=35;
      for(let i=0;i<bins;i++){const w=(hE[i]/mE)*hw;if(w>0.5){ctx.fillStyle="rgba(100,220,160,0.4)";ctx.fillRect(midX-30-hw,(i/bins)*H,w,H/bins);}}
      for(let i=0;i<bins;i++){const w=(hK[i]/mK)*hw;if(w>0.5){ctx.fillStyle="rgba(255,120,90,0.4)";ctx.fillRect(W-18-hw,(i/bins)*H,w,H/bins);}}

      ctx.font="9px monospace";ctx.fillStyle="rgba(180,180,220,0.3)";
      ctx.fillText("SAME PHOTONS · SAME SCREEN · DIFFERENT INFORMATION · DIFFERENT PATTERNS",W/2-220,H-8);
    } else {
      // ===== ALL MIXED (or non-eraser) =====
      ctx.fillStyle="rgba(20,20,40,0.8)";ctx.fillRect(20,20,W-100,H-40);
      ctx.strokeStyle="rgba(100,140,255,0.15)";ctx.lineWidth=1;ctx.strokeRect(20,20,W-100,H-40);

      // KEY FIX: In eraser "all" mode, ALL dots are same neutral color
      for(const p of particlesRef.current){
        if(isEr&&eraserFilter==="all") ctx.fillStyle="rgba(160,170,200,0.6)";
        else if(isDet) ctx.fillStyle="rgba(255,120,90,0.7)";
        else ctx.fillStyle="rgba(100,180,255,0.75)";
        ctx.fillRect(p.x,p.y,1.5,1.5);
      }

      const histX=W-70,histW=50,bins=120,hD=new Array(bins).fill(0);
      for(const p of particlesRef.current){const b=Math.floor((p.y/H)*bins);if(b>=0&&b<bins)hD[b]++;}
      const mx=Math.max(1,...hD);ctx.fillStyle="rgba(10,12,25,0.85)";ctx.fillRect(histX-4,16,histW+12,H-32);
      for(let i=0;i<bins;i++){const w=(hD[i]/mx)*histW;if(w>0.5){
        ctx.fillStyle=isDet?"rgba(255,120,90,0.5)":isEr?"rgba(160,170,200,0.4)":"rgba(100,180,255,0.5)";
        ctx.fillRect(histX,(i/bins)*H,w,H/bins);
      }}
    }

    // Counts & labels
    ctx.font="10px monospace";ctx.fillStyle="rgba(180,180,220,0.5)";ctx.fillText(`${particlesRef.current.length} photons`,28,H-10);
    if(isEr&&eraserFilter==="all"){
      ctx.fillStyle="rgba(160,170,200,0.5)";ctx.fillText(`All data combined — looks like blur`,28,H-26);
      ctx.fillText(`Hit "Sort by information" to reveal hidden patterns`,28,H-42);
    }

    ctx.font="bold 12px monospace";ctx.fillStyle="rgba(255,200,100,0.6)";
    const lb={onebyone:"ONE PHOTON AT A TIME",detector:"DETECTOR ON — WHICH SLIT?",eraser:"QUANTUM ERASER"};
    if(!(isEr&&eraserFilter==="split"))ctx.fillText(lb[mode],28,16);

    // Timeline for eraser
    if(isEr&&eraserFilter==="all"&&particlesRef.current.length>200){
      const tlY=56,tlX=W-280;
      ctx.font="bold 9px monospace";ctx.fillStyle="rgba(255,200,100,0.6)";ctx.fillText("TIMELINE:",tlX,tlY);
      ctx.font="9px monospace";
      ctx.fillStyle="rgba(100,180,255,0.7)";ctx.fillText("① Photon hits screen",tlX,tlY+14);
      ctx.fillStyle="rgba(160,170,200,0.7)";ctx.fillText("② Position recorded",tlX,tlY+28);
      ctx.fillStyle="rgba(255,200,100,0.7)";ctx.fillText("③ THEN tag erased or kept",tlX,tlY+42);
      ctx.fillStyle="rgba(160,170,200,0.4)";ctx.fillText("(erasing happens AFTER detection)",tlX,tlY+56);
    }

    ctx.font="9px monospace";ctx.fillStyle="rgba(180,180,220,0.3)";
    if(!(isEr&&eraserFilter==="split")){ctx.fillText("← left on screen",28,32);ctx.fillText("→ right on screen",28,H-56);}

    frameRef.current=requestAnimationFrame(draw);
  },[slitSeparation,mode,speed,eraserFilter]);

  useEffect(()=>{const c=canvasRef.current;c.width=c.offsetWidth*1.5;c.height=c.offsetHeight*1.5;particlesRef.current=[];frameRef.current=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frameRef.current);},[draw]);
  return <canvas ref={canvasRef} style={{width:"100%",height:"100%",borderRadius:12}}/>;
}

// ==================== DELAYED CHOICE CANVAS ====================
function DelayedChoiceCanvas({slitSeparation,speed}){
  const canvasRef=useRef(null);const frameRef=useRef(0);
  const photonsRef=useRef([]);const landedRef=useRef([]);const fcRef=useRef(0);

  const draw=useCallback(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");const W=canvas.width,H=canvas.height;
    const slitGap=slitSeparation;const wallX=W*0.15,screenX=W*0.85;
    const decZ=wallX+(screenX-wallX)*0.55;const centerY=H/2;
    fcRef.current++;

    if(fcRef.current%Math.max(1,6-speed)===0&&landedRef.current.length<5000){
      const measure=Math.random()<0.5;
      const ty=measure?sampleTwoBlobs(slitGap,H):sampleInterference(slitGap,H);
      photonsRef.current.push({x:0,targetY:ty,progress:0,decided:false,measure});
    }

    for(const p of photonsRef.current){
      p.progress+=0.012*(1+speed*0.3);
      if(p.progress>=0.55&&!p.decided)p.decided=true;
      if(p.progress>=1){landedRef.current.push({y:p.targetY,measure:p.measure});p.progress=2;}
    }
    photonsRef.current=photonsRef.current.filter(p=>p.progress<2);

    ctx.fillStyle="#0a0a0f";ctx.fillRect(0,0,W,H);

    ctx.fillStyle="#1a1a2e";
    ctx.fillRect(wallX-3,0,6,centerY-slitGap*1.2);
    ctx.fillRect(wallX-3,centerY-slitGap*0.3,6,slitGap*0.6);
    ctx.fillRect(wallX-3,centerY+slitGap*1.2,6,H-centerY-slitGap*1.2);

    ctx.fillStyle="rgba(255,200,80,0.04)";ctx.fillRect(decZ-20,0,40,H);
    ctx.strokeStyle="rgba(255,200,80,0.2)";ctx.lineWidth=1;ctx.setLineDash([4,4]);
    ctx.beginPath();ctx.moveTo(decZ,0);ctx.lineTo(decZ,H);ctx.stroke();ctx.setLineDash([]);
    ctx.font="9px monospace";ctx.fillStyle="rgba(255,200,80,0.5)";
    ctx.fillText("DECISION POINT",decZ-40,16);ctx.fillText("(after the slits)",decZ-42,28);

    ctx.fillStyle="#14142a";ctx.fillRect(screenX,0,4,H);

    for(const p of photonsRef.current){
      const px=wallX+p.progress*(screenX-wallX);
      const baseY=centerY+(p.targetY-centerY)*p.progress;
      if(p.decided)ctx.fillStyle=p.measure?"rgba(255,120,90,0.9)":"rgba(100,220,160,0.9)";
      else ctx.fillStyle="rgba(100,180,255,0.9)";
      ctx.beginPath();ctx.arc(px,baseY,3,0,TAU);ctx.fill();
      if(!p.decided){ctx.fillStyle="rgba(100,180,255,0.15)";ctx.beginPath();ctx.arc(px,baseY,8,0,TAU);ctx.fill();}
    }

    for(const p of landedRef.current){
      ctx.fillStyle=p.measure?"rgba(255,120,90,0.6)":"rgba(100,220,160,0.6)";
      ctx.fillRect(screenX+6+Math.random()*2,p.y,1.5,1.5);
    }

    const bins=100,hM=new Array(bins).fill(0),hN=new Array(bins).fill(0);
    for(const p of landedRef.current){const b=Math.floor((p.y/H)*bins);if(b>=0&&b<bins){if(p.measure)hM[b]++;else hN[b]++;}}
    const mM=Math.max(1,...hM),mN=Math.max(1,...hN);
    const hX=screenX+14,hW=W-hX-10;
    for(let i=0;i<bins;i++){const w=(hM[i]/mM)*hW*0.45;if(w>0.5){ctx.fillStyle="rgba(255,120,90,0.4)";ctx.fillRect(hX,(i/bins)*H,w,H/bins);}}
    for(let i=0;i<bins;i++){const w=(hN[i]/mN)*hW*0.45;if(w>0.5){ctx.fillStyle="rgba(100,220,160,0.4)";ctx.fillRect(hX+hW*0.5,(i/bins)*H,w,H/bins);}}

    ctx.font="bold 12px monospace";ctx.fillStyle="rgba(255,200,100,0.6)";ctx.fillText("DELAYED CHOICE",20,16);
    ctx.font="9px monospace";ctx.fillStyle="rgba(180,180,220,0.4)";ctx.fillText(`${landedRef.current.length} photons`,20,H-10);
    const nM=landedRef.current.filter(p=>p.measure).length,nN=landedRef.current.filter(p=>!p.measure).length;
    ctx.fillStyle="rgba(255,120,90,0.7)";ctx.fillText(`measured: ${nM} → two blobs`,20,H-26);
    ctx.fillStyle="rgba(100,220,160,0.7)";ctx.fillText(`not measured: ${nN} → interference`,20,H-42);
    ctx.fillStyle="rgba(180,180,220,0.25)";ctx.fillText("← left",20,42);ctx.fillText("→ right",20,H-56);
    ctx.font="8px monospace";ctx.fillStyle="rgba(255,120,90,0.5)";ctx.fillText("measured",hX,H-4);
    ctx.fillStyle="rgba(100,220,160,0.5)";ctx.fillText("not measured",hX+hW*0.5,H-4);

    frameRef.current=requestAnimationFrame(draw);
  },[slitSeparation,speed]);

  useEffect(()=>{const c=canvasRef.current;c.width=c.offsetWidth*1.5;c.height=c.offsetHeight*1.5;photonsRef.current=[];landedRef.current=[];fcRef.current=0;frameRef.current=requestAnimationFrame(draw);return()=>cancelAnimationFrame(frameRef.current);},[draw]);
  return <canvas ref={canvasRef} style={{width:"100%",height:"100%",borderRadius:12}}/>;
}

// ==================== EXPLAINER ====================
function Explainer({mode}){
  const data={
    single:{title:"SINGLE SLIT — DIFFRACTION WITHOUT INTERFERENCE",steps:[
      {step:"1",title:"One opening",desc:"No second source. Just diffraction — the wave spreading sideways.",color:"#5090ff"},
      {step:"2",title:"Broad central band",desc:"Most light in one wide region. No alternation — just smooth fade.",color:"#60dba0"},
      {step:"3",title:"The baseline",desc:"Adding a second slit creates alternating bands. That's interference.",color:"#ff8060"},
    ]},
    double:{title:"HOW A FEATURELESS WAVE BECOMES STRUCTURED",steps:[
      {step:"1",title:"Symmetric input",desc:"The incoming wave is uniform — no left-right bias.",color:"#5090ff"},
      {step:"2",title:"Two slits break symmetry",desc:"Each slit fans the wave sideways. Two side-by-side sources.",color:"#60dba0"},
      {step:"3",title:"Path difference → bands",desc:"Left or right on the screen, one slit is closer. Reinforcement and cancellation alternate.",color:"#ff8060"},
    ]},
    onebyone:{title:"THE MYSTERY — ONE PHOTON AT A TIME",steps:[
      {step:"1",title:"Each lands as a dot",desc:"A single particle impact. Nothing wave-like about it.",color:"#5090ff"},
      {step:"2",title:"Pattern builds",desc:"Thousands of dots later, interference bands emerge from noise.",color:"#60dba0"},
      {step:"3",title:"Self-interference",desc:"Each photon was alone. It went through both slits and interfered with itself.",color:"#ff8060"},
    ]},
    detector:{title:"MEASUREMENT DESTROYS INTERFERENCE",steps:[
      {step:"1",title:"Which slit?",desc:"A detector tags each photon. Which-path information now exists.",color:"#5090ff"},
      {step:"2",title:"Two blobs",desc:"Interference vanishes. Two clusters, one per slit.",color:"#60dba0"},
      {step:"3",title:"It's the information",desc:"Not the disturbance. The mere existence of which-path info kills the pattern.",color:"#ff8060"},
    ]},
    delayed:{title:"DELAYED CHOICE — DECIDE AFTER THE SLITS",steps:[
      {step:"1",title:"Through undisturbed",desc:"No detector at the slits. The photon passes through freely.",color:"#5090ff"},
      {step:"2",title:"Decide mid-flight",desc:"After the slits, before the screen: choose to measure or not.",color:"#60dba0"},
      {step:"3",title:"Past depends on future",desc:"Measured → two blobs. Not measured → interference. Future choice shapes past behavior.",color:"#ff8060"},
    ]},
    eraser:{title:"QUANTUM ERASER — INFORMATION DEFINES REALITY",steps:[
      {step:"1",title:"Photon lands first",desc:"The photon hits the screen. Position recorded. Event over. Then its entangled partner's tag is erased or kept.",color:"#5090ff"},
      {step:"2",title:"Combined data = blur",desc:"All dots together show no pattern. The information is hidden in the tags, not the positions.",color:"#60dba0"},
      {step:"3",title:"Sort → two realities",desc:"Erased tags → interference. Kept tags → two blobs. Same data, split by information, reveals two different physics.",color:"#ff8060"},
    ]},
  }[mode];

  return(
    <div style={{background:"linear-gradient(135deg,#0f1628,#0a0e1a)",borderRadius:12,padding:20,border:"1px solid rgba(100,140,255,0.15)",marginTop:16}}>
      <h3 style={{color:"#8fb4ff",margin:"0 0 12px",fontSize:14,fontFamily:"'JetBrains Mono',monospace",letterSpacing:1}}>{data.title}</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        {data.steps.map(item=>(
          <div key={item.step} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:14,borderLeft:`3px solid ${item.color}`}}>
            <div style={{color:item.color,fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:22,marginBottom:4}}>{item.step}</div>
            <div style={{color:"#c0d0f0",fontSize:13,fontWeight:700,marginBottom:6}}>{item.title}</div>
            <div style={{color:"#8090b0",fontSize:12,lineHeight:1.5}}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN ====================
export default function DoubleSlit(){
  const [slitSep,setSlitSep]=useState(40);
  const [wavelength,setWavelength]=useState(20);
  const [mode,setMode]=useState("single");
  const [showPaths,setShowPaths]=useState(false);
  const [animating,setAnimating]=useState(true);
  const [speed,setSpeed]=useState(3);
  const [particleKey,setParticleKey]=useState(0);
  const [eraserFilter,setEraserFilter]=useState("all");

  const isWave=mode==="single"||mode==="double";
  const isDel=mode==="delayed";

  const sl={width:"100%",accentColor:"#5090ff",cursor:"pointer"};
  const bb={padding:"7px 11px",borderRadius:8,border:"1px solid rgba(100,140,255,0.3)",fontFamily:"'JetBrains Mono',monospace",fontSize:10.5,cursor:"pointer",transition:"all 0.2s"};
  const mb=(m,ac)=>({...bb,background:mode===m?`rgba(${ac},0.2)`:"rgba(100,140,255,0.06)",color:mode===m?`rgb(${ac})`:"#6080b0",borderColor:mode===m?`rgba(${ac},0.5)`:"rgba(100,140,255,0.15)"});
  const fb=(f,ac)=>({...bb,fontSize:10,padding:"5px 10px",background:eraserFilter===f?`rgba(${ac},0.2)`:"rgba(100,140,255,0.06)",color:eraserFilter===f?`rgb(${ac})`:"#6080b0",borderColor:eraserFilter===f?`rgba(${ac},0.5)`:"rgba(100,140,255,0.15)"});

  const insights={
    single:"One slit, no interference — just diffraction. This broad band is the baseline.",
    double:"Two slits break symmetry. Path difference varies left to right → alternating vertical bands.",
    onebyone:"Each photon lands as a dot. After thousands, interference emerges — each photon interfered with itself.",
    detector:"Which-path information exists → interference vanishes. Two blobs. It's not the disturbance — it's the information.",
    delayed:"Decision happens after the slits. Measured → two blobs. Not measured → interference. The photon's past depends on your future choice.",
    eraser:"Photons land and are recorded. Then tags are erased or kept. Combined data looks like blur — but sort by information and two completely different patterns emerge from the same data. The erasing happens after detection.",
  };

  return(
    <div style={{fontFamily:"'JetBrains Mono','SF Mono',monospace",background:"linear-gradient(170deg,#07080f,#0c1020 40%,#0a0e18)",minHeight:"100vh",color:"#c0d0f0",padding:"24px 20px"}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <h1 style={{fontSize:26,fontWeight:800,color:"#e0e8ff",margin:"0 0 4px",letterSpacing:-0.5}}>Double Slit Experiment</h1>
        <p style={{color:"#6080b0",fontSize:12,margin:"0 0 16px",lineHeight:1.5}}>Six modes — from classical waves to the information frontier. Work left to right.</p>

        <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
          <button onClick={()=>setMode("single")} style={mb("single","255,180,80")}>① Single Slit</button>
          <button onClick={()=>setMode("double")} style={mb("double","80,140,255")}>② Double Slits</button>
          <button onClick={()=>{setMode("onebyone");setParticleKey(k=>k+1);}} style={mb("onebyone","100,180,255")}>③ One at a Time</button>
          <button onClick={()=>{setMode("detector");setParticleKey(k=>k+1);}} style={mb("detector","255,120,90")}>④ Detector On</button>
          <button onClick={()=>{setMode("delayed");setParticleKey(k=>k+1);}} style={mb("delayed","255,200,80")}>⑤ Delayed Choice</button>
          <button onClick={()=>{setMode("eraser");setEraserFilter("all");setParticleKey(k=>k+1);}} style={mb("eraser","100,220,160")}>⑥ Quantum Eraser</button>
        </div>

        <div style={{width:"100%",height:440,borderRadius:12,overflow:"hidden",border:"1px solid rgba(100,140,255,0.12)",boxShadow:"0 8px 40px rgba(0,0,0,0.5)"}}>
          {isWave?<WaveCanvas slitSeparation={slitSep} wavelength={wavelength} mode={mode} showPaths={showPaths} animating={animating}/>:
           isDel?<DelayedChoiceCanvas key={particleKey} slitSeparation={slitSep} speed={speed}/>:
           <ParticleCanvas key={particleKey} slitSeparation={slitSep} mode={mode} speed={speed} eraserFilter={eraserFilter}/>}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
          <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:16,border:"1px solid rgba(100,140,255,0.1)"}}>
            <label style={{fontSize:11,color:"#6080b0",textTransform:"uppercase",letterSpacing:1}}>Slit Separation: {slitSep}</label>
            <input type="range" min={15} max={80} value={slitSep} onChange={e=>setSlitSep(+e.target.value)} style={sl}/>
            {isWave&&<><label style={{fontSize:11,color:"#6080b0",textTransform:"uppercase",letterSpacing:1,marginTop:12,display:"block"}}>Wavelength: {wavelength}</label>
            <input type="range" min={8} max={40} value={wavelength} onChange={e=>setWavelength(+e.target.value)} style={sl}/></>}
            {!isWave&&<><label style={{fontSize:11,color:"#6080b0",textTransform:"uppercase",letterSpacing:1,marginTop:12,display:"block"}}>Speed: {speed}x</label>
            <input type="range" min={1} max={12} value={speed} onChange={e=>setSpeed(+e.target.value)} style={sl}/></>}
          </div>
          <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:16,border:"1px solid rgba(100,140,255,0.1)",display:"flex",flexDirection:"column",gap:8}}>
            {isWave&&<button onClick={()=>setShowPaths(!showPaths)} style={{...bb,background:showPaths?"rgba(100,255,180,0.15)":"rgba(100,140,255,0.1)",color:showPaths?"#60dba0":"#8fb4ff"}}>{showPaths?"◉ Path Lines ON":"◎ Show Path Lines"}</button>}
            {isWave&&<button onClick={()=>setAnimating(!animating)} style={{...bb,background:animating?"rgba(255,200,80,0.15)":"rgba(100,140,255,0.1)",color:animating?"#ffc850":"#8fb4ff"}}>{animating?"⏸ Pause":"▶ Play"}</button>}
            {!isWave&&<button onClick={()=>setParticleKey(k=>k+1)} style={{...bb,background:"rgba(255,120,80,0.15)",color:"#ff9060"}}>↺ Reset</button>}
            {mode==="eraser"&&<div style={{display:"flex",gap:4}}>
              <button onClick={()=>setEraserFilter("all")} style={fb("all","160,170,200")}>All combined</button>
              <button onClick={()=>setEraserFilter("split")} style={fb("split","180,200,100")}>Sort by information</button>
            </div>}
            {mode==="eraser"&&eraserFilter==="split"&&<div style={{fontSize:10,color:"#6080b0",lineHeight:1.5}}>
              <span style={{color:"rgba(100,220,160,0.9)"}}>● green</span> = tags erased → interference<br/>
              <span style={{color:"rgba(255,120,90,0.9)"}}>● red</span> = tags kept → two blobs
            </div>}
            {mode==="eraser"&&eraserFilter==="all"&&<div style={{fontSize:10,color:"#6080b0",lineHeight:1.5}}>
              All photons shown in neutral gray.<br/>
              The pattern looks like featureless blur.<br/>
              Hit <strong style={{color:"#b0b880"}}>"Sort by information"</strong> to split.
            </div>}
            {mode==="delayed"&&<div style={{fontSize:10,color:"#6080b0",lineHeight:1.5}}>
              Photons pass slits undisturbed.<br/>
              At the <span style={{color:"rgba(255,200,80,0.8)"}}>decision point</span>, fate is sealed:<br/>
              <span style={{color:"rgba(255,120,90,0.9)"}}>● red</span> = measured → two blobs<br/>
              <span style={{color:"rgba(100,220,160,0.9)"}}>● green</span> = not measured → interference
            </div>}
          </div>
        </div>

        <Explainer mode={mode}/>

        <div style={{marginTop:16,padding:16,background:"rgba(255,255,255,0.02)",borderRadius:10,border:"1px solid rgba(100,140,255,0.08)",fontSize:12,color:"#6080b0",lineHeight:1.7}}>
          <strong style={{color:"#8fb4ff"}}>Key insight:</strong> {insights[mode]}
        </div>
      </div>
    </div>
  );
}
