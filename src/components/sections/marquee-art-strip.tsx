"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { artworks } from "@/data/artworks";

export function MarqueeArtStrip() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We'll use a simple CSS animation for the infinite marquee
    // Framer motion can do it with useAnimationFrame, but CSS is often smoother on mobile
    const duplicatedArtworks = [...artworks, ...artworks];

    return (
        <div className="relative w-full overflow-hidden py-4 md:py-8" ref={containerRef}>
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] pr-8">
                {duplicatedArtworks.map((art, idx) => (
                    <motion.div
                        key={`${art.id}-${idx}`}
                        className="relative w-64 md:w-80 h-80 md:h-[400px] flex-shrink-0 mx-4 cursor-pointer group origin-bottom"
                        initial={{ rotateZ: idx % 2 === 0 ? -2 : 2, y: idx % 2 === 0 ? 10 : -10 }}
                        whileHover={{
                            rotateZ: 0,
                            y: -20,
                            scale: 1.05,
                            transition: { duration: 0.4, ease: "easeOut" }
                        }}
                    >
                        <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl bg-ink/5">
                            <Image
                                src={art.image}
                                alt={art.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 256px, 320px"
                            />
                            {/* Subtle shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                        </div>

                        {/* Overlay Info */}
                        <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <div className="bg-cream/90 backdrop-blur px-4 py-2 rounded-xl text-ink">
                                <p className="font-bold text-sm truncate">{art.title}</p>
                                <p className="text-xs opacity-70">{art.year}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
