export const MEASUREMENT_ID = 'G-1BZFDFMX30';
export const ANALYTICS_CHOICE_KEY = 'wah-analytics-choice';
export type AnalyticsChoice = 'accepted' | 'declined';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readAnalyticsChoice(): AnalyticsChoice | null {
  try {
    const choice = localStorage.getItem(ANALYTICS_CHOICE_KEY);
    return choice === 'accepted' || choice === 'declined' ? choice : null;
  } catch { return null; }
}

export function isProductionWebsite() {
  return ['www.workathomecc.com', 'workathomecc.com'].includes(window.location.hostname);
}

// A fixed set of event fields: never pass form values or contact details to GA.
export function trackInquiryEvent(name: 'generate_lead' | 'contact_click', parameters: {
  contact_method: 'consultation_form' | 'whatsapp' | 'email';
}) {
  if (readAnalyticsChoice() !== 'accepted' || !isProductionWebsite()) return;
  try {
    window.gtag?.('event', name, {
      contact_method: parameters.contact_method,
      inquiry_type: 'client',
      page_path: window.location.pathname,
      transport_type: 'beacon',
    });
  } catch { /* Analytics must never interrupt a submission or contact link. */ }
}

export function analyticsPageLocation() {
  const url = new URL(window.location.origin + window.location.pathname);
  const query = new URLSearchParams(window.location.search);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content']) {
    const value = query.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.href;
}
