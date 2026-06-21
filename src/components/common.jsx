import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fadeUp, stagger, inView } from "../lib/motion";
import { Arrow } from "../lib/icons";

// Tighter vertical rhythm than the old 120px (change #4: too much space between sections).
export function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`relative py-16 md:py-20 ${className}`}>
      <div className="relative z-[2] mx-auto w-full max-w-[1160px] px-6 sm:px-7">{children}</div>
    </section>
  );
}

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false }) {
  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`mb-12 max-w-[680px] ${center ? "mx-auto text-center" : ""}`}
    >
      <motion.span
        variants={fadeUp}
        className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold text-green"
      >
        <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_var(--color-green-soft)]" />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="font-serif text-[clamp(2rem,4.2vw,3.1rem)] font-normal leading-[1.08] tracking-[-0.02em]"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className="mt-4 text-[1.08rem] leading-relaxed text-ink-soft">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full text-[15px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer";
const styles = {
  primary: "bg-ink text-white px-7 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-12px_rgba(22,24,29,0.45)]",
  ghost: "bg-white/80 text-ink border border-line-2 px-7 py-3.5 hover:bg-white hover:-translate-y-0.5 hover:shadow-soft",
};

export function Button({ as = "a", variant = "primary", className = "", children, ...rest }) {
  const Cmp = motion[as] || motion.a;
  return (
    <Cmp whileTap={{ scale: 0.97 }} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Cmp>
  );
}

// Count-up number that runs when scrolled into view.
export function CountUp({ to, suffix = "", className = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(mv, to, {
      duration: 1.1,
      ease: [0.22, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [seen, to, mv]);

  const text = to >= 1000 ? Math.round(val).toLocaleString() : Math.round(val);
  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}

export { Arrow };
