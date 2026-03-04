"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OpportunitiesPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#4caf50] selection:text-white">

            {/* Navigation */}
            <nav className="bg-[#0f346c] shadow-lg fixed w-full z-50 top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex justify-end md:justify-between h-20 items-center w-full">
                        {/* Logo - Centered on mobile, left on desktop */}
                        <div className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none flex items-center z-50">
                            <a href="/">
                                <div className="relative top-4 filter drop-shadow-xl bg-[#0f346c] rounded-full p-2 border-4 border-[#0f346c] transition-transform hover:scale-105">
                                    <img src="/logo.png" alt="Work@Home Solutions" className="h-28 w-auto object-contain" />
                                </div>
                            </a>
                        </div>
                        <div className="hidden md:flex items-center space-x-8 font-heading font-semibold text-sm uppercase tracking-wide">
                            <a href="/#about" className="text-blue-100 hover:text-white transition">About</a>
                            <a href="/#focus" className="text-blue-100 hover:text-white transition">Focus</a>
                            <a href="/#services" className="text-blue-100 hover:text-white transition">Services</a>
                            <a href="/#contact" className="text-blue-100 hover:text-white transition">Contact</a>
                            <a href="/opportunities" className="text-[#4caf50] hover:text-green-400 transition">Opportunities</a>
                            <a href="/#contact" className="inline-flex items-center justify-center px-6 py-2.5 ml-4 border border-transparent text-sm font-bold rounded-full text-[#051124] bg-gradient-to-r from-[#4caf50] to-[#3d8c40] hover:from-[#5cdb61] hover:to-[#4caf50] transition-all duration-300 shadow-[0_0_20px_rgba(76,175,80,0.3)] hover:shadow-[0_0_30px_rgba(76,175,80,0.5)]">
                                Partner With Us
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white hover:text-[#4caf50] focus:outline-none"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-[#0a2349] border-t border-[#1a4a8c] overflow-hidden"
                        >
                            <div className="px-4 py-6 pt-12 space-y-4 flex flex-col font-heading font-semibold text-sm uppercase tracking-wide items-center w-full">
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#about" className="block text-blue-100 w-full text-center hover:text-white hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">About</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#focus" className="block text-blue-100 w-full text-center hover:text-white hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">Focus</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#services" className="block text-blue-100 w-full text-center hover:text-white hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">Services</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#team" className="block text-blue-100 w-full text-center hover:text-white hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">Team</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#contact" className="block text-blue-100 w-full text-center hover:text-white hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">Contact</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/opportunities" className="block text-[#4caf50] w-full text-center hover:text-green-400 hover:bg-[#1a4a8c] px-4 py-3 rounded-lg transition">Opportunities</a>
                                <a onClick={() => setIsMobileMenuOpen(false)} href="/#contact" className="mt-4 block w-full text-center px-6 py-4 border border-transparent text-sm font-bold rounded-lg text-[#051124] bg-gradient-to-r from-[#4caf50] to-[#3d8c40] hover:from-[#5cdb61] hover:to-[#4caf50] shadow-[0_0_15px_rgba(76,175,80,0.3)]">
                                    Partner With Us
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <header className="relative text-white pt-40 pb-32 overflow-hidden bg-[#0f346c]">
                <div className="absolute inset-0 z-0">
                    <Image src="/opportunities_hero.jpg" alt="Remote Call Center Agents" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f346c]/40 via-[#0f346c]/20 to-[#0f346c]/80"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 font-heading leading-tight tracking-tight drop-shadow-lg">
                            Join the Future of Remote<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#5cdb61] drop-shadow-md">Contact Center Excellence.</span>
                        </h1>
                        <p className="text-xl text-blue-50 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-xl bg-[#0f346c]/30 py-2 px-4 rounded-xl backdrop-blur-sm">
                            Welcome to Work@Home Call Center Opportunities. Join a team that values commitment, growth, and work-life balance.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Main Content & Form */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-16">

                        {/* Top Section: Copy */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
                        >
                            <p className="text-slate-600 text-lg leading-relaxed font-light mb-10 text-center max-w-3xl mx-auto">
                                At Work At Home Call Center, we provide a supportive, professional environment where motivated individuals can build real skills, earn from home, and grow alongside a company with a proven track record.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="flex items-start">
                                    <svg className="w-8 h-8 text-[#4caf50] mr-4 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <strong className="block text-[#0f346c] font-bold text-lg mb-1">Stability & Legacy</strong>
                                        <span className="text-slate-600 font-light leading-relaxed">Join a company with over a decade of proven stability in the BPO industry.</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-8 h-8 text-[#4caf50] mr-4 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    <div>
                                        <strong className="block text-[#0f346c] font-bold text-lg mb-1">True Work-from-Home</strong>
                                        <span className="text-slate-600 font-light leading-relaxed">Eliminate the commute and enjoy the flexibility of a professional remote environment.</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-8 h-8 text-[#4caf50] mr-4 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <strong className="block text-[#0f346c] font-bold text-lg mb-1">Performance-Based Pay</strong>
                                        <span className="text-slate-600 font-light leading-relaxed">Competitive, transparent pay structures, including base salary and high commission potential.</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-8 h-8 text-[#4caf50] mr-4 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <div>
                                        <strong className="block text-[#0f346c] font-bold text-lg mb-1">Advanced Technology</strong>
                                        <span className="text-slate-600 font-light leading-relaxed">Utilize our proprietary W@H Focus Portal for transparent reporting, real-time coaching, and daily performance tracking. We give you the tools to succeed.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                                <p className="text-base text-slate-600 font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                                    If you're ready to take the next step, please complete our comprehensive pre-application form. This initial step enables our recruiting specialists to align your background, skills, and experience with our most immediate, high-performance campaigns.
                                </p>
                                <p className="text-base text-[#0f346c] font-semibold max-w-2xl mx-auto">
                                    We prioritize candidates who demonstrate professionalism, strong communication skills (Bilingual), and consistent operational discipline. We invite you to complete the application and be considered for upcoming opportunities.
                                </p>
                                <p className="text-[#4caf50] font-black mt-6 text-sm uppercase tracking-widest bg-green-50 inline-block px-4 py-2 rounded-full border border-green-100">
                                    We look forward to reviewing your submission!
                                </p>
                            </div>
                        </motion.div>

                        {/* Bottom Section: Jotform Embed */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-full"
                        >
                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,52,108,0.05)] border border-slate-100 overflow-hidden relative min-h-[800px]">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0f346c] to-[#4caf50]"></div>

                                {/* Native Jotform Javascript Embed */}
                                <iframe
                                    id="JotFormIFrame-240454796213054"
                                    title="WorkHome Pre-Interview Application"
                                    onLoad={(e) => window.parent.scrollTo(0, 0)}
                                    allowTransparency={true}
                                    allowFullScreen={true}
                                    allow="geolocation; microphone; camera"
                                    src="https://form.jotform.com/Workathomecc/workhome-pre-interview-application"
                                    frameBorder="0"
                                    style={{ minWidth: '100%', maxWidth: '100%', height: '1000px', border: 'none' }}
                                    scrolling="no"
                                ></iframe>
                                <script type="text/javascript" src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"></script>
                                <script type="text/javascript" dangerouslySetInnerHTML={{
                                    __html: `
                            window.jotformEmbedHandler("iframe[id='JotFormIFrame-240454796213054']", "https://form.jotform.com/")
                        `}} />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0f346c] text-white py-16 border-t-[10px] border-[#4caf50]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Image src="/logo.png" alt="Work@Home Solutions" width={180} height={60} className="h-20 w-auto object-contain brightness-0 invert" />
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed font-light">
                            We build specialized remote teams that scale your business. Focus on your growth while we manage the execution.
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white font-heading">Solutions</h4>
                        <ul className="space-y-3 text-slate-300 font-light text-sm">
                            <li><a href="/#services" className="hover:text-[#4caf50] transition-colors">Managed Ecosystem</a></li>
                            <li><a href="/#services" className="hover:text-[#4caf50] transition-colors">White Label Partner</a></li>
                            <li><a href="/#services" className="hover:text-[#4caf50] transition-colors">Talent Pool</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white font-heading">Company</h4>
                        <ul className="space-y-3 text-slate-300 font-light text-sm">
                            <li><a href="/#about" className="hover:text-[#4caf50] transition-colors">About Us</a></li>
                            <li><a href="/#focus" className="hover:text-[#4caf50] transition-colors">WFH Focus Portal</a></li>
                            <li><a href="/opportunities" className="text-[#4caf50] font-bold">Careers</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-bold text-lg mb-6 text-white font-heading">Contact Structure</h4>
                        <ul className="space-y-4 text-slate-300 font-light text-sm">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 mr-3 text-[#4caf50] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                175 SW 7th Street Suite 1517-336<br />Miami, FL 33130
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-[#4caf50] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <a href="https://api.whatsapp.com/send/?phone=526634631001&text=Welcome+to+Work%40Home+Solutions%2C&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-[#4caf50] transition-colors">+52 663 436 1001</a>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-[#4caf50] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <a href="mailto:info@workathomecc.com" className="hover:text-[#4caf50] transition-colors">info@workathomecc.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#1a4a94] text-center text-sm font-light text-slate-400">
                    <p>&copy; 2026 Work@Home Solutions. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
