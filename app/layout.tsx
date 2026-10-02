import './globals.css';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const disp = Archivo({ subsets: ['latin'], variable: '--font-disp' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
    metadataBase: new URL('https://www.workathomecc.com'),
    title: 'Bilingual Call Center & BPO in Tijuana | Work@Home',
    description: 'Build a bilingual call center or BPO team in Tijuana, Baja California for your U.S. or Canadian business. Your systems and brand. No minimum team size.',
    openGraph: {
        type: 'website',
        url: 'https://www.workathomecc.com',
        siteName: 'Work@Home Call Center',
        title: 'Bilingual Call Center & BPO in Tijuana | Work@Home',
        description: 'Build a bilingual call center or BPO team in Tijuana, Baja California for your U.S. or Canadian business. Your systems and brand. No minimum team size.',
        locale: 'en_US',
        images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Work@Home Call Center' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bilingual Call Center & BPO in Tijuana | Work@Home',
        description: 'Build a bilingual call center or BPO team in Tijuana, Baja California for your U.S. or Canadian business. Your systems and brand. No minimum team size.',
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
        'Bilingual call center and BPO teams based in Tijuana, Baja California for U.S. and Canadian businesses, working in client systems and under their brand. No minimum team size.',
    email: 'info@workathomecc.com',
    telephone: '+526634361001',
    address: [{
        '@type': 'PostalAddress',
        streetAddress: 'Ave Manuel M de Leon 1301 1 1001, Rio Tijuana Zona Oriente',
        addressLocality: 'Tijuana',
        addressRegion: 'Baja California',
        postalCode: '22010',
        addressCountry: 'MX',
    }, {
        '@type': 'PostalAddress',
        streetAddress: '175 SW 7th Street, Suite 1517-336',
        addressLocality: 'Miami',
        addressRegion: 'FL',
        postalCode: '33130',
        addressCountry: 'US',
    }],
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
