'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ANALYTICS_CHOICE_KEY, MEASUREMENT_ID, AnalyticsChoice, analyticsPageLocation, isProductionWebsite, readAnalyticsChoice, trackInquiryEvent } from './analytics';

export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [production, setProduction] = useState(false);
  const configured = useRef(false);
  const previousPage = useRef<string | null>(null);

  useEffect(() => {
    setChoice(readAnalyticsChoice());
    setProduction(isProductionWebsite());
    setReady(true);
    const syncChoice = () => setChoice(readAnalyticsChoice());
    window.addEventListener('storage', syncChoice);
    return () => window.removeEventListener('storage', syncChoice);
  }, []);

  useEffect(() => {
    if (!production || choice !== 'accepted') return;
    const flags = window as unknown as Record<string, unknown>;
    flags[`ga-disable-${MEASUREMENT_ID}`] = false;
    if (!configured.current) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
      window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      configured.current = true;
    }
    window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    const location = analyticsPageLocation();
    let referrer = previousPage.current || '';
    if (!referrer && document.referrer) {
      try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* Invalid referrer: omit it. */ }
    }
    window.gtag?.('set', { page_location: location, page_referrer: referrer });
    window.gtag?.('event', 'page_view', { page_location: location, page_referrer: referrer, page_title: document.title });
    previousPage.current = location;
  }, [choice, pathname, production]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || window.location.pathname.startsWith('/opportunities')) return;
      const anchor = event.target.closest('a');
      const href = anchor?.getAttribute('href') || '';
      if (href.startsWith('mailto:')) trackInquiryEvent('contact_click', { contact_method: 'email' });
      else if (href.startsWith('https://wa.me/')) trackInquiryEvent('contact_click', { contact_method: 'whatsapp' });
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function saveChoice(nextChoice: AnalyticsChoice) {
    try { localStorage.setItem(ANALYTICS_CHOICE_KEY, nextChoice); } catch { /* Browsing still works when storage is blocked. */ }
    if (nextChoice === 'declined') {
      (window as unknown as Record<string, unknown>)[`ga-disable-${MEASUREMENT_ID}`] = true;
      window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (!/^_ga($|_)/.test(name)) continue;
        for (const domain of ['', '; domain=workathomecc.com', '; domain=.workathomecc.com', `; domain=${window.location.hostname}`]) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
        }
      }
    }
    setChoice(nextChoice);
    setShowSettings(false);
  }

  return <>
    {ready && production && choice === 'accepted' && <Script id="wah-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />}
    {ready && (choice === null || showSettings) && <section className="analytics-notice" aria-label="Analytics preferences">
      <div><strong>Help us improve your experience</strong><p>Allow optional analytics cookies to help us understand visits and inquiries. Your choice won’t affect forms or contact options. <a href="/privacy">Privacy notice</a></p></div>
      <div className="analytics-actions"><button type="button" onClick={() => saveChoice('declined')}>Decline analytics</button><button type="button" onClick={() => saveChoice('accepted')}>Allow analytics</button></div>
    </section>}
    {ready && choice !== null && !showSettings && <button className="analytics-settings" type="button" onClick={() => setShowSettings(true)}>Cookie settings</button>}
  </>;
}
