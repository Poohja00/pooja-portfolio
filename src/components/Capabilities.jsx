import { motion } from "framer-motion";
import { Section, SectionHead } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";
import { Search, Code, People, Layers } from "../lib/icons";

const FEATS = [
  { icon: <Search />, h: "Talent Sourcing", p: "Finding and engaging the right candidates across channels, quickly and thoughtfully." },
  { icon: <Code />, h: "Technical Fluency", p: "Java, testing and Agile — I speak the language of the engineering teams I hire for." },
  { icon: <People />, h: "People First", p: "Screening and candidate experience that stays human at every step of the process." },
  { icon: <Layers />, h: "Builder", p: "I ship recruitment tools and use AI to work smarter — not just harder." },
];

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionHead
        eyebrow="What I do"
        title={<>A full hiring function, <em className="font-medium">in one person.</em></>}
        sub="From first outreach to signed offer — with the technical fluency to genuinely understand the roles."
      />
      <motion.div
        variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATS.map((f) => (
          <motion.div
            key={f.h}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-card"
          >
            <div className="mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-paper-2 text-ink">
              {f.icon}
            </div>
            <h3 className="mb-2 font-serif text-[1.18rem] font-medium">{f.h}</h3>
            <p className="text-[0.92rem] leading-[1.55] text-ink-soft">{f.p}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
