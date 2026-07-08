"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reelPlaying, setReelPlaying] = useState(false);
  /* Hero footage layer: renders over the constellation canvas and crossfades in
     when the file exists; falls back to the canvas silently when it doesn't. */
  const [heroVideoOk, setHeroVideoOk] = useState(true);
  const [storyOk, setStoryOk] = useState(true);

  const rootRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pagebarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const nav = navRef.current;
    const pagebar = pagebarRef.current;
    const hero = heroRef.current;
    const heroBg = heroBgRef.current;
    const heroInner = heroInnerRef.current;
    const cv = canvasRef.current;
    if (!root || !nav || !pagebar || !hero || !heroBg || !heroInner || !cv) return;

    const prm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQ = window.matchMedia('(max-width: 920px)');
    const isFlat = () => prm.matches || mobileQ.matches;

    let alive = true;
    let ticking = false;
    let vh = window.innerHeight;

    /* Hero line reveal (timeout fallback covers rAF-throttled tabs) */
    requestAnimationFrame(() => { if (alive) root.classList.add('loaded'); });
    const loadedTimer = setTimeout(() => root.classList.add('loaded'), 350);

    /* Hero footage: the 404 error can fire before hydration attaches onError,
       so re-check the element's state on mount. */
    const vidEl = root.querySelector<HTMLVideoElement>('.hero-video');
    const dropVideo = () => setHeroVideoOk(false);
    if (vidEl) {
      if (vidEl.error || vidEl.networkState === 3 /* NETWORK_NO_SOURCE */) dropVideo();
      else vidEl.addEventListener('error', dropVideo, { once: true });
    }

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

    function onScroll() {
      if (!alive) return;
      const y = window.scrollY || window.pageYOffset;
      nav!.classList.toggle('scrolled', y > 40);

      const doc = document.documentElement;
      const total = doc.scrollHeight - vh;
      pagebar!.style.transform = 'scaleX(' + (total > 0 ? y / total : 0) + ')';

      if (!isFlat() && y < vh * 1.2) {
        heroBg!.style.transform = 'translateY(' + y * 0.22 + 'px)';
        heroInner!.style.transform = 'translateY(' + y * 0.36 + 'px)';
        heroInner!.style.opacity = String(clamp01(1 - y / (vh * 0.85)));
      }
      ticking = false;
    }
    const scrollHandler = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    };
    const resizeHandler = () => { vh = window.innerHeight; sizeCanvas(); seedNodes(); onScroll(); };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', resizeHandler);
    (window as unknown as { __wahTick?: () => void }).__wahTick = onScroll;

    /* Reveal on scroll */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    root.querySelectorAll('.rv').forEach((el) => io.observe(el));

    /* Proof count-ups */
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target as HTMLElement;
        const target = +(el.getAttribute('data-count') || 0);
        if (prm.matches) { el.textContent = String(target); return; }
        let t0: number | null = null;
        const step = (t: number) => {
          if (!alive) return;
          if (t0 === null) t0 = t;
          const k = Math.min(1, (t - t0) / 1200);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    root.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    /* Hero canvas: distributed-operations constellation */
    const ctx = cv.getContext('2d')!;
    let W = 0, H = 0, DPR = 1;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let pulses: { x: number; y: number; t: number }[] = [];
    let heroVisible = true;
    let animStarted = false;

    function sizeCanvas() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = cv!.clientWidth || window.innerWidth;
      H = cv!.clientHeight || window.innerHeight;
      cv!.width = W * DPR; cv!.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function seedNodes() {
      nodes = [];
      const n = Math.round(Math.min(84, Math.max(46, (W * H) / 26000)));
      for (let i = 0; i < n; i++) {
        const bias = Math.pow(Math.random(), 0.62); // denser right, headline stays clean
        nodes.push({
          x: (0.18 + bias * 0.86) * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.10,
          r: Math.random() * 1.4 + 0.7,
        });
      }
    }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#081226'); g.addColorStop(1, '#060D1C');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      nodes.forEach((nd) => {
        ctx.fillStyle = 'rgba(143,161,191,0.35)';
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, 6.2832); ctx.fill();
      });
    }
    function frame() {
      if (!alive) return;
      if (!heroVisible || document.hidden) { requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#081226'); g.addColorStop(0.55, '#060D1C'); g.addColorStop(1, '#04091500');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      const link = Math.min(W, H) * 0.16;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            ctx.strokeStyle = 'rgba(143,161,191,' + (0.085 * (1 - d / link)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const nd of nodes) {
        ctx.fillStyle = 'rgba(143,161,191,0.4)';
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, 6.2832); ctx.fill();
      }
      if (Math.random() < 0.012 && pulses.length < 4) {
        const src = nodes[(Math.random() * nodes.length) | 0];
        pulses.push({ x: src.x, y: src.y, t: 0 });
      }
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pl = pulses[p]; pl.t += 0.016;
        const pr = pl.t * 46, po = Math.max(0, 0.5 - pl.t * 0.42);
        if (po <= 0) { pulses.splice(p, 1); continue; }
        ctx.strokeStyle = 'rgba(76,175,80,' + po.toFixed(3) + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(pl.x, pl.y, pr, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = 'rgba(76,175,80,' + Math.min(0.9, po * 2).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(pl.x, pl.y, 2.2, 0, 6.2832); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    sizeCanvas(); seedNodes();
    if (prm.matches) {
      drawStatic();
    } else if (!animStarted) {
      animStarted = true;
      requestAnimationFrame(frame);
    }

    const heroIO = new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      const vid = root.querySelector<HTMLVideoElement>('.hero-video');
      if (vid && !prm.matches) {
        if (heroVisible) { vid.play().catch(() => { /* autoplay policy */ }); }
        else { vid.pause(); }
      }
    }, { threshold: 0 });
    heroIO.observe(hero);

    onScroll();

    return () => {
      alive = false;
      clearTimeout(loadedTimer);
      if (vidEl) vidEl.removeEventListener('error', dropVideo);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
      delete (window as unknown as { __wahTick?: () => void }).__wahTick;
      io.disconnect(); cio.disconnect(); heroIO.disconnect();
    };
  }, []);

  /* Ambient loop: play only in view; hide the strip if the current file is missing.
     Re-runs per take so the remounted <video> gets observed again. */
  useEffect(() => {
    const vids = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-ambient]'));
    if (!vids.length) return;
    const prm = window.matchMedia('(prefers-reduced-motion: reduce)');
    /* Only v.error is authoritative here: a freshly remounted video sits in
       networkState NETWORK_NO_SOURCE for a beat before loading even starts. */
    for (const v of vids) { if (v.error) { setStoryOk(false); return; } }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (prm.matches) return;
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) { v.play().catch(() => { /* autoplay policy */ }); }
        else { v.pause(); }
      });
    }, { threshold: 0.15 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [storyOk]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={rootRef} className="site">
      <div ref={pagebarRef} className="pagebar" aria-hidden="true"></div>

      {/* Navigation */}
      <nav ref={navRef} className="nav" aria-label="Main">
        <div className="wrap nav-in">
          <a className="nav-logo" href="#top" aria-label="Work at Home Solutions — home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/logo.png" alt="Work@Home Solutions" />
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#focus">Focus</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="/opportunities">Opportunities</a>
            <a href="#contact" className="btn btn-signal">Partner With Us</a>
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
                <a href="#about" onClick={closeMenu}>About</a>
                <a href="#focus" onClick={closeMenu}>Focus</a>
                <a href="#services" onClick={closeMenu}>Services</a>
                <a href="#team" onClick={closeMenu}>Team</a>
                <a href="/opportunities" onClick={closeMenu}>Opportunities</a>
                <a href="#contact" onClick={closeMenu} className="btn btn-signal">Partner With Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header ref={heroRef} className="hero grain" id="top">
        <div ref={heroBgRef} className="hero-bg">
          <canvas ref={canvasRef} aria-hidden="true"></canvas>
          {heroVideoOk && (
            <video
              className="hero-video"
              src="/hero-takes/take-f.mp4"
              autoPlay muted loop playsInline
              preload="metadata"
              aria-hidden="true"
              onError={() => setHeroVideoOk(false)}
              onCanPlay={(e) => e.currentTarget.classList.add('ready')}
            />
          )}
        </div>
        <div className="hero-scrim"></div>
        <div ref={heroInnerRef} className="wrap hero-inner">
          <span className="live-chip fade-late"><i className="dot"></i>FOCUS PORTAL — LIVE OVERSIGHT</span>
          <h1 className="hero-h1">
            <span className="ln"><span>Operational</span></span>
            <span className="ln"><span>excellence,</span></span>
            <span className="ln"><span className="hollow">delivered remotely.</span></span>
          </h1>
          <p className="hero-sub fade-late">
            Your business deserves a partner that delivers consistency, accountability, and results —
            fully managed remote operations, visible in real time.
          </p>
          <div className="hero-cta fade-late">
            <a className="btn btn-signal" href="#contact">Start the conversation</a>
            <a className="btn btn-ghost" href="#services">Explore services</a>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">SCROLL<i></i></div>
      </header>

      {/* Proof band */}
      <section className="proof" aria-label="Key facts">
        <div className="wrap">
          <div className="proof-grid">
            <div className="stat rv"><b><span data-count="10">0</span>+</b><span>Years in operation</span></div>
            <div className="stat rv rv2"><b><span data-count="24">0</span><sub>/7</sub></b><span>Live oversight</span></div>
            <div className="stat rv rv3"><b><span data-count="100">0</span>%</b><span>Managed delivery</span></div>
            <div className="stat rv rv4"><b>0</b><span>Blind spots</span></div>
          </div>
        </div>
      </section>

      {/* Story / About */}
      <section id="about" className={`story${storyOk ? ' story-full' : ''}`}>
        {storyOk && (
          <div className="story-bg" aria-hidden="true">
            <video
              data-ambient
              src="/story-takes/story-a.mp4"
              muted loop playsInline preload="metadata"
              onError={() => setStoryOk(false)}
            />
            <div className="story-scrim"></div>
          </div>
        )}
        <div className="wrap split">
          <div className="rv">
            <p className="eyebrow">About</p>
            <h2 className="story-head">Growth should feel clear, not complicated.</h2>
          </div>
          <div className="story-copy story-card rv rv2">
            <p>
              For over a decade, we&apos;ve partnered with companies that want to scale confidently —
              without losing control of performance, culture, or customer experience.
            </p>
            <p>
              We don&apos;t just provide remote agents. We build <strong>structured teams</strong> supported
              by leadership, accountability, and systems that let you see exactly what&apos;s happening, in real time.
            </p>
            <p className="pull">
              Remote work without visibility is a risk. With the right infrastructure, it becomes a growth engine.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Portal — tour points + company video */}
      <section id="focus" className="focus grain">
        <div className="wrap focus-grid">
          <div className="rv">
            <p className="eyebrow">Focus Portal — guided tour</p>
            <div className="beats">
              <div className="rail"></div>
              <div className="beat">
                <em>01</em>
                <h3>Where your resources are</h3>
                <p>Every agent, every campaign, every shift — one roster, always current.</p>
              </div>
              <div className="beat">
                <em>02</em>
                <h3>How your team is performing</h3>
                <p>Live KPIs instead of end-of-month reports. Watch quality as it happens.</p>
              </div>
              <div className="beat">
                <em>03</em>
                <h3>How performance impacts revenue</h3>
                <p>Connect agent output directly to revenue, CLV, and churn reduction.</p>
              </div>
            </div>
          </div>
          <div className="focus-video rv rv2">
            <div className="reel-frame">
              {reelPlaying ? (
                <iframe
                  src="https://player.vimeo.com/video/1170844556?h=sv&title=0&byline=0&portrait=0&autoplay=1"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Work@Home Solutions overview"
                ></iframe>
              ) : (
                <button className="reel-cover" onClick={() => setReelPlaying(true)} aria-label="Play the company overview video, 2 minutes">
                  <span className="reel-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="reel-meta">PLAY — 02:03</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="titlecard rv">NO DELAYS. <b>NO BLIND SPOTS.</b> NO SURPRISES.</p>
      </section>

      {/* Services */}
      <section id="services" className={`services${storyOk ? ' services-video' : ''}`}>
        {storyOk && (
          <div className="story-bg" aria-hidden="true">
            <video
              data-ambient
              src="/story-takes/story-b.mp4"
              muted loop playsInline preload="metadata"
              onError={() => setStoryOk(false)}
            />
            <div className="story-scrim"></div>
          </div>
        )}
        <div className="wrap svc-layout">
          <div className="svc-aside rv">
            <p className="eyebrow">Engagement models</p>
            <h2 className="svc-head">Three ways to run your operation. One standard of control.</h2>
          </div>
          <div className="svc-grid rv rv2">
            <article className="svc">
              <span className="svc-tag"><i className="dot"></i>FULLY MANAGED</span>
              <h3>The Full Management Ecosystem</h3>
              <q>We don&apos;t just provide talent — we run the operation.</q>
              <p>We recruit, train, and manage your team while the Focus Platform gives you real-time visibility into every shift.</p>
              <dl>
                <div><dt>TARGET</dt><dd>Scaling companies wanting a fully managed remote workforce</dd></div>
                <div><dt>MODEL</dt><dd>Hourly fee + performance bonus</dd></div>
              </dl>
            </article>
            <article className="svc">
              <span className="svc-tag"><i className="dot"></i>WHITE LABEL</span>
              <h3>The White Label Partnership</h3>
              <q>We power your operations behind the scenes.</q>
              <p>We build and manage your team under your brand, integrating seamlessly into your systems to expand capacity.</p>
              <dl>
                <div><dt>TARGET</dt><dd>Agencies, CPAs, and software firms scaling fulfillment</dd></div>
                <div><dt>MODEL</dt><dd>B2B margin expansion</dd></div>
              </dl>
            </article>
            <article className="svc">
              <span className="svc-tag"><i className="dot"></i>TALENT ACCESS</span>
              <h3>The Talent Pool Advantage</h3>
              <q>Pre-vetted talent, ready when you are.</q>
              <p>We source and vet a curated pool of top-tier candidates tailored to your needs, ready for rapid deployment.</p>
              <dl>
                <div><dt>TARGET</dt><dd>Companies needing qualified talent without recruiting</dd></div>
                <div><dt>MODEL</dt><dd>Access retainer + placement fee</dd></div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team">
        <div className="wrap">
          <p className="eyebrow rv">Leadership</p>
          <h2 className="team-head rv rv2">The people driving your success.</h2>
          <div className="team-grid">
            <div className="member rv">
              <figure><Image src="/team-3.jpg" alt="Liz Gonzalez" fill sizes="(max-width: 920px) 100vw, 33vw" /></figure>
              <h3>Liz Gonzalez</h3>
              <span className="role">CEO / Managing Partner</span>
              <p>Campaign success, leadership development, and strategic operational growth.</p>
            </div>
            <div className="member rv rv2">
              <figure><Image src="/team-2.jpg" alt="Fernanda Soto" fill sizes="(max-width: 920px) 100vw, 33vw" /></figure>
              <h3>Fernanda Soto</h3>
              <span className="role">Administrative Operations Manager</span>
              <p>Human relations, staff profiling, and performance and quality oversight.</p>
            </div>
            <div className="member rv rv3">
              <figure><Image src="/team-1.jpg" alt="Aldo Perez" fill sizes="(max-width: 920px) 100vw, 33vw" /></figure>
              <h3>Aldo Perez</h3>
              <span className="role">Partner, CFO &amp; AI Tech Developer</span>
              <p>Financial strategy, AI application development, and technology infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="glow"></div>
        <div className="wrap">
          <div className="contact-split">
            <div>
              <p className="eyebrow rv">Contact</p>
              <h2 className="cta-head rv rv2">Ready to scale your operations?</h2>
              <p className="cta-sub rv rv3">
                Top-tier remote talent, hosted infrastructure, and executive-level transparency.
                Let&apos;s build your success story.
              </p>
              <div className="contacts rv rv4">
                <a className="contact-chip"
                  href="https://api.whatsapp.com/send/?phone=526634631001&text=Welcome+to+Work%40Home+Solutions%2C&type=phone_number&app_absent=0"
                  target="_blank" rel="noopener noreferrer">
                  <span>WhatsApp</span><b>+52 663 436 1001</b>
                </a>
                <a className="contact-chip" href="mailto:info@workathomecc.com">
                  <span>Email</span><b>info@workathomecc.com</b>
                </a>
              </div>
            </div>
            <div className="form-card rv rv3">
              <h3>Request a consultation</h3>
              <form action="https://formspree.io/f/meelndov" method="POST">
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="f-first">First name</label>
                    <input id="f-first" type="text" name="firstName" required placeholder="John" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-last">Last name</label>
                    <input id="f-last" type="text" name="lastName" required placeholder="Doe" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-email">Work email</label>
                  <input id="f-email" type="email" name="email" required placeholder="john@company.com" />
                </div>
                <div className="field">
                  <label htmlFor="f-company">Company</label>
                  <input id="f-company" type="text" name="company" placeholder="Your organization" />
                </div>
                <div className="field">
                  <label htmlFor="f-industry">Industry (optional)</label>
                  <input id="f-industry" type="text" name="industry" placeholder="Healthcare, tech, retail…" />
                </div>
                <div className="field">
                  <label htmlFor="f-message">How can we help?</label>
                  <textarea id="f-message" name="message" required rows={3} placeholder="Tell us about your operational needs…"></textarea>
                </div>
                <button type="submit" className="btn btn-signal">Send message</button>
                <p className="form-note">We respect your privacy. No spam, ever.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <a className="foot-logo" href="#top" aria-label="Back to top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/logo.png" alt="Work@Home Solutions" />
            </a>
            <div className="foot-col">
              175 SW 7th Street, Suite 1517-336<br />Miami, FL 33130
            </div>
            <div className="foot-links foot-col">
              <a href="https://www.linkedin.com/company/wahcc/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              <a href="https://www.facebook.com/workathomecc" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
              <a href="/opportunities">CAREERS</a>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 WORK@HOME SOLUTIONS</span>
            <span>OPERATIONAL EXCELLENCE, DELIVERED REMOTELY</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
