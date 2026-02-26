"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Navigation */}
      <nav className="bg-[#0f346c] shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center relative z-50">
              <div className="relative top-4 filter drop-shadow-xl bg-[#0f346c] rounded-full p-2 border-4 border-[#0f346c]">
                <img src="/logo.png" alt="Work@Home Solutions" className="h-28 w-auto object-contain" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-heading font-semibold text-sm uppercase tracking-wide">
              <a href="#about" className="text-blue-100 hover:text-white transition">About</a>
              <a href="#focus" className="text-blue-100 hover:text-white transition">Focus</a>
              <a href="#services" className="text-blue-100 hover:text-white transition">Services</a>
              <a href="#contact" className="text-blue-100 hover:text-white transition">Contact</a>
              <a href="/opportunities" className="text-[#4caf50] hover:text-green-400 transition">Opportunities</a>
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-2.5 ml-4 border border-transparent text-sm font-bold rounded-full text-[#051124] bg-gradient-to-r from-[#4caf50] to-[#3d8c40] hover:from-[#5cdb61] hover:to-[#4caf50] transition-all duration-300 shadow-[0_0_20px_rgba(76,175,80,0.3)] hover:shadow-[0_0_30px_rgba(76,175,80,0.5)]">
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative text-white pt-40 pb-32 overflow-hidden bg-[#0f346c]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero_remote_ops.png" alt="Remote Operations Team" fill className="object-cover opacity-30 mix-blend-overlay" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f346c]/80 to-[#0f346c]/95"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <h2 className="text-[#4caf50] font-bold uppercase tracking-widest text-sm mb-4">
            Learn About How We Manage Our Operations
          </h2>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-8 drop-shadow-lg font-heading">
            Operational Excellence,<br />
            Delivered <span className="text-[#4caf50]">Remotely.</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Your business deserves a call-center partner that delivers consistency, accountability, and results. At <span className="font-bold">Work@Home Solutions</span>, we provide fully managed remote BPO services.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
          >
            <a href="#contact" className="px-8 py-4 bg-[#4caf50] text-white font-bold rounded-full hover:bg-green-500 transition-all duration-300 shadow-[0_0_20px_rgba(76,175,80,0.4)] hover:shadow-[0_0_30px_rgba(76,175,80,0.8)] uppercase tracking-wide transform hover:-translate-y-1 flex items-center justify-center group">
              Start Now <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a href="#services" className="px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold rounded-full hover:bg-white hover:text-[#0f346c] hover:border-white transition-all duration-300 uppercase tracking-wide backdrop-blur-sm">
              Explore Our Services
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* Focus Section (Built For Success) */}
      <section id="focus" className="py-24 bg-white relative scroll-mt-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="bg-gray-100 rounded-xl flex items-center justify-center relative shadow-2xl overflow-hidden aspect-video transform hover:scale-[1.02] transition duration-500">
            <Image src="/service_white_label.png" alt="Hosted Workforce Technology" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f346c]/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white backdrop-blur-sm">
              <h4 className="font-bold text-2xl mb-2 font-heading">Executive-Level Transparency: Powered by Focus</h4>
              <p className="text-sm opacity-90 leading-relaxed max-w-lg">The Focus Portal provides leadership-grade insight into team performance and operational efficiency. Live dashboards, performance analytics, and structured reporting allow you to connect agent output directly to revenue impact, CLV, and churn reduction. Because leadership should never operate in the dark.</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f346c] mb-6 font-heading">Built For <br /><span className="text-[#4caf50]">Success</span></h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              We don't just answer phones; we build relationships. Our distributed workforce model ensures you get the best talent regardless of geography, while maintaining strict security and quality controls.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 relative border-t border-slate-200 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#0f346c] text-4xl lg:text-5xl font-extrabold font-heading mb-4">
              Get BIG Results, Built by Values &<br /> <span className="text-[#4caf50]">Powered by Measurable Results.</span>
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg hover:text-slate-700 transition">Comprehensive solutions tailored to your unique business needs.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Full Management Ecosystem */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-blue-50/50 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col overflow-hidden group"
            >
              <div className="h-48 relative overflow-hidden">
                <Image src="/service_management_eco.png" alt="Management Ecosystem" fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f346c]/80 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-heading">The Full Management Ecosystem</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide mb-2">"We don't just provide talent - we run the operation."</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                  We handle it all. We <strong>Recruit, Train, and Manage</strong> your team while our <strong>Focus Platform</strong> gives you real-time visibility.
                </p>

                <div className="mb-4">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Target Client</strong>
                  <p className="text-sm text-slate-700">Scaling companies seeking fully managed remote workforce without internal supervision.</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Revenue Model</strong>
                  <p className="text-sm text-[#0f346c] font-semibold">Service Hourly Fee + Performance Bonus</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Complete Relief:</strong> We handle hiring, QA, and supervision.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Transparency:</strong> Focus provides live KPI visibility.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-yellow-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-xs text-slate-500">Premium service model compared to staffing-only.</span></div>
                </div>
              </div>
            </motion.div>

            {/* White Label Partnership */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50/50 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col overflow-hidden group"
            >
              <div className="h-48 relative overflow-hidden">
                <Image src="/service_white_label.png" alt="White Label Partnership" fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f346c]/80 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-heading">The White Label Partnership</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide mb-2">"We power your operations behind the scenes."</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                  We <strong>build and manage your team</strong> under <strong>your brand</strong>, seamlessly integrating into your systems to expand your capacity.
                </p>

                <div className="mb-4">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Target Client</strong>
                  <p className="text-sm text-slate-700">Digital agencies, CPAs, software firms seeking to scale fulfillment margins.</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Revenue Model</strong>
                  <p className="text-sm text-[#0f346c] font-semibold">B2B Margin Expansion</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Capacity Growth:</strong> Instant scale without complex overhead.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Brand Continuity:</strong> Your clients only see your brand.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-yellow-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-xs text-slate-500">Requires strict adherence to partner SOPs via Focus.</span></div>
                </div>
              </div>
            </motion.div>

            {/* Talent Pool */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-blue-50/50 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col overflow-hidden group"
            >
              <div className="h-48 relative overflow-hidden">
                <Image src="/service_talent_pool.png" alt="Elite Talent Pool" fill className="object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f346c]/80 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white font-heading">The Talent Pool Advantage</h3>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide mb-2">"Pre-vetted talent, ready when you are."</p>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                  We <strong>source and vet</strong> a curated pool of top-tier candidates tailored to your needs, ready for rapid deployment.
                </p>

                <div className="mb-4">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Target Client</strong>
                  <p className="text-sm text-slate-700">Companies needing consistent access to qualified talent without recruiting.</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Revenue Model</strong>
                  <p className="text-sm text-[#0f346c] font-semibold">Talent Access Retainer + Placement Fee</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Reduced Time:</strong> Pre-qualified candidates shorten cycles.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-[#4caf50] mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg><span className="text-xs text-slate-600"><strong>Quality:</strong> Candidates are skill-tested and aligned.</span></div>
                  <div className="flex items-start"><svg className="w-5 h-5 text-yellow-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-xs text-slate-500">Requires continuous sourcing to keep pool fresh.</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden bg-[#0f346c] scroll-mt-20">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-16 shadow-2xl"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 font-heading leading-tight">
                  Ready to Scale<br />Your Operations?
                </h2>
                <p className="text-xl text-blue-100 mb-8 font-light leading-relaxed">
                  Partner with Work@Home Solutions today and get immediate access to top-tier remote talent, hosted infrastructure, and executive-level transparency. Let's build your success story.
                </p>

                <div id="opportunities" className="space-y-6 pt-6 border-t border-white/20">
                  <a href="https://api.whatsapp.com/send/?phone=526634631001&text=Welcome+to+Work%40Home+Solutions%2C&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center text-white group cursor-pointer transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-full bg-[#4caf50]/20 flex items-center justify-center mr-4 border border-[#4caf50]/50 group-hover:bg-[#4caf50]/40 transition-colors">
                      <svg className="w-6 h-6 text-[#4caf50] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 group-hover:text-white transition-colors">Call Us Directly</p>
                      <p className="text-lg font-bold group-hover:text-[#4caf50] transition-colors">+52 663 436 1001</p>
                    </div>
                  </a>
                  <a href="mailto:info@workathomecc.com" className="flex items-center text-white group cursor-pointer transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-full bg-[#4caf50]/20 flex items-center justify-center mr-4 border border-[#4caf50]/50 group-hover:bg-[#4caf50]/40 transition-colors">
                      <svg className="w-6 h-6 text-[#4caf50] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 group-hover:text-white transition-colors">Email Our Team</p>
                      <p className="text-lg font-bold group-hover:text-[#4caf50] transition-colors">info@workathomecc.com</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0f346c] to-[#4caf50]"></div>
                <h3 className="text-2xl font-bold text-[#0f346c] mb-6 font-heading">Request a Consultation</h3>
                <form action="https://formspree.io/f/meelndov" method="POST" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">First Name</label>
                      <input type="text" name="firstName" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Last Name</label>
                      <input type="text" name="lastName" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Work Email</label>
                    <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Company Name</label>
                    <input type="text" name="company" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition" placeholder="Your Organization" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Industry (Optional)</label>
                    <input type="text" name="industry" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition" placeholder="e.g. Healthcare, Tech, Retail" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">How can we help?</label>
                    <textarea name="message" required rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-transparent transition resize-none" placeholder="Tell us about your operational needs..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#0f346c] text-white font-bold rounded-lg py-4 hover:bg-blue-900 transition-colors duration-300 shadow-lg flex items-center justify-center group">
                    Send Message
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">We respect your privacy. No spam, ever.</p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f346c] text-white py-16 border-t-[10px] border-[#4caf50]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/logo.png" alt="Work@Home Solutions" width={180} height={60} className="h-20 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Connecting businesses with top-tier remote talent worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#focus" className="hover:text-white transition">Our Focus</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#opportunities" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Contact</h4>
            <ul className="space-y-3 text-blue-200 text-sm">
              <li className="flex items-start"><svg className="w-5 h-5 mt-0.5 mr-3 text-[#4caf50] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 175 SW 7th Street Suite 1517-336<br />Miami, FL 33130</li>
              <li className="flex items-center"><svg className="w-5 h-5 mr-3 text-[#4caf50] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> <a href="https://api.whatsapp.com/send/?phone=526634631001&text=Welcome+to+Work%40Home+Solutions%2C&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-[#4caf50] transition-colors">+52 663 436 1001</a></li>
              <li className="flex items-center"><svg className="w-5 h-5 mr-3 text-[#4caf50] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> <a href="mailto:info@workathomecc.com" className="hover:text-[#4caf50] transition-colors">info@workathomecc.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-heading">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://api.whatsapp.com/send/?phone=526634631001&text=Welcome+to+Work%40Home+Solutions%2C&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center hover:bg-[#4caf50] transition-colors"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>
              <a href="https://www.linkedin.com/company/wahcc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center hover:bg-[#4caf50] transition-colors"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
              <a href="https://www.facebook.com/workathomecc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center hover:bg-[#4caf50] transition-colors"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-blue-800 text-center text-blue-300 text-sm flex flex-col items-center">
          <Image src="/logo.png" alt="Work@Home Solutions" width={120} height={120} className="mb-6 brightness-0 invert opacity-50" />
          <p>&copy; 2026 Work@Home Solutions. All rights reserved.</p>
        </div>
      </footer>
    </main >
  );
}
