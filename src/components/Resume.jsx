import { motion } from "framer-motion";
import { Section, Button, Arrow } from "./common";
import { inView } from "../lib/motion";
import { Download } from "../lib/icons";

export default function Resume() {
  return (
    <Section id="resume">
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 items-center gap-11 rounded-[24px] border border-line bg-white p-8 shadow-soft md:grid-cols-[minmax(0,1fr)_250px] md:p-[52px]"
      >
        <div>
          <span className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold text-green">
            <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_var(--color-green-soft)]" /> Résumé
          </span>
          <h2 className="mb-3.5 font-serif text-[clamp(1.7rem,3.6vw,2.5rem)] font-normal tracking-[-0.02em]">
            Grab my <em className="font-medium">résumé.</em>
          </h2>
          <p className="mb-7 leading-relaxed text-ink-soft">
            A clean, recruiter-ready PDF with my full experience, skills, certifications and services. Updated June 2026.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`${import.meta.env.BASE_URL}Pooja_Mahapatra_Resume.pdf`} download>Download PDF <Download className="!h-[17px] !w-[17px]" /></Button>
            <Button href={`${import.meta.env.BASE_URL}Pooja_Mahapatra_Resume.pdf`} target="_blank" rel="noopener" variant="ghost">View in browser</Button>
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: 0, scale: 1.04 }} initial={{ rotate: -3 }}
          className="mx-auto aspect-[1/1.414] w-[230px] max-w-full rounded-lg border border-line-2 bg-white p-5 shadow-card"
        >
          <div className="mb-1.5 h-[11px] w-[62%] rounded-sm bg-ink" />
          <div className="mb-2.5 h-[5px] w-[44%] rounded-sm bg-[#b9b4a8]" />
          <div className="mb-2.5 h-[1.5px] bg-ink" />
          {[["34%"], ["full", "82%", "58%"], ["34%"], ["82%", "full", "58%"], ["34%"], ["full", "82%"]].map((grp, gi) =>
            gi % 2 === 0 ? (
              <div key={gi} className="mb-1.5 mt-3 h-1.5 rounded-sm bg-ink/85" style={{ width: grp[0] }} />
            ) : (
              <div key={gi}>{grp.map((w, i) => (
                <div key={i} className="mb-[5px] h-1 rounded-sm bg-[#ddd8cd]" style={{ width: w === "full" ? "100%" : w }} />
              ))}</div>
            )
          )}
        </motion.div>
      </motion.div>
    </Section>
  );
}
