import { motion } from "framer-motion";
import { Section, Reveal } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";

const STORY = [
  "I've sat on both sides of the table.",
  "My career started in software testing, where I worked closely with engineers, product teams, and the people building technology from the ground up.",
  "Over time, I became curious about something beyond the product itself — the people behind it. What makes great teams work? How do exceptional companies find exceptional talent?",
  "That curiosity led me into talent acquisition.",
  "Today, I combine technical understanding, recruiting experience, and AI-powered workflows to help companies hire better and professionals find opportunities worth pursuing.",
];

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <span className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold text-green">
          <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_var(--color-green-soft)]" /> About me
        </span>
        <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em]">
          Hi, I'm <em className="name-gradient font-medium italic">Pooja.</em>
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_0.9fr] md:gap-16">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView} className="max-w-[640px]">
          {STORY.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={`mb-6 ${i === 0 ? "font-serif text-[1.5rem] leading-snug text-ink md:text-[1.7rem]" : "text-[1.12rem] leading-[1.8] text-ink-soft"}`}
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        <div className="flex flex-col justify-center gap-6">
          <Reveal className="rounded-2xl border border-line bg-white p-8 shadow-soft">
            <p className="font-serif text-[1.35rem] leading-snug text-ink">
              A different lens on recruitment — <em className="italic text-green">equal parts technical, human, and data-driven.</em>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
