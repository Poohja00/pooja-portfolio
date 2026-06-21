import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHead } from "./common";
import { Arrow } from "../lib/icons";

const GRID = 17;
const CELL = 35;
const SIZE = GRID * CELL; // 595 — wider board, same 17×17 play area
const START_STEP = 138; // ms per move
const MIN_STEP = 74;

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const C_HEAD = hex("#3a7bb8");
const C_TAIL = hex("#2e9e5b");
const mix = (t) => `rgb(${Math.round(lerp(C_HEAD[0], C_TAIL[0], t))},${Math.round(lerp(C_HEAD[1], C_TAIL[1], t))},${Math.round(lerp(C_HEAD[2], C_TAIL[2], t))})`;

function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function Game() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const ctxRef = useRef(null);
  const loopRef = useRef(() => {});
  const touchRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const g = useRef({
    snake: [], prev: [], dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 },
    food: { x: 0, y: 0 }, grow: false, step: START_STEP, lastTick: 0, score: 0, status: "idle",
  });

  useEffect(() => {
    const b = parseInt(localStorage.getItem("pipelineSnakeBest") || "0", 10);
    if (b) setBest(b);
  }, []);

  const spawnFood = () => {
    const r = g.current;
    let f;
    do { f = { x: (Math.random() * GRID) | 0, y: (Math.random() * GRID) | 0 }; }
    while (r.snake.some((s) => s.x === f.x && s.y === f.y));
    r.food = f;
  };

  const start = () => {
    const r = g.current;
    const c = (GRID / 2) | 0;
    r.snake = [{ x: c, y: c }, { x: c - 1, y: c }, { x: c - 2, y: c }];
    r.prev = r.snake.map((s) => ({ ...s }));
    r.dir = { x: 1, y: 0 }; r.nextDir = { x: 1, y: 0 };
    r.grow = false; r.step = START_STEP; r.score = 0; r.status = "playing";
    r.lastTick = performance.now();
    spawnFood();
    setScore(0); setStatus("playing");
    wrapRef.current?.focus();
  };

  const gameOver = () => {
    const r = g.current;
    r.status = "over";
    setStatus("over");
    setBest((b) => {
      const nb = Math.max(b, r.score);
      localStorage.setItem("pipelineSnakeBest", String(nb));
      return nb;
    });
  };

  const setDir = (x, y) => {
    const r = g.current;
    if (r.status !== "playing") return;
    if (x === -r.dir.x && y === -r.dir.y) return; // no 180°
    r.nextDir = { x, y };
  };

  const tick = () => {
    const r = g.current;
    const nd = r.nextDir;
    if (!(nd.x === -r.dir.x && nd.y === -r.dir.y)) r.dir = nd;
    const head = r.snake[0];
    const nh = { x: head.x + r.dir.x, y: head.y + r.dir.y };
    if (nh.x < 0 || nh.y < 0 || nh.x >= GRID || nh.y >= GRID) return gameOver();
    const body = r.snake.slice(0, -1); // tail moves away
    if (body.some((s) => s.x === nh.x && s.y === nh.y)) return gameOver();
    r.prev = r.snake.map((s) => ({ ...s }));
    const next = [nh, ...r.snake];
    if (nh.x === r.food.x && nh.y === r.food.y) {
      r.score += 1; setScore(r.score);
      r.step = Math.max(MIN_STEP, START_STEP - r.score * 3);
      r.prev.push(r.prev[r.prev.length - 1]); // pad for smooth growth
      spawnFood();
    } else {
      next.pop();
    }
    r.snake = next;
  };

  const render = (now) => {
    const r = g.current;
    const ctx = ctxRef.current;
    if (!ctx) return;

    // board
    const bg = ctx.createLinearGradient(0, 0, 0, SIZE);
    bg.addColorStop(0, "#ffffff"); bg.addColorStop(1, "#f3efe7");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = "rgba(22,24,29,0.04)"; ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }

    if (r.status !== "idle") {
      // candidate token (pulsing)
      const pulse = 1 + 0.1 * Math.sin(now / 220);
      const fx = r.food.x * CELL + CELL / 2, fy = r.food.y * CELL + CELL / 2;
      const rad = CELL * 0.3 * pulse;
      ctx.beginPath(); ctx.arc(fx, fy, rad + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(46,158,91,0.14)"; ctx.fill();
      ctx.beginPath(); ctx.arc(fx, fy, rad, 0, Math.PI * 2);
      ctx.fillStyle = "#2e9e5b"; ctx.fill();
      ctx.beginPath(); ctx.arc(fx - rad * 0.3, fy - rad * 0.3, rad * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.fill();
    }

    // snake — tail to head so head sits on top
    const len = r.snake.length;
    const t = r.status === "playing" ? Math.min(1, (now - r.lastTick) / r.step) : 1;
    for (let i = len - 1; i >= 0; i--) {
      const c = r.snake[i];
      const p = r.prev[i] || r.prev[r.prev.length - 1] || c;
      const gx = lerp(p.x, c.x, t), gy = lerp(p.y, c.y, t);
      const pad = 2.5;
      ctx.save();
      if (i === 0) { ctx.shadowColor = "rgba(58,123,184,0.45)"; ctx.shadowBlur = 12; }
      ctx.fillStyle = mix(len <= 1 ? 0 : i / (len - 1));
      roundRect(ctx, gx * CELL + pad, gy * CELL + pad, CELL - pad * 2, CELL - pad * 2, CELL * 0.34);
      ctx.fill();
      ctx.restore();
      if (i === 0) {
        const cx = gx * CELL + CELL / 2, cy = gy * CELL + CELL / 2;
        const off = CELL * 0.18, fwd = CELL * 0.15, er = CELL * 0.085;
        const px = r.dir.y, py = r.dir.x;
        for (const s of [1, -1]) {
          const ex = cx + r.dir.x * fwd + px * off * s, ey = cy + r.dir.y * fwd + py * off * s;
          ctx.beginPath(); ctx.arc(ex, ey, er, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
          ctx.beginPath(); ctx.arc(ex + r.dir.x * 1.3, ey + r.dir.y * 1.3, er * 0.5, 0, Math.PI * 2); ctx.fillStyle = "#16181d"; ctx.fill();
        }
      }
    }
  };

  loopRef.current = (now) => {
    const r = g.current;
    if (r.status === "playing") {
      let guard = 0;
      while (now - r.lastTick >= r.step && r.status === "playing" && guard < 5) {
        tick(); r.lastTick += r.step; guard++;
      }
    }
    render(now);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE * dpr; canvas.height = SIZE * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
    let raf;
    const frame = (now) => { loopRef.current(now); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onKeyDown = (e) => {
    const m = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0], W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] };
    if (m[e.key]) { e.preventDefault(); setDir(m[e.key][0], m[e.key][1]); }
    else if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (g.current.status !== "playing") start(); }
  };

  const onTouchStart = (e) => { const t = e.touches[0]; touchRef.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    const s = touchRef.current; if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) < 18 && Math.abs(dy) < 18) { if (g.current.status !== "playing") start(); }
    else if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
    else setDir(0, dy > 0 ? 1 : -1);
    touchRef.current = null;
  };

  return (
    <Section id="play">
      <SectionHead
        center
        eyebrow="Coffee break"
        title={<>Pipeline <em className="font-medium">Snake.</em></>}
        sub="Steer the pipeline, source candidates, don't crash into yourself. Arrow keys, WASD, or swipe."
      />

      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center">
        <div className="mb-4 flex w-full items-center justify-between">
          <Chip label="Sourced" value={score} />
          <Chip label="Best" value={best} />
        </div>

        <div
          ref={wrapRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative w-full rounded-[24px] border border-line bg-white p-3 shadow-card outline-none ring-green/40 focus-visible:ring-2"
        >
          <canvas
            ref={canvasRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => { if (g.current.status !== "playing") start(); else wrapRef.current?.focus(); }}
            style={{ width: "100%", maxWidth: SIZE, aspectRatio: "1 / 1", touchAction: "none", margin: "0 auto" }}
            className="block rounded-2xl cursor-pointer"
          />

          <AnimatePresence>
            {status !== "playing" && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="absolute inset-3 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
                  className="text-center"
                >
                  {status === "over" ? (
                    <>
                      <div className="font-serif text-[2rem] font-medium leading-none">{score}</div>
                      <div className="mt-1 text-[0.9rem] text-ink-soft">candidate{score === 1 ? "" : "s"} sourced{score >= best && score > 0 ? " · new best" : ""}</div>
                    </>
                  ) : (
                    <div className="font-serif text-[1.7rem] font-medium leading-tight">Ready to source?</div>
                  )}
                  <button
                    onClick={start}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-12px_rgba(22,24,29,0.45)]"
                  >
                    {status === "over" ? "Play again" : "Start"} <Arrow className="!h-[17px] !w-[17px]" />
                  </button>
                  <div className="mt-4 text-[12px] text-ink-faint">Arrow keys · WASD · swipe</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* on-screen d-pad (touch-friendly) */}
        <div className="mt-5 grid grid-cols-3 grid-rows-2 gap-2" style={{ width: 168 }}>
          <DPad dir="up" onPress={() => setDir(0, -1)} className="col-start-2" />
          <DPad dir="left" onPress={() => setDir(-1, 0)} className="col-start-1 row-start-2" />
          <DPad dir="down" onPress={() => setDir(0, 1)} className="col-start-2 row-start-2" />
          <DPad dir="right" onPress={() => setDir(1, 0)} className="col-start-3 row-start-2" />
        </div>
      </div>
    </Section>
  );
}

function Chip({ label, value }) {
  return (
    <div className="flex items-baseline gap-2 rounded-full border border-line bg-white px-4 py-2 shadow-soft">
      <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-faint">{label}</span>
      <span className="font-serif text-[1.25rem] font-semibold leading-none">{value}</span>
    </div>
  );
}

function DPad({ dir, onPress, className = "" }) {
  const rot = { up: "-rotate-90", right: "rotate-0", down: "rotate-90", left: "rotate-180" }[dir];
  return (
    <button
      aria-label={dir}
      onClick={onPress}
      className={`flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white text-ink-soft shadow-soft transition-all hover:-translate-y-0.5 hover:text-ink hover:shadow-card active:translate-y-0 ${className}`}
    >
      <Arrow className={`!h-[18px] !w-[18px] ${rot}`} />
    </button>
  );
}
