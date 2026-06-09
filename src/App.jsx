import { useState, useEffect, useRef } from "react";

/* ── Scroll-reveal hook ─────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── SVG Decorations ────────────────────────────────────────────────────── */
const Squiggle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 30 C20 5, 40 55, 60 30 C80 5, 100 55, 115 30" stroke="#E8325A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const CurlyLine = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 60 C30 20, 60 100, 100 60 C140 20, 170 100, 190 60" stroke="#E8325A" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const LoopLine = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 10 C80 40, 20 40, 20 70 C20 100, 80 100, 60 130" stroke="#E8325A" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const QuoteOpen = () => (
  <svg width="38" height="30" viewBox="0 0 38 30" fill="#222">
    <path d="M0 18.5C0 10.5 5 4 15 0L17.5 3.5C12 6 9 9.5 8.5 14C9.2 13.8 10 13.7 11 13.7C14.8 13.7 17.5 16.5 17.5 20.5C17.5 24.5 14.5 27.5 10.5 27.5C4.5 27.5 0 23.5 0 18.5ZM20.5 18.5C20.5 10.5 25.5 4 35.5 0L38 3.5C32.5 6 29.5 9.5 29 14C29.7 13.8 30.5 13.7 31.5 13.7C35.3 13.7 38 16.5 38 20.5C38 24.5 35 27.5 31 27.5C25 27.5 20.5 23.5 20.5 18.5Z"/>
  </svg>
);

const QuoteClose = () => (
  <svg width="30" height="24" viewBox="0 0 38 30" fill="#ccc">
    <path d="M38 11.5C38 19.5 33 26 23 30L20.5 26.5C26 24 29 20.5 29.5 16C28.8 16.2 28 16.3 27 16.3C23.2 16.3 20.5 13.5 20.5 9.5C20.5 5.5 23.5 2.5 27.5 2.5C33.5 2.5 38 6.5 38 11.5ZM17.5 11.5C17.5 19.5 12.5 26 2.5 30L0 26.5C5.5 24 8.5 20.5 9 16C8.3 16.2 7.5 16.3 6.5 16.3C2.7 16.3 0 13.5 0 9.5C0 5.5 3 2.5 7 2.5C13 2.5 17.5 6.5 17.5 11.5Z"/>
  </svg>
);

/* ── Avatar placeholder (circular image using unsplash) ─────────────────── */
const seeds = [
  "person1","person2","person3","person4","person5","person6",
  "person7","person8","person9","person10",
];
const avatarColors = [
  ["#f4c4a1","#c0835a"],["#b2d8c8","#4a9078"],["#d4c1e8","#7c5ab8"],
  ["#fdd9b5","#c97b2f"],["#c5dff5","#3a7bbf"],["#f9c4c4","#c04040"],
  ["#d1e8c1","#5a8a3a"],["#e8d4c1","#8a6040"],["#c1d4e8","#3a5a8a"],["#e8c1d4","#8a3a5a"],
];
const Avatar = ({ idx = 0, size = 80, border = 3 }) => {
  const [bg, fg] = avatarColors[idx % avatarColors.length];
  const initials = ["JD","MK","AR","TS","PL","NC","RB","EW","GM","FK"][idx % 10];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${bg}, ${fg})`,
      border: `${border}px solid #fff`,
      boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, overflow: "hidden", position: "relative",
    }}>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: size * 0.28, letterSpacing: 1 }}>{initials}</span>
    </div>
  );
};

/* ── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#fff",
      boxShadow: scrolled ? "0 2px 18px rgba(0,0,0,0.07)" : "none",
      transition: "box-shadow 0.3s",
      borderBottom: "1px solid #f0f0f0",
    }}>
      <div style={{
        maxWidth: 1140, margin: "0 auto", padding: "0 28px",
        display: "flex", alignItems: "center", height: 62,
      }}>
        {/* Logo */}
        <a href="#" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.25rem", color: "#111", textDecoration: "none", flexShrink: 0 }}>
          Elementum
        </a>

        {/* Center nav */}
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: "0 auto", padding: 0 }} className="nav-links">
          {["Home","Studio","Services","Contact","FAQs"].map(l => (
            <li key={l}>
              <a href="#" style={{ fontSize: "0.85rem", color: "#333", textDecoration: "none", fontWeight: 500, letterSpacing: 0.3, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color="#E8325A"}
                onMouseLeave={e => e.target.style.color="#333"}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5, marginLeft: 16 }}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: "#111", borderRadius: 2, transition: "all 0.25s",
              transform: mobileOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scale(0)") : "none",
              opacity: mobileOpen && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        maxHeight: mobileOpen ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.35s ease",
        background: "#fff", borderTop: mobileOpen ? "1px solid #f0f0f0" : "none",
      }}>
        {["Home","Studio","Services","Contact","FAQs"].map(l => (
          <a key={l} href="#" onClick={() => setMobileOpen(false)}
            style={{ display: "block", padding: "14px 28px", fontSize: "0.95rem", color: "#333", textDecoration: "none", borderBottom: "1px solid #f8f8f8" }}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [ref, visible] = useInView(0.05);
  return (
    <section ref={ref} style={{ paddingTop: 120, paddingBottom: 60, background: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Left squiggle decoration */}
      <div style={{ position: "absolute", left: 0, top: "15%", opacity: 0.85 }}>
        <LoopLine style={{ width: 60, height: 120 }} />
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
        {/* Hero heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
          fontWeight: 700, lineHeight: 1.18,
          color: "#111", marginBottom: 20,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          The{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            thinkers
            <svg viewBox="0 0 110 12" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 10 }}>
              <path d="M2 8 C20 2, 50 12, 108 6" stroke="#f5c842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          {" "}and{" "}
          <br />
          doers were{" "}
          <span style={{
            background: "rgba(255,182,193,0.55)",
            borderRadius: 6,
            padding: "0 6px",
            display: "inline",
          }}>changing</span>
          <br />
          the{" "}
          <span style={{
            background: "rgba(180,230,160,0.55)",
            borderRadius: 6,
            padding: "0 6px",
            display: "inline",
          }}>status</span>
          {" "}Quo with
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: 420, margin: "0 auto 52px",
          fontSize: "0.88rem", color: "#666", lineHeight: 1.7,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          We are a team of strategists, designers communicators, researchers, Togaether,
          we belive that progress only highappens when you refuse to play things safe.
        </p>

        {/* Scattered avatars */}
        <div style={{
          position: "relative", height: 200, maxWidth: 700, margin: "0 auto",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.25s",
        }}>
          {[
            { idx:0, size:90,  left:"2%",   top:"40%"  },
            { idx:1, size:100, left:"16%",  top:"5%"   },
            { idx:2, size:85,  left:"30%",  top:"50%"  },
            { idx:3, size:95,  left:"44%",  top:"0%"   },
            { idx:4, size:90,  left:"58%",  top:"45%"  },
            { idx:5, size:80,  left:"72%",  top:"8%"   },
            { idx:6, size:88,  left:"86%",  top:"40%"  },
          ].map(({ idx, size, left, top }) => (
            <div key={idx} style={{ position: "absolute", left, top,
              transition: `transform 0.4s ease ${idx * 0.05}s`,
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Avatar idx={idx} size={size} border={4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 2 — Tomorrow ───────────────────────────────────────────────── */
function TomorrowSection() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 28px", background: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Pink blob bg */}
      <div style={{
        position: "absolute", right: "30%", top: "20%",
        width: 260, height: 260,
        background: "radial-gradient(circle, rgba(255,182,193,0.35) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
        {/* Left text */}
        <div style={{ flex: "1 1 340px", minWidth: 280,
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
            fontWeight: 700, lineHeight: 1.25,
            color: "#111", marginBottom: 20,
          }}>
            <span style={{ position: "relative", display: "inline-block" }}>
              Tomorrow
              <svg viewBox="0 0 140 12" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 10 }}>
                <path d="M2 8 C30 2, 80 12, 138 6" stroke="#f5c842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            {" "}should<br />be better than today
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.75, maxWidth: 320, marginBottom: 24 }}>
            We are a team of strategists, designers communicators, researchers.
            Togaether, we belive that progress only happens when you refuse
            to play things safe.
          </p>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.83rem", color: "#111", textDecoration: "none", fontWeight: 500,
            borderBottom: "1px solid #111", paddingBottom: 2, transition: "gap 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.gap="14px"}
            onMouseLeave={e => e.currentTarget.style.gap="8px"}
          >
            Read more <ArrowRight />
          </a>
        </div>

        {/* Right image with triangle */}
        <div style={{ flex: "1 1 340px", minWidth: 280, display: "flex", justifyContent: "center", position: "relative",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          {/* Red triangle top-right */}
          <div style={{
            position: "absolute", right: 10, top: -20, zIndex: 1,
            width: 0, height: 0,
            borderLeft: "55px solid transparent",
            borderRight: "55px solid transparent",
            borderBottom: "90px solid #E8325A",
          }}/>
          <div style={{
            width: 280, height: 280, borderRadius: "50%",
            overflow: "hidden", position: "relative", zIndex: 2,
            boxShadow: "0 16px 50px rgba(0,0,0,0.15)",
          }}>
            <Avatar idx={7} size={280} border={0} />
            {/* Overlay a team-meeting feel */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.05)" }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3 — Help you progress ─────────────────────────────────────── */
function ProgressSection() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "60px 28px 80px", background: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Curly line decoration */}
      <CurlyLine style={{ position: "absolute", left: "35%", top: 0, width: 180, opacity: 0.7 }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
        {/* Left image with triangles */}
        <div style={{ flex: "1 1 320px", minWidth: 260, display: "flex", justifyContent: "center", position: "relative",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {/* Red triangles bottom-right of circle */}
          <div style={{ position: "absolute", left: "calc(50% + 40px)", bottom: 20, zIndex: 1 }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: "45px solid transparent",
              borderRight: "45px solid transparent",
              borderBottom: "75px solid #E8325A",
              marginBottom: -20,
            }}/>
            <div style={{
              width: 0, height: 0,
              borderLeft: "35px solid transparent",
              borderRight: "35px solid transparent",
              borderBottom: "60px solid #f07090",
              marginLeft: 10,
            }}/>
          </div>
          <div style={{
            width: 260, height: 260, borderRadius: "50%",
            overflow: "hidden", position: "relative", zIndex: 2,
            boxShadow: "0 16px 50px rgba(0,0,0,0.13)",
          }}>
            <Avatar idx={8} size={260} border={0} />
          </div>
        </div>

        {/* Right text */}
        <div style={{ flex: "1 1 360px", minWidth: 280,
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            fontWeight: 700, lineHeight: 1.3,
            color: "#111", marginBottom: 18,
          }}>
            See how we can<br />help you progress
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.75, maxWidth: 340, marginBottom: 24 }}>
            We add a layer of fearless insights and action that allows change
            makers to accelerate their progress in areas such as brand, design
            digital, comms and social research.
          </p>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.83rem", color: "#111", textDecoration: "none", fontWeight: 500,
            borderBottom: "1px solid #111", paddingBottom: 2, transition: "gap 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.gap="14px"}
            onMouseLeave={e => e.currentTarget.style.gap="8px"}
          >
            Read more <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Section 4 — What we can offer ─────────────────────────────────────── */
const SERVICES = [
  { tag: "Office of multiple interest content",          title: "Colaborative & partnership" },
  { tag: "The hanger US Air force digital experimental", title: "We talk about our weight" },
  { tag: "Delta faucet content, social, digital",        title: "Piloting digital confidence" },
];

function OffersSection() {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(null);
  return (
    <section ref={ref} style={{ padding: "80px 28px", background: "#fff", position: "relative" }}>
      {/* Squiggle line top-right */}
      <Squiggle style={{ position: "absolute", right: 60, top: 20, width: 110, opacity: 0.8 }} />

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 700, lineHeight: 1.15,
          color: "#111", marginBottom: 52,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          What we{" "}
          <span style={{ position: "relative", display: "inline" }}>
            <span style={{
              background: "rgba(180,230,160,0.55)",
              borderRadius: 6, padding: "0 4px",
            }}>can</span>
          </span>
          <br />
          <span style={{ position: "relative", display: "inline-block" }}>
            offer
            <svg viewBox="0 0 90 12" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 10 }}>
              <path d="M2 8 C20 2, 60 12, 88 6" stroke="#f5c842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          {" "}you!
        </h2>

        {/* Service rows */}
        <div>
          {SERVICES.map((s, i) => (
            <div key={i}
              style={{
                display: "flex", alignItems: "center",
                borderTop: "1px solid #e8e8e8",
                padding: "28px 0",
                borderBottom: i === SERVICES.length - 1 ? "1px solid #e8e8e8" : "none",
                cursor: "pointer",
                background: hovered === i ? "#fafafa" : "transparent",
                transition: "background 0.2s",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 0.08 + 0.1}s`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left tag */}
              <div style={{ width: 200, flexShrink: 0, paddingRight: 24 }}>
                <p style={{ fontSize: "0.78rem", color: "#888", lineHeight: 1.5 }}>{s.tag}</p>
              </div>
              {/* Title */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.45rem)",
                  fontWeight: 600, color: "#111",
                  transition: "color 0.2s",
                  ...(hovered === i ? { color: "#E8325A" } : {}),
                }}>{s.title}</h3>
              </div>
              {/* Arrow */}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1.5px solid #ccc",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: hovered === i ? "#E8325A" : "#888",
                borderColor: hovered === i ? "#E8325A" : "#ccc",
                transition: "color 0.2s, border-color 0.2s, transform 0.2s",
                transform: hovered === i ? "translateX(4px)" : "translateX(0)",
                flexShrink: 0,
              }}>
                <ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5 — Testimonial ────────────────────────────────────────────── */
function TestimonialSection() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "80px 28px", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>

        {/* Left avatars column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ transform: i===1 ? "translateX(-18px)" : i===2 ? "translateX(-8px)" : "translateX(0)" }}>
              <Avatar idx={i} size={i===0?60:i===1?54:58} />
            </div>
          ))}
        </div>

        {/* Center text */}
        <div style={{ flex: 1, minWidth: 280, textAlign: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700, lineHeight: 1.3,
            color: "#111", marginBottom: 30,
          }}>
            What our customer<br />says{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              About Us
              <svg viewBox="0 0 110 12" style={{ position: "absolute", bottom: -5, left: 0, width: "100%", height: 10 }}>
                <path d="M2 8 C25 2, 70 12, 108 6" stroke="#f5c842" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>

          {/* Quote block */}
          <div style={{
            background: "#fff", border: "1px solid #f0f0f0",
            borderRadius: 12, padding: "32px 36px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
            position: "relative", textAlign: "left",
          }}>
            <div style={{ marginBottom: 16 }}><QuoteOpen /></div>
            <p style={{ fontSize: "0.87rem", color: "#444", lineHeight: 1.8, textAlign: "center" }}>
              Elementum delivered the site with inthe timeline as they requested.
              Inthe end, the client found a 50% increase in traffic with in days
              since its launch. They also had an impressive ability to use technologies
              that the company hasn't used, which have also proved to be easy to use
              and reliable
            </p>
            <div style={{ textAlign: "right", marginTop: 12 }}><QuoteClose /></div>
          </div>
        </div>

        {/* Right avatars column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}>
          {[3,4,5].map(i => (
            <div key={i} style={{ transform: i===4 ? "translateX(18px)" : i===5 ? "translateX(8px)" : "translateX(0)" }}>
              <Avatar idx={i} size={i===3?72:i===4?58:80} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Newsletter ─────────────────────────────────────────────────────────── */
function Newsletter() {
  const [ref, visible] = useInView();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} style={{
      background: "#c8d9cc",
      padding: "80px 28px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Purple geometric shape */}
      <div style={{
        position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)",
        width: 90, height: 130,
        background: "linear-gradient(160deg, #9b59b6, #7d3c98)",
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        opacity: 0.85,
      }}/>

      {/* Squiggle top */}
      <Squiggle style={{ position: "absolute", top: 20, left: "30%", width: 100, opacity: 0.5 }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 700, lineHeight: 1.2,
          color: "#111", marginBottom: 14,
        }}>
          Subscribe to<br />our newsletter
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: 32 }}>
          To make your stay special and even more memorable
        </p>
        {submitted ? (
          <p style={{ color: "#2d6a4f", fontWeight: 600, fontSize: "1rem" }}>🎉 You're subscribed! Thank you.</p>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            style={{
              background: "#111", color: "#fff",
              border: "none", borderRadius: 28,
              padding: "14px 38px",
              fontSize: "0.88rem", fontWeight: 600,
              cursor: "pointer", letterSpacing: 0.5,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background="#E8325A"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#111"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            Subscribe Now
          </button>
        )}
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      head: "Company",
      links: ["Home", "Studio", "Service", "Blog"],
    },
    {
      head: "Terms & Policies",
      links: ["Privacy Policy", "Terms & Conditions", "License", "Accessibility"],
    },
    {
      head: "Follow Us",
      links: ["Instagram", "LinkedIn", "YouTube", "Twitter"],
    },
    {
      head: "Terms & Policies",
      isContact: true,
      addr: "1699a Fluss av, STE 2D Chicago, IL 43867",
      phone: "(123) 4567891000",
      email: "info@elementum.com",
    },
  ];

  return (
    <footer style={{ background: "#f0f2f0", padding: "52px 28px 24px" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Cols */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "36px 24px", marginBottom: 48 }}>
          {cols.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111", marginBottom: 16, letterSpacing: 0.3 }}>{col.head}</h4>
              {col.isContact ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>{col.addr}</p>
                  <p style={{ fontSize: "0.8rem", color: "#666" }}>{col.phone}</p>
                  <a href={`mailto:${col.email}`} style={{ fontSize: "0.8rem", color: "#666", textDecoration: "none" }}
                    onMouseEnter={e => e.target.style.color="#E8325A"}
                    onMouseLeave={e => e.target.style.color="#666"}
                  >{col.email}</a>
                </div>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ fontSize: "0.8rem", color: "#666", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color="#E8325A"}
                        onMouseLeave={e => e.target.style.color="#666"}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #ddd", paddingTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#aaa" }}>©2021 Elementum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Google Font loader ──────────────────────────────────────────────────── */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <FontLoader />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; color: #111; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 600px) {
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.5rem !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <TomorrowSection />
        <ProgressSection />
        <OffersSection />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
