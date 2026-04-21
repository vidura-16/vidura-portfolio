import { useState, useEffect, useRef } from "react";

const NAV = ["Home", "Work", "Experience", "Skills", "Contact"];

const PROJECTS = [
  {
    id: "01",
    type: "Banking · Enterprise",
    name: "Project Raise",
    desc: "Cloud-based customizable banking application enabling customers to manage their banking experience. Contributed to ATM system development for banks in India, Indonesia, and the Philippines based on NDC specifications.",
    stack: ["C#", ".NET Core", "Angular", "Node.js", "Azure"],
    year: "2024",
  },
  {
    id: "02",
    type: "Fraud Detection",
    name: "Hitachi iShield",
    desc: "Fraud detection and customer profiling system for Bank CTBC Philippines. Real-time transaction monitoring with ML-based risk scoring, behavioral analysis dashboards, and secure credential management.",
    stack: ["Spring Boot", "Java 17", "React", "Oracle DB", "JPA/Hibernate"],
    year: "2024",
  },
  {
    id: "03",
    type: "Personal Project",
    name: "Daily Expense Tracker",
    desc: "Cross-platform mobile expense tracking application with daily budget monitoring, analytics, and real-time sync via Firebase.",
    stack: ["React Native", "Firebase", "JavaScript"],
    year: "2023",
  },
  {
    id: "04",
    type: "ML · Healthcare",
    name: "Health for Future",
    desc: "Machine learning-based web application for predicting diseases in children. Provides early diagnosis insights through an interactive interface.",
    stack: ["Python", "Streamlit", "ML", "HTML", "CSS"],
    year: "2022",
  },
];

const EXPERIENCE = [
  {
    period: "2023 — Present",
    role: "Associate Software Engineer",
    company: "Hitachi Digital Payment Solutions",
    desc: "Working on enterprise banking solutions including ATM systems and fraud management platforms for international clients across India, Indonesia, and the Philippines. Built and integrated backend and frontend services, designed CI/CD pipelines, and deployed containerized workloads on Kubernetes.",
    tags: ["C#", ".NET Core", "Angular", "Spring Boot", "Azure DevOps", "Docker", "Kubernetes"],
  },
  {
    period: "Trainee",
    role: "Trainee Software Engineer",
    company: "HCL Technologies",
    desc: "Worked on trainee projects involving Java and SAP ABAP development. Gained exposure to enterprise software development practices and system integration concepts.",
    tags: ["Java", "SAP ABAP", "Enterprise Integration"],
  },
];

const SKILLS = [
  { label: "C# / .NET Core", pct: 92, cat: "backend" },
  { label: "Spring Boot (Java)", pct: 85, cat: "backend" },
  { label: "REST APIs", pct: 93, cat: "backend" },
  { label: "Oracle / MySQL / MS SQL", pct: 82, cat: "backend" },
  { label: "Angular", pct: 90, cat: "frontend" },
  { label: "React / React Native", pct: 83, cat: "frontend" },
  { label: "TypeScript", pct: 88, cat: "frontend" },
  { label: "JavaScript", pct: 87, cat: "frontend" },
  { label: "Azure DevOps", pct: 85, cat: "cloud" },
  { label: "Docker / Kubernetes", pct: 82, cat: "cloud" },
  { label: "Helm / CI/CD", pct: 78, cat: "cloud" },
  { label: "Git / Agile", pct: 95, cat: "cloud" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedNumber({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function SkillBar({ label, pct, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--muted)" }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "var(--line)", borderRadius: 0, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${pct}%` : "0%",
          background: "var(--accent)",
          transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const nav = (section) => { setActive(section); window.scrollTo({ top: 0 }); };

  const fadeIn = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  const skillCats = ["backend", "frontend", "cloud"];
  const catLabel = { backend: "// Backend", frontend: "// Frontend", cloud: "// Cloud & DevOps" };

  return (
    <div style={{
      "--bg": "#0a0a0a",
      "--surface": "#111",
      "--surface2": "#181818",
      "--line": "rgba(255,255,255,0.07)",
      "--text": "#f0ede8",
      "--muted": "#666",
      "--accent": "#e8c547",
      "--accent2": "#e07d3c",
      "--mono": "'JetBrains Mono', monospace",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'Outfit', 'Helvetica Neue', sans-serif",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::selection { background: #e8c54730; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        input, textarea { font-family: inherit; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 3rem", height: 64,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
      }}>
        <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>
          V.<span style={{ color: "var(--accent)" }}>Vishwa</span>
        </div>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => nav(n)} style={{
              fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em",
              padding: "6px 14px", borderRadius: 4,
              color: active === n ? "var(--bg)" : "var(--muted)",
              background: active === n ? "var(--accent)" : "transparent",
              transition: "all 0.2s",
            }}>{n}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#4ade80" }}>Available</span>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 3rem" }}>

        {/* HOME */}
        {active === "Home" && (
          <section style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
            <div style={{ ...fadeIn(0), marginBottom: "1rem" }}>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
                color: "var(--accent)", textTransform: "uppercase",
              }}>Software Engineer · Cloud & DevOps · Full-Stack</span>
            </div>

            <h1 style={{
              ...fadeIn(100),
              fontSize: "clamp(64px, 10vw, 96px)",
              fontWeight: 900, lineHeight: 0.92, letterSpacing: "-4px",
              marginBottom: "2rem",
            }}>
              Vidura<br />
              <span style={{
                WebkitTextStroke: "1px var(--accent)",
                color: "transparent",
              }}>Vishwa</span>
            </h1>

            <p style={{
              ...fadeIn(200),
              fontSize: 16, color: "var(--muted)", lineHeight: 1.75,
              maxWidth: 540, marginBottom: "2.5rem", fontWeight: 300,
            }}>
              Results-driven engineer with hands-on experience in cloud-native development, DevOps, and full-stack solutions within the digital payment and banking domain. Skilled in building scalable applications, automating CI/CD pipelines, and deploying containerized workloads on Kubernetes.
            </p>

            <div style={{ ...fadeIn(300), display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "3rem" }}>
              {["C# / .NET Core", "Angular", "Spring Boot", "React", "Azure DevOps", "Docker", "Kubernetes", "TypeScript"].map(t => (
                <span key={t} style={{
                  fontFamily: "var(--mono)", fontSize: 11, padding: "5px 12px",
                  border: "1px solid var(--line)", borderRadius: 3, color: "var(--muted)",
                  background: "var(--surface)",
                }}>{t}</span>
              ))}
            </div>

            <div style={{ ...fadeIn(400), display: "flex", gap: 12, marginBottom: "5rem" }}>
              <button onClick={() => nav("Work")} style={{
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em",
                padding: "13px 28px", background: "var(--accent)", color: "var(--bg)",
                fontWeight: 600, borderRadius: 3, transition: "all 0.2s",
                textTransform: "uppercase",
              }}>View Work</button>
              <button onClick={() => nav("Contact")} style={{
                fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em",
                padding: "13px 28px", background: "transparent", color: "var(--text)",
                border: "1px solid var(--line)", borderRadius: 3, transition: "all 0.2s",
                textTransform: "uppercase",
              }}>Get in Touch</button>
            </div>

            {/* Stats */}
            <div style={{
              ...fadeIn(500),
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "1px solid var(--line)", paddingTop: "3rem", gap: "2rem",
            }}>
              {[
                { n: 2, suffix: "+", label: "Years Experience" },
                { n: 5, suffix: "+", label: "Projects Shipped" },
                { n: 3, suffix: "+", label: "Countries Served" },
                { n: 38, suffix: "", label: "GPA: 3.8 / 4.0" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px", color: "var(--text)", lineHeight: 1 }}>
                    <AnimatedNumber target={s.n} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* WORK */}
        {active === "Work" && (
          <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px" }}>Selected Work</h2>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>04 projects</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {PROJECTS.map((p, i) => (
                <div key={p.id}
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display: "grid", gridTemplateColumns: "64px 1fr auto",
                    gap: "2rem", alignItems: "start",
                    padding: "2.5rem 1.5rem",
                    borderBottom: "1px solid var(--line)",
                    background: hoveredProject === p.id ? "var(--surface)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", paddingTop: 4 }}>{p.id}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</span>
                    </div>
                    <h3 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>{p.name}</h3>
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520, marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.stack.map(t => (
                        <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "3px 8px", background: "var(--surface2)", color: "var(--muted)", borderRadius: 2 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", paddingTop: 4 }}>{p.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {active === "Experience" && (
          <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px" }}>Experience</h2>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>Banking domain</span>
            </div>

            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "3rem", padding: "2.5rem 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", paddingTop: 4, letterSpacing: "0.04em" }}>{e.period}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 4 }}>{e.role}</h3>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>{e.company}</p>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>{e.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {e.tags.map(t => (
                      <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "4px 10px", border: "1px solid var(--line)", color: "var(--muted)", borderRadius: 2 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Education */}
            <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--line)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>// Education</p>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "3rem" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", paddingTop: 4 }}>2020 — 2023</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 4 }}>BSc (Hons) Computer Science & Software Engineering</h3>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", marginBottom: 8 }}>University of Bedfordshire, UK</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--muted)", borderRadius: 2 }}>First Class Honours</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: 2 }}>GPA 3.8 / 4.0</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {active === "Skills" && (
          <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px" }}>Skills</h2>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>Full-stack toolkit</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem" }}>
              {skillCats.map(cat => (
                <div key={cat}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>{catLabel[cat]}</p>
                  {SKILLS.filter(s => s.cat === cat).map((s, i) => (
                    <SkillBar key={s.label} label={s.label} pct={s.pct} delay={i * 80} />
                  ))}
                </div>
              ))}
            </div>

            {/* Tech logos row */}
            <div style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid var(--line)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Also worked with</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["JPA/Hibernate", "Node.js", "SAP ABAP", "Helm", "Zoho", "Firebase", "Git", "Agile", "NDC Specs", "ML APIs", "Streamlit", "JavaFX"].map(t => (
                  <span key={t} style={{ fontFamily: "var(--mono)", fontSize: 11, padding: "6px 14px", border: "1px solid var(--line)", color: "var(--muted)", borderRadius: 3, background: "var(--surface)" }}>{t}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        {active === "Contact" && (
          <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
            <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-2px", marginBottom: 8 }}>Get in Touch</h2>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>Open to freelance, contract, and full-time opportunities</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
              <div>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, marginBottom: "2rem", fontWeight: 300 }}>
                  Looking for a software engineer with cloud-native, full-stack, and DevOps expertise in the banking domain? Let's talk.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: "GH", label: "GitHub", sub: "github.com/vidura-16" },
                    { icon: "IN", label: "LinkedIn", sub: "linkedin.com/in/vidura-vishwa-b12602208" },
                    { icon: "@", label: "Email", sub: "viduravishwa16@gmail.com" },
                    { icon: "☎", label: "Phone", sub: "+94 713011088" },
                  ].map(l => (
                    <div key={l.label} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "1rem 1.25rem",
                      border: "1px solid var(--line)",
                      background: "var(--surface)",
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}>
                      <div style={{ width: 38, height: 38, background: "var(--accent)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 12, color: "var(--bg)", fontWeight: 700, flexShrink: 0 }}>{l.icon}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{l.label}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>{l.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["Name", "text", "Your name"], ["Email", "email", "your@email.com"]].map(([label, type, ph]) => (
                  <div key={label}>
                    <label style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>{label}</label>
                    <input type={type} placeholder={ph} style={{
                      width: "100%", padding: "11px 14px",
                      background: "var(--surface)", border: "1px solid var(--line)",
                      color: "var(--text)", fontSize: 14, borderRadius: 3, outline: "none",
                    }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea placeholder="Tell me about your project..." style={{
                    width: "100%", padding: "11px 14px", minHeight: 110,
                    background: "var(--surface)", border: "1px solid var(--line)",
                    color: "var(--text)", fontSize: 14, borderRadius: 3, outline: "none", resize: "vertical",
                  }} />
                </div>
                <button style={{
                  fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.1em",
                  padding: "13px 24px", background: "var(--accent)", color: "var(--bg)",
                  fontWeight: 700, borderRadius: 3, textTransform: "uppercase", alignSelf: "flex-start",
                }}>Send Message</button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--line)", padding: "2rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 960, margin: "0 auto" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>© 2026 Vidura Vishwa</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>Built with React + ❤️</span>
      </footer>
    </div>
  );
}
