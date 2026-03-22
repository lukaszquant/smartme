import { useState, useEffect, useRef, useCallback } from "react";

const TAU = Math.PI * 2;

function sampleInterference(slitGap, screenH) {
  const center = screenH / 2;
  for (let i = 0; i < 200; i++) {
    const y = Math.random() * screenH;
    const dy = (y - center) / screenH;
    const phase = dy * slitGap * 2.5;
    const interference = Math.cos(phase * TAU * 0.4) ** 2;
    const envelope = Math.exp(-dy * dy * 18);
    if (Math.random() < interference * envelope) return y;
  }
  return center + (Math.random() - 0.5) * 30;
}

function sampleTwoBlobs(slitGap, screenH) {
  const center = screenH / 2;
  const which = Math.random() < 0.5 ? -1 : 1;
  return center + which * slitGap * 0.6 + (Math.random() - 0.5) * slitGap * 0.7;
}

function sampleSingleSlit(screenH) {
  const center = screenH / 2;
  for (let i = 0; i < 200; i++) {
    const y = Math.random() * screenH;
    const dy = (y - center) / (screenH * 0.25);
    const sinc = dy === 0 ? 1 : Math.sin(Math.PI * dy) / (Math.PI * dy);
    if (Math.random() < sinc * sinc) return y;
  }
  return center;
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
    const slitGap = slitSeparation * 2.5, slitWidth = 8, wl = wavelength * 1.8, t = timeRef.current;
    const isSingle = mode === "single";
    const leftSlitY = centerY - slitGap / 2, rightSlitY = centerY + slitGap / 2;

    ctx.fillStyle = "#1a1a2e"; ctx.strokeStyle = "#3a3a5e"; ctx.lineWidth = 1;
    if (isSingle) {
      ctx.fillRect(wallX - 4, 0, 8, centerY - slitWidth); ctx.strokeRect(wallX - 4, 0, 8, centerY - slitWidth);
      ctx.fillRect(wallX - 4, centerY + slitWidth, 8, H - centerY - slitWidth); ctx.strokeRect(wallX - 4, centerY + slitWidth, 8, H - centerY - slitWidth);
      ctx.fillStyle = "rgba(100,180,255,0.25)"; ctx.fillRect(wallX - 3, centerY - slitWidth, 6, slitWidth * 2);
    } else {
      ctx.fillRect(wallX - 4, 0, 8, leftSlitY - slitWidth); ctx.strokeRect(wallX - 4, 0, 8, leftSlitY - slitWidth);
      ctx.fillRect(wallX - 4, leftSlitY + slitWidth, 8, (rightSlitY - slitWidth) - (leftSlitY + slitWidth));
      ctx.strokeRect(wallX - 4, leftSlitY + slitWidth, 8, (rightSlitY - slitWidth) - (leftSlitY + slitWidth));
      ctx.fillRect(wallX - 4, rightSlitY + slitWidth, 8, H - rightSlitY - slitWidth);
      ctx.strokeRect(wallX - 4, rightSlitY + slitWidth, 8, H - rightSlitY - slitWidth);
      ctx.fillStyle = "rgba(100,180,255,0.25)";
      ctx.fillRect(wallX - 3, leftSlitY - slitWidth, 6, slitWidth * 2);
      ctx.fillRect(wallX - 3, rightSlitY - slitWidth, 6, slitWidth * 2);
    }

    ctx.fillStyle = "#14142a"; ctx.fillRect(screenX, 0, 4, H);

    for (let x = sourceX; x < wallX - 6; x += 3) {
      for (let y = 0; y < H; y += 3) {
        const b = Math.max(0, Math.sin((x / wl) * TAU - t)) * 0.35;
        if (b > 0.02) { ctx.fillStyle = `rgba(80,140,255,${b})`; ctx.fillRect(x, y, 2.5, 2.5); }
      }
    }

    const sources = [];
    if (isSingle) { for (let i = 0; i < 12; i++) sources.push({ x: wallX, y: centerY - slitWidth + 2 * slitWidth * (i / 11) }); }
    else { for (let i = 0; i < 8; i++) { const f = i / 7; sources.push({ x: wallX, y: leftSlitY - slitWidth + 2 * slitWidth * f }); sources.push({ x: wallX, y: rightSlitY - slitWidth + 2 * slitWidth * f }); } }

    for (let x = wallX + 6; x < screenX - 2; x += 3) {
      for (let y = 0; y < H; y += 3) {
        let a = 0;
        for (const s of sources) { const d = Math.sqrt((x - s.x) ** 2 + (y - s.y) ** 2); a += Math.sin((d / wl) * TAU - t) / Math.sqrt(Math.max(d, 1) * 0.08); }
        a /= Math.sqrt(sources.length);
        const b = Math.max(0, a) * 0.15;
        if (b > 0.015) { ctx.fillStyle = `rgba(80,150,255,${Math.min(b, 0.55)})`; ctx.fillRect(x, y, 2.5, 2.5); }
      }
    }

    const screenDist = screenX - wallX;
    for (let y = 0; y < H; y++) {
      let I;
      if (isSingle) { const dy = y - centerY; const s = dy === 0 ? 1 : Math.sin(Math.PI * dy * slitWidth / (wl * 40)) / (Math.PI * dy * slitWidth / (wl * 40)); I = s * s; }
      else { const d1 = Math.sqrt(screenDist ** 2 + (y - leftSlitY) ** 2); const d2 = Math.sqrt(screenDist ** 2 + (y - rightSlitY) ** 2); I = Math.cos(TAU * (d2 - d1) / wl / 2) ** 2; const dy = y - centerY; const s = dy === 0 ? 1 : Math.sin(Math.PI * dy * slitWidth / (wl * 40)) / (Math.PI * dy * slitWidth / (wl * 40)); I *= s * s; }
      ctx.fillStyle = `rgba(${Math.round(60 + I * 195)},${Math.round(100 + I * 155)},${Math.round(200 + I * 55)},${I * 0.95 + 0.05})`;
      ctx.fillRect(screenX + 1, y, 3, 1);
    }

    if (showPaths && !isSingle) {
      const pts = [{ y: centerY, l: "Equal paths → bright" }, { y: centerY - wl * screenDist / slitGap * 0.5, l: "½λ diff → dark" }, { y: centerY - wl * screenDist / slitGap, l: "1λ diff → bright" }];
      pts.forEach((pt, i) => {
        if (pt.y < 20 || pt.y > H - 20) return;
        [[leftSlitY, "255,120,80"], [rightSlitY, "80,255,180"]].forEach(([sy, col]) => {
          ctx.beginPath(); ctx.moveTo(wallX + 4, sy); ctx.lineTo(screenX, pt.y);
          ctx.strokeStyle = `rgba(${col},0.7)`; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);
        });
        ctx.font = "10px monospace"; ctx.fillStyle = "rgba(220,220,240,0.85)"; ctx.fillText(pt.l, screenX + 8, pt.y + 4);
        ctx.beginPath(); ctx.arc(screenX + 2, pt.y, 3, 0, TAU); ctx.fillStyle = i === 1 ? "rgba(255,60,60,0.9)" : "rgba(100,255,160,0.9)"; ctx.fill();
      });
    }

    // Front view panel
    const fvX = screenX + 16, fvW = W - fvX - 10, fvH = H - 40, fvY = 32;
    ctx.fillStyle = "rgba(10,12,25,0.9)"; ctx.strokeStyle = "rgba(100,140,255,0.2)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(fvX - 4, fvY - 4, fvW + 8, fvH + 8, 8); ctx.fill(); ctx.stroke();
    ctx.font = "bold 10px monospace"; ctx.fillStyle = "rgba(255,200,100,0.7)"; ctx.fillText("FRONT VIEW", fvX + 4, fvY + 12);
    const fvCY = fvY + 42, fvCH = fvH - 50, fvCW = fvW - 8;
    for (let px = 0; px < fvCW; px++) {
      let I;
      if (isSingle) { const dx = (px - fvCW / 2) / (fvCW * 0.3); I = dx === 0 ? 1 : (Math.sin(Math.PI * dx) / (Math.PI * dx)) ** 2; }
      else { const dx = (px - fvCW / 2) / (fvCW * 0.08); const fr = Math.cos(dx * slitGap * 0.02 * TAU) * 0.5 + 0.5; const ed = (px - fvCW / 2) / (fvCW * 0.3); const s = ed === 0 ? 1 : Math.sin(Math.PI * ed) / (Math.PI * ed); I = fr * s * s; }
      if (I > 0.02) { ctx.fillStyle = `rgba(${Math.round(50 + I * 205)},${Math.round(90 + I * 165)},${Math.round(180 + I * 75)},${I * 0.85})`; ctx.fillRect(fvX + 4 + px, fvCY + 4, 1, fvCH - 8); }
    }
    ctx.font = "8px monospace"; ctx.fillStyle = "rgba(150,170,210,0.4)";
    ctx.fillText("← left", fvX + 4, fvCY + fvCH + 10); ctx.fillText("right →", fvX + fvCW - 38, fvCY + fvCH + 10);

    ctx.font = "bold 11px monospace"; ctx.fillStyle = "rgba(180,180,220,0.7)";
    ctx.fillText("LASER", sourceX, 18); ctx.fillText("BARRIER", wallX - 18, 18); ctx.fillText("SCREEN", screenX - 14, 18);
    ctx.font = "9px monospace"; ctx.fillStyle = "rgba(255,200,100,0.45)"; ctx.fillText("BIRD'S-EYE VIEW (looking down)", sourceX, H - 8);
    ctx.fillStyle = "rgba(200,200,240,0.3)"; ctx.fillText("← left", 8, H * 0.15); ctx.fillText("→ right", 8, H * 0.88);
    if (!isSingle) { ctx.font = "9px monospace"; ctx.fillStyle = "rgba(150,200,255,0.7)"; ctx.fillText("left slit", wallX + 10, leftSlitY - 6); ctx.fillText("right slit", wallX + 10, rightSlitY + 14); }
    ctx.font = "bold 12px monospace"; ctx.fillStyle = "rgba(255,200,100,0.55)"; ctx.fillText(isSingle ? "SINGLE SLIT" : "DOUBLE SLITS", wallX + 60, 18);

    if (animating) { timeRef.current += 0.08; frameRef.current = requestAnimationFrame(draw); }
  }, [slitSeparation, wavelength, mode, showPaths, animating]);

  useEffect(() => { const c = canvasRef.current; c.width = c.offsetWidth * 1.5; c.height = c.offsetHeight * 1.5; frameRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(frameRef.current); }, [draw]);
  useEffect(() => { if (animating) frameRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(frameRef.current); }, [animating, draw]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", borderRadius: 12 }} />;
}

// ==================== PARTICLE CANVAS ====================
function ParticleCanvas({ slitSeparation, mode, speed, eraserFilter }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const slitGap = slitSeparation;
    const isDetector = mode === "detector";
    const isEraser = mode === "eraser";

    const batchSize = speed;
    for (let i = 0; i < batchSize; i++) {
      if (particlesRef.current.length >= 6000) break;
      let y, tag = null;
      if (isDetector) { y = sampleTwoBlobs(slitGap, H); tag = "kept"; }
      else if (isEraser) {
        if (Math.random() < 0.5) { y = sampleTwoBlobs(slitGap, H); tag = "kept"; }
        else { y = sampleInterference(slitGap, H); tag = "erased"; }
      } else { y = sampleInterference(slitGap, H); }
      particlesRef.current.push({ x: 30 + Math.random() * (W - 60), y, tag });
    }

    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);

    if (isEraser && eraserFilter !== "all") {
      // Side-by-side mode
      const midX = W / 2;
      ctx.fillStyle = "rgba(20,20,40,0.8)";
      ctx.fillRect(20, 30, midX - 28, H - 50);
      ctx.fillRect(midX + 8, 30, midX - 28, H - 50);
      ctx.strokeStyle = "rgba(100,220,160,0.2)"; ctx.lineWidth = 1;
      ctx.strokeRect(20, 30, midX - 28, H - 50);
      ctx.strokeStyle = "rgba(255,120,90,0.2)";
      ctx.strokeRect(midX + 8, 30, midX - 28, H - 50);

      // Labels
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "rgba(100,220,160,0.8)"; ctx.fillText("TAGS ERASED → interference", 28, 24);
      ctx.fillStyle = "rgba(255,120,90,0.8)"; ctx.fillText("TAGS KEPT → two blobs", midX + 14, 24);

      const leftW = midX - 28;
      const rightW = midX - 28;

      for (const p of particlesRef.current) {
        if (p.tag === "erased") {
          const px = 20 + (p.x / W) * leftW;
          ctx.fillStyle = "rgba(100,220,160,0.7)";
          ctx.fillRect(px, p.y, 1.5, 1.5);
        } else if (p.tag === "kept") {
          const px = midX + 8 + (p.x / W) * rightW;
          ctx.fillStyle = "rgba(255,120,90,0.7)";
          ctx.fillRect(px, p.y, 1.5, 1.5);
        }
      }

      // Histograms for each side
      const bins = 100;
      const histErased = new Array(bins).fill(0);
      const histKept = new Array(bins).fill(0);
      for (const p of particlesRef.current) {
        const bin = Math.floor((p.y / H) * bins);
        if (bin >= 0 && bin < bins) { if (p.tag === "erased") histErased[bin]++; else histKept[bin]++; }
      }
      const maxE = Math.max(1, ...histErased);
      const maxK = Math.max(1, ...histKept);

      // Left histogram
      const histW = 35;
      for (let i = 0; i < bins; i++) {
        const w = (histErased[i] / maxE) * histW;
        if (w > 0.5) { ctx.fillStyle = "rgba(100,220,160,0.4)"; ctx.fillRect(midX - 30 - histW, (i / bins) * H, w, H / bins); }
      }
      // Right histogram
      for (let i = 0; i < bins; i++) {
        const w = (histKept[i] / maxK) * histW;
        if (w > 0.5) { ctx.fillStyle = "rgba(255,120,90,0.4)"; ctx.fillRect(W - 18 - histW, (i / bins) * H, w, H / bins); }
      }

      ctx.font = "9px monospace"; ctx.fillStyle = "rgba(180,180,220,0.3)";
      ctx.fillText("SAME PHOTONS · SAME SCREEN · DIFFERENT INFORMATION · DIFFERENT PATTERNS", W / 2 - 220, H - 8);

    } else {
      // Normal view (all particles, or non-eraser modes)
      ctx.fillStyle = "rgba(20,20,40,0.8)"; ctx.fillRect(20, 20, W - 100, H - 40);
      ctx.strokeStyle = "rgba(100,140,255,0.15)"; ctx.lineWidth = 1; ctx.strokeRect(20, 20, W - 100, H - 40);

      const showParticles = isEraser && eraserFilter === "all" ? particlesRef.current :
        eraserFilter === "erased" ? particlesRef.current.filter(p => p.tag === "erased") :
        eraserFilter === "kept" ? particlesRef.current.filter(p => p.tag === "kept") :
        particlesRef.current;

      for (const p of showParticles) {
        if (isEraser) ctx.fillStyle = p.tag === "erased" ? "rgba(100,220,160,0.7)" : "rgba(255,120,90,0.7)";
        else if (isDetector) ctx.fillStyle = "rgba(255,120,90,0.7)";
        else ctx.fillStyle = "rgba(100,180,255,0.75)";
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      // Histogram
      const histX = W - 70, histW = 50, bins = 120;
      const histData = new Array(bins).fill(0);
      for (const p of showParticles) { const bin = Math.floor((p.y / H) * bins); if (bin >= 0 && bin < bins) histData[bin]++; }
      const maxBin = Math.max(1, ...histData);
      ctx.fillStyle = "rgba(10,12,25,0.85)"; ctx.fillRect(histX - 4, 16, histW + 12, H - 32);
      for (let i = 0; i < bins; i++) {
        const w = (histData[i] / maxBin) * histW;
        if (w > 0.5) {
          ctx.fillStyle = isDetector ? "rgba(255,120,90,0.5)" : isEraser ? "rgba(140,180,220,0.5)" : "rgba(100,180,255,0.5)";
          ctx.fillRect(histX, (i / bins) * H, w, H / bins);
        }
      }
    }

    // Counts
    ctx.font = "10px monospace"; ctx.fillStyle = "rgba(180,180,220,0.5)";
    ctx.fillText(`${particlesRef.current.length} photons`, 28, H - 10);
    if (isEraser && eraserFilter === "all") {
      const nK = particlesRef.current.filter(p => p.tag === "kept").length;
      const nE = particlesRef.current.filter(p => p.tag === "erased").length;
      ctx.fillStyle = "rgba(255,120,90,0.7)"; ctx.fillText(`tags kept: ${nK}`, 28, H - 26);
      ctx.fillStyle = "rgba(100,220,160,0.7)"; ctx.fillText(`tags erased: ${nE}`, 28, H - 42);
    }

    // Mode label
    ctx.font = "bold 12px monospace"; ctx.fillStyle = "rgba(255,200,100,0.6)";
    const labels = { onebyone: "ONE PHOTON AT A TIME", detector: "DETECTOR ON — WHICH SLIT?", eraser: "QUANTUM ERASER" };
    if (!(isEraser && eraserFilter !== "all")) ctx.fillText(labels[mode], 28, 16);

    ctx.font = "9px monospace"; ctx.fillStyle = "rgba(180,180,220,0.3)";
    if (!(isEraser && eraserFilter !== "all")) { ctx.fillText("← left on screen", 28, 32); ctx.fillText("→ right on screen", 28, H - 56); }

    frameRef.current = requestAnimationFrame(draw);
  }, [slitSeparation, mode, speed, eraserFilter]);

  useEffect(() => { const c = canvasRef.current; c.width = c.offsetWidth * 1.5; c.height = c.offsetHeight * 1.5; particlesRef.current = []; frameRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(frameRef.current); }, [draw]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", borderRadius: 12 }} />;
}

// ==================== DELAYED CHOICE CANVAS ====================
function DelayedChoiceCanvas({ slitSeparation, speed }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const photonsRef = useRef([]);     // in-flight: { x, y (target), progress, decided, measure }
  const landedRef = useRef([]);      // landed: { y, measure }
  const frameCountRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const slitGap = slitSeparation;
    const wallX = W * 0.15, screenX = W * 0.85;
    const decisionZone = wallX + (screenX - wallX) * 0.55;

    frameCountRef.current++;

    // Spawn new photons
    if (frameCountRef.current % Math.max(1, 6 - speed) === 0 && landedRef.current.length < 5000) {
      const measure = Math.random() < 0.5;
      const targetY = measure ? sampleTwoBlobs(slitGap, H) : sampleInterference(slitGap, H);
      photonsRef.current.push({ x: 0, targetY, progress: 0, decided: false, measure });
    }

    // Update
    for (const p of photonsRef.current) {
      p.progress += 0.012 * (1 + speed * 0.3);
      if (p.progress >= 0.55 && !p.decided) p.decided = true;
      if (p.progress >= 1) {
        landedRef.current.push({ y: p.targetY, measure: p.measure });
        p.progress = 2; // mark for removal
      }
    }
    photonsRef.current = photonsRef.current.filter(p => p.progress < 2);

    // Draw
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);

    // Barrier
    const centerY = H / 2;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(wallX - 3, 0, 6, centerY - slitGap * 1.2);
    ctx.fillRect(wallX - 3, centerY - slitGap * 0.3, 6, slitGap * 0.6);
    ctx.fillRect(wallX - 3, centerY + slitGap * 1.2, 6, H - centerY - slitGap * 1.2);

    // Decision zone
    ctx.fillStyle = "rgba(255,200,80,0.04)";
    ctx.fillRect(decisionZone - 20, 0, 40, H);
    ctx.strokeStyle = "rgba(255,200,80,0.2)"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(decisionZone, 0); ctx.lineTo(decisionZone, H); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = "9px monospace"; ctx.fillStyle = "rgba(255,200,80,0.5)";
    ctx.fillText("DECISION POINT", decisionZone - 40, 16);
    ctx.fillText("(after the slits)", decisionZone - 42, 28);

    // Screen
    ctx.fillStyle = "#14142a"; ctx.fillRect(screenX, 0, 4, H);

    // In-flight photons
    for (const p of photonsRef.current) {
      const px = wallX + p.progress * (screenX - wallX);
      const baseY = centerY + (p.targetY - centerY) * p.progress;
      const r = 3;
      if (p.decided) {
        ctx.fillStyle = p.measure ? "rgba(255,120,90,0.9)" : "rgba(100,220,160,0.9)";
      } else {
        ctx.fillStyle = "rgba(100,180,255,0.9)";
      }
      ctx.beginPath(); ctx.arc(px, baseY, r, 0, TAU); ctx.fill();

      // Glow
      if (!p.decided) {
        ctx.fillStyle = "rgba(100,180,255,0.15)";
        ctx.beginPath(); ctx.arc(px, baseY, 8, 0, TAU); ctx.fill();
      }
    }

    // Landed particles
    for (const p of landedRef.current) {
      ctx.fillStyle = p.measure ? "rgba(255,120,90,0.6)" : "rgba(100,220,160,0.6)";
      ctx.fillRect(screenX + 6 + Math.random() * 2, p.y, 1.5, 1.5);
    }

    // Histogram - split by decision
    const bins = 100, histM = new Array(bins).fill(0), histN = new Array(bins).fill(0);
    for (const p of landedRef.current) {
      const bin = Math.floor((p.y / H) * bins);
      if (bin >= 0 && bin < bins) { if (p.measure) histM[bin]++; else histN[bin]++; }
    }
    const maxM = Math.max(1, ...histM), maxN = Math.max(1, ...histN);
    const histX = screenX + 14, histW = W - histX - 10;

    for (let i = 0; i < bins; i++) {
      const wM = (histM[i] / maxM) * histW * 0.45;
      const wN = (histN[i] / maxN) * histW * 0.45;
      if (wM > 0.5) { ctx.fillStyle = "rgba(255,120,90,0.4)"; ctx.fillRect(histX, (i / bins) * H, wM, H / bins); }
      if (wN > 0.5) { ctx.fillStyle = "rgba(100,220,160,0.4)"; ctx.fillRect(histX + histW * 0.5, (i / bins) * H, wN, H / bins); }
    }

    // Labels
    ctx.font = "bold 12px monospace"; ctx.fillStyle = "rgba(255,200,100,0.6)"; ctx.fillText("DELAYED CHOICE", 20, 16);
    ctx.font = "9px monospace"; ctx.fillStyle = "rgba(180,180,220,0.4)";
    ctx.fillText(`${landedRef.current.length} photons`, 20, H - 10);

    const nM = landedRef.current.filter(p => p.measure).length;
    const nN = landedRef.current.filter(p => !p.measure).length;
    ctx.fillStyle = "rgba(255,120,90,0.7)"; ctx.fillText(`measured: ${nM} → two blobs`, 20, H - 26);
    ctx.fillStyle = "rgba(100,220,160,0.7)"; ctx.fillText(`not measured: ${nN} → interference`, 20, H - 42);

    ctx.fillStyle = "rgba(180,180,220,0.25)";
    ctx.fillText("← left", 20, 42); ctx.fillText("→ right", 20, H - 56);

    ctx.font = "8px monospace"; ctx.fillStyle = "rgba(255,120,90,0.5)";
    ctx.fillText("measured", histX, H - 4);
    ctx.fillStyle = "rgba(100,220,160,0.5)";
    ctx.fillText("not measured", histX + histW * 0.5, H - 4);

    frameRef.current = requestAnimationFrame(draw);
  }, [slitSeparation, speed]);

  useEffect(() => { const c = canvasRef.current; c.width = c.offsetWidth * 1.5; c.height = c.offsetHeight * 1.5; photonsRef.current = []; landedRef.current = []; frameCountRef.current = 0; frameRef.current = requestAnimationFrame(draw); return () => cancelAnimationFrame(frameRef.current); }, [draw]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", borderRadius: 12 }} />;
}

// ==================== EXPLAINER ====================
function Explainer({ mode }) {
  const data = {
    single: { title: "SINGLE SLIT — DIFFRACTION WITHOUT INTERFERENCE", steps: [
      { step: "1", title: "One opening", desc: "No second source to interfere with. Just diffraction — the wave spreading sideways.", color: "#5090ff" },
      { step: "2", title: "Broad central band", desc: "Most light in one wide bright region. No alternation — just a smooth fade.", color: "#60dba0" },
      { step: "3", title: "The baseline", desc: "Adding a second slit doesn't just double the light — it creates alternating bands. That's interference.", color: "#ff8060" },
    ]},
    double: { title: "HOW A FEATURELESS WAVE BECOMES STRUCTURED", steps: [
      { step: "1", title: "Symmetric input", desc: "The incoming wave is uniform — no left-right bias.", color: "#5090ff" },
      { step: "2", title: "Two slits break symmetry", desc: "Each slit fans the wave sideways. Two side-by-side sources.", color: "#60dba0" },
      { step: "3", title: "Path difference → bands", desc: "Left or right on the screen, one slit is closer. Reinforcement and cancellation alternate.", color: "#ff8060" },
    ]},
    onebyone: { title: "THE MYSTERY — ONE PHOTON AT A TIME", steps: [
      { step: "1", title: "Each lands as a dot", desc: "A single particle impact. Nothing wave-like about each individual hit.", color: "#5090ff" },
      { step: "2", title: "Pattern builds up", desc: "After thousands, the interference bands emerge from what looked like noise.", color: "#60dba0" },
      { step: "3", title: "Self-interference", desc: "Each photon was alone. It interfered with itself — as if it went through both slits.", color: "#ff8060" },
    ]},
    detector: { title: "MEASUREMENT DESTROYS INTERFERENCE", steps: [
      { step: "1", title: "Which slit?", desc: "A detector checks which slit each photon uses. Which-path information now exists.", color: "#5090ff" },
      { step: "2", title: "Two blobs", desc: "Interference vanishes. Just two clusters, one per slit. Classic particle behavior.", color: "#60dba0" },
      { step: "3", title: "It's the information", desc: "Not the detector's disturbance — the mere existence of which-path information kills the pattern.", color: "#ff8060" },
    ]},
    delayed: { title: "DELAYED CHOICE — DECIDE AFTER THE SLITS", steps: [
      { step: "1", title: "Photon passes through", desc: "No detector at the slits. The photon sails through undisturbed.", color: "#5090ff" },
      { step: "2", title: "Decide mid-flight", desc: "After the slits but before the screen, you choose: measure which path, or don't.", color: "#60dba0" },
      { step: "3", title: "Past depends on future", desc: "Measured → two blobs. Not measured → interference. The photon's past behavior depends on your later choice.", color: "#ff8060" },
    ]},
    eraser: { title: "QUANTUM ERASER — SAME DATA, DIFFERENT PATTERNS", steps: [
      { step: "1", title: "Tag each photon", desc: "Polarization marks which slit. Interference disappears — information exists.", color: "#5090ff" },
      { step: "2", title: "Erase some tags", desc: "After detection, destroy which-path info for half the photons. Those tags are gone forever.", color: "#60dba0" },
      { step: "3", title: "Split the data", desc: "Erased subset → interference. Kept subset → two blobs. Same screen. Different information. Different physics.", color: "#ff8060" },
    ]},
  }[mode];

  return (
    <div style={{ background: "linear-gradient(135deg,#0f1628,#0a0e1a)", borderRadius: 12, padding: 20, border: "1px solid rgba(100,140,255,0.15)", marginTop: 16 }}>
      <h3 style={{ color: "#8fb4ff", margin: "0 0 12px", fontSize: 14, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1 }}>{data.title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {data.steps.map(item => (
          <div key={item.step} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14, borderLeft: `3px solid ${item.color}` }}>
            <div style={{ color: item.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{item.step}</div>
            <div style={{ color: "#c0d0f0", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
            <div style={{ color: "#8090b0", fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN ====================
export default function DoubleSlit() {
  const [slitSep, setSlitSep] = useState(40);
  const [wavelength, setWavelength] = useState(20);
  const [mode, setMode] = useState("single");
  const [showPaths, setShowPaths] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(3);
  const [particleKey, setParticleKey] = useState(0);
  const [eraserFilter, setEraserFilter] = useState("all");

  const isWaveMode = mode === "single" || mode === "double";
  const isDelayed = mode === "delayed";

  const sliderStyle = { width: "100%", accentColor: "#5090ff", cursor: "pointer" };
  const btnBase = { padding: "7px 11px", borderRadius: 8, border: "1px solid rgba(100,140,255,0.3)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, cursor: "pointer", transition: "all 0.2s" };
  const modeBtn = (m, activeColor) => ({
    ...btnBase,
    background: mode === m ? `rgba(${activeColor},0.2)` : "rgba(100,140,255,0.06)",
    color: mode === m ? `rgb(${activeColor})` : "#6080b0",
    borderColor: mode === m ? `rgba(${activeColor},0.5)` : "rgba(100,140,255,0.15)",
  });
  const filterBtn = (f, label, activeColor) => ({
    ...btnBase, fontSize: 10, padding: "5px 10px",
    background: eraserFilter === f ? `rgba(${activeColor},0.2)` : "rgba(100,140,255,0.06)",
    color: eraserFilter === f ? `rgb(${activeColor})` : "#6080b0",
    borderColor: eraserFilter === f ? `rgba(${activeColor},0.5)` : "rgba(100,140,255,0.15)",
  });

  const insights = {
    single: "One slit, no interference — just diffraction spreading. This broad central band is the baseline.",
    double: "Two slits break the symmetry. Path difference varies left to right → alternating bright and dark vertical bands.",
    onebyone: "Each photon lands as a single dot. After thousands, the interference pattern emerges — each photon interfered with itself.",
    detector: "Check which slit → interference vanishes. Two blobs. The which-path information kills the wave behavior.",
    delayed: "The decision happens after the photon passes the slits. Measured (red) → two blobs. Not measured (green) → interference. The photon's past depends on your future choice.",
    eraser: "Tag photons → no interference. Erase tags after detection → interference reappears in the erased subset. Toggle the filter to see the same data split into two completely different patterns.",
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono','SF Mono',monospace", background: "linear-gradient(170deg,#07080f,#0c1020 40%,#0a0e18)", minHeight: "100vh", color: "#c0d0f0", padding: "24px 20px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#e0e8ff", margin: "0 0 4px", letterSpacing: -0.5 }}>Double Slit Experiment</h1>
        <p style={{ color: "#6080b0", fontSize: 12, margin: "0 0 16px", lineHeight: 1.5 }}>
          Six modes — from classical waves to the information frontier. Work left to right.
        </p>

        <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
          <button onClick={() => setMode("single")} style={modeBtn("single", "255,180,80")}>① Single Slit</button>
          <button onClick={() => setMode("double")} style={modeBtn("double", "80,140,255")}>② Double Slits</button>
          <button onClick={() => { setMode("onebyone"); setParticleKey(k => k + 1); }} style={modeBtn("onebyone", "100,180,255")}>③ One at a Time</button>
          <button onClick={() => { setMode("detector"); setParticleKey(k => k + 1); }} style={modeBtn("detector", "255,120,90")}>④ Detector On</button>
          <button onClick={() => { setMode("delayed"); setParticleKey(k => k + 1); }} style={modeBtn("delayed", "255,200,80")}>⑤ Delayed Choice</button>
          <button onClick={() => { setMode("eraser"); setEraserFilter("all"); setParticleKey(k => k + 1); }} style={modeBtn("eraser", "100,220,160")}>⑥ Quantum Eraser</button>
        </div>

        <div style={{ width: "100%", height: 440, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(100,140,255,0.12)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
          {isWaveMode ? (
            <WaveCanvas slitSeparation={slitSep} wavelength={wavelength} mode={mode} showPaths={showPaths} animating={animating} />
          ) : isDelayed ? (
            <DelayedChoiceCanvas key={particleKey} slitSeparation={slitSep} speed={speed} />
          ) : (
            <ParticleCanvas key={particleKey} slitSeparation={slitSep} mode={mode} speed={speed} eraserFilter={eraserFilter} />
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(100,140,255,0.1)" }}>
            <label style={{ fontSize: 11, color: "#6080b0", textTransform: "uppercase", letterSpacing: 1 }}>Slit Separation: {slitSep}</label>
            <input type="range" min={15} max={80} value={slitSep} onChange={e => setSlitSep(+e.target.value)} style={sliderStyle} />
            {isWaveMode && (<>
              <label style={{ fontSize: 11, color: "#6080b0", textTransform: "uppercase", letterSpacing: 1, marginTop: 12, display: "block" }}>Wavelength: {wavelength}</label>
              <input type="range" min={8} max={40} value={wavelength} onChange={e => setWavelength(+e.target.value)} style={sliderStyle} />
            </>)}
            {!isWaveMode && (<>
              <label style={{ fontSize: 11, color: "#6080b0", textTransform: "uppercase", letterSpacing: 1, marginTop: 12, display: "block" }}>Speed: {speed}x</label>
              <input type="range" min={1} max={12} value={speed} onChange={e => setSpeed(+e.target.value)} style={sliderStyle} />
            </>)}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(100,140,255,0.1)", display: "flex", flexDirection: "column", gap: 8 }}>
            {isWaveMode && (
              <button onClick={() => setShowPaths(!showPaths)} style={{ ...btnBase, background: showPaths ? "rgba(100,255,180,0.15)" : "rgba(100,140,255,0.1)", color: showPaths ? "#60dba0" : "#8fb4ff" }}>
                {showPaths ? "◉ Path Lines ON" : "◎ Show Path Lines"}
              </button>
            )}
            {isWaveMode && (
              <button onClick={() => setAnimating(!animating)} style={{ ...btnBase, background: animating ? "rgba(255,200,80,0.15)" : "rgba(100,140,255,0.1)", color: animating ? "#ffc850" : "#8fb4ff" }}>
                {animating ? "⏸ Pause" : "▶ Play"}
              </button>
            )}
            {!isWaveMode && (
              <button onClick={() => setParticleKey(k => k + 1)} style={{ ...btnBase, background: "rgba(255,120,80,0.15)", color: "#ff9060" }}>↺ Reset</button>
            )}
            {mode === "eraser" && (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <button onClick={() => setEraserFilter("all")} style={filterBtn("all", "All mixed", "140,180,220")}>All mixed</button>
                <button onClick={() => setEraserFilter("split")} style={filterBtn("split", "Side by side", "180,180,100")}>Side by side</button>
              </div>
            )}
            {mode === "eraser" && (
              <div style={{ fontSize: 10, color: "#6080b0", lineHeight: 1.5, marginTop: 2 }}>
                <span style={{ color: "rgba(100,220,160,0.9)" }}>● green</span> = tags erased → interference<br />
                <span style={{ color: "rgba(255,120,90,0.9)" }}>● red</span> = tags kept → two blobs
              </div>
            )}
            {mode === "delayed" && (
              <div style={{ fontSize: 10, color: "#6080b0", lineHeight: 1.5 }}>
                Photons pass the slits undisturbed.<br />
                At the <span style={{ color: "rgba(255,200,80,0.8)" }}>decision point</span>, fate is sealed:<br />
                <span style={{ color: "rgba(255,120,90,0.9)" }}>● red</span> = will be measured → two blobs<br />
                <span style={{ color: "rgba(100,220,160,0.9)" }}>● green</span> = not measured → interference
              </div>
            )}
          </div>
        </div>

        <Explainer mode={mode} />

        <div style={{ marginTop: 16, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(100,140,255,0.08)", fontSize: 12, color: "#6080b0", lineHeight: 1.7 }}>
          <strong style={{ color: "#8fb4ff" }}>Key insight:</strong> {insights[mode]}
        </div>
      </div>
    </div>
  );
}
