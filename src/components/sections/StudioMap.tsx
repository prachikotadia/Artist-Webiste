"use client";

import { motion } from "framer-motion";
import { Navigation, Star } from "lucide-react";
import Image from "next/image";

export function StudioMap() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[550px] md:h-[650px] rounded-[36px] overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.1)] group bg-white"
        >
            {/* Real Google Maps Background (Light/White Mode) */}
            <div className="absolute inset-0 z-0 bg-white">
                <iframe
                    src="https://maps.google.com/maps?width=100%25&amp;height=650&amp;hl=en&amp;q=Raajpath%20Complex,%20Vasna%20-%20Bhayli%20Main%20Rd,%20Vadodara+(ARVISHWA%20Studio)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=near&amp;output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(10%) contrast(105%) opacity(0.95)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover scale-[1.05] pointer-events-auto"
                ></iframe>
                {/* Subtle vignette */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
            </div>

            {/* Top-Left Info Card - Black Glassmorphism */}
            <motion.div
                whileHover={{ y: -2 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 z-10 w-[240px] sm:w-[280px] rounded-[16px] bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-3 sm:p-4 flex flex-col gap-2 overflow-hidden transition-all duration-300"
            >
                <div>
                    <h3 className="text-white font-semibold text-[15px] sm:text-base leading-tight font-sans tracking-wide">Raajpath Complex</h3>
                    <p className="text-white/80 text-[11px] sm:text-xs leading-snug line-clamp-2 mt-0.5">
                        Vasna - Bhayli Main Rd, Vadodara
                    </p>
                </div>

                <div className="flex items-center justify-between w-full mt-1">
                    <div className="flex items-center gap-1.5">
                        <span className="text-white font-medium text-[13px]">4.3</span>
                        <div className="flex items-center text-[#fbbc04]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <div className="relative w-3.5 h-3.5">
                                <Star className="absolute inset-0 w-3.5 h-3.5 fill-current" />
                                <div className="absolute inset-0 bg-[#fbbc04] w-1/2 overflow-hidden mix-blend-color"></div>
                                <div className="absolute inset-y-0 right-0 w-1/2 bg-black/40 mix-blend-multiply"></div>
                            </div>
                        </div>
                        <span className="text-white/90 text-[11px] hover:underline cursor-pointer ml-1 tracking-wide">874 reviews</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/10">
                    <a href="https://maps.google.com/?q=Raajpath+Complex,+Vadodara" target="_blank" rel="noopener noreferrer" className="text-white/90 text-[11px] font-medium hover:text-white transition-colors w-fit">
                        View larger map
                    </a>
                    <div className="flex items-center gap-1 cursor-pointer group/dir hover:bg-white/10 rounded-full px-2 py-1 transition-colors">
                        <Navigation className="w-3 h-3 text-[#5ab4ff] transform rotate-45" />
                        <span className="text-[#5ab4ff] text-[10px] font-medium tracking-wide">Directions</span>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Floating Glass Panel - Black Glassmorphism */}
            <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-10 rounded-[24px] md:rounded-[32px] bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 transition-all duration-300 transform-gpu"
            >
                <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
                    {/* Thumbnail Image */}
                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.2)] shrink-0 overflow-hidden relative bg-black">
                        <Image
                            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80"
                            alt="Artist Studio"
                            fill
                            sizes="(max-width: 768px) 56px, 80px"
                            className="object-cover"
                        />
                    </div>

                    {/* Main Address Stack */}
                    <div className="flex flex-col flex-1">
                        <h2 className="text-white font-semibold text-lg md:text-xl lg:text-2xl tracking-wide mb-1 font-sans">Raajpath Complex</h2>
                        <p className="text-white/80 text-xs md:text-sm lg:text-[15px] leading-relaxed max-w-sm font-light">
                            Shop No. 224, Vasna - Bhayli Main Rd, next to Bright Day School, Bhayli, Vadodara, Gujarat 391410, India
                        </p>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-col items-start md:items-end gap-2.5 w-full md:w-auto mt-1 md:mt-0 pt-3 md:pt-0 border-t border-white/10 md:border-t-0 md:pl-6 shrink-0 ml-[72px] md:ml-0">
                    <a href="tel:+919313042798" className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full px-5 py-2.5 transition-all duration-300 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.2)] flex items-center justify-center">
                        <span className="text-white text-[13px] md:text-[14px] font-medium tracking-wide whitespace-nowrap">+91 93130 42798</span>
                    </a>
                    <div className="flex items-center gap-2 px-3">
                        <div className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_10px_#00e676] animate-pulse" />
                        <span className="text-[#00e676] text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">Studio Open</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
