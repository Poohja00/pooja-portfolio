import { motion } from "framer-motion";
import { Mail, Linkedin, Arrow } from "../lib/icons";

const NAV = [
  ["About", "about"], ["Work", "experience"], ["Dashboard", "dashboard"],
  ["Services", "services"], ["Résumé", "resume"], ["Contact", "contact"],
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-paper">
      <div className="mx-auto max-w-[1160px] px-6 py-14 sm:px-7">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_auto]">
          <div>
            <div className="font-serif text-[1.6rem] font-medium tracking-[-0.01em]">Pooja Mahapatra</div>
            <p className="mt-3 max-w-[340px] text-[0.95rem] leading-relaxed text-ink-soft">
              Talent Acquisition specialist with an engineering past — helping great companies hire great people,
              and great people find their next move.
            </p>
            <div className="mt-5 flex gap-2.5">
              <motion.a whileHover={{ y: -3 }} href="mailto:mahapatrapooja4@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition-shadow hover:shadow-soft" aria-label="Email">
                <Mail className="!h-[18px] !w-[18px]" />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} href="https://linkedin.com/in/poojamahapatra" target="_blank" rel="noopener"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition-shadow hover:shadow-soft" aria-label="LinkedIn">
                <Linkedin className="!h-[18px] !w-[18px]" />
              </motion.a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-faint">Explore</div>
            <ul className="grid grid-cols-2 gap-y-2.5">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[0.92rem] text-ink-soft transition-colors hover:text-ink">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[0.9rem] font-medium transition-shadow hover:shadow-soft">
              Back to top <Arrow className="!h-4 !w-4 -rotate-90" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-all hover:-translate-y-px hover:shadow-[0_10px_24px_-8px_rgba(22,24,29,0.45)]">
              Let's talk <Arrow className="!h-4 !w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[0.85rem] text-ink-faint sm:flex-row">
          <span>Designed with care · <span className="font-serif text-ink">Pooja Mahapatra</span> © 2026</span>
          <span>Mumbai, India · Open to opportunities</span>
        </div>
      </div>
    </footer>
  );
}
