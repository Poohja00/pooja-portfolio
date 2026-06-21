// Shared Framer Motion variants. Tuned snappy (change #1: scroll felt slow).
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.8, 0.2, 1] },
  },
};

export const stagger = (gap = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

// Default viewport config: trigger once, a touch before fully in view.
export const inView = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" };
