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

// Default viewport config: trigger once, as soon as the element starts entering.
// `amount: "some"` is height-independent — a percentage like 0.25 never fires on
// tall stacked sections on mobile (25% of a very tall column can't fit on screen).
export const inView = { once: true, amount: "some", margin: "0px 0px -10% 0px" };
