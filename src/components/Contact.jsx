import { useState } from "react";
import { motion } from "framer-motion";
import { Section, Button, Arrow } from "./common";
import { inView } from "../lib/motion";
import { Mail, Linkedin, Pin } from "../lib/icons";

export default function Contact() {
  const [f, setF] = useState({ n: "", e: "", m: "" });
  const submit = (ev) => {
    ev.preventDefault();
    window.location.href = `mailto:mahapatrapooja4@gmail.com?subject=${encodeURIComponent(
      "Portfolio enquiry from " + f.n
    )}&body=${encodeURIComponent(f.m + "\n\n— " + f.n + " (" + f.e + ")")}`;
  };

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[28px] border border-white/70 p-8 shadow-card md:p-14"
        style={{ background: "linear-gradient(160deg, var(--color-sky-1) 0%, var(--color-sky-2) 34%, var(--color-sky-3) 64%, #ffffff 100%)" }}
      >
        {/* soft floating glow */}
        <motion.div
          aria-hidden animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }} transition={{ duration: 8, repeat: Infinity }}
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/40 blur-3xl"
        />
        <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-4 py-[7px] text-[13px] font-semibold text-ink-soft shadow-soft">
              <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_var(--color-green-soft)]" /> Available for new conversations
            </span>
            <h2 className="font-serif text-[clamp(2.1rem,5vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.02em]">
              Let's build your <em className="name-gradient font-medium italic">dream team</em> — or your <em className="name-gradient font-medium italic">next move.</em>
            </h2>
            <p className="mt-5 max-w-[460px] text-[1.08rem] leading-relaxed text-ink-soft">
              Hiring high-bar talent, planning a career switch, or just want to talk shop? I read every message
              personally — let's make something happen.
            </p>
            <div className="mt-8 flex flex-col gap-2.5">
              {[
                { icon: <Mail />, label: "mahapatrapooja4@gmail.com", href: "mailto:mahapatrapooja4@gmail.com" },
                { icon: <Linkedin />, label: "linkedin.com/in/poojamahapatra", href: "https://linkedin.com/in/poojamahapatra" },
                { icon: <Pin />, label: "Mumbai, India", href: null },
              ].map((c) =>
                c.href ? (
                  <motion.a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener" whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-3.5 rounded-xl border border-white/80 bg-white/60 px-[18px] py-3.5 text-[0.92rem] font-medium backdrop-blur-sm transition-shadow hover:shadow-soft">
                    <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[9px] bg-white text-ink">{c.icon}</span>
                    {c.label}
                  </motion.a>
                ) : (
                  <span key={c.label} className="inline-flex items-center gap-3.5 rounded-xl border border-white/80 bg-white/60 px-[18px] py-3.5 text-[0.92rem] font-medium backdrop-blur-sm">
                    <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[9px] bg-white text-ink">{c.icon}</span>
                    {c.label}
                  </span>
                )
              )}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur-md md:p-7">
            {[
              { k: "n", l: "Your name", t: "text", ph: "Jane Doe" },
              { k: "e", l: "Your email", t: "email", ph: "jane@company.com" },
            ].map((fld) => (
              <div key={fld.k} className="mb-4">
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-soft">{fld.l}</label>
                <input
                  type={fld.t} required placeholder={fld.ph} value={f[fld.k]}
                  onChange={(e) => setF({ ...f, [fld.k]: e.target.value })}
                  className="w-full rounded-xl border border-line-2 bg-paper px-4 py-3.5 text-[0.95rem] outline-none transition focus:border-green focus:bg-white focus:shadow-[0_0_0_3px_var(--color-green-soft)]"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.05em] text-ink-soft">Message</label>
              <textarea
                rows={4} required placeholder="Hi Pooja, I'd love to talk about…" value={f.m}
                onChange={(e) => setF({ ...f, m: e.target.value })}
                className="w-full resize-y rounded-xl border border-line-2 bg-paper px-4 py-3.5 text-[0.95rem] outline-none transition focus:border-green focus:bg-white focus:shadow-[0_0_0_3px_var(--color-green-soft)]"
              />
            </div>
            <Button as="button" type="submit" className="w-full">Send message <Arrow className="!h-[17px] !w-[17px]" /></Button>
            <p className="mt-3 text-center text-[12px] text-ink-faint">Opens your email app, addressed to mahapatrapooja4@gmail.com</p>
          </form>
        </div>
      </motion.div>
    </Section>
  );
}
