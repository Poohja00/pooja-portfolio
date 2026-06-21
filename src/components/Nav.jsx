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

  useEffect(() => {
    const onScroll = () => {
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

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className="fixed left-1/2 top-[18px] z-[70] flex max-w-[calc(100vw-28px)] -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/90 bg-white/70 py-2 pl-5 pr-2 shadow-[0_6px_30px_-10px_rgba(40,60,90,0.22)] backdrop-blur-xl"
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
