import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section, SectionHead, CountUp } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";
import { usePipeline } from "../hooks/usePipeline";
import { Grid, Globe, People } from "../lib/icons";

function LiveDot({ className = "" }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      className={`inline-block h-1.5 w-1.5 rounded-full bg-green ${className}`}
    />
  );
}

function Metric({ icon, value, suffix, label, chg, loading }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -3 }} className="relative rounded-2xl border border-line p-[22px] transition-shadow hover:shadow-soft">
      <div className="mb-3.5 text-ink-soft">{icon}</div>
      <div className="font-serif text-[2rem] font-medium leading-none">
        {loading ? "—" : typeof value === "number" ? <CountUp to={value} suffix={suffix || ""} /> : value}
      </div>
      <div className="mt-2 text-[0.84rem] text-ink-soft">{label}</div>
      {chg && <div className="absolute right-5 top-5 rounded-full bg-green-soft px-2.5 py-[3px] text-[11px] font-semibold text-green">{chg}</div>}
    </motion.div>
  );
}

function RoleColumn({ title, accent, count, recent, more, loading }) {
  return (
    <div className="rounded-2xl border border-line p-[26px]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h4 className="flex items-center gap-2 font-serif text-[1.1rem] font-medium">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: accent }} /> {title}
          </h4>
          <small className="text-[12px] text-ink-faint">by designation · most recent first</small>
        </div>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-green">
          <LiveDot /> {loading ? "—" : count} live
        </span>
      </div>

      {loading ? (
        <div className="py-10 text-center text-[0.9rem] text-ink-faint">Connecting to live data…</div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {recent.map((e, i) => {
            const sub = e.loc; // designation + location only — pipeline status hidden
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3"
              >
                <span className="h-2 w-2 flex-none rounded-full" style={{ background: accent }} />
                <div className="min-w-0 flex-1">
                  <b className="block truncate text-[0.92rem] font-semibold">{e.role}</b>
                  {sub && <span className="text-[11.5px] text-ink-faint">{sub}</span>}
                </div>
              </motion.div>
            );
          })}
          {more > 0 && (
            <div className="pt-1 text-center text-[0.85rem] font-medium text-ink-faint">
              and {more.toLocaleString()} other profiles
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, amount: 0.05 });
  const d = usePipeline(active);
  const loading = !d;

  return (
    <Section id="dashboard">
      <SectionHead
        eyebrow="Live dashboard"
        title={<>My sourcing pipeline, <em className="font-medium">at a glance.</em></>}
        sub="Pulled live from my candidate trackers — only job titles, counts, status and city are ever read. Candidate names, contacts and client names never leave the spreadsheet."
      />
      <motion.div
        ref={ref}
        variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView}
        className="rounded-[24px] border border-line bg-white p-6 shadow-soft md:p-9"
      >
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric icon={<Grid />} value={d?.total} label="Leads in pipeline" chg="live" loading={loading} />
          <Metric icon={<Globe />} value="50K+" label="LinkedIn reach" chg="↑ 12%" />
          <Metric icon={<People />} value="2,418" label="Connections" chg="growing" />
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <RoleColumn title="IT roles" accent="#3a7bb8" count={d?.it.count} recent={d?.it.recent || []} more={d?.it.more} loading={loading} />
          <RoleColumn title="Non-IT roles" accent="#c07a55" count={d?.non.count} recent={d?.non.recent || []} more={d?.non.more} loading={loading} />
        </div>
      </motion.div>
    </Section>
  );
}
