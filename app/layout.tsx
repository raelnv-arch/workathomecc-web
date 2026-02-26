import './globals.css';

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
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
            </head>
            <body className="font-sans antialiased text-slate-800 bg-white">
                {children}
            </body>
        </html>
    );
}
