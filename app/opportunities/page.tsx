"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SocialLinks from '../SocialLinks';

const PERKS = [
  { n: '01', title: 'Stability & legacy', body: 'Join a company with over a decade of proven stability in the BPO industry.' },
  { n: '02', title: 'True work-from-home', body: 'Skip the commute and work in a professional, fully remote environment.' },
  { n: '03', title: 'Performance-based pay', body: 'Transparent pay with a base salary and high commission potential.' },
  { n: '04', title: 'Advanced technology', body: 'The W@H Focus Portal gives you real-time coaching, reporting, and daily performance tracking — the tools to succeed.' },
];

/* ─────────────────────────────────────────────────────────────
   APPLICATION DELIVERY — Web3Forms (free, unlimited form→email)
   Applications are emailed to whichever inbox you use to create
   the key. Get one in ~30 seconds at https://web3forms.com
   (enter your email → the access key is shown/emailed instantly),
   then paste it below. Add extra recipients (CC) anytime from the
   Web3Forms dashboard. The key is meant to live in the page — it
   is not a secret and only lets the form send to your inbox.
   ───────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = '8933a1f2-fa63-4c4c-aef4-2b75233a478f';

const ENGLISH_LEVELS = ['Basic', 'Intermediate', 'Advanced', 'Native / Bilingual'];
const EXPERIENCE = ['No experience yet', 'Less than 1 year', '1–2 years', '3–5 years', '5+ years'];
const AVAILABILITY = ['Full-time', 'Part-time', 'Either'];

export default function OpportunitiesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const rootRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
        window.scrollTo({ top: (document.getElementById('apply')?.offsetTop ?? 0) - 80, behavior: 'smooth' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

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

    /* Pause the hero footage when it scrolls off-screen */
    const heroVid = root.querySelector<HTMLVideoElement>('.hero-video');
    const heroVidIO = heroVid
      ? new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) heroVid.play().catch(() => {}); else heroVid.pause(); });
        }, { threshold: 0.1 })
      : null;
    if (heroVid && heroVidIO) heroVidIO.observe(heroVid);

    return () => {
      clearTimeout(loadedTimer);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      heroVidIO?.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef} className="site">
      {/* Navigation */}
      <nav ref={navRef} className="nav" aria-label="Main">
        <div className="wrap nav-in">
          <a className="nav-logo" href="/" aria-label="Work at Home Call Center — home">
            <img src="/logo.png" alt="Work@Home Call Center" />
          </a>
          <div className="nav-links">
            <a href="/#about">About</a>
            <a href="/#focus">Focus</a>
            <a href="/#services">Services</a>
            <a href="/#team">Team</a>
            <a href="/opportunities" className="active" aria-current="page">Opportunities</a>
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
                <a href="/opportunities" className="active" aria-current="page" onClick={closeMenu}>Opportunities</a>
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
            poster="/hero-takes/take-e.jpg"
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
          <div className="rv rv2">
            {status === 'success' ? (
              <div className="apply-done" role="status" aria-live="polite">
                <div className="apply-done-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3>Application received.</h3>
                <p>
                  Thank you for applying to Work@Home Call Center. Our recruiting team reviews every
                  submission — if your background aligns with an active campaign, we&apos;ll reach out by
                  email or WhatsApp.
                </p>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
                  Submit another application
                </button>
              </div>
            ) : (
              <form className="form-card apply-card" onSubmit={handleApply}>
                {/* Web3Forms delivery fields + honeypot (kept out of view) */}
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="New Pre-Interview Application — Work@Home Call Center" />
                <input type="hidden" name="from_name" value="Work@Home Careers Site" />
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="a-first">First name</label>
                    <input id="a-first" type="text" name="First name" required placeholder="Maria" />
                  </div>
                  <div className="field">
                    <label htmlFor="a-last">Last name</label>
                    <input id="a-last" type="text" name="Last name" required placeholder="González" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="a-email">Email</label>
                    <input id="a-email" type="email" name="email" required placeholder="maria@email.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="a-phone">Phone / WhatsApp</label>
                    <input id="a-phone" type="tel" name="Phone / WhatsApp" required placeholder="+52 …" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="a-city">City</label>
                    <input id="a-city" type="text" name="City" required placeholder="Tijuana" />
                  </div>
                  <div className="field">
                    <label htmlFor="a-state">State</label>
                    <input id="a-state" type="text" name="State" required placeholder="Baja California" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="a-english">English proficiency</label>
                    <select id="a-english" name="English proficiency" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {ENGLISH_LEVELS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="a-exp">Call-center experience</label>
                    <select id="a-exp" name="Call-center experience" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {EXPERIENCE.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="a-setup">Home office ready?</label>
                    <select id="a-setup" name="Home office (computer, internet, headset)" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      <option value="Yes — computer, internet & headset ready">Yes — fully ready</option>
                      <option value="Partially — still setting up">Partially — still setting up</option>
                      <option value="Not yet">Not yet</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="a-avail">Availability</label>
                    <select id="a-avail" name="Availability" required defaultValue="">
                      <option value="" disabled>Select…</option>
                      {AVAILABILITY.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="a-link">LinkedIn or résumé link <span className="opt">— optional</span></label>
                  <input id="a-link" type="url" name="LinkedIn / résumé link" placeholder="https://linkedin.com/in/…" />
                </div>

                <div className="field">
                  <label htmlFor="a-why">Why do you want to join Work@Home?</label>
                  <textarea id="a-why" name="Why they want to join" required rows={4} placeholder="Tell us a little about your experience and what you're looking for…"></textarea>
                </div>

                <div className="field">
                  <label htmlFor="a-hear">How did you hear about us? <span className="opt">— optional</span></label>
                  <input id="a-hear" type="text" name="How did you hear about us" placeholder="Facebook, a friend, Indeed…" />
                </div>

                <button type="submit" className="btn btn-signal" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Submit application'}
                </button>

                {status === 'error' && (
                  <p className="apply-error" role="alert">
                    Something went wrong sending your application. Please try again, or email us at{' '}
                    <a href="mailto:info@workathomecc.com">info@workathomecc.com</a>.
                  </p>
                )}

                <p className="form-note">Your information is kept private and used only for recruiting.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <a className="foot-logo" href="/" aria-label="Work@Home Call Center — home">
              <img src="/logo-mist.png" alt="Work@Home Call Center" />
            </a>
            <div className="foot-col">
              175 SW 7th Street, Suite 1517-336<br />Miami, FL 33130
            </div>
            <div className="foot-links foot-col">
              <a href="/#services">Services</a>
              <a href="/#focus">Focus Portal</a>
              <a href="/opportunities">Careers</a>
            </div>
            <SocialLinks />
          </div>
          <div className="foot-base">
            <span>© 2026 WORK@HOME CALL CENTER</span>
            <span>OPERATIONAL EXCELLENCE, DELIVERED REMOTELY</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
