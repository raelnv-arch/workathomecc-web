import type { Metadata } from 'next';
import SocialLinks from '../SocialLinks';
import styles from './page.module.css';

const url = 'https://www.workathomecc.com/tijuana-call-center';
const title = 'Bilingual Call Center & BPO Services in Tijuana | Work@Home';
const description = 'Outsource call center and BPO services to a bilingual team headquartered in Tijuana. Lead qualification, warm transfers, customer support and appointment setting for U.S. and Canadian businesses. No minimum team size.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: ['/og.jpg'] },
  twitter: { title, description, card: 'summary_large_image', images: ['/og.jpg'] },
};

const services = [
  { title: 'Lead qualification & warm transfers', text: 'Contact prospects, gauge interest, qualify against your criteria, and connect interested customers to your closing team.' },
  { title: 'Appointment setting & callbacks', text: 'Connect leads to an available specialist or schedule a callback when your team is unavailable.' },
  { title: 'Customer service & retention', text: 'Handle customer questions, follow up with existing customers, and support retention workflows under your brand.' },
  { title: 'Technical support', text: 'Help customers through your support process, document the issue, and route escalations to the right person in your operation.' },
  { title: 'Recruitment interviewing', text: 'Interview applicants against your role requirements and screen for fit, reliability, and suitability.' },
  { title: 'Managed BPO operations', text: 'Bring recruiting, training, quality assurance, employee management, and payroll into one managed team arrangement.' },
];

const campaigns = [
  { industry: 'Education', task: 'Recruitment & interviewing', seats: '20–25', detail: 'Interviewed candidates for school-based support roles, screening for fit, reliability, and suitability.' },
  { industry: 'Auto insurance', task: 'Customer service & retention', seats: '16–20', detail: 'Contacted insurance leads, supported coverage review and updates, assisted existing policyholders, and handled service inquiries.' },
  { industry: 'Debt relief', task: 'Live connections & callbacks', seats: '16', detail: 'Connected leads to debt specialists and scheduled callback appointments when a specialist was unavailable.' },
  { industry: 'Insurance', task: 'Aged-lead prequalification', seats: '12', detail: 'Contacted older leads, prequalified interested prospects, and routed them into the sales pipeline.' },
];

const faqs = [
  { question: 'What call center services does Work@Home offer in Tijuana?', answer: 'Work@Home provides bilingual call center and BPO teams headquartered in Tijuana, Baja California. Services include outbound lead qualification, warm transfers, appointment setting, customer service, retention, technical support, recruitment interviewing, and managed team operations.' },
  { question: 'Do you work with businesses in the United States and Canada?', answer: 'Yes. We build teams for U.S. and Canadian businesses. We agree the required schedule, systems, brand guidelines, and responsibilities with you before launch.' },
  { question: 'Is there a minimum team size?', answer: 'No. There is no minimum team size. We scope the team around your workload, coverage requirements, and the level of management you need.' },
  { question: 'Are your agents remote, and do we need to visit an office?', answer: 'Our delivery model is remote, with headquarters in Tijuana, Baja California. Many of our agents work from home. Client coordination, training, instructions, and payments are handled online; an office visit is not required to work with us.' },
  { question: 'Can agents work in our systems and under our brand?', answer: 'Yes. We build teams to work in your systems, follow your workflows, and represent your brand. System access, escalation paths, and reporting expectations are agreed during setup.' },
  { question: 'Do you supply leads or close sales?', answer: 'In our three-year personal-loan campaign, the client supplied the leads and loan specialists. Our agents handled initial qualification and warm transfers; the client’s specialists handled closing. We define lead sourcing, qualification criteria, and closing responsibilities for each engagement.' },
  { question: 'How much does outsourcing cost, and how quickly can we start?', answer: 'Pricing and launch timing depend on the work, team size, schedule, training, and management scope. Share your current workflow and coverage needs so we can prepare a proposal and agree a launch plan.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Bilingual call center and BPO services in Tijuana',
      url,
      description,
      serviceType: 'Call center and business process outsourcing',
      provider: { '@type': 'Organization', name: 'Work@Home Call Center', url: 'https://www.workathomecc.com/' },
      areaServed: [{ '@type': 'Country', name: 'United States' }, { '@type': 'Country', name: 'Canada' }],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.workathomecc.com/' },
        { '@type': 'ListItem', position: 2, name: 'Tijuana call center & BPO', item: url },
      ],
    },
  ],
};

export default function TijuanaCallCenterPage() {
  return (
    <div className={`site ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a className={styles.skipLink} href="#tijuana-main">Skip to content</a>
      <header className={styles.header}>
        <nav className={`wrap ${styles.nav}`} aria-label="Main">
          <a href="/" className={styles.logo} aria-label="Work at Home Call Center — home">
            <img src="/logo.png" width="200" height="80" alt="Work@Home Call Center" />
          </a>
          <div className={styles.navLinks}>
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#questions">FAQs</a>
            <a className="btn btn-signal" href="/#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>

      <main id="tijuana-main">
        <section className={styles.hero} aria-labelledby="tijuana-heading">
          <div className="wrap">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Tijuana call center &amp; BPO</span>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className="eyebrow">Based in Baja. Built around your business.</p>
                <h1 id="tijuana-heading">Bilingual call center &amp; BPO services <span>in Tijuana.</span></h1>
                <p className={styles.heroText}>Work@Home builds bilingual call center and BPO teams headquartered in Tijuana, Baja California for U.S. and Canadian businesses. Your team works remotely on your schedule, in your systems, and under your brand.</p>
                <div className={styles.actions}>
                  <a className="btn btn-signal" href="/#contact">Discuss your team <span aria-hidden="true">↗</span></a>
                  <a className={styles.textLink} href="#experience">See our campaign experience <span aria-hidden="true">↓</span></a>
                </div>
                <p className={styles.heroNote}>No minimum team size. Scope built around your operation.</p>
              </div>
              <aside className={styles.delivery} aria-label="How your team fits into your operation">
                <p className={styles.smallLabel}>One team. Your way of working.</p>
                <div><span className={styles.number}>01</span><h2>Your clock</h2><p>Coverage aligned to your business schedule.</p></div>
                <div><span className={styles.number}>02</span><h2>Your systems</h2><p>Workflows that fit into your existing operation.</p></div>
                <div><span className={styles.number}>03</span><h2>Your brand</h2><p>Agents representing your business to your customers.</p></div>
                <a href="/#focus">Explore the Focus Portal <span aria-hidden="true">↗</span></a>
              </aside>
            </div>
          </div>
        </section>

        <section id="services" className={`${styles.section} ${styles.light}`} aria-labelledby="services-heading">
          <div className="wrap">
            <div className={styles.sectionHead}>
              <p className="eyebrow">Call center &amp; BPO services</p>
              <h2 id="services-heading">Put the right team<br />behind the work.</h2>
              <p>Choose the work you want to outsource. We’ll define the responsibilities, staffing, training, and management your operation needs.</p>
            </div>
            <div className={styles.serviceGrid}>
              {services.map((service, index) => <article className={styles.service} key={service.title}>
                <span className={styles.smallLabel}>0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p>
              </article>)}
            </div>
            <p className={styles.modelLink}>Need a fully managed team, a white label partnership, or access to talent? <a href="/#services">Explore our engagement models <span aria-hidden="true">↗</span></a></p>
          </div>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-heading">
          <div className="wrap">
            <div className={styles.sectionHead}>
              <p className="eyebrow">Past campaign experience</p>
              <h2 id="experience-heading">Real work.<br />Established experience.</h2>
              <p>Five campaigns across lending, insurance, debt relief, and education. Here’s the work our teams have staffed and managed.</p>
            </div>
            <article className={styles.featured}>
              <div className={styles.featuredMetric}><span className={styles.smallLabel}>Personal loans</span><strong>85<span>seats</span></strong><p>Three-year engagement</p></div>
              <div><h3>From first conversation<br />to a qualified handoff.</h3><p>Agents called pre-qualified leads supplied by the client, gauged interest, and warm-transferred qualified applicants to a loan specialist for closing.</p><p>Work@Home handled quality assurance, training, employee management, and payroll throughout the engagement.</p><span className={styles.workflow}>Client-provided leads <span aria-hidden="true">→</span> Qualification <span aria-hidden="true">→</span> Client’s closing team</span></div>
            </article>
            <div className={styles.campaigns}>
              {campaigns.map(campaign => <article className={styles.campaign} key={campaign.task}>
                <div><span className={styles.smallLabel}>{campaign.industry}</span><h3>{campaign.task}</h3></div>
                <p>{campaign.detail}</p><div className={styles.seats}>{campaign.seats}<span>seats</span></div>
              </article>)}
            </div>
            <p className={styles.caption}>Seat figures describe historical campaign sizes and vary by engagement.</p>
            <section id="client-feedback" className={styles.testimonials} aria-labelledby="client-feedback-heading">
              <p className="eyebrow">Historical client feedback</p>
              <h3 id="client-feedback-heading">From our client’s perspective.</h3>
              <div className={styles.testimonialGrid}>
                <figure>
                  <blockquote><p>“We can implement changes on the fly”</p></blockquote>
                  <figcaption>Lending client · Managing partner<br /><time dateTime="2023-02">February 2023</time></figcaption>
                </figure>
                <figure>
                  <blockquote><p>“Your willingness to collaborate with us at our pace regarding campaign changes is greatly appreciated and shows a strong commitment to our partnership.”</p></blockquote>
                  <figcaption>Lending client · Operations manager<br /><time dateTime="2025-05">May 2025</time></figcaption>
                </figure>
              </div>
              <p className={styles.caption}>Excerpts from one lending client’s seasonal customer satisfaction surveys. Respondents are anonymous.</p>
            </section>
          </div>
        </section>

        <section className={`${styles.section} ${styles.operating}`} aria-labelledby="operating-heading">
          <div className={`wrap ${styles.operatingGrid}`}>
            <div className={styles.sectionHead}>
              <p className="eyebrow">Remote delivery. Managed operations.</p>
              <h2 id="operating-heading">Built in Tijuana.<br />Connected to you.</h2>
              <p>Our headquarters are in Baja California. Many of our agents work from home, and client coordination, training, instructions, and payments happen online. You can work with us without an office visit.</p>
              <a className={styles.textLink} href="/#team">Meet our leadership <span aria-hidden="true">↗</span></a>
            </div>
            <ol className={styles.steps}>
              <li><span className={styles.number}>01</span><div><h3>Define the work</h3><p>Agree on responsibilities, qualification criteria, coverage, systems, reporting, and escalation paths.</p></div></li>
              <li><span className={styles.number}>02</span><div><h3>Prepare the team</h3><p>Match staffing and training to your workflow, brand, and chosen engagement model.</p></div></li>
              <li><span className={styles.number}>03</span><div><h3>Manage the delivery</h3><p>Launch with agreed oversight, quality checks, and communication so you can follow the work as it happens.</p></div></li>
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.industries}`} aria-labelledby="industries-heading">
          <div className="wrap">
            <div className={styles.sectionHead}>
              <p className="eyebrow">Your industry. Your workflow.</p>
              <h2 id="industries-heading">Let’s talk about<br />your operation.</h2>
              <p>Our campaign experience spans four industries. We also discuss outsourcing needs with businesses in other sectors, based on the work and support they need.</p>
            </div>
            <ul className={styles.industryList}>{['Financial services', 'Home services', 'Technology & SaaS', 'Real estate & property', 'Insurance', 'Healthcare', 'E-commerce & retail', 'Logistics & transportation'].map(industry => <li key={industry}>{industry}</li>)}</ul>
          </div>
        </section>

        <section id="questions" className={`${styles.section} ${styles.light}`} aria-labelledby="questions-heading">
          <div className={`wrap ${styles.faqGrid}`}>
            <div className={styles.sectionHead}><p className="eyebrow">Before we get started</p><h2 id="questions-heading">Your questions,<br />answered.</h2><p>A few practical details about outsourcing with Work@Home.</p></div>
            <div className={styles.faqs}>{faqs.map((faq, index) => <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span className={styles.plus} aria-hidden="true" /></summary><p>{faq.answer}</p>
            </details>)}</div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contact}`} aria-labelledby="consultation-heading">
          <div className={`wrap ${styles.contactGrid}`}>
            <div><p className="eyebrow">Start the conversation</p><h2 id="consultation-heading">What could your team<br />take off your plate?</h2><p>Tell us about your workflow, schedule, and the work you want to outsource. We’ll scope a team around your business.</p></div>
            <div className={styles.contactActions}><a className="btn btn-signal" href="/#contact">Request a consultation <span aria-hidden="true">↗</span></a><a href="mailto:info@workathomecc.com">info@workathomecc.com</a><a href="https://wa.me/526634361001" target="_blank" rel="noopener noreferrer">WhatsApp +52 663 436 1001 <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <a className="foot-logo" href="/" aria-label="Work at Home Call Center — home"><img src="/logo-mist.png" width="90" height="38" alt="Work@Home Call Center" /></a>
            <address className="foot-col foot-address">Ave Manuel M de Leon 1301 1 1001<br />Rio Tijuana Zona Oriente<br />Tijuana, Baja California, Mexico 22010</address>
            <address className="foot-col foot-address">175 SW 7th Street, Suite 1517-336<br />Miami, FL 33130, United States</address>
            <div className="foot-links foot-col"><a href="/opportunities">Careers</a></div>
            <SocialLinks />
          </div>
          <div className="foot-base"><span>© 2026 WORK AT HOME CALL CENTER</span><span>OPERATIONAL EXCELLENCE, DELIVERED REMOTELY</span></div>
        </div>
      </footer>
    </div>
  );
}
