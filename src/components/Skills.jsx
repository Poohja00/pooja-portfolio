import { motion } from "framer-motion";
import { Section, SectionHead } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";
import { People, Code, Spark, Globe } from "../lib/icons";

const GROUPS = [
  { icon: <People />, title: "HR & Talent", rows: [["Talent Sourcing", "90%", 90], ["Candidate Screening", "88%", 88], ["End-to-End Recruitment", "87%", 87]] },
  { icon: <Code />, title: "Technical", rows: [["Software Testing", "85%", 85], ["Java", "75%", 75], ["HTML · TypeScript · Git", "80%", 80]] },
  { icon: <Spark />, title: "Ways of working", rows: [["AI Tools & Automation", "88%", 88], ["Communication", "92%", 92], ["Fast Learning & Adaptability", "95%", 95]] },
  { icon: <Globe />, title: "Languages", rows: [["English", "Professional", 85], ["Hindi", "Native", 100], ["Odia", "Native", 100]] },
];

function Bar({ label, val, w }) {
  return (
    <div className="mb-[17px]">
      <div className="mb-2 flex justify-between text-[0.9rem] font-medium">
        <span>{label}</span>
        <span className="text-ink-faint">{val}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-md bg-paper-2">
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 0.8, 0.2, 1] }}
          className="h-full rounded-md"
          style={{ background: "linear-gradient(90deg, var(--color-blue), var(--color-green))" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHead
        eyebrow="Toolkit"
        title={<>Where HR craft <em className="font-medium">meets technical know-how.</em></>}
      />
      <motion.div
        variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView}
        className="grid grid-cols-1 gap-[18px] md:grid-cols-2"
      >
        {GROUPS.map((g) => (
          <motion.div key={g.title} variants={fadeUp} className="rounded-2xl border border-line bg-white p-8">
            <h3 className="mb-6 flex items-center gap-2.5 font-serif text-[1.15rem] font-medium">
              <span className="text-ink-soft">{g.icon}</span> {g.title}
            </h3>
            {g.rows.map(([label, val, w]) => <Bar key={label} label={label} val={val} w={w} />)}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
