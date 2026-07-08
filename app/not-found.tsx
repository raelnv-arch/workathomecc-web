import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="site">
            <section className="notfound">
                <div className="wrap notfound-inner">
                    <p className="nf-code">404 — SIGNAL LOST</p>
                    <h1 className="nf-title">This line didn&apos;t connect.</h1>
                    <p className="nf-sub">
                        The page you&apos;re looking for moved, closed, or never existed. Let&apos;s route you
                        back to something that&apos;s live.
                    </p>
                    <div className="nf-cta">
                        <Link className="btn btn-signal" href="/">Back to home</Link>
                        <Link className="btn btn-ghost" href="/opportunities">View careers</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
