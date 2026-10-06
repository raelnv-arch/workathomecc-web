'use client';

import { FormEvent, useRef, useState } from 'react';
import { trackInquiryEvent } from './analytics';

export default function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setStatus('sending');
    try {
      const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Submission not accepted');
      form.reset();
      setStatus('success');
      trackInquiryEvent('generate_lead', { contact_method: 'consultation_form' });
    } catch {
      setStatus('error');
    } finally { submitting.current = false; }
  }

  return <form id="consultation-form" action="https://formspree.io/f/meelndov" method="POST" onSubmit={submit} aria-busy={status === 'sending'}>
    <div className="form-grid">
      <div className="field"><label htmlFor="f-first">First name</label><input id="f-first" type="text" name="firstName" autoComplete="given-name" required placeholder="John" /></div>
      <div className="field"><label htmlFor="f-last">Last name</label><input id="f-last" type="text" name="lastName" autoComplete="family-name" required placeholder="Doe" /></div>
    </div>
    <div className="field"><label htmlFor="f-email">Work email</label><input id="f-email" type="email" name="email" autoComplete="email" required placeholder="john@company.com" /></div>
    <div className="field"><label htmlFor="f-company">Company</label><input id="f-company" type="text" name="company" autoComplete="organization" placeholder="Your organization" /></div>
    <div className="field"><label htmlFor="f-industry">Industry (optional)</label><input id="f-industry" type="text" name="industry" placeholder="Healthcare, tech, retail…" /></div>
    <div className="field"><label htmlFor="f-message">How can we help?</label><textarea id="f-message" name="message" required rows={3} placeholder="Tell us about your operational needs…" /></div>
    <button type="submit" className="btn btn-signal" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
    <div aria-live="polite" aria-atomic="true">
      {status === 'success' && <p className="consultation-status">Thank you. Your consultation request has been received. Our team will follow up with you.</p>}
    </div>
    {status === 'error' && <p className="consultation-status consultation-error" role="alert">We couldn’t confirm your submission. Your details are still here—please try again, or <a href="mailto:info@workathomecc.com">email our team</a>.</p>}
    <p className="form-note">We respect your privacy. No spam, ever. <a href="/privacy">Privacy notice</a></p>
  </form>;
}
