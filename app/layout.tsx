import './globals.css';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const disp = Archivo({ subsets: ['latin'], variable: '--font-disp' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
    metadataBase: new URL('https://workathomecc.com'),
    title: 'Work@Home Call Center',
    description: 'Empower Your Business. Elevate Your Performance.',
    openGraph: {
        type: 'website',
        url: 'https://workathomecc.com',
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
