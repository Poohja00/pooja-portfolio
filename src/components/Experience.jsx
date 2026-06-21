import { motion } from "framer-motion";
import { Section, SectionHead } from "./common";
import { fadeUp, stagger, inView } from "../lib/motion";

// Descriptions taken from Pooja's LinkedIn profile (verbatim); Hireginie is current.
const JOBS = [
  {
    when: "NOV 2025 — PRESENT · REMOTE", role: "Talent Acquisition", org: "Hireginie · Full-time",
    p: "Currently working here — sourcing, screening and onboarding great talent, and meeting clients' requirements.",
    chips: ["Sourcing", "Screening", "Onboarding", "Client Requirements"],
  },
  {
    when: "OCT — DEC 2025 · DELAWARE, US", role: "HR Team Manager", org: "Matriosh · Freelance",
    p: "A stealth-mode startup studio building and scaling next-generation ventures. I oversee core people operations and multi-functional coordination across hiring, investor relations, and startup operations. Currently managing two active projects, I work closely with the founding team to design end-to-end recruitment strategies, streamline operational processes, and facilitate communication between internal teams and external stakeholders. My role bridges talent management, strategic execution, and organizational development within a fast-paced, innovation-driven environment.",
    chips: ["People Ops", "Recruitment Strategy", "Stakeholders"],
  },
  {
    when: "OCT — DEC 2025", role: "HR Team Manager", org: "Soven Developer · Freelance",
    p: "Oversaw end-to-end recruitment for Indian interns, from sourcing and screening to interviews, onboarding, and performance tracking. Led and trained a team of HR interns to ensure smooth operations and effective coordination across departments. Focused on building efficient hiring processes, enhancing recruitment strategies, and fostering a positive, growth-oriented internship experience within Soven's dynamic, stealth-mode environment.",
    chips: ["Team Lead", "Recruitment", "Onboarding"],
  },
  {
    when: "SEP — OCT 2025 · MUMBAI", role: "HR Intern", org: "Soven Developer",
    p: "Learning and growing as an HR Intern at Soven Developer, contributing to recruitment, onboarding, and HR operations.",
    chips: ["Recruitment", "Onboarding"],
  },
  {
    when: "JUL — SEP 2025 · MUMBAI", role: "HR Intern", org: "Websites.co.in",
    bullets: [
      "Sole HR handling end-to-end recruitment and HR operations despite being an intern.",
      "Built a pipeline of 400+ candidates and facilitated the hiring of 20+ employees in just 2 months.",
      "Created Job Descriptions (JDs), assignments, and onboarding guidelines to standardize processes.",
      "Conducted resume screening, scheduling interviews, coordinating with managers, and final selections.",
      "Designed and implemented onboarding & training programs, ensuring smooth new-hire integration.",
      "Conducted market research (reki) to identify talent pools and improve outreach strategies.",
      "Established scalable HR workflows, operating at the level of a full-time HR professional.",
    ],
    chips: ["End-to-End Recruitment", "Onboarding", "HR Workflows"],
  },
  {
    when: "MAR 2021 — MAY 2024 · BENGALURU", role: "Programmer Analyst → Associate", org: "Cognizant",
    p: "Three years building and testing enterprise software in Java within Agile teams — the technical foundation behind my hiring instincts today.",
    bullets: [
      "Analysed client requirements and implemented solutions using Java, SQL and jBPM for backend validation, workflow automation and system efficiency.",
      "Designed and executed test cases by tracing business-process flows and creating process models in BonitaSoft (later migrated to Red Hat) and Business Central.",
      "Executed manual and automated testing — regression, functional and performance — using Selenium and JUnit.",
      "Drove defect analysis and resolution, achieving 85%+ code coverage; used Jenkins, Git, SonarQube and JIRA for CI/CD, version control, code quality and defect tracking.",
      "Engaged in Agile ceremonies — daily stand-ups and sprint planning — for team alignment and timely delivery.",
    ],
    chips: ["Java", "SQL", "Selenium", "JUnit", "SonarQube", "Jenkins", "JIRA", "Agile"],
  },
];

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHead
        eyebrow="Journey"
        title={<>A focused pivot <em className="font-medium">into people &amp; talent.</em></>}
      />
      <motion.div
        variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView}
        className="relative pl-[34px]"
      >
        <span className="absolute left-[7px] top-2.5 bottom-2.5 w-0.5 bg-line-2" />
        {JOBS.map((j) => (
          <motion.div key={j.role + j.when} variants={fadeUp} className="relative mb-[18px]">
            <span className="absolute left-[-34px] top-7 h-4 w-4 rounded-full border-2 border-green bg-white shadow-[0_0_0_4px_var(--color-paper)]" />
            <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-card">
              <div className="text-[12.5px] font-semibold tracking-[0.02em] text-green">{j.when}</div>
              <h3 className="mb-0.5 mt-2 font-serif text-[1.3rem] font-medium">{j.role}</h3>
              <div className="mb-3.5 text-[0.94rem] font-medium text-ink">{j.org}</div>
              {j.p && <p className="mb-4 text-[0.96rem] leading-[1.6] text-ink-soft">{j.p}</p>}
              {j.bullets && (
                <ul className="mb-5 flex flex-col gap-2">
                  {j.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[0.92rem] leading-[1.55] text-ink-soft">
                      <span className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full bg-green" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {j.chips.map((c) => (
                  <span key={c} className="rounded-full border border-line bg-paper px-[13px] py-[5px] text-[12.5px] font-medium text-ink-soft">{c}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
