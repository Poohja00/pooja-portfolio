import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section, SectionHead, CountUp } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";
import { usePipeline } from "../hooks/usePipeline";
import { Grid, Globe, People } from "../lib/icons";

function Metric({ icon, value, suffix, label, chg, loading, breakdown }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -3 }} className="relative rounded-2xl border border-line p-[22px] transition-shadow hover:shadow-soft">
      <div className="mb-3.5 text-ink-soft">{icon}</div>
      <div className="font-serif text-[2rem] font-medium leading-none">
        {loading ? "—" : typeof value === "number" ? <CountUp to={value} suffix={suffix || ""} /> : value}
      </div>
      <div className="mt-2 text-[0.84rem] text-ink-soft">{label}</div>
      {breakdown && <div className="mt-2.5">{breakdown}</div>}
      {chg && <div className="absolute right-5 top-5 rounded-full bg-green-soft px-2.5 py-[3px] text-[11px] font-semibold text-green">{chg}</div>}
    </motion.div>
  );
}

export default function Dashboard() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, amount: 0.05 });
  const d = usePipeline(active);
  const loading = !d;

  const split = (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] font-medium text-ink-soft">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: "#3a7bb8" }} />
        {loading ? "—" : d.it.count} IT
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: "#c07a55" }} />
        {loading ? "—" : d.non.count} Non-IT
      </span>
    </div>
  );

  return (
    <Section id="dashboard">
      <SectionHead
        eyebrow="Live dashboard"
        title={<>My sourcing pipeline, <em className="font-medium">at a glance.</em></>}
        sub="Pulled live from my candidate trackers — only job titles and counts are ever read, server-side. Candidate names, contacts and client names never leave the spreadsheet."
      />
      <motion.div
        ref={ref}
        variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView}
        className="rounded-[24px] border border-line bg-white p-6 shadow-soft md:p-9"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric icon={<Grid />} value={d?.total} label="Leads in pipeline" chg="live" loading={loading} breakdown={split} />
          <Metric icon={<Globe />} value="50K+" label="LinkedIn reach" chg="↑ 12%" />
          <Metric icon={<People />} value="2,418" label="Connections" chg="growing" />
        </div>
      </motion.div>
    </Section>
  );
}
