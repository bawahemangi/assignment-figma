import React, { useState, useEffect } from "react";

/* ── Inline SVG Components ───────────────────────────────────────────────── */
const YellowUnderline = () => (
  <svg className="squiggle-underline" viewBox="0 0 120 12" preserveAspectRatio="none" style={{ bottom: "-6px", height: "8px" }}>
    <path d="M3 9 C 35 3, 85 11, 117 5" stroke="var(--accent-yellow)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

const ThinArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const QuoteIcon = ({ isClose = false }) => (
  <svg width="28" height="22" viewBox="0 0 38 30" fill="#cbdccf" style={{ transform: isClose ? "rotate(180deg)" : "none" }}>
    <path d="M0 18.5C0 10.5 5 4 15 0L17.5 3.5C12 6 9 9.5 8.5 14C9.2 13.8 10 13.7 11 13.7C14.8 13.7 17.5 16.5 17.5 20.5C17.5 24.5 14.5 27.5 10.5 27.5C4.5 27.5 0 23.5 0 18.5ZM20.5 18.5C20.5 10.5 25.5 4 35.5 0L38 3.5C32.5 6 29.5 9.5 29 14C29.7 13.8 30.5 13.7 31.5 13.7C35.3 13.7 38 16.5 38 20.5C38 24.5 35 27.5 31 27.5C25 27.5 20.5 23.5 20.5 18.5Z" />
  </svg>
);

/* Wavy Background SVGs */
const HeroLeftSquiggle = () => (
  <svg width="60" height="150" viewBox="0 0 60 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", left: "10px", top: "250px", pointerEvents: "none", zIndex: 1 }}>
    <path d="M10 5 C 40 30, -10 60, 25 90 C 50 110, 5 140, 20 148" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ConnectiveSquiggle1 = () => (
  <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", right: "5%", top: "850px", pointerEvents: "none", zIndex: 1 }}>
    <path d="M280 10 C 250 80, 50 20, 20 90 C -10 160, 150 180, 250 190" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ConnectiveSquiggle2 = () => (
  <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", left: "15%", top: "1450px", pointerEvents: "none", zIndex: 1 }}>
    <path d="M10 20 C 150 10, 280 120, 390 90 C 440 70, 320 220, 20 240" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ConnectiveSquiggle3 = () => (
  <svg width="350" height="180" viewBox="0 0 350 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", right: "2%", top: "2050px", pointerEvents: "none", zIndex: 1 }}>
    <path d="M330 15 C 250 5, 120 120, 40 80 C -40 40, 80 170, 220 160" stroke="var(--accent-red)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const NewsletterSquiggle = () => (
  <svg width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "15px", left: "45%", transform: "translateX(-50%)", opacity: 0.8 }}>
    <path d="M5 25 C 20 5, 40 45, 60 25 C 80 5, 100 45, 115 25" stroke="var(--accent-red)" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/* ── Sub-Components ──────────────────────────────────────────────────────── */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{ background: "#fff", position: "relative", zIndex: 100 }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px" }}>
        {/* Brand Logo */}
        <a href="#" style={{ fontSize: "1.45rem", fontWeight: "700", color: "var(--text-dark)", letterSpacing: "-0.5px" }}>
          Elementum
        </a>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }} className="desktop-menu">
          {["Home", "Studio", "Services", "Contact", "FAQs"].map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: "0.88rem", fontWeight: "500", color: "var(--text-dark)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent-red)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-dark)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px", padding: "8px" }}
          aria-label="Toggle navigation menu"
        >
          <span style={{ width: "24px", height: "2px", backgroundColor: "var(--text-dark)", transition: "transform 0.3s" }} />
          <span style={{ width: "24px", height: "2px", backgroundColor: "var(--text-dark)", transition: "transform 0.3s" }} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div style={{ position: "absolute", top: "80px", left: 0, right: 0, background: "#fff", borderBottom: "1px solid var(--border-color)", padding: "16px 28px", display: "flex", flexDirection: "column", gap: "16px", zIndex: 99 }}>
          {["Home", "Studio", "Services", "Contact", "FAQs"].map((link) => (
            <a key={link} href="#" onClick={() => setMobileOpen(false)} style={{ fontSize: "1rem", fontWeight: "500", color: "var(--text-dark)" }}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <>
      <Navbar />
      
      {/* Background Decorative squiggles */}
      <HeroLeftSquiggle />
      <ConnectiveSquiggle1 />
      <ConnectiveSquiggle2 />
      <ConnectiveSquiggle3 />

      <main style={{ position: "relative", overflow: "hidden", paddingBottom: "0px" }}>
        
        {/* ── SECTION 1: HERO ── */}
        <section style={{ paddingTop: "70px", paddingBottom: "90px" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.18, marginBottom: "24px", letterSpacing: "-1.5px" }}>
              The <span className="highlight-container">thinkers<YellowUnderline /></span> and <br />
              doers were <span className="capsule-pink">changing</span> <br />
              the <span className="capsule-green">status</span> Quo with
            </h1>

            <p style={{ maxWidth: "440px", margin: "0 auto 56px", fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
              We are a team of strategists, designers, communicators, researchers, Together, we believe that progress only happens when you refuse to play things safe.
            </p>

            {/* Arched Avatars */}
            <div className="hero-avatars-container">
              {[
                { size: 90, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80", x: "2%", y: "45px" },
                { size: 100, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", x: "15%", y: "15px" },
                { size: 85, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80", x: "29%", y: "0px" },
                { size: 95, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", x: "39%", y: "85px" },
                { size: 90, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", x: "53%", y: "10px" },
                { size: 80, img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80", x: "65%", y: "75px" },
                { size: 88, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80", x: "78%", y: "5px" },
                { size: 85, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", x: "90%", y: "45px" }
              ].map((avatar, idx) => (
                <div
                  key={idx}
                  className="hero-avatar-item hover-scale"
                  style={{
                    left: avatar.x,
                    top: avatar.y,
                    width: avatar.size,
                    height: avatar.size,
                  }}
                >
                  <img src={avatar.img} alt={`Team Member ${idx + 1}`} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: TOMORROW ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
            <div style={{ flex: "1 1 420px" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 4.2vw, 2.6rem)", marginBottom: "24px", letterSpacing: "-0.8px" }}>
                <span className="highlight-container">Tomorrow<YellowUnderline /></span> should <br />
                be better than <span className="capsule-green">today</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "32px", maxWidth: "390px" }}>
                We are a team of strategists, designers, communicators, researchers, Together, we believe that progress only happens when you refuse to play things safe.
              </p>
              <a href="#" className="read-more-link">
                Read more <ThinArrowRight />
              </a>
            </div>

            <div style={{ flex: "1 1 420px", display: "flex", justifyContent: "center", position: "relative" }}>
              {/* Pink Radial Glow Background */}
              <div className="pink-blur-bg" />
              {/* Red Triangle Decoration */}
              <div className="red-triangle-tomorrow" />
              
              <div style={{
                position: "relative",
                zIndex: 2,
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
              }}>
                <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&h=600&q=80" alt="Team meeting working together" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: PROGRESS ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container" style={{ display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: "60px" }}>
            <div style={{ flex: "1 1 420px", display: "flex", justifyContent: "center", position: "relative" }}>
              {/* Top-Left Red Triangle */}
              <div className="triangle-progress-1" />
              {/* Bottom-Right Red Triangle */}
              <div className="triangle-progress-2" />

              <div style={{
                position: "relative",
                zIndex: 2,
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                boxShadow: "0 16px 48px rgba(0,0,0,0.12)"
              }}>
                <img src="https://images.unsplash.com/photo-1531535934202-f0d44431ded6?auto=format&fit=crop&w=600&h=600&q=80" alt="People collaborating with laptop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>

            <div style={{ flex: "1 1 420px" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 4.2vw, 2.6rem)", marginBottom: "24px", letterSpacing: "-0.8px" }}>
                <span className="capsule-green">See</span> how we can <br />
                help you <span className="highlight-container">progress<YellowUnderline /></span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "32px", maxWidth: "400px" }}>
                We add a layer of fearless insights and action that allows change makers to accelerate their progress in areas such as brand, design, digital, comms and social research.
              </p>
              <a href="#" className="read-more-link">
                Read more <ThinArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: WHAT WE CAN OFFER ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "50px", letterSpacing: "-1px" }}>
              What we <span className="capsule-green">can</span> <br />
              <span className="highlight-container">offer<YellowUnderline /></span> you!
            </h2>

            <div style={{ marginTop: "40px" }}>
              {/* Row 1 */}
              <div className="service-row">
                <div style={{ width: "25%", minWidth: "150px", fontSize: "0.82rem", color: "var(--text-muted)", paddingRight: "20px" }}>
                  Office of multiple interest content
                </div>
                <div style={{ width: "65%", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text-dark)" }} className="service-title">
                  Colaborative & partnership
                </div>
                <div style={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="arrow-circle">
                    <ThinArrowRight />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="service-row">
                <div style={{ width: "25%", minWidth: "150px", fontSize: "0.82rem", color: "var(--text-muted)", paddingRight: "20px" }}>
                  The hanger US Air force digital experimental
                </div>
                <div style={{ width: "65%", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text-dark)" }} className="service-title">
                  We talk about our weight
                </div>
                <div style={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="arrow-circle">
                    <ThinArrowRight />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="service-row">
                <div style={{ width: "25%", minWidth: "150px", fontSize: "0.82rem", color: "var(--text-muted)", paddingRight: "20px" }}>
                  Delta faucet content, social, digital
                </div>
                <div style={{ width: "65%", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--text-dark)" }} className="service-title">
                  Piloting digital{" "}
                  <span style={{ position: "relative", display: "inline-block" }}>
                    confidence
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Overlay avatar"
                      className="service-overlay-badge"
                    />
                  </span>
                </div>
                <div style={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>
                  <div className="arrow-circle">
                    <ThinArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: TESTIMONIAL ── */}
        <section style={{ padding: "80px 0 100px" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", marginBottom: "60px", letterSpacing: "-0.8px" }}>
              <span className="capsule-green">What</span> our customer <br />
              <span className="highlight-container">says<YellowUnderline /></span> <span className="highlight-container">About Us<div className="thick-underline" /></span>
            </h2>

            {/* Testimonial card with absolute avatars */}
            <div className="testimonial-wrapper">
              
              {/* Scattered Avatars around the central box */}
              {/* Left Group */}
              <div className="t-avatar ta-1"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Customer" /></div>
              <div className="t-avatar ta-2"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80" alt="Customer" /></div>
              <div className="t-avatar ta-3"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Customer" /></div>
              <div className="t-avatar ta-4"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80" alt="Customer" /></div>
              
              {/* Right Group */}
              <div className="t-avatar ta-5"><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80" alt="Customer" /></div>
              <div className="t-avatar ta-6"><img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80" alt="Customer" /></div>
              <div className="t-avatar ta-7"><img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80" alt="Customer" /></div>

              {/* Testimonial Central Box */}
              <div style={{
                position: "relative",
                zIndex: 2,
                backgroundColor: "#fff",
                border: "1px solid var(--border-color)",
                borderRadius: "20px",
                padding: "40px 48px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                maxWidth: "680px",
                margin: "0 auto",
                textAlign: "left"
              }}>
                <div style={{ marginBottom: "16px" }}>
                  <QuoteIcon />
                </div>
                
                <p style={{ color: "var(--text-dark)", fontSize: "0.93rem", lineHeight: 1.8, textAlign: "center", fontStyle: "normal", padding: "0 10px" }}>
                  Elementum delivered the site with in the timeline as they requested. In the end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn't used, which have also proved to be easy to use and reliable
                </p>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <QuoteIcon isClose={true} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: NEWSLETTER ── */}
        <section style={{ backgroundColor: "var(--bg-mint)", padding: "90px 0", position: "relative", overflow: "hidden" }}>
          {/* Top wavy squiggle decoration */}
          <NewsletterSquiggle />

          {/* Bottom-right Purple Quarter Circle */}
          <div className="purple-quarter-circle" />

          <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
            <h2 style={{ fontSize: "clamp(2rem, 5.5vw, 3rem)", marginBottom: "16px", letterSpacing: "-1px" }}>
              Subscribe to <br />
              our newsletter
            </h2>
            <p style={{ color: "#3a4c40", fontSize: "0.92rem", marginBottom: "40px" }}>
              To make your stay special and even more memorable
            </p>

            {subscribed ? (
              <div style={{ color: "#1a5235", fontWeight: "600", fontSize: "1.05rem" }}>
                🎉 Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", justifyContent: "center", gap: "12px", maxWidth: "440px", margin: "0 auto", flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: "16px 24px",
                    borderRadius: "9999px",
                    border: "1px solid #c9decb",
                    fontSize: "0.92rem",
                    width: "100%",
                    outline: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    color: "var(--text-dark)"
                  }}
                />
                <button type="submit" className="btn-black" style={{ width: "100%", marginTop: "8px" }}>
                  Subscribe now
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "var(--bg-mint)", borderTop: "1px solid #cadccf", padding: "60px 0 30px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px 24px", marginBottom: "60px" }}>
            
            {/* Col 1 */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "capitalize", color: "var(--text-dark)", marginBottom: "20px" }}>
                Company
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Home", "Studio", "Service", "Blog"].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "0.85rem", color: "#48594e", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-red)"} onMouseLeave={(e) => e.target.style.color = "#48594e"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "capitalize", color: "var(--text-dark)", marginBottom: "20px" }}>
                Terms & Policies
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Privacy Policy", "Terms & Conditions", "License", "Accessibility"].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "0.85rem", color: "#48594e", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-red)"} onMouseLeave={(e) => e.target.style.color = "#48594e"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "capitalize", color: "var(--text-dark)", marginBottom: "20px" }}>
                Follow Us
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Instagram", "LinkedIn", "YouTube", "Twitter"].map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "0.85rem", color: "#48594e", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-red)"} onMouseLeave={(e) => e.target.style.color = "#48594e"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 - Duplicate named 'Terms & Policies' exactly as layout shows */}
            <div>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", textTransform: "capitalize", color: "var(--text-dark)", marginBottom: "20px" }}>
                Terms & Policies
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "#48594e" }}>
                <p style={{ lineHeight: 1.5 }}>1699a Fluss av, STE 2D Chicago, IL 43867</p>
                <p>(123) 4567891000</p>
                <a href="mailto:info@elementum.com" style={{ color: "#48594e", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-red)"} onMouseLeave={(e) => e.target.style.color = "#48594e"}>
                  info@elementum.com
                </a>
              </div>
            </div>

          </div>

          {/* Copyright Bar */}
          <div style={{ borderTop: "1px solid #cadccf", paddingTop: "24px", display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "0.78rem", color: "#74887a" }}>
              ©2021 Elementum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Embedded CSS for layout rules that require absolute and responsive rules */}
      <style>{`
        /* Desktop styles for hero wavy avatars */
        .hero-avatars-container {
          position: relative;
          height: 200px;
          margin-top: 40px;
          width: 100%;
        }
        
        .hero-avatar-item {
          position: absolute;
          border-radius: 50%;
          border: 4px solid #ffffff;
          box-shadow: 0 12px 36px rgba(0,0,0,0.11);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .hero-avatar-item:hover {
          transform: scale(1.12) translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.18);
          z-index: 20;
        }

        /* Tomorrow section elements */
        .pink-blur-bg {
          position: absolute;
          left: -40px;
          top: 20px;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(232, 50, 90, 0.18) 0%, rgba(232, 50, 90, 0) 70%);
          filter: blur(24px);
          z-index: 1;
          pointer-events: none;
        }
        
        .red-triangle-tomorrow {
          position: absolute;
          right: 35px;
          top: -30px;
          width: 0;
          height: 0;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-bottom: 50px solid var(--accent-red);
          transform: rotate(35deg);
          z-index: 1;
        }

        /* Progress section elements */
        .triangle-progress-1 {
          position: absolute;
          left: 35px;
          top: -25px;
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 40px solid var(--accent-red);
          transform: rotate(-35deg);
          z-index: 1;
        }
        
        .triangle-progress-2 {
          position: absolute;
          right: 45px;
          bottom: 25px;
          width: 0;
          height: 0;
          border-left: 35px solid transparent;
          border-right: 35px solid transparent;
          border-bottom: 60px solid var(--accent-red);
          transform: rotate(15deg);
          z-index: 1;
        }

        /* Service Row Elements */
        .arrow-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #d0cfd2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7d7a81;
          transition: all 0.3s ease;
        }
        
        .service-row:hover .arrow-circle {
          color: var(--accent-red);
          border-color: var(--accent-red);
          transform: translateX(6px);
          background-color: rgba(232, 50, 90, 0.05);
        }
        
        .service-row:hover .service-title {
          color: var(--accent-red) !important;
        }
        
        .service-overlay-badge {
          position: absolute;
          top: -8px;
          right: -42px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          object-fit: cover;
        }

        /* Testimonials Avatars */
        .testimonial-wrapper {
          position: relative;
          padding: 40px 0;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .t-avatar {
          position: absolute;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .t-avatar:hover {
          transform: scale(1.1);
          z-index: 10;
        }
        
        .t-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Coordinates for Testimonial Avatars */
        .ta-1 { left: 4%; top: 15px; width: 66px; height: 66px; }
        .ta-2 { left: -3%; top: 110px; width: 50px; height: 50px; }
        .ta-3 { left: 5%; top: 200px; width: 62px; height: 62px; }
        .ta-4 { left: -2%; top: 280px; width: 52px; height: 52px; }
        
        .ta-5 { right: -2%; top: 5px; width: 56px; height: 56px; }
        .ta-6 { right: 4%; top: 100px; width: 60px; height: 60px; }
        .ta-7 { right: -4%; top: 210px; width: 85px; height: 85px; }

        /* Newsletter Shapes */
        .purple-quarter-circle {
          position: absolute;
          bottom: -20px;
          right: -20px;
          width: 130px;
          height: 130px;
          background-color: #8b3ce7;
          border-radius: 130px 0 0 0;
          pointer-events: none;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .t-avatar {
            display: none; /* Hide scattered avatars on tablet to avoid overlap */
          }
          .desktop-menu {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-avatars-container {
            height: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            padding: 20px 0;
          }
          
          .hero-avatar-item {
            position: static;
            width: 75px !important;
            height: 75px !important;
          }
          
          .purple-quarter-circle {
            width: 80px;
            height: 80px;
            border-radius: 80px 0 0 0;
          }
          
          .service-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .service-row > div {
            width: 100% !important;
          }
          
          .service-row > div:last-child {
            display: flex;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </>
  );
}
