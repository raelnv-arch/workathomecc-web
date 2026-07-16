"use client";

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   DELIVERY + STORAGE (all values below are public by design)

   Web3Forms  — emails each application to info@workathomecc.com.
                Free tier: 250 submissions/month, account-wide.
   Cloudinary — stores the two required screenshots via *unsigned*
                upload, so no API secret ever touches this code.
                Free tier: 25 credits/mo (~25GB). The form sends
                Cloudinary's returned link in the email.
   ───────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = '8933a1f2-fa63-4c4c-aef4-2b75233a478f';
const CLOUDINARY_CLOUD = 're6qusuq';
const CLOUDINARY_PRESET = 'wah_apply';

const WHATSAPP_RECRUITING = '526611307787';
const CANDIDATE_PORTAL = 'https://apply.workathomesolutions.tech/';

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // Cloudinary free tier caps images at 10MB

const ENGLISH_LEVELS = ['Basic', 'Intermediate', 'Advanced', 'Native / Bilingual'];
const EXPERIENCE = ['No experience yet', 'Less than 1 year', '1–2 years', '3–5 years', '5+ years'];
const CONTACT_METHODS = ['Phone', 'Email', 'WhatsApp'];

const SYSTEM_REQS = [
  {
    label: 'Processor (CPU)',
    lines: [
      ['Intel i5 2.0GHz quad-core', 'or better — netbook CPUs such as Intel Atom are not supported'],
      ['AMD Ryzen 5 3500', 'or better'],
      ['Apple M1 chip', 'or better — the M1 is equivalent to an Intel i7'],
    ],
  },
  {
    label: 'Operating system',
    lines: [
      ['Windows 10 64-bit', 'or better (Home or Professional)'],
      ['macOS 10.14 Mojave', 'or better — iOS and iPadOS are not supported'],
    ],
  },
  { label: 'RAM', lines: [['8 GB', 'devoted to Convoso services']] },
  { label: 'Free space', lines: [['40 GB', 'or at least 40% of the main drive — whichever is higher']] },
  { label: 'USB port', lines: [['2.0 or 3.0', 'at least one port must be available']] },
];

async function uploadScreenshot(file: File): Promise<string> {
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', CLOUDINARY_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST',
    body,
  });
  if (!res.ok) throw new Error(`Cloudinary rejected the upload (${res.status})`);
  const data = await res.json();
  if (!data.secure_url) throw new Error('Cloudinary returned no URL');
  return data.secure_url as string;
}

/* Renders an example screenshot only once it's confirmed to load.
   An <img onError> can't be trusted here: the request fires while the
   server-rendered HTML parses, before React attaches the handler, so a
   missing file would leave a broken icon on the page. Probing from the
   client instead means these appear the moment the files are added to
   /public/apply and stay invisible until then. */
function ExampleImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setLoaded(true);
    probe.src = src;
  }, [src]);

  if (!loaded) return null;
  return <img src={src} alt={alt} loading="lazy" />;
}

/* A Yes/No question — the form has seven of them. */
function YesNo({ name, label, note }: { name: string; label: string; note?: string }) {
  return (
    <fieldset className="q">
      <legend className="q-label">
        {label} <span className="req" aria-hidden="true">*</span>
      </legend>
      {note && <p className="q-note">{note}</p>}
      <div className="q-opts">
        {['Yes', 'No'].map((v) => (
          <label className="opt" key={v}>
            <input type="radio" name={name} value={v} required />
            <span>{v}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function FileField({
  id,
  label,
  file,
  onPick,
  error,
}: {
  id: string;
  label: string;
  file: File | null;
  onPick: (f: File | null) => void;
  error?: string;
}) {
  return (
    <div className="q">
      <label className="q-label" htmlFor={id}>
        {label} <span className="req" aria-hidden="true">*</span>
      </label>
      <label className={`drop${file ? ' has-file' : ''}`} htmlFor={id}>
        <input
          id={id}
          type="file"
          accept="image/png,image/jpeg"
          className="drop-input"
          onChange={(e) => onPick(e.currentTarget.files?.[0] ?? null)}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        </svg>
        <b>{file ? file.name : 'Choose a screenshot'}</b>
        <em>{file ? 'Click to replace' : 'PNG or JPG · 10 MB max'}</em>
      </label>
      {error && <p className="q-err">{error}</p>}
    </div>
  );
}

export default function ApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [stage, setStage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cpuShot, setCpuShot] = useState<File | null>(null);
  const [speedShot, setSpeedShot] = useState<File | null>(null);
  const [fileErr, setFileErr] = useState<{ cpu?: string; speed?: string }>({});
  const [contactErr, setContactErr] = useState('');

  function pick(which: 'cpu' | 'speed') {
    return (f: File | null) => {
      const tooBig = f && f.size > MAX_UPLOAD_BYTES;
      setFileErr((p) => ({ ...p, [which]: tooBig ? 'That image is over 10 MB — please use a smaller screenshot.' : undefined }));
      const value = tooBig ? null : f;
      if (which === 'cpu') setCpuShot(value);
      else setSpeedShot(value);
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Native validation covers every field except the file pickers and the
    // checkbox group — a required checkbox marks each box required
    // individually, so the group needs checking by hand.
    const noContact = form.querySelectorAll('input[name="Preferred contact method"]:checked').length === 0;
    const missing = { cpu: !cpuShot, speed: !speedShot };

    setContactErr(noContact ? 'Please choose at least one way for us to contact you.' : '');
    setFileErr({
      cpu: missing.cpu ? 'Please attach a screenshot of your processor.' : undefined,
      speed: missing.speed ? 'Please attach a screenshot of your speed test.' : undefined,
    });

    if (noContact || missing.cpu || missing.speed) {
      requestAnimationFrame(() => {
        document.querySelector('.q-err')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setStatus('sending');
    try {
      setStage('Uploading your screenshots…');
      const [cpuUrl, speedUrl] = await Promise.all([uploadScreenshot(cpuShot!), uploadScreenshot(speedShot!)]);

      setStage('Sending your application…');
      const data = new FormData(form);
      data.append('Processor screenshot', cpuUrl);
      data.append('Speed test screenshot', speedUrl);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'The application could not be sent.');

      setStatus('success');
      form.reset();
      setCpuShot(null);
      setSpeedShot(null);
      window.scrollTo({ top: (document.getElementById('apply')?.offsetTop ?? 0) - 80, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    } finally {
      setStage('');
    }
  }

  if (status === 'success') {
    return (
      <div className="apply-done" role="status" aria-live="polite">
        <div className="apply-done-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3>Application received.</h3>
        <p>
          Thank you for applying to Work@Home Call Center. One of our recruiters will reach out to you as
          soon as possible.
        </p>
        <div className="done-next">
          <p className="done-next-h">One last step — track your application</p>
          <p>
            Create an account on our candidate platform to follow your application status and contact HR
            with any questions.
          </p>
          <div className="done-cta">
            <a className="btn btn-signal" href={CANDIDATE_PORTAL} target="_blank" rel="noopener noreferrer">
              Create your account
            </a>
            <a
              className="btn btn-ghost"
              href={`https://wa.me/${WHATSAPP_RECRUITING}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with Recruiting
            </a>
          </div>
          {/* Desktop only — you can't scan a QR with the phone that's showing it. */}
          <div className="qr-block">
            <img src="/apply/whatsapp-qr.svg" alt="QR code that opens a WhatsApp chat with Work@Home Recruiting" width={132} height={132} />
            <p>Or scan to chat with Recruiting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card apply-card" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New Pre-Interview Application — Work@Home Call Center" />
      <input type="hidden" name="from_name" value="Work@Home Careers Site" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

      {/* ── 1. About you ─────────────────────────────────── */}
      <p className="sec-head"><i>01</i> About you</p>

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

      <fieldset className="q">
        <legend className="q-label">
          Preferred contact method — check all that apply <span className="req" aria-hidden="true">*</span>
        </legend>
        <div className="q-opts">
          {CONTACT_METHODS.map((m) => (
            <label className="opt" key={m}>
              <input
                type="checkbox"
                name="Preferred contact method"
                value={m}
                onChange={() => contactErr && setContactErr('')}
              />
              <span>{m}</span>
            </label>
          ))}
        </div>
        {contactErr && <p className="q-err">{contactErr}</p>}
      </fieldset>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="a-start">Availability to start</label>
          <input id="a-start" type="text" name="Availability to start" required placeholder="Immediately, in 2 weeks…" />
        </div>
        <div className="field">
          <label htmlFor="a-english">English proficiency</label>
          <select id="a-english" name="English proficiency" required defaultValue="">
            <option value="" disabled>Select…</option>
            {ENGLISH_LEVELS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* ── 2. Job specific questions ────────────────────── */}
      <p className="sec-head"><i>02</i> Job specific questions</p>

      {/* Graded rather than yes/no: this answers "do you have previous call
          centre experience?" and how much, in one question. */}
      <div className="field">
        <label htmlFor="a-exp">Previous call-center experience</label>
        <select id="a-exp" name="Previous call-center experience" required defaultValue="">
          <option value="" disabled>Select…</option>
          {EXPERIENCE.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <YesNo name="Comfortable working remotely" label="Are you comfortable working remotely?" />

      <YesNo
        name="Speaks fluent conversational English (90% minimum)"
        label="Do you speak fluent conversational English (90% minimum)?"
        note="This is a requirement for all campaigns."
      />

      <div className="q">
        <label className="q-label" htmlFor="a-hours">
          Are you willing to work evenings, weekends, or holidays? <span className="req" aria-hidden="true">*</span>
        </label>
        <p className="q-note">
          Yes or no — or tell us exactly what works for you, such as “weekends only”, “mornings only”, or
          “any day except holidays”.
        </p>
        <input
          id="a-hours"
          type="text"
          name="Willing to work evenings, weekends, or holidays"
          required
          placeholder="e.g. Yes · Weekends only · Evenings after 6pm"
        />
      </div>

      <YesNo name="Willing to take cold calls" label="Are you willing to take cold calls?" />

      <YesNo name="Experience working with CRMs" label="Do you have experience working with CRMs?" />

      <div className="field">
        <label htmlFor="a-crm">If yes, which CRM? <span className="opt-tag">— optional</span></label>
        <input id="a-crm" type="text" name="Which CRM" placeholder="Salesforce, HubSpot, Zoho…" />
      </div>

      <YesNo
        name="Has own computer, USB headset and ethernet connection"
        label="Do you have your own computer, USB headset, and an ethernet connection to the modem?"
        note="This is a requirement — Wi-Fi only is not accepted."
      />

      {/* ── 3. Equipment & connection ────────────────────── */}
      <p className="sec-head"><i>03</i> Equipment &amp; connection</p>

      <p className="q-intro">
        To ensure compatibility with our dialer system, please review the minimum equipment specifications
        below. We want to help you succeed, so please note that meeting these requirements is essential for
        your application to proceed.
      </p>

      <div className="reqs">
        <p className="reqs-h">Minimum system requirements</p>
        <dl>
          {SYSTEM_REQS.map((r) => (
            <div className="reqs-row" key={r.label}>
              <dt>{r.label}</dt>
              <dd>
                {r.lines.map(([strong, rest]) => (
                  <p key={strong}><b>{strong}</b> {rest}</p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <YesNo
        name="Computer meets the minimum requirements"
        label="Does your computer meet these requirements?"
        note="Intel Core i5/i7 or higher, Mac (M1/M2), or AMD Ryzen 5/7 or higher. We do not accept AMD Celeron or Intel Pentium processors."
      />

      <FileField
        id="a-cpu"
        label="Upload a screenshot showing your processor"
        file={cpuShot}
        onPick={pick('cpu')}
        error={fileErr.cpu}
      />
      <details className="how">
        <summary>How do I find my processor information?</summary>
        <ol>
          <li>Press the <b>Windows</b> key, type <b>System Information</b>, and open it.</li>
          <li>Find the row labelled <b>Processor</b> — it shows your CPU name and speed.</li>
          <li>Press <b>PrtScn</b>, or use the <b>Snipping Tool</b>, to capture it.</li>
          <li>Save the image, then attach it above.</li>
        </ol>
        <ExampleImage
          src="/apply/example-cpu.png"
          alt="Example: a Windows Device specifications panel with the Processor and Installed RAM rows highlighted."
        />
      </details>

      <YesNo
        name="Internet speed 50 down / 10 up or above"
        label="Do you have an internet speed of 50 Mbps download / 10 Mbps upload or above?"
        note="Satellite connections are not accepted."
      />

      <FileField
        id="a-speed"
        label="Upload a screenshot of your speed test"
        file={speedShot}
        onPick={pick('speed')}
        error={fileErr.speed}
      />
      <details className="how">
        <summary>How do I run a speed test?</summary>
        <ol>
          <li>Go to <a href="https://fast.com" target="_blank" rel="noopener noreferrer">fast.com</a> and let it finish.</li>
          <li>Click <b>Show more info</b> so the upload speed appears.</li>
          <li>Capture the screen and attach the image above.</li>
        </ol>
        <ExampleImage
          src="/apply/example-speed.png"
          alt="Example: a fast.com result showing download speed, latency and upload speed."
        />
      </details>

      {/* ── 4. A little more about you ───────────────────── */}
      <p className="sec-head"><i>04</i> A little more about you</p>

      <div className="field">
        <label htmlFor="a-why">Write a brief summary explaining why you want to be part of our team.</label>
        <textarea id="a-why" name="Why they want to be part of the team" required rows={4} placeholder="Tell us a little about your experience and what you're looking for…"></textarea>
      </div>

      <div className="field">
        <label htmlFor="a-voice">
          Tell us about your experience with cold calling, sales, and appointment setting
          <span className="opt-tag">— optional</span>
        </label>
        <p className="q-note">
          Record a brief audio response at{' '}
          <a href="https://vocaroo.com" target="_blank" rel="noopener noreferrer">vocaroo.com</a>, generate your
          shareable link, and paste it below.
        </p>
        <input id="a-voice" type="url" name="Vocaroo audio link" placeholder="https://voca.ro/…" />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="a-link">LinkedIn or résumé link <span className="opt-tag">— optional</span></label>
          <input id="a-link" type="url" name="LinkedIn / résumé link" placeholder="https://linkedin.com/in/…" />
        </div>
        <div className="field">
          <label htmlFor="a-ref">Referred by a staff member? <span className="opt-tag">— optional</span></label>
          <input id="a-ref" type="text" name="Referred by" placeholder="Their name" />
        </div>
      </div>

      <YesNo
        name="Understands independent contractor status"
        label="Do you agree and understand that you would be an independent contractor and do not receive any governmental benefits?"
      />

      <button type="submit" className="btn btn-signal" disabled={status === 'sending'}>
        {status === 'sending' ? stage || 'Sending…' : 'Submit application'}
      </button>

      {status === 'error' && (
        <p className="apply-error" role="alert">
          {errorMsg} Please try again, or email us at <a href="mailto:info@workathomecc.com">info@workathomecc.com</a>.
        </p>
      )}

      <p className="form-note">Your information is kept private and used only for recruiting.</p>
    </form>
  );
}
