import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  ["About", "about"],
  ["Work", "experience"],
  ["Dashboard", "dashboard"],
  ["Services", "services"],
  ["Play", "play"],
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const pos = window.scrollY + 220;
      for (const [, id] of LINKS) {
        const s = document.getElementById(id);
        if (s && s.offsetTop <= pos && s.offsetTop + s.offsetHeight > pos) setActive(id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Apple-style "liquid glass": frosted + saturated backdrop, bright inset top
  // edge, soft sheen. Airy at the top, more solid/elevated once scrolled.
  const glass = scrolled
    ? "border-white/70 bg-white/75 shadow-[0_12px_36px_-12px_rgba(40,60,90,0.38),inset_0_1px_0_0_rgba(255,255,255,0.85)]"
    : "border-white/45 bg-white/45 shadow-[0_6px_28px_-14px_rgba(40,60,90,0.22),inset_0_1px_0_0_rgba(255,255,255,0.6)]";

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className={`fixed left-1/2 top-[18px] z-[70] flex max-w-[calc(100vw-28px)] -translate-x-1/2 items-center gap-1.5 rounded-full border py-2 pl-5 pr-2
        backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-500 ease-out
        isolate before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-full
        before:bg-gradient-to-b before:from-white/45 before:to-transparent ${glass}`}
    >
      <span className="mr-2.5 whitespace-nowrap font-serif text-[18px] font-medium tracking-[-0.01em]">
        Pooja Mahapatra
      </span>
      <div className="hidden gap-0.5 md:flex">
        {LINKS.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition-colors ${
              active === id ? "bg-ink/[0.06] text-ink" : "text-ink-soft hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className="whitespace-nowrap rounded-full bg-ink px-[18px] py-[9px] text-[14px] font-semibold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_20px_-6px_rgba(22,24,29,0.4)]"
      >
        Let's talk
      </a>
    </motion.nav>
  );
}
