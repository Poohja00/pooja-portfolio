import { useEffect, useState } from "react";

/* ============================================================
   LIVE PIPELINE — privacy-safe.
   Each source uses Google's gviz `tq` to SELECT only non-PII
   columns SERVER-SIDE (job title, date, status, city). Candidate
   names, contacts, emails and client/company names are NEVER
   selected, so they never reach the browser.
   Column maps verified against each tab's header row.
   ============================================================ */
const SOURCES = [
  // Sheet 1 — sourcing trackers
  { id: "1u6GIwB4jwzBNAbA5-MVRF9v2AvNJqthxFkOXb820voU", gid: "813925508", tq: "select A", date: 0, role: -1, status: -1, loc: -1 },
  { id: "1u6GIwB4jwzBNAbA5-MVRF9v2AvNJqthxFkOXb820voU", gid: "1003627238", tq: "select A,G,L,M", date: 0, role: 1, loc: 2, status: 3 },
  { id: "1u6GIwB4jwzBNAbA5-MVRF9v2AvNJqthxFkOXb820voU", gid: "1139927021", tq: "select A,C,F", date: 0, role: 1, loc: 2, status: -1 },
  { id: "1u6GIwB4jwzBNAbA5-MVRF9v2AvNJqthxFkOXb820voU", gid: "159575690", tq: "select A,C,J,L", date: 0, role: 1, loc: 2, status: 3 },
  // Sheet 2 — applicant trackers (3 tabs, identical schema)
  { id: "1VKjA4f7V_ElKNVF7kWyY6bOICuZtcsAc1anRWA3DlD0", gid: "0", tq: "select A,D,K", date: 0, role: 1, status: 2, loc: -1 },
  { id: "1VKjA4f7V_ElKNVF7kWyY6bOICuZtcsAc1anRWA3DlD0", gid: "299374127", tq: "select A,D,K", date: 0, role: 1, status: 2, loc: -1 },
  { id: "1VKjA4f7V_ElKNVF7kWyY6bOICuZtcsAc1anRWA3DlD0", gid: "450476501", tq: "select A,D,K", date: 0, role: 1, status: 2, loc: -1 },
  // Sheet 3 — screening tracker
  { id: "1gcEli7cYnJ3UynBfwGOW2_nxUjUlTzpO_ZlnToyd2U8", gid: "0", tq: "select A,E,N", date: -1, role: 0, loc: 1, status: 2 },
];

const IT_RE = /engineer|developer|\bdata\b|platform|sdet|\bqa\b|software|devops|backend|frontend|full.?stack|embedded|unreal|android|\bios\b|\bcloud\b|architect|programmer|tester|\bsre\b|machine learning|\bml\b|\bai\b|\bsde\b|python|golang|php|\.net|application support/i;
const isIT = (r) => IT_RE.test(r || "");
const KEEP_PAREN = /^(b2c|b2b|frontend|back ?end|front ?end|web frontend|web|mobile|full.?stack|senior|sr|junior|jr|lead|remote|contract|intern|uav|ai|ml|ios|android|cloud|data|devops|qa|sdet|golang|python|java|php|\.?net|embedded|unreal|product|growth|enterprise|wealth)$/i;
const cleanRole = (role) =>
  (role || "")
    .replace(/\s*\(([^)]*)\)/g, (m, inner) => (KEEP_PAREN.test(inner.trim()) ? ` (${inner.trim()})` : ""))
    .replace(/\s+/g, " ")
    .trim();
// obvious non-roles that leak in from messy free-text columns (sources, channels)
const JUNK = /^(reddit|naukri|linkedin|indeed|instagram|facebook|email|n\/a|na|tbd|test)$/i;

const CITIES = ["Bengaluru", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Delhi", "Pune", "Gurgaon", "Noida", "Kolkata", "Remote"];
const cityOf = (s) => {
  for (const c of CITIES) if ((s || "").toLowerCase().includes(c.toLowerCase())) return c === "Bangalore" ? "Bengaluru" : c;
  return "";
};

function parseCSV(t) {
  const rows = []; let f = "", row = [], q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else { if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; } else if (c !== "\r") f += c; }
  }
  if (f.length || row.length) { row.push(f); rows.push(row); }
  return rows;
}

const ymOf = (s) => { const m = (s || "").match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/); if (!m) return null; let y = m[3]; if (y.length === 2) y = "20" + y; return y + "-" + String(+m[1]).padStart(2, "0"); };
// first number treated as month (sheets use m/d/y form timestamps) → sortable epoch
const tsOf = (s) => { const m = (s || "").match(/(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/); if (!m) return 0; let y = m[3]; if (y.length === 2) y = "20" + y; return Date.UTC(+y, +m[1] - 1, +m[2] || 1); };

function curYM() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"); }

async function loadPipeline() {
  const ym = curYM();
  let total = 0, month = 0;
  const counts = {};
  const events = [];
  const parts = await Promise.all(
    SOURCES.map((s) =>
      fetch(`https://docs.google.com/spreadsheets/d/${s.id}/gviz/tq?tqx=out:csv&tq=${encodeURIComponent(s.tq)}&gid=${s.gid}`)
        .then((r) => { if (!r.ok) throw 0; return r.text(); })
        .then((t) => ({ s, rows: parseCSV(t).filter((r) => r.some((c) => c && c.trim())) }))
    )
  );
  parts.forEach(({ s, rows }) => {
    rows.slice(1).forEach((r) => {
      total++;
      if (s.date >= 0 && ymOf(r[s.date]) === ym) month++;
      if (s.role >= 0) {
        const role = cleanRole((r[s.role] || "").trim());
        if (!role || JUNK.test(role)) return;
        counts[role] = (counts[role] || 0) + 1;
        events.push({
          role,
          status: s.status >= 0 ? (r[s.status] || "").trim() : "",
          loc: s.loc >= 0 ? cityOf(r[s.loc]) : "",
          ts: s.date >= 0 ? tsOf(r[s.date]) : 0,
        });
      }
    });
  });
  if (!Object.keys(counts).length) throw 0;

  // most-recent-first, split IT vs non-IT (change #6)
  events.sort((a, b) => b.ts - a.ts);
  // show distinct recent roles (a batch of identical roles would otherwise repeat)
  const distinct = (arr, n = 7) => {
    const seen = new Set(), out = [];
    for (const e of arr) {
      const k = e.role.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k); out.push(e);
      if (out.length >= n) break;
    }
    return out;
  };
  const it = events.filter((e) => isIT(e.role));
  const non = events.filter((e) => !isIT(e.role));
  const itR = distinct(it), nonR = distinct(non);
  return {
    live: true,
    total,
    month,
    roles: Object.keys(counts).length,
    it: { count: it.length, recent: itR, more: Math.max(0, it.length - itR.length) },
    non: { count: non.length, recent: nonR, more: Math.max(0, non.length - nonR.length) },
  };
}

// privacy-safe fallback (titles/counts only) used if the live fetch fails
const mk = (role, status, loc) => ({ role, status, loc, ts: 0 });
const SNAPSHOT = {
  live: false,
  total: 702,
  month: 211,
  roles: 180,
  it: { count: 288, more: 281, recent: [mk("Tester", "Selected", "Bengaluru"), mk("Application Support Engineering", "Screening", "Hyderabad"), mk("Senior Software Engineer", "Interviewing", "Bengaluru"), mk("iOS Developer", "", "Hyderabad"), mk("Engineering Manager (B2C)", "", "Remote"), mk("Senior QA Engineer", "Shortlisted", "Pune"), mk("Software Dev (.NET)", "", "Bengaluru")] },
  non: { count: 379, more: 372, recent: [mk("Inside Sales", "Rejected", "Bengaluru"), mk("Field Sales Executive", "", "Mumbai"), mk("Influencer Marketing Intern", "", "Remote"), mk("Product Manager", "Interviewing", "Bengaluru"), mk("Property Manager", "", "Remote"), mk("MSP", "", ""), mk("Telecaller", "", "Delhi")] },
};

export function usePipeline(active) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!active || data) return;
    let alive = true;
    loadPipeline()
      .then((d) => alive && setData(d))
      .catch(() => alive && setData(SNAPSHOT));
    return () => { alive = false; };
  }, [active, data]);
  return data;
}
