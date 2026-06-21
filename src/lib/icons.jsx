// Thin, single-weight SVG line icons (no emoji, no fills).
const I = (props) => (
  <svg className={`icon ${props.className || ""}`} viewBox="0 0 24 24" aria-hidden="true">
    {props.children}
  </svg>
);

export const Search = (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></I>;
export const Code = (p) => <I {...p}><path d="M9 8l-4 4 4 4" /><path d="M15 8l4 4-4 4" /></I>;
export const People = (p) => <I {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3.2 3.2 0 0 1 0 6" /><path d="M18 19a5.5 5.5 0 0 0-2.5-4.6" /></I>;
export const Layers = (p) => <I {...p}><path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" /><path d="M4 12l8 4.5 8-4.5" /><path d="M4 16.5L12 21l8-4.5" /></I>;
export const Arrow = (p) => <I {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></I>;
export const Download = (p) => <I {...p}><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></I>;
export const Check = (p) => <I {...p}><path d="M20 6L9 17l-5-5" /></I>;
export const Trend = (p) => <I {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v5" /><path d="M16 7h5" /></I>;
export const Mail = (p) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></I>;
export const Linkedin = (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7" /><path d="M7 7v.01" /><path d="M11 17v-4a2 2 0 0 1 4 0v4" /><path d="M11 17v-7" /></I>;
export const Pin = (p) => <I {...p}><path d="M12 21c-4-3-8-6-8-11a4 4 0 0 1 8-1a4 4 0 0 1 8 1c0 5-4 8-8 11z" /></I>;
export const Globe = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></I>;
export const Grid = (p) => <I {...p}><rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" /><rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" /></I>;
export const Briefcase = (p) => <I {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12.5h18" /></I>;
export const Doc = (p) => <I {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 13h6" /><path d="M9 16h6" /></I>;
export const Mic = (p) => <I {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0" /><path d="M12 17v4" /></I>;
export const Link = (p) => <I {...p}><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></I>;
export const Heart = (p) => <I {...p}><path d="M12 21c-4-3-8-6-8-11a4 4 0 0 1 8-1a4 4 0 0 1 8 1c0 5-4 8-8 11z" /></I>;
export const Compass = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></I>;
export const Spark = (p) => <I {...p}><path d="M12 3v3" /><path d="M12 18v3" /><path d="M5 12H2" /><path d="M22 12h-3" /><circle cx="12" cy="12" r="4" /></I>;
export const Cap = (p) => <I {...p}><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M7 11.5V16c0 1.4 2.7 3 5 3s5-1.6 5-3v-4.5" /><path d="M21 9v5" /></I>;
