"use client";

import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PERKS = [
  { n: '01', title: 'Stability & legacy', body: 'Join a company with over a decade of proven stability in the BPO industry.' },
  { n: '02', title: 'True work-from-home', body: 'Skip the commute and work in a professional, fully remote environment.' },
  { n: '03', title: 'Performance-based pay', body: 'Transparent pay with a base salary and high commission potential.' },
  { n: '04', title: 'Advanced technology', body: 'The W@H Focus Portal gives you real-time coaching, reporting, and daily performance tracking — the tools to succeed.' },
];

export default function OpportunitiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const nav = navRef.current;
    if (!root || !nav) return;

    requestAnimationFrame(() => root.classList.add('loaded'));
    const loadedTimer = setTimeout(() => root.classList.add('loaded'), 350);

    const onScroll = () => nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    root.querySelectorAll('.rv').forEach((el) => io.observe(el));

    return () => {
      clearTimeout(loadedTimer);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef} className="site">
      {/* Navigation */}
      <nav ref={navRef} className="nav" aria-label="Main">
        <div className="wrap nav-in">
          <a className="nav-logo" href="/" aria-label="Work at Home Solutions — home">
            <img src="/logo.png" alt="Work@Home Solutions" />
          </a>
          <div className="nav-links">
            <a href="/#about">About</a>
            <a href="/#focus">Focus</a>
            <a href="/#services">Services</a>
            <a href="/#team">Team</a>
            <a href="/opportunities">Opportunities</a>
            <a href="/#contact" className="btn btn-signal">Partner With Us</a>
          </div>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="menu"
            >
              <div className="menu-in">
                <a href="/#about" onClick={closeMenu}>About</a>
                <a href="/#focus" onClick={closeMenu}>Focus</a>
                <a href="/#services" onClick={closeMenu}>Services</a>
                <a href="/#team" onClick={closeMenu}>Team</a>
                <a href="/opportunities" onClick={closeMenu}>Opportunities</a>
                <a href="/#contact" onClick={closeMenu} className="btn btn-signal">Partner With Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header className="hero grain opps-hero">
        <div className="hero-bg">
          <video
            className="hero-video"
            src="/hero-takes/take-e.mp4"
            autoPlay muted loop playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={(e) => e.currentTarget.classList.add('ready')}
          />
        </div>
        <div className="hero-scrim"></div>
        <div className="wrap hero-inner">
          <span className="live-chip fade-late"><i className="dot"></i>NOW HIRING — WORK FROM HOME</span>
          <h1 className="hero-h1">
            <span className="ln"><span>Build a career</span></span>
            <span className="ln"><span>you run</span></span>
            <span className="ln"><span className="hollow">from home.</span></span>
          </h1>
          <p className="hero-sub fade-late">
            A supportive, professional environment where motivated people build real skills, earn from home,
            and grow alongside a company with a proven track record.
          </p>
          <div className="hero-cta fade-late">
            <a className="btn btn-signal" href="#apply">Start your application</a>
            <a className="btn btn-ghost" href="/#about">About Work@Home</a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">SCROLL<i></i></div>
      </header>

      {/* Why work here */}
      <section className="opps-why">
        <div className="wrap">
          <div className="opps-why-head">
            <p className="eyebrow rv">Why Work@Home</p>
            <h2 className="rv rv2">A remote career with real structure.</h2>
            <p className="rv rv2">
              At Work@Home Call Center, motivated individuals build real skills, earn from home, and grow
              with a company known for stability, transparency, and disciplined operations.
            </p>
          </div>
          <div className="perks-grid rv rv2">
            {PERKS.map((p) => (
              <div className="perk" key={p.n}>
                <em>{p.n}</em>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="opps-apply">
        <div className="wrap">
          <div className="opps-apply-head">
            <p className="eyebrow rv">Application</p>
            <h2 className="rv rv2">Start your pre-interview application.</h2>
            <p className="rv rv2">
              Completing this pre-application lets our recruiting specialists align your background, skills, and
              experience with our most immediate, high-performance campaigns.
            </p>
            <p className="rv rv2">
              We prioritize candidates who demonstrate <strong>professionalism</strong>, strong
              <strong> bilingual communication</strong>, and consistent operational discipline. We look forward
              to reviewing your submission.
            </p>
          </div>
          <div className="form-embed rv rv2">
            <iframe
              id="JotFormIFrame-240454796213054"
              title="Work@Home Pre-Interview Application"
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/Workathomecc/workhome-pre-interview-application"
              style={{ minWidth: '100%', maxWidth: '100%', height: '1100px', border: 'none' }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <a className="foot-logo" href="/" aria-label="Work@Home Solutions — home">
              <img src="/logo.png" alt="Work@Home Solutions" />
            </a>
            <div className="foot-col">
              175 SW 7th Street, Suite 1517-336<br />Miami, FL 33130
            </div>
            <div className="foot-links foot-col">
              <a href="/#services">Services</a>
              <a href="/#focus">Focus Portal</a>
              <a href="/opportunities">Careers</a>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 WORK@HOME SOLUTIONS</span>
            <span>OPERATIONAL EXCELLENCE, DELIVERED REMOTELY</span>
          </div>
        </div>
      </footer>

      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onLoad={() => {
          const w = window as unknown as { jotformEmbedHandler?: (a: string, b: string) => void };
          if (w.jotformEmbedHandler) {
            w.jotformEmbedHandler("iframe[id='JotFormIFrame-240454796213054']", 'https://form.jotform.com/');
          }
        }}
      />
    </main>
  );
}
