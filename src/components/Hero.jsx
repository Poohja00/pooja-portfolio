import { motion } from "framer-motion";
import { Button, Arrow } from "./common";
import { Download } from "../lib/icons";

// roles marquee (ported from the old single-file site) — rides on the green hills band
const ROLES = ["SDET", "Engineering Manager", "Full-Stack", "Embedded / UAV", "AI Product Manager", "Unreal Developer", "Android", "Performance Marketing"];

export default function Hero() {
  return (
    <header
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden pt-[150px]"
      style={{ background: "linear-gradient(180deg, var(--color-sky-1) 0%, var(--color-sky-2) 32%, var(--color-sky-3) 60%, var(--color-paper) 100%)" }}
    >
      {/* soft clouds */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[10%] top-[16%] h-[26px] w-[150px] rounded-full bg-white/55 blur-[2px]" />
        <div className="absolute right-[14%] top-[26%] h-[20px] w-[110px] rounded-full bg-white/45 blur-[2px]" />
        <div className="absolute right-[32%] top-[12%] h-[18px] w-[90px] rounded-full bg-white/40 blur-[2px]" />
      </div>

      {/* content sits up top; the hills band is pinned to the bottom via mt-auto */}
      <div className="relative z-[3] mx-auto flex w-full max-w-[1160px] flex-col items-center px-6 text-center sm:px-7">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-4 py-[7px] text-[13px] font-semibold text-ink-soft shadow-soft"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_var(--color-green-soft)]" />
          Open to talent &amp; HR roles · Mumbai, India
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-5 font-serif text-[clamp(2.7rem,6.4vw,5.2rem)] font-normal leading-[1.04] tracking-[-0.025em]"
        >
          Hiring great people,<br /><em className="name-gradient font-medium italic">end to end.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-6 font-serif text-[clamp(1.15rem,2.6vw,1.6rem)] font-normal italic text-ink-soft"
        >
          Bridging technology, talent, and AI.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mb-9 max-w-[600px] text-[clamp(1.05rem,2vw,1.25rem)] font-[450] text-ink-soft"
        >
          I'm Pooja — a talent acquisition specialist who runs hiring end to end. Sourcing, screening and
          closing high-bar technical roles, with the engineering background to actually understand them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
          className="flex flex-wrap justify-center gap-3.5"
        >
          <Button href="#contact">Work with me <Arrow className="!h-[17px] !w-[17px]" /></Button>
          <Button href={`${import.meta.env.BASE_URL}Pooja_Mahapatra_Resume.pdf`} download variant="ghost">
            Download résumé <Download className="!h-[17px] !w-[17px]" />
          </Button>
        </motion.div>
      </div>

      {/* roles marquee sits above the hills, in normal flow (no overlap) */}
      {/* meadow hills pinned to the bottom, with the roles marquee riding on the green band */}
      <div className="relative z-[1] mt-auto w-full">
        <svg className="block w-full" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,140 C240,90 420,170 720,130 C1020,90 1200,160 1440,120 L1440,220 L0,220 Z" fill="#d6e8c9" />
          <path d="M0,170 C260,130 480,200 760,160 C1040,120 1240,190 1440,160 L1440,220 L0,220 Z" fill="#c2dcae" />
          <path d="M0,200 C300,175 520,215 820,192 C1120,170 1300,210 1440,195 L1440,220 L0,220 Z" fill="#fbfaf7" />
        </svg>
        <div className="absolute inset-x-0 bottom-[24%] z-[3] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max gap-12 whitespace-nowrap [animation:marquee_30s_linear_infinite]">
            {[...ROLES, ...ROLES].map((r, i) => (
              <span key={i} className="text-[14px] font-semibold tracking-[0.01em] text-[#3b5a45]">{r}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
