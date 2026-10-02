import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.workathomecc.com/',
  },
};

export default function Page() {
  return <HomePage />;
}
