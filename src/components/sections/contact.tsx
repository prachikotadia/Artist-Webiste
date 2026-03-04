"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, X } from "lucide-react";
import { StudioMap } from "./StudioMap";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    const handleNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterSuccess(true);
        setTimeout(() => setNewsletterSuccess(false), 3000);
    };

    return (
        <section id="contact" className="py-24 bg-[#EBE9E0] relative overflow-hidden">
            {/* Vivid Colorful Background ambients for 3D depth */}
            <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-purple-400/30 blur-[140px] rounded-full pointer-events-none mix-blend-multiply animate-pulse-slow" />
            <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/40 via-teal-200/40 to-emerald-200/30 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/50 backdrop-blur-2xl p-6 md:p-8 lg:p-10 rounded-[2.5rem] border border-white/80 shadow-[10px_10px_30px_rgba(0,0,0,0.06),-10px_-10px_30px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(255,255,255,0.7)] lg:max-w-[480px] w-full"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-ink bg-clip-text text-transparent bg-gradient-to-br from-ink to-ink/70">Get in touch</h2>
                        <p className="text-ink/80 mb-8 max-w-[360px] text-sm leading-relaxed font-medium">
                            Whether you&apos;re interested in a commission, available works, or exhibitions,
                            send a message and I&apos;ll get back to you shortly.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-ink/70 ml-1 transition-colors group-focus-within:text-ink">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 px-5 focus:outline-none focus:bg-white/90 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.04),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.06),inset_-5px_-5px_10px_rgba(255,255,255,1),0_0_15px_rgba(255,255,255,0.5)] placeholder:text-ink/40 text-ink font-medium"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-ink/70 ml-1 transition-colors group-focus-within:text-ink">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 px-5 focus:outline-none focus:bg-white/90 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.04),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.06),inset_-5px_-5px_10px_rgba(255,255,255,1),0_0_15px_rgba(255,255,255,0.5)] placeholder:text-ink/40 text-ink font-medium"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label htmlFor="reason" className="text-[11px] font-bold uppercase tracking-widest text-ink/70 ml-1 transition-colors group-focus-within:text-ink">Subject</label>
                                <div className="relative">
                                    <select
                                        id="reason"
                                        required
                                        defaultValue=""
                                        className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 px-5 focus:outline-none focus:bg-white/90 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.04),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.06),inset_-5px_-5px_10px_rgba(255,255,255,1),0_0_15px_rgba(255,255,255,0.5)] appearance-none cursor-pointer text-ink font-medium"
                                    >
                                        <option value="" disabled className="text-ink/30">Select a reason...</option>
                                        <option value="commission">Commission Inquiry</option>
                                        <option value="purchase">Artwork Purchase</option>
                                        <option value="exhibition">Exhibition</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-ink/70 ml-1 transition-colors group-focus-within:text-ink">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 px-5 focus:outline-none focus:bg-white/90 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.04),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.06),inset_-5px_-5px_10px_rgba(255,255,255,1),0_0_15px_rgba(255,255,255,0.5)] resize-none placeholder:text-ink/40 text-ink font-medium"
                                    placeholder="Tell me about your project or inquiry..."
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isSuccess}
                                    className="w-full md:w-auto min-w-[200px] hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-xl duration-300"
                                    withArrow={!isSubmitting && !isSuccess}
                                >
                                    {isSubmitting ? "Sending..." : isSuccess ? "Message Sent" : "Send Message"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Column: Other Info & Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-between"
                    >
                        {/* Custom Dark Glassmorphism Studio Map */}
                        <div className="mb-10 lg:mb-16">
                            <StudioMap />
                        </div>

                        {/* Neomorphic Glass Newsletter Card */}
                        <motion.div
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="mt-16 lg:mt-auto relative group overflow-hidden bg-white/50 backdrop-blur-2xl p-8 lg:p-10 rounded-[3rem] border border-white/80 shadow-[10px_10px_30px_rgba(0,0,0,0.06),-10px_-10px_30px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(255,255,255,0.7)] hover:shadow-[15px_15px_40px_rgba(0,0,0,0.08),-15px_-15px_40px_rgba(255,255,255,1),inset_2px_2px_5px_rgba(255,255,255,0.9)] transition-all duration-500 cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-full blur-3xl group-hover:scale-150 group-hover:from-orange-400/30 group-hover:to-rose-400/30 transition-all duration-700 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-teal-400/20 rounded-full blur-2xl group-hover:scale-125 transition-all duration-700 pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="font-serif text-3xl mb-3 text-ink bg-clip-text text-transparent bg-gradient-to-br from-ink to-ink/70">Join the Newsletter</h3>
                                <p className="text-ink/80 text-sm mb-8 max-w-xs leading-relaxed font-medium">
                                    Receive updates on new collections, studio access, and upcoming exhibitions.
                                </p>
                                <form onSubmit={handleNewsletter} className="relative flex items-center group/form">
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        required
                                        className="w-full bg-white/70 backdrop-blur-md border border-white/90 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:bg-white/90 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.04),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] focus:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.06),inset_-5px_-5px_10px_rgba(255,255,255,1),0_0_15px_rgba(255,255,255,0.5)] placeholder:text-ink/50 text-ink font-medium"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1.5 p-3 rounded-full bg-ink text-cream hover:bg-accent transition-all duration-300 disabled:opacity-50 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center group-hover/form:bg-accent"
                                        disabled={newsletterSuccess}
                                        aria-label="Subscribe"
                                    >
                                        <ArrowRight className="w-5 h-5 group-hover/form:translate-x-0.5 transition-transform" />
                                    </button>
                                </form>
                                <AnimatePresence>
                                    {newsletterSuccess && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-xs font-bold text-accent-dark mt-3 ml-4"
                                        >
                                            Subscribed successfully!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>

            {/* Global Toast for Main Form */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-8 right-8 z-50 bg-ink text-cream px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
                    >
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                        <div>
                            <p className="font-bold text-sm">Message Sent</p>
                            <p className="text-xs opacity-70">I&apos;ll be in touch soon.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Real Map Glassmorphic Modal */}
            <AnimatePresence>
                {isMapOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden bg-black/60 backdrop-blur-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-6xl h-[80vh] bg-white border border-white/20 shadow-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative flex flex-col"
                        >
                            <div className="flex items-center justify-between px-6 py-4 md:px-8 border-b border-gray-100 bg-white/90 backdrop-blur-xl absolute top-0 w-full z-10">
                                <div>
                                    <h3 className="font-serif text-xl sm:text-2xl text-ink">Raajpath Complex Studio</h3>
                                    <p className="text-sm text-ink/60">Vasna - Bhayli Main Rd, Vadodara</p>
                                </div>
                                <button
                                    onClick={() => setIsMapOpen(false)}
                                    className="p-3 bg-gray-100 hover:bg-gray-200 text-ink rounded-full transition-colors group"
                                >
                                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Real Interactive Google Maps embed */}
                            <div className="w-full h-full pt-[4.5rem] bg-gray-100 placeholder-animation">
                                <iframe
                                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Raajpath%20Complex,%20Vasna%20-%20Bhayli%20Main%20Rd,%20Vadodara+(ARVISHWA%20Studio)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full object-cover rounded-b-[2rem] md:rounded-b-[3rem]"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
