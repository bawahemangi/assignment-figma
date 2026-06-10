import React, { useState, useEffect, useRef } from "react";

/* ── Inline SVG Components ───────────────────────────────────────────────── */

// Yellow squiggle underline beneath text
const YellowUnderline = () => (
  <svg
    className="squiggle-underline"
    viewBox="0 0 120 14"
    preserveAspectRatio="none"
    style={{ bottom: "-6px", height: "9px" }}
    aria-hidden="true"
  >
    <path
      d="M3 11 C 20 3, 50 13, 80 6 C 100 1, 112 9, 117 7"
      stroke="#F5C842"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Thin right arrow
const ThinArrowRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Open/close quote marks
const QuoteIcon = ({ isClose = false }) => (
  <svg
    width="32"
    height="26"
    viewBox="0 0 38 30"
    fill="#c8dccf"
    style={{ transform: isClose ? "rotate(180deg)" : "none" }}
    aria-hidden="true"
  >
    <path d="M0 18.5C0 10.5 5 4 15 0L17.5 3.5C12 6 9 9.5 8.5 14C9.2 13.8 10 13.7 11 13.7C14.8 13.7 17.5 16.5 17.5 20.5C17.5 24.5 14.5 27.5 10.5 27.5C4.5 27.5 0 23.5 0 18.5ZM20.5 18.5C20.5 10.5 25.5 4 35.5 0L38 3.5C32.5 6 29.5 9.5 29 14C29.7 13.8 30.5 13.7 31.5 13.7C35.3 13.7 38 16.5 38 20.5C38 24.5 35 27.5 31 27.5C25 27.5 20.5 23.5 20.5 18.5Z" />
  </svg>
);

// Red triangle shape (Figma Polygon 1: 274×267px, #FF7171)
const RedTriangle = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 274 267"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <polygon points="137,0 274,267 0,267" fill="#FF7171" />
  </svg>
);

// Red rotated rectangle shape (Figma Rectangle, #FF7171)
const RedRectangle = ({ className, style }) => (
  <div
    className={className}
    style={{
      width: "160px",
      height: "160px",
      backgroundColor: "#FF7171",
      transform: "rotate(15deg)",
      ...style
    }}
    aria-hidden="true"
  />
);

// Red loop/scribble decorative path
const RedLoop = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 164 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 108 C 0 72, 30 18, 68 40 C 100 60, 120 100, 148 58 C 160 38, 150 10, 124 26"
      stroke="#FF6D6D"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// Red and black double loops on the left edge of Hero
const HeroLeftSquiggles = () => (
  <div style={{ position: "absolute", left: 0, top: "220px", zIndex: 1, pointerEvents: "none" }}>
    {/* Red double-loop squiggle */}
    <svg width="100" height="260" viewBox="0 0 100 260" fill="none" style={{ position: "absolute", left: "-15px", top: "-15px" }}>
      <path
        d="M 0 20 C 55 20, 85 70, 42 110 C 12 140, 85 170, 42 210 C 15 230, 5 240, 0 250"
        stroke="#FF7171"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    {/* Black double-loop squiggle */}
    <svg width="100" height="260" viewBox="0 0 100 260" fill="none" style={{ position: "absolute", left: "-10px", top: "0px" }}>
      <path
        d="M 0 20 C 55 20, 85 70, 42 110 C 12 140, 85 170, 42 210 C 15 230, 5 240, 0 250"
        stroke="#0e0d12"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </div>
);

// Decorative wavy SVG lines between sections
const SquigglePath1 = () => (
  <svg
    width="340"
    height="220"
    viewBox="0 0 340 220"
    fill="none"
    style={{ position: "absolute", right: "4%", top: "820px", pointerEvents: "none", zIndex: 1, opacity: 0.7 }}
    aria-hidden="true"
  >
    <path
      d="M320 15 C 280 70, 80 30, 50 95 C 20 155, 160 175, 260 185 C 290 188, 310 200, 330 215"
      stroke="#E8325A"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SquigglePath2 = () => (
  <svg
    width="380"
    height="200"
    viewBox="0 0 380 200"
    fill="none"
    style={{ position: "absolute", left: "3%", top: "1480px", pointerEvents: "none", zIndex: 1, opacity: 0.65 }}
    aria-hidden="true"
  >
    <path
      d="M15 20 C 120 10, 260 110, 365 85 C 410 68, 300 195, 30 190"
      stroke="#E8325A"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SquigglePath3 = () => (
  <svg
    width="320"
    height="160"
    viewBox="0 0 320 160"
    fill="none"
    style={{ position: "absolute", right: "2%", top: "2060px", pointerEvents: "none", zIndex: 1, opacity: 0.65 }}
    aria-hidden="true"
  >
    <path
      d="M300 12 C 230 5, 100 110, 35 75 C -30 42, 75 155, 210 148"
      stroke="#E8325A"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/* ── Navbar Component ──────────────────────────────────────────────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["Home", "Studio", "Services", "Contact", "FAQs"];

  return (
    <nav id="navbar" style={{ background: "#fff", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #f2f2f2" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "76px" }}>
        {/* Brand Logo */}
        <a href="#" id="logo" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0e0d12", fontFamily: "var(--font-heading)", letterSpacing: "-0.5px" }}>
          Elementum
        </a>

        {/* Desktop Nav Links */}
        <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              id={`nav-${link.toLowerCase()}`}
              className="nav-link"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          id="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "8px" }}
        >
          <span
            style={{
              width: "24px", height: "2px", backgroundColor: "#0e0d12",
              transition: "transform 0.3s, opacity 0.3s",
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
            }}
          />
          <span
            style={{
              width: "24px", height: "2px", backgroundColor: "#0e0d12",
              transition: "transform 0.3s, opacity 0.3s",
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
            }}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div id="mobile-menu" style={{ position: "absolute", top: "76px", left: 0, right: 0, background: "#fff", borderTop: "1px solid #f0f0f0", padding: "20px 28px", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 99 }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              id={`mobile-nav-${link.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="nav-link"
              style={{ fontSize: "1.05rem" }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero Section ──────────────────────────────────────────────────────────── */
function HeroSection() {
  // Layout from screenshot analysis:
  // Left side: 2 overlapping circles (small+large pair, positioned lower)
  // Then: tall single circle, lower single circle
  // Then: two overlapping circles in the middle
  // Then: tall single, lower single at right
  // Wave pattern: alternating high/low positions with two overlapping pairs
  
  const avatarGroups = [
    // LEFT OVERLAPPING PAIR (circles 1 & 2 intersect)
    {
      type: "pair",
      group: [
        { size: 90,  y: 85,  left: "0%",    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80", alt: "Team member 1" },
        { size: 108, y: 30,  left: "60px",  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80", alt: "Team member 2" },
      ]
    },
    // SINGLE - high
    {
      type: "single",
      size: 105, y: 0, left: "22%",
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&h=200&q=80",
      alt: "Team member 3"
    },
    // SINGLE - low
    {
      type: "single",
      size: 100, y: 95, left: "36%",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
      alt: "Team member 4"
    },
    // MIDDLE OVERLAPPING PAIR (circles 5 & 6 intersect)
    {
      type: "pair",
      group: [
        { size: 100, y: 20,  left: "50%",   img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80", alt: "Team member 5" },
        { size: 90,  y: 80,  left: "calc(50% + 65px)", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&h=200&q=80", alt: "Team member 6" },
      ]
    },
    // SINGLE - high
    {
      type: "single",
      size: 100, y: 5, left: "72%",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
      alt: "Team member 7"
    },
    // SINGLE - low/right edge
    {
      type: "single",
      size: 92, y: 75, left: "86%",
      img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80",
      alt: "Team member 8"
    },
  ];

  return (
    <section id="home" style={{ paddingTop: "80px", paddingBottom: "60px", position: "relative" }}>
      {/* Hero left vertical loops */}
      <HeroLeftSquiggles />

      {/* Purple ellipse decoration (Figma Ellipse 736: 155.76×155.76px, #934CEC) */}
      <div className="purple-ellipse-hero" aria-hidden="true" />

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
        {/* Main Heading */}
        <h1 id="hero-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.7rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "28px", letterSpacing: "-1.5px", color: "#0e0d12" }}>
          The{" "}
          <span className="highlight-container">
            thinkers
            <YellowUnderline />
          </span>{" "}
          and{" "}
          <br />
          doers were{" "}
          <span className="capsule-pink">changing</span>
          {" "}
          <br />
          the{" "}
          <span className="capsule-green">status</span>{" "}
          quo with
        </h1>

        {/* Subheading */}
        <p
          id="hero-subtext"
          style={{
            maxWidth: "450px",
            margin: "0 auto 56px",
            fontSize: "0.9rem",
            color: "#6b6873",
            lineHeight: 1.7,
          }}
        >
          We are a team of strategists, designers, communicators, researchers,
          Together, we believe that progress only happens when you refuse to
          play things safe.
        </p>

        {/* Avatar Row — overlapping pairs in wave arch */}
        <div className="hero-avatars-container" aria-label="Team members">
          {avatarGroups.map((group, gIdx) => {
            if (group.type === "pair") {
              return group.group.map((avatar, aIdx) => (
                <div
                  key={`${gIdx}-${aIdx}`}
                  className="hero-avatar-item"
                  style={{
                    left: avatar.left,
                    top: `${avatar.y}px`,
                    width: avatar.size,
                    height: avatar.size,
                    zIndex: aIdx === 1 ? 3 : 2, // second circle in pair goes on top slightly
                  }}
                >
                  <img src={avatar.img} alt={avatar.alt} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
              ));
            }
            return (
              <div
                key={gIdx}
                className="hero-avatar-item"
                style={{
                  left: group.left,
                  top: `${group.y}px`,
                  width: group.size,
                  height: group.size,
                  zIndex: 2,
                }}
              >
                <img src={group.img} alt={group.alt} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Features Wrapper: Tomorrow + Progress (Figma: Vertical, gap 170px) ─── */
function TomorrowSection() {
  return (
    <section
      id="studio"
      className="features-section-tomorrow"
      style={{ width: "100%", display: "flex", alignItems: "center" }}
    >
      {/* Horizontal layout: gap 262px from Figma */}
      <div
        className="features-tomorrow-container"
      >
        {/* LEFT: Text Column */}
        <div className="features-tomorrow-text">
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              marginBottom: "20px",
              letterSpacing: "-0.5px",
              lineHeight: 1.22,
              color: "#0e0d12",
              fontFamily: "var(--font-heading)",
            }}
          >
            <span className="highlight-container">
              Tomorrow
              <YellowUnderline />
            </span>{" "}
            should{" "}<br />
            be better than{" "}
            <span className="capsule-green">today</span>
          </h2>
          <p
            style={{
              color: "#6b6873",
              fontSize: "0.88rem",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "330px",
            }}
          >
            We are a team of strategists, designers communicators, researchers.
            Togeather, we belive that progress only hghappens when you refuse
            to play things safe.
          </p>
          <a href="#" id="tomorrow-read-more" className="read-more-link">
            Read more <ThinArrowRight />
          </a>
        </div>

        {/* RIGHT: Image Column with pink glow + red rectangle */}
        <div className="features-tomorrow-image-wrap">
          {/* Pink radial blur background */}
          <div className="pink-blur-bg" aria-hidden="true" />
          {/* Red rectangle (Figma Polygon/Rectangle, #FF7171) */}
          <RedRectangle className="red-rect-tomorrow" />
          {/* Circular image (Figma Ellipse 734: 600x600px) */}
          <div className="circle-img-wrap features-tomorrow-image">
            <img
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=700&h=700&q=80"
              alt="Team collaborating in a modern office meeting"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Progress Section ────────────────────────────────────────────────────── */
function ProgressSection() {
  return (
    <section
      id="services"
      className="features-section-progress"
      style={{ width: "100%", display: "flex", alignItems: "center" }}
    >
      {/* Horizontal layout: gap 290px from Figma */}
      <div
        className="features-progress-container"
      >
        {/* LEFT: Image Column with two red triangles */}
        <div className="features-progress-image-wrap">
          {/* Small top-left triangle */}
          <RedTriangle className="triangle-progress-1" />
          {/* Large bottom-right triangle */}
          <RedTriangle className="triangle-progress-2" />
          {/* Circular image (Figma Ellipse 734: 600x600px) */}
          <div className="circle-img-wrap features-progress-image">
            <img
              src="https://images.unsplash.com/photo-1531535934202-f0d44431ded6?auto=format&fit=crop&w=700&h=700&q=80"
              alt="Person working on laptop in a collaborative space"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* RIGHT: Text Column */}
        <div className="features-progress-text">
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              marginBottom: "20px",
              letterSpacing: "-0.5px",
              lineHeight: 1.22,
              color: "#0e0d12",
              fontFamily: "var(--font-heading)",
            }}
          >
            <span className="capsule-green">See</span>{" "}how we can{" "}<br />
            help you{" "}
            <span className="highlight-container">
              progress
              <YellowUnderline />
            </span>
          </h2>
          <p
            style={{
              color: "#6b6873",
              fontSize: "0.88rem",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "360px",
            }}
          >
            We add a layer of fearless insights and action that allows change
            makers to accelerate their progress in areas such as brand, design,
            digital, comms and social research.
          </p>
          <a href="#" id="progress-read-more" className="read-more-link">
            Read more <ThinArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Services / Offers Section ───────────────────────────────────────────── */
function OffersSection() {
  const services = [
    {
      category: "Office of multiple interest content",
      title: "Colaborative & partnership",
      hasOverlay: false,
    },
    {
      category: "The hanger US Air force digital experimental",
      title: "We talk about our weight",
      hasOverlay: false,
    },
    {
      category: "Delta faucet content, social, digital",
      title: "Piloting digital confidence",
      hasOverlay: true,
    },
  ];

  return (
    <section id="offers" style={{ padding: "90px 0" }}>
      <div className="container">
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBottom: "16px", letterSpacing: "-1px", lineHeight: 1.2, color: "#0e0d12" }}>
          What we{" "}
          <span className="capsule-green">can</span>{" "}
          <br />
          <span className="highlight-container">
            offer
            <YellowUnderline />
          </span>{" "}
          you!
        </h2>

        <div style={{ marginTop: "48px" }}>
          {services.map((svc, idx) => (
            <div key={idx} id={`service-row-${idx + 1}`} className="service-row">
              {/* Category Label */}
              <div style={{ width: "26%", minWidth: "140px", fontSize: "0.8rem", color: "#9a9299", lineHeight: 1.5, paddingRight: "20px" }}>
                {svc.category}
              </div>

              {/* Service Title */}
              <div
                style={{ flex: 1, fontSize: "clamp(1.05rem, 2.2vw, 1.5rem)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#0e0d12", position: "relative", display: "flex", alignItems: "center", gap: "10px" }}
                className="service-title"
              >
                {svc.title}
                {svc.hasOverlay && (
                  <img
                    src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Colorful graphic badge"
                    className="service-overlay-badge"
                  />
                )}
              </div>

              {/* Plain thin arrow — matches Figma design */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "24px", flexShrink: 0 }}>
                <svg width="52" height="16" viewBox="0 0 52 16" fill="none" className="service-arrow" aria-hidden="true">
                  <line x1="0" y1="8" x2="44" y2="8" stroke="#0e0d12" strokeWidth="1.5" />
                  <polyline points="36,2 44,8 36,14" fill="none" stroke="#0e0d12" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ────────────────────────────────────────────────── */
function TestimonialsSection() {
  // Avatar positions derived from Figma 1920px canvas, converted to percentages.
  // Section total height: 653px in Figma.
  const surroundingAvatars = [
    // LEFT COLUMN
    { id: "L1", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", alt: "Customer 1", style: { left: "11.45%", top: "10px",  width: "120px", height: "120px" } },
    { id: "L2", img: "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?auto=format&fit=crop&w=100&h=100&q=80", alt: "Customer 2", style: { left: "1.98%",  top: "220px", width:  "60px",  height:  "60px" } },
    { id: "L3", img: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=300&h=300&q=80", alt: "Customer 3", style: { left: "8.96%",  top: "240px", width: "200px", height: "200px" } },
    { id: "L4", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80", alt: "Customer 4", style: { left: "2.97%",  top: "450px", width: "100px", height: "100px" } },
    // RIGHT COLUMN — percentages from Figma 1920px: left/1920*100
    { id: "R1", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=150&h=150&q=80", alt: "Customer 5", style: { right: "5%",  top:  "10px",  width: "120px", height: "120px" } },  // ~1670px left
    { id: "R2", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", alt: "Customer 6", style: { right: "18.33%", top:  "83px",  width:  "90px",  height:  "90px" } }, // Ellipse 264: left 1478px → right 18.33%
    { id: "R3", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", alt: "Customer 7", style: { right: "16.04%", top: "236px", width: "112px", height: "112px" } }, // Ellipse 265: exactly 112×112
    { id: "R4", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80", alt: "Customer 8", style: { right: "1.98%",  top: "358px", width: "295px", height: "295px" } }, // Ellipse 269: exactly 295×295
  ];

  return (
    <section id="testimonials" style={{ 
      position: "relative", 
      width: "100%",
      height: "680px",
      margin: "100px 0",
      padding: "0",
      overflow: "visible" 
    }}>
      
      {/* Testimonials Heading — centered like Figma (left:608/1920 ≈ 31.7%, width:685/1920 ≈ 35.7%) */}
      <h2 style={{ 
        position: "absolute",
        top: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "685px",
        maxWidth: "80%",
        fontSize: "clamp(1.8rem, 4.5vw, 2.7rem)", 
        letterSpacing: "-0.8px", 
        color: "#0e0d12", 
        lineHeight: 1.3,
        textAlign: "center",
        margin: "0"
      }}>
        <span className="capsule-green">What</span> our customer <br />
        <span className="highlight-container">
          says
          <YellowUnderline />
        </span>{" "}
        <span className="highlight-container">
          About Us
          <YellowUnderline />
        </span>
      </h2>

      {/* Floating Avatars */}
      {surroundingAvatars.map((avatar) => (
        <div key={avatar.id} className="t-avatar" style={avatar.style}>
          <img src={avatar.img} alt={avatar.alt} />
        </div>
      ))}

      {/* Central Quote Box — Figma left:560, width:685 on 1920px → left:29%, width:35.7% */}
      <div id="testimonial-card" style={{
        position: "absolute",
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(685px, 55%)",
        zIndex: 2,
        backgroundColor: "#eef8f2",
        border: "none",
        borderRadius: "28px",
        padding: "48px 56px",
        textAlign: "center",
        boxSizing: "border-box"
      }}>
        {/* Large open quote mark — top left */}
        <div style={{
          position: "absolute",
          top: "22px",
          left: "28px",
          fontSize: "5rem",
          lineHeight: 1,
          color: "#b8d4c0",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          userSelect: "none",
        }} aria-hidden="true">
          &ldquo;
        </div>

        <p style={{ color: "#3a3840", fontSize: "0.9rem", lineHeight: 1.9, textAlign: "center", padding: "28px 8px 0" }}>
          Elementum delivered the site with inthe timeline
          as they requested. Inthe end, the client found a 50%
          increase in traffic with in days since its launch. They
          also had an impressive ability to use technologies that
          the company hasnt used, which have also proved to
          be easy to use and reliable
        </p>

        {/* Large close quote mark — bottom right */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "28px",
          fontSize: "5rem",
          lineHeight: 1,
          color: "#b8d4c0",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          userSelect: "none",
          transform: "rotate(180deg)",
        }} aria-hidden="true">
          &ldquo;
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter Section ──────────────────────────────────────────────────── */
function NewsletterSection() {
  return (
    <section id="newsletter" style={{ backgroundColor: "#d8ede2", padding: "100px 0 90px", position: "relative", overflow: "hidden" }}>

      {/* Red hand-drawn double arrows pointing down — top-left area (matching Figma) */}
      <svg
        className="newsletter-red-arrows"
        viewBox="0 0 200 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left arrow path */}
        <path
          d="M 50 10 C 30 40, 20 70, 40 110"
          stroke="#e8325a" strokeWidth="2.2" strokeLinecap="round" fill="none"
        />
        <path d="M 40 110 L 30 95 M 40 110 L 53 100" stroke="#e8325a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Right arrow path (offset ~40px to the right, slightly shorter) */}
        <path
          d="M 90 10 C 72 38, 65 68, 82 105"
          stroke="#e8325a" strokeWidth="2.2" strokeLinecap="round" fill="none"
        />
        <path d="M 82 105 L 70 92 M 82 105 L 95 96" stroke="#e8325a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>

      {/* Purple ellipse — Figma exact: 244×244px, #934CEC, rotation: -120°, Left:1622 on 1920px canvas */}
      {/* On 1920px: right edge = 1920-(1622+244) = 54px from right */}
      <div
        className="purple-ellipse-newsletter"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "90px",
          right: "54px",
          width: "244px",
          height: "244px",
          background: "linear-gradient(90deg, #934CEC 50%, transparent 50%)",
          borderRadius: "50%",
          transform: "rotate(-120deg)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
        <h2 id="newsletter-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", marginBottom: "16px", letterSpacing: "-1px", color: "#0e0d12", fontFamily: "var(--font-heading)" }}>
          Subscribe to <br />
          our newsletter
        </h2>
        <p style={{ color: "#3a4c40", fontSize: "0.92rem", marginBottom: "44px" }}>
          To make your stay special and even more memorable
        </p>

        <button
          id="newsletter-submit"
          className="btn-black"
          style={{ marginTop: "0" }}
        >
          Subscribe Now
        </button>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: "#daf1e3", borderTop: "1px solid #c6d9cb", padding: "64px 0 32px" }}>
      <div className="container">
        {/* Divider line above footer columns */}
        <div style={{ borderTop: "1px solid #0e0d12", marginBottom: "60px" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "40px 24px", marginBottom: "60px" }}>
          {/* Company column */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", fontFamily: "var(--font-heading)" }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px" }}>
              <li><a href="#" className="footer-link" id="footer-home">Home</a></li>
              <li><a href="#" className="footer-link" id="footer-studio">Studio</a></li>
              <li><a href="#" className="footer-link" id="footer-service">Service</a></li>
              <li><a href="#" className="footer-link" id="footer-blog">Blog</a></li>
            </ul>
          </div>

          {/* Terms & Policies column */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", fontFamily: "var(--font-heading)" }}>Terms & Policies</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px" }}>
              <li><a href="#" className="footer-link" id="footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="footer-link" id="footer-terms">Terms & Conditions</a></li>
              <li><a href="#" className="footer-link" id="footer-explore">Explore</a></li>
              <li><a href="#" className="footer-link" id="footer-accessibility">Accessibility</a></li>
            </ul>
          </div>

          {/* Follow Us column */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", fontFamily: "var(--font-heading)" }}>Follow Us</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px" }}>
              <li><a href="#" className="footer-link" id="footer-instagram">Instagram</a></li>
              <li><a href="#" className="footer-link" id="footer-linkedin">LinkedIn</a></li>
              <li><a href="#" className="footer-link" id="footer-youtube">YouTube</a></li>
              <li><a href="#" className="footer-link" id="footer-twitter">Twitter</a></li>
            </ul>
          </div>

          {/* Terms & Policies / Contact column */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", fontFamily: "var(--font-heading)" }}>Terms & Policies</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.84rem", color: "#4d6154" }}>
              <p style={{ lineHeight: 1.6 }}>1498w Fluton ste, STE<br/>2D Chicgo, IL 63867</p>
              <p>(216) 3179580</p>
              <a href="mailto:info@elementum.com" className="footer-link" id="footer-email">
                info@elementum.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ paddingTop: "26px", display: "flex", justifyContent: "center" }}>
          <p style={{ fontSize: "0.78rem", color: "#7a9080" }}>
            ©2023 Elementum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Main App ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
 
      <main style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
        {/* Global decorative squiggles between sections — now scrolling with the page */}
        <SquigglePath1 />
        <SquigglePath2 />
        <SquigglePath3 />

        <HeroSection />
 
        {/* Features: Tomorrow + Progress — Figma vertical gap 170px, left 160px */}
        <div
          id="features"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "170px",
            padding: "80px 0 100px",
            position: "relative",
            width: "100%",
            maxWidth: "1600px",
            margin: "0 auto",
          }}
        >
          {/* Figma Vector 2516: red wavy connector between Tomorrow and Progress */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "450px",
              left: "150px",
              width: "1100px",
              height: "400px",
              pointerEvents: "none",
              zIndex: 0,
              overflow: "visible",
            }}
            viewBox="0 0 1100 400"
            fill="none"
            className="connector-line"
          >
            <path
              d="M 950 10 Q 750 150, 550 180 T 150 380"
              stroke="#E8325A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
 
          <TomorrowSection />
          <ProgressSection />
        </div>
 
        <OffersSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
 
      <Footer />
 
      {/* Inline CSS for absolute/responsive rules */}
      <style>{`
        /* ── Nav Link ── */
        .nav-link {
          font-size: 0.87rem;
          font-weight: 500;
          color: #0e0d12;
          text-decoration: none;
          transition: color 0.2s;
          font-family: var(--font-body);
        }
        .nav-link:hover { color: #e8325a; }

        /* ── Purple ellipse in Hero (Figma Ellipse 736: 155.76×155.76px, #934CEC) ── */
        .purple-ellipse-hero {
          position: absolute;
          right: -77.88px;
          top: 270px;
          width: 155.76px;
          height: 155.76px;
          background: linear-gradient(90deg, #934CEC 50%, transparent 50%);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }

        /* ── Hero avatar layout ── */
        .hero-avatars-container {
          position: relative;
          height: 230px;
          margin-top: 20px;
          width: 100%;
          overflow: visible;
        }
        .hero-avatar-item {
          position: absolute;
          border-radius: 50%;
          border: 4px solid #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
          cursor: pointer;
        }
        .hero-avatar-item:hover {
          transform: scale(1.14) translateY(-10px);
          box-shadow: 0 18px 48px rgba(0,0,0,0.2);
          z-index: 20;
        }

        /* ── Features sections (Tomorrow + Progress) exact Figma sizes ── */
        .features-section-tomorrow {
          min-height: 600px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .features-section-progress {
          min-height: 600px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .connector-line {
          display: block;
        }
        @media (max-width: 991px) {
          .connector-line {
            display: none !important;
          }
        }

        /* ── Tomorrow & Progress Sections layout (Figma specs) ── */
        .features-tomorrow-container {
          display: flex;
          align-items: center;
          gap: 262px;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }
        .features-tomorrow-text {
          flex: 0 0 auto;
          width: 737px;
          padding-left: 160px;
          box-sizing: border-box;
        }
        .features-tomorrow-image-wrap {
          flex: 0 0 auto;
          width: 600px;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .features-tomorrow-image {
          width: 600px;
          height: 600px;
        }

        .features-progress-container {
          display: flex;
          align-items: center;
          gap: 290px;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
        }
        .features-progress-image-wrap {
          flex: 0 0 auto;
          width: 600px;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .features-progress-image {
          width: 600px;
          height: 600px;
        }
        .features-progress-text {
          flex: 0 0 auto;
          width: 706px;
          box-sizing: border-box;
        }

        /* Rotated red rectangle on top-right of Tomorrow circle */
        .red-rect-tomorrow {
          position: absolute;
          right: -10px;
          top: -15px;
          width: 160px;
          height: 160px;
          background-color: #FF7171;
          transform: rotate(15deg);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Shared circle image wrapper ── */
        .circle-img-wrap {
          position: relative;
          z-index: 2;
          border-radius: 500px; /* Figma: Radius: 500px */
          overflow: hidden;
          border: 5px solid #ffffff;
          box-shadow: 0 20px 56px rgba(0,0,0,0.12);
          align-self: center;
        }

        /* ── Tomorrow section decorations ── */
        .pink-blur-bg {
          position: absolute;
          left: -50px;
          top: 10px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(232,50,90,0.15) 0%, rgba(232,50,90,0) 68%);
          filter: blur(28px);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Progress section decorations ── */
        .triangle-progress-1 {
          position: absolute;
          left: -40px;
          top: -50px;
          width: 180px;
          height: 175px;
          z-index: 1;
          transform: rotate(-30deg);
          pointer-events: none;
          opacity: 0.85;
        }
        .triangle-progress-2 {
          position: absolute;
          right: -30px;
          bottom: -40px;
          width: 274px;
          height: 267px;
          z-index: 1;
          transform: rotate(8deg);
          pointer-events: none;
          opacity: 0.85;
        }

        .service-row:hover .service-arrow line,
        .service-row:hover .service-arrow polyline {
          stroke: #e8325a;
        }
        .service-arrow {
          transition: transform 0.28s ease;
          flex-shrink: 0;
        }
        .service-row:hover .service-arrow {
          transform: translateX(6px);
        }
        .service-row:hover .service-title {
          color: #e8325a !important;
        }
        /* Overlay badge sits inline next to text */
        .service-overlay-badge {
          display: inline-block;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
          object-fit: cover;
          vertical-align: middle;
          margin-left: 6px;
          position: relative;
          flex-shrink: 0;
        }

        /* ── Testimonial wrapper ── */
        .t-avatar {
          position: absolute;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.09);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        .t-avatar:hover { transform: scale(1.1); z-index: 10; }
        .t-avatar img { width: 100%; height: 100%; object-fit: cover; }
        /* ── Newsletter red hand-drawn arrows ── */
        .newsletter-red-arrows {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-160px);
          width: 200px;
          height: 130px;
          pointer-events: none;
          z-index: 2;
        }

        /* ── Newsletter purple quarter-circle ── */
        .purple-quarter-circle {
          position: absolute;
          bottom: -22px;
          right: -22px;
          width: 135px;
          height: 135px;
          background-color: #934CEC;
          border-radius: 135px 0 0 0;
          pointer-events: none;
        }

        /* ── Footer links ── */
        .footer-link {
          font-size: 0.84rem;
          color: #4d6154;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #e8325a; }

        /* ── Responsive ── */
        @media (min-width: 992px) {
          .hamburger-only { display: none !important; }
        }

        @media (max-width: 1599px) and (min-width: 992px) {
          .features-tomorrow-container {
            gap: 16.3vw;
          }
          .features-tomorrow-text {
            width: 46vw;
            padding-left: 10vw;
          }
          .features-tomorrow-image-wrap,
          .features-tomorrow-image {
            width: 37.5vw;
            height: 37.5vw;
          }
          .red-rect-tomorrow {
            width: 10vw;
            height: 10vw;
            right: -1vw;
            top: -1vw;
          }

          .features-progress-container {
            gap: 18.1vw;
          }
          .features-progress-image-wrap,
          .features-progress-image {
            width: 37.5vw;
            height: 37.5vw;
          }
          .features-progress-text {
            width: 44.1vw;
          }
          .triangle-progress-1 {
            width: 11.25vw;
            height: 11vw;
            left: -2.5vw;
            top: -3vw;
          }
          .triangle-progress-2 {
            width: 17vw;
            height: 16.6vw;
            right: -2vw;
            bottom: -2.5vw;
          }
        }

        @media (max-width: 991px) {
          .desktop-menu { display: none !important; }
          .t-avatar { display: none; }
          .purple-ellipse-hero { width: 100px; height: 100px; right: 6px; top: 120px; }
          
          .features-tomorrow-container,
          .features-progress-container {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 48px;
            padding: 0 32px;
          }
          .features-tomorrow-text,
          .features-progress-text {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .features-tomorrow-image-wrap,
          .features-tomorrow-image,
          .features-progress-image-wrap,
          .features-progress-image {
            width: 320px;
            height: 320px;
          }
          .red-rect-tomorrow {
            width: 90px;
            height: 90px;
            right: -5px;
            top: -10px;
          }
          .triangle-progress-1 {
            width: 100px;
            height: 98px;
            left: -20px;
            top: -25px;
          }
          .triangle-progress-2 {
            width: 150px;
            height: 146px;
            right: -15px;
            bottom: -20px;
          }
        }

        @media (max-width: 768px) {
          .hero-avatars-container {
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px;
            padding: 16px 0;
            margin-top: 10px;
          }
          .hero-avatar-item {
            position: static !important;
            width: 72px !important;
            height: 72px !important;
          }
          .purple-ellipse-hero { display: none; }
          .purple-quarter-circle { width: 90px; height: 90px; border-radius: 90px 0 0 0; }
          .newsletter-red-arrows { transform: translateX(-100px) scale(0.8); }
          #testimonial-card { padding: 32px 24px; }
          
          /* Collapse gaps and sections on mobile */
          .features-tomorrow-container,
          .features-progress-container {
            gap: 48px;
          }
          #features { gap: 60px !important; }
          .features-section-tomorrow,
          .features-section-progress { min-height: auto; }
          
          .features-tomorrow-image-wrap,
          .features-tomorrow-image,
          .features-progress-image-wrap,
          .features-progress-image {
            width: 240px;
            height: 240px;
          }
          .red-rect-tomorrow {
            width: 70px;
            height: 70px;
            right: -5px;
            top: -5px;
          }
          .triangle-progress-1 {
            width: 70px;
            height: 68px;
            left: -15px;
            top: -15px;
          }
          .triangle-progress-2 {
            width: 100px;
            height: 98px;
            right: -10px;
            bottom: -15px;
          }
        }

        @media (max-width: 576px) {
          .service-row { flex-direction: column; align-items: flex-start; gap: 10px; }
          .service-row > div { width: 100% !important; }
          .service-row > div:last-child { justify-content: flex-start !important; }
          
          .features-tomorrow-container,
          .features-progress-container {
            gap: 32px;
            padding: 0 18px;
          }
          .features-tomorrow-image-wrap,
          .features-tomorrow-image,
          .features-progress-image-wrap,
          .features-progress-image {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </>
  );
}
