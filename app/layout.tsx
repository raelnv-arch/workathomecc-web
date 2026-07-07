import './globals.css';
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const disp = Archivo({ subsets: ['latin'], variable: '--font-disp' });
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
    title: 'Work@Home Solutions - Call Center Excellence',
    description: 'Empower Your Business. Elevate Your Performance.',
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
