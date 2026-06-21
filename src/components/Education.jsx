import { motion } from "framer-motion";
import { Section, SectionHead } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";

const EDU = [
  { deg: "B.Tech, Biomedical Engineering", uni: "Lovely Professional University · 2017 — 2021", badge: "CGPA 8.0 / 10" },
  { deg: "10+2, CBSE", uni: "SAI International School", badge: "82%" },
  { deg: "10th, ICSE", uni: "SDA School, Khordha", badge: "80%" },
];

const CERTS = [
  "Claude 101 · Anthropic",
  "Strategies for External Recruiters · LinkedIn",
  "HR Recruiting Communication Strategies · LinkedIn",
  "Business Analyst",
  "Leading Healthcare Quality & Safety",
  "Nanotechnology & Nanosensors",
  "Basic Microbiology · Software Dev Trainee",
];

export default function Education() {
  return (
    <Section id="education">
      <SectionHead eyebrow="Foundations" title={<>Education &amp; <em className="font-medium">certifications.</em></>} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr]">
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView}>
          {EDU.map((e) => (
            <motion.div key={e.deg} variants={fadeUp} className="mb-4 rounded-2xl border border-line bg-white p-7">
              <div className="font-serif text-[1.15rem] font-medium">{e.deg}</div>
              <div className="my-1.5 text-[0.9rem] text-ink-soft">{e.uni}</div>
              <span className="mt-2 inline-block rounded-full bg-green-soft px-3.5 py-1.5 text-[0.82rem] font-semibold text-green">{e.badge}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={inView} className="flex flex-col gap-3">
          {CERTS.map((c) => (
            <motion.div key={c} variants={fadeUp} whileHover={{ x: 5 }} className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 transition-colors">
              <span className="h-2 w-2 flex-none rounded-full bg-green" />
              <span className="text-[0.92rem] font-medium">{c}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
