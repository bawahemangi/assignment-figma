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
          Quo with
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


/* ── Tomorrow Section ────────────────────────────────────────────────────── */
function TomorrowSection() {
  return (
    <section id="studio" style={{ padding: "90px 0" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "64px" }}>
        {/* Text Column */}
        <div style={{ flex: "1 1 380px" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.7rem)", marginBottom: "24px", letterSpacing: "-0.8px", lineHeight: 1.25, color: "#0e0d12" }}>
            <span className="highlight-container">
              Tomorrow
              <YellowUnderline />
            </span>{" "}
            should <br />
            be better than{" "}
            <span className="capsule-green">today</span>
          </h2>
          <p style={{ color: "#6b6873", fontSize: "0.93rem", lineHeight: 1.75, marginBottom: "36px", maxWidth: "390px" }}>
            We are a team of strategists, designers, communicators, researchers, Together, we believe that progress only happens when you refuse to play things safe.
          </p>
          <a href="#" id="tomorrow-read-more" className="read-more-link">
            Read more <ThinArrowRight />
          </a>
        </div>

        {/* Image Column */}
        <div style={{ flex: "1 1 380px", display: "flex", justifyContent: "center", position: "relative", minHeight: "360px" }}>
          {/* Pink radial glow */}
          <div className="pink-blur-bg" aria-hidden="true" />
          {/* Red triangle decoration (Figma Polygon 1: 274×267px) */}
          <RedTriangle className="red-triangle-tomorrow" />
          {/* Circle image */}
          <div className="circle-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&h=600&q=80"
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
    <section id="services" style={{ padding: "90px 0" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: "64px" }}>
        {/* Image Column */}
        <div style={{ flex: "1 1 380px", display: "flex", justifyContent: "center", position: "relative", minHeight: "360px" }}>
          <RedTriangle className="triangle-progress-1" />
          <RedTriangle className="triangle-progress-2" />
          <div className="circle-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1531535934202-f0d44431ded6?auto=format&fit=crop&w=600&h=600&q=80"
              alt="Person working on laptop in a collaborative space"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Text Column */}
        <div style={{ flex: "1 1 380px" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.7rem)", marginBottom: "24px", letterSpacing: "-0.8px", lineHeight: 1.25, color: "#0e0d12" }}>
            <span className="capsule-green">See</span> how we can <br />
            help you{" "}
            <span className="highlight-container">
              progress
              <YellowUnderline />
            </span>
          </h2>
          <p style={{ color: "#6b6873", fontSize: "0.93rem", lineHeight: 1.75, marginBottom: "36px", maxWidth: "400px" }}>
            We add a layer of fearless insights and action that allows change makers to accelerate their progress in areas such as brand, design, digital, comms and social research.
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
  // Avatar layout precisely matching screenshot:
  // LEFT: small (top), small (mid-left), LARGE (bottom-left)
  // RIGHT: small-med (top), medium (mid), medium (lower), LARGE partial (bottom-right)
  const surroundingAvatars = [
    // LEFT COLUMN
    { cls: "ta-1", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",   alt: "Customer 1" }, // small top-left
    { cls: "ta-2", img: "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?auto=format&fit=crop&w=100&h=100&q=80",  alt: "Customer 2" }, // small mid-left
    { cls: "ta-3", img: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=300&h=300&q=80",  alt: "Customer 3" }, // LARGE lower-left
    // RIGHT COLUMN
    { cls: "ta-4", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",  alt: "Customer 4" }, // small upper-right
    { cls: "ta-5", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=150&h=150&q=80",   alt: "Customer 5" }, // medium mid-right
    { cls: "ta-6", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",  alt: "Customer 6" }, // medium lower-right
    { cls: "ta-7", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",  alt: "Customer 7" }, // LARGE bottom-right partial
  ];

  return (
    <section id="testimonials" style={{ padding: "90px 0 110px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.7rem)", marginBottom: "70px", letterSpacing: "-0.8px", color: "#0e0d12", lineHeight: 1.3 }}>
          <span className="capsule-green">What</span> our customer <br />
          <span className="highlight-container">
            says
            <YellowUnderline />
          </span>{" "}
          <span className="highlight-container">
            About Us
            <div className="thick-underline" />
          </span>
        </h2>

        {/* Testimonial Card with Surrounding Avatars */}
        <div className="testimonial-wrapper">
          {surroundingAvatars.map(({ cls, img, alt }) => (
            <div key={cls} className={`t-avatar ${cls}`}>
              <img src={img} alt={alt} />
            </div>
          ))}

          {/* Central Quote Box — mint/green tinted background matching Figma */}
          <div id="testimonial-card" style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "#eef8f2",
            border: "none",
            borderRadius: "28px",
            padding: "48px 56px",
            maxWidth: "480px",
            margin: "0 auto",
            textAlign: "center",
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
              Elementum  delivered the site with inthe timeline
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
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter Section ──────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

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

      {/* Purple quarter-circle at bottom-right */}
      <div className="purple-quarter-circle" aria-hidden="true" />

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
        <h2 id="newsletter-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", marginBottom: "16px", letterSpacing: "-1px", color: "#0e0d12", fontFamily: "var(--font-heading)" }}>
          Subscribe to <br />
          our newsletter
        </h2>
        <p style={{ color: "#3a4c40", fontSize: "0.92rem", marginBottom: "44px" }}>
          To make your stay special and even more memorable
        </p>

        {subscribed ? (
          <div role="status" style={{ color: "#1a5235", fontWeight: "600", fontSize: "1.1rem", padding: "16px" }}>
            🎉 Thank you for subscribing!
          </div>
        ) : (
          <form
            id="newsletter-form"
            onSubmit={handleSubscribe}
            style={{ display: "flex", justifyContent: "center", gap: "12px", maxWidth: "440px", margin: "0 auto", flexWrap: "wrap" }}
          >
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "16px 24px",
                borderRadius: "9999px",
                border: "1.5px solid #b9d8bf",
                fontSize: "0.9rem",
                width: "100%",
                outline: "none",
                backgroundColor: "rgba(255,255,255,0.75)",
                color: "#0e0d12",
                fontFamily: "var(--font-body)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6cbf7a")}
              onBlur={(e) => (e.target.style.borderColor = "#b9d8bf")}
            />
            <button id="newsletter-submit" type="submit" className="btn-black" style={{ width: "100%", marginTop: "8px" }}>
              Subscribe now
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  const columns = [
    {
      title: "Company",
      links: ["Home", "Studio", "Service", "Blog"],
    },
    {
      title: "Terms & Policies",
      links: ["Privacy Policy", "Terms & Conditions", "License", "Accessibility"],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "LinkedIn", "YouTube", "Twitter"],
    },
  ];

  return (
    <footer id="contact" style={{ backgroundColor: "#daf1e3", borderTop: "1px solid #c6d9cb", padding: "64px 0 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px 24px", marginBottom: "60px" }}>
          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", textTransform: "capitalize" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "13px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="footer-link"
                      id={`footer-${link.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0e0d12", marginBottom: "22px", textTransform: "capitalize" }}>
              Terms & Policies
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.84rem", color: "#4d6154" }}>
              <p style={{ lineHeight: 1.6 }}>1699a Fluss av, STE 2D<br />Chicago, IL 43867</p>
              <p>(123) 4567891000</p>
              <a href="mailto:info@elementum.com" className="footer-link" id="footer-email">
                info@elementum.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid #c0d4c5", paddingTop: "26px", display: "flex", justifyContent: "center" }}>
          <p style={{ fontSize: "0.78rem", color: "#7a9080" }}>
            ©2021 Elementum. All rights reserved.
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

      {/* Global decorative squiggles between sections */}
      <div style={{ position: "fixed", pointerEvents: "none", inset: 0, zIndex: 0, overflow: "hidden" }} aria-hidden="true">
        <SquigglePath1 />
        <SquigglePath2 />
        <SquigglePath3 />
      </div>

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <TomorrowSection />
        <ProgressSection />
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
          right: -8px;
          top: 100px;
          width: 155.76px;
          height: 155.76px;
          background-color: #934CEC;
          border-radius: 50%;
          transform: rotate(60deg);
          z-index: 1;
          pointer-events: none;
          opacity: 0.9;
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

        /* ── Shared circle image wrapper ── */
        .circle-img-wrap {
          position: relative;
          z-index: 2;
          width: 320px;
          height: 320px;
          border-radius: 50%;
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
        .red-triangle-tomorrow {
          position: absolute;
          right: -20px;
          top: -30px;
          width: 274px;
          height: 267px;
          z-index: 1;
          transform: rotate(12deg);
          pointer-events: none;
          opacity: 0.9;
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
        .testimonial-wrapper {
          position: relative;
          padding: 50px 0;
          max-width: 920px;
          margin: 0 auto;
        }
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

        /* Avatar positions — matching screenshot precisely */
        /* LEFT: small top, small mid, LARGE lower */
        .ta-1 { left: 7%;   top: 20px;  width: 62px;  height: 62px; }
        .ta-2 { left: 1%;   top: 145px; width: 50px;  height: 50px; }
        .ta-3 { left: 5%;   top: 230px; width: 175px; height: 175px; }
        /* RIGHT: small top, medium mid, medium lower, LARGE partial bottom-right */
        .ta-4 { right: 14%; top: 30px;  width: 58px;  height: 58px; }
        .ta-5 { right: 6%;  top: 15px;  width: 75px;  height: 75px; }
        .ta-6 { right: 8%;  top: 150px; width: 65px;  height: 65px; }
        .ta-7 { right: -2%; top: 230px; width: 165px; height: 165px; }

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

        @media (max-width: 991px) {
          .desktop-menu { display: none !important; }
          .t-avatar { display: none; }
          .purple-ellipse-hero { width: 100px; height: 100px; right: 6px; top: 120px; }
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
          .circle-img-wrap {
            width: 240px;
            height: 240px;
          }
          .purple-ellipse-hero { display: none; }
          .red-triangle-tomorrow { width: 160px; height: 160px; }
          .triangle-progress-1 { width: 110px; height: 110px; }
          .triangle-progress-2 { width: 160px; height: 160px; }
          .purple-quarter-circle { width: 90px; height: 90px; border-radius: 90px 0 0 0; }
          .newsletter-red-arrows { transform: translateX(-100px) scale(0.8); }
          #testimonial-card { padding: 32px 24px; }
        }

        @media (max-width: 576px) {
          .service-row { flex-direction: column; align-items: flex-start; gap: 10px; }
          .service-row > div { width: 100% !important; }
          .service-row > div:last-child { justify-content: flex-start !important; }
          .circle-img-wrap { width: 200px; height: 200px; }
        }
      `}</style>
    </>
  );
}
