import type { Metadata } from 'next';
import ApplicationForm from '../../opportunities/ApplicationForm';

export const metadata: Metadata = {
  title: 'Pre-Interview Application — Work@Home Call Center',
  description: 'Work@Home Call Center pre-interview application form.',
  robots: { index: false, follow: false },
};

export default function EmbeddedApplicationPage() {
  return (
    <main className="site embed-application">
      <h1 className="sr-only">Work@Home Call Center pre-interview application</h1>
      <ApplicationForm />
    </main>
  );
}