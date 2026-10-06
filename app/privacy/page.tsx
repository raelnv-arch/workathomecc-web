import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Privacy Notice | Work At Home Call Center',
  description: 'How Work At Home Call Center handles website inquiries, applications, and optional analytics.',
  alternates: { canonical: 'https://www.workathomecc.com/privacy' },
};

export default function PrivacyPage() {
  return <main className="privacy-page"><div className="wrap">
    <a href="/">← Work At Home Call Center</a>
    <h1>Website privacy notice</h1>
    <p>Updated October 6, 2026</p>
    <h2>Inquiries and applications</h2>
    <p>When you request a consultation, we receive the contact details and message you provide so we can respond and discuss our services. Consultation forms are processed through <a href="https://formspree.io/legal/privacy-policy/">Formspree</a>. Job applications are handled separately through <a href="https://web3forms.com/privacy">Web3Forms</a> for recruitment. Please avoid including sensitive information that is not needed for your request.</p>
    <h2>Optional website analytics</h2>
    <p>If you allow analytics, we use Google Analytics 4 to understand which pages people visit, how they find our website, and whether they submit a consultation request or click an email or WhatsApp contact link. Email and WhatsApp clicks indicate contact intent; they do not confirm that a conversation took place.</p>
    <p>We do not send your form entries—such as your name, email address, company, application information, or message—to Google Analytics. Our client inquiry events exclude recruitment actions. Analytics uses cookies such as <code>_ga</code> to distinguish visits. Google processes this data under its own policies; see <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p>
    <h2>Your choices</h2>
    <p>You can allow or decline analytics in the website notice and change your choice using “Cookie settings.” We store that preference in your browser. Declining analytics does not prevent you from using our forms or contacting us. Our Analytics integration does not enable Google advertising personalization.</p>
    <h2>External contact services</h2>
    <p>When you follow a WhatsApp, social media, or email link, the relevant service handles your interaction under its own policies.</p>
    <h2>Contact us</h2>
    <p>For questions about information you have submitted, or to request its correction or deletion, contact <a href="mailto:info@workathomecc.com">info@workathomecc.com</a>.</p>
  </div></main>;
}
