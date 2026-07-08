import './globals.css';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const disp = Archivo({ subsets: ['latin'], variable: '--font-disp' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
    metadataBase: new URL('https://www.workathomecc.com'),
    title: 'Work@Home Call Center',
    description: 'Empower Your Business. Elevate Your Performance.',
    openGraph: {
        type: 'website',
        url: 'https://www.workathomecc.com',
        siteName: 'Work@Home Call Center',
        title: 'Work@Home Call Center',
        description: 'Operational excellence, delivered remotely. Top-tier remote talent, hosted infrastructure, and executive-level transparency.',
        locale: 'en_US',
        images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Work@Home Call Center — operational excellence, delivered remotely' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Work@Home Call Center',
        description: 'Operational excellence, delivered remotely.',
        images: ['/og.jpg'],
    },
};

export const viewport = {
    themeColor: '#060D1C',
};

const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Work@Home Call Center',
    url: 'https://www.workathomecc.com',
    logo: 'https://www.workathomecc.com/logo.png',
    description:
        'Managed remote call-center operations — top-tier bilingual talent, hosted infrastructure, and executive-level transparency.',
    email: 'info@workathomecc.com',
    telephone: '+526634361001',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '175 SW 7th Street, Suite 1517-336',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        postalCode: '33130',
        addressCountry: 'US',
    },
    sameAs: ['https://www.linkedin.com/company/wahcc/', 'https://www.facebook.com/workathomecc'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
            <body className="antialiased">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
                {children}
            </body>
        </html>
    );
}
