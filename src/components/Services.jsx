import { motion } from "framer-motion";
import { Section, SectionHead, Button, Arrow } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";
import { Compass, Doc, Mic, Link, Trend, Heart } from "../lib/icons";

const SVCS = [
  { icon: <Compass />, h: "Career Guidance & Coaching", p: "1:1 sessions to find direction, plan a switch, or restart after a break.", tag: "Most popular" },
  { icon: <Doc />, h: "Résumé & CV Review", p: "Recruiter's-eye feedback that gets you past the screen — clear, ATS-friendly.", tag: "Async or live" },
  { icon: <Mic />, h: "Interview Preparation", p: "Mock interviews and prep for HR & technical screens, with practical feedback.", tag: "Mock + feedback" },
  { icon: <Link />, h: "LinkedIn Optimization", p: "Turn your profile into a magnet — headline, About and positioning that gets found.", tag: "Profile revamp" },
  { icon: <Trend />, h: "Tech Recruiting Advisory", p: "For startups & founders: sourcing strategy, JD design and screening processes.", tag: "For teams" },
  { icon: <Heart />, h: "Early-Career Mentoring", p: "Breaking into HR or tech? Guidance on first roles, internships and momentum.", tag: "Students welcome" },
];

export default function Services() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="Work with me"
        title={<>Services &amp; <em className="font-medium">career guidance.</em></>}
        sub="Beyond recruiting, I coach people through their own career journeys — especially early-career folks and tech-to-HR changers like me."
      />
      <motion.div
        variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView}
        className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
      >
        {SVCS.map((s) => (
          <motion.div key={s.h} variants={fadeUp} whileHover={{ y: -5 }} className="rounded-2xl border border-line bg-white p-[30px] transition-shadow hover:shadow-card">
            <div className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-xl bg-paper-2 text-ink">{s.icon}</div>
            <h3 className="mb-2.5 font-serif text-[1.15rem] font-medium">{s.h}</h3>
            <p className="mb-4 text-[0.92rem] leading-[1.55] text-ink-soft">{s.p}</p>
            <span className="rounded-full bg-green-soft px-3 py-1 text-[11.5px] font-semibold text-green">{s.tag}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-10 text-center">
        <Button href="#contact">Book a session <Arrow className="!h-[17px] !w-[17px]" /></Button>
      </div>
    </Section>
  );
}
