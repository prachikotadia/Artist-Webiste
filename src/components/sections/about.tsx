"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

// The bio to be typed out smoothly
const textToType = `Vishwa Dadhaniya

Artist who focuses on textures, light & timeless compositions. 

From the quiet moments of observation to the chaotic strokes of creation, my work explores the intersection of memory, emotion, and the natural world.

Every canvas is a conversation between texture and light. Operating from my studio in Vadodara, I craft pieces that invite the viewer to pause and reflect.`;

function ArtistProfileCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for the rotation
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    // Glare effect positioning based on cursor
    const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, -100]), { stiffness: 150, damping: 20 });
    const glareY = useSpring(useTransform(y, [-0.5, 0.5], [100, -100]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: 1000 }} // Key for 3D effect
            className="w-full max-w-sm mx-auto z-10"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(255,255,255,0.05)] border-[6px] border-[#1a1c1a] cursor-pointer"
            >
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'radial-gradient(circle 200px at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
                        x: glareX,
                        y: glareY,
                    }}
                />
                <Image
                    src="/images/artist-profile-v2.jpg"
                    alt="Artist Portrait"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{ transform: "translateZ(-10px)" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#8c8c8e]/95 via-[#8c8c8e]/60 to-transparent pointer-events-none" />

                <div
                    className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-white"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <h3 className="text-4xl font-sans font-semibold tracking-tight mb-2 drop-shadow-md">
                        Vishwa
                    </h3>

                    <p className="text-white/80 text-[15px] font-sans leading-relaxed mb-6 max-w-xs drop-shadow-md">
                        Artist who focuses on textures, light & timeless compositions.
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5 text-sm font-medium text-white/90">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <span>423</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="M2 15h10" /><path d="m9 18 3-3-3-3" /></svg>
                                <span>42</span>
                            </div>
                        </div>

                        <a
                            href="https://www.instagram.com/ar_vishwa?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#f9f9f9] text-[#1a1c1a] px-8 py-3 rounded-full font-semibold text-[15px] hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_8px_16px_rgba(0,0,0,0.2)] block text-center"
                        >
                            Follow
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Custom Apple-style Share Icon
function ShareAppIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
    )
}

export function About() {
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        let i = 0;
        let typingTimeout: NodeJS.Timeout;

        const typeChar = () => {
            if (i < textToType.length) {
                setTypedText(textToType.substring(0, i + 1));
                i++;
                const delay = Math.random() * 30 + 15;
                typingTimeout = setTimeout(typeChar, delay);
            }
        };

        setTimeout(typeChar, 800);

        return () => clearTimeout(typingTimeout);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section id="about" className="py-24 md:py-32 relative bg-[#1c1e22] overflow-hidden rounded-[3rem] mx-2 md:mx-6 my-12">

            {/* The Dot Matrix Background */}
            <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #464a55 2px, transparent 2px)',
                    backgroundSize: '48px 48px',
                    backgroundPosition: 'center'
                }}
            />

            {/* Ambient glows behind the device to push rich color through the frosted glass */}
            <div className="absolute top-1/2 right-[10%] w-[35%] h-[60%] bg-[#e5b642] rounded-full blur-[140px] pointer-events-none z-0 opacity-[0.12]" />
            <div className="absolute bottom-[10%] left-[40%] w-[40%] h-[50%] bg-[#4f6486] rounded-full blur-[140px] pointer-events-none z-0 opacity-20" />

            {/* Global deep shadow surrounding everything inside the rounded section */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] z-20 rounded-[3rem]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Artist Profile Card (Restored) */}
                    <ArtistProfileCard />

                    {/* Right: iOS Note UI (Scaled Down & Maximum Glassmorphism) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square
                                   rounded-[2.5rem] md:rounded-[3rem] 
                                   bg-white/[0.02] backdrop-blur-[60px] 
                                   relative p-6 sm:p-8 md:p-10 
                                   flex flex-col
                                   shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(255,255,255,0.05)]
                                   border border-white/[0.08]
                                   max-w-xl mx-auto"
                    >
                        {/* Dramatic inner glass highlight rim */}
                        <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] border-2 border-transparent bg-gradient-to-b from-white/[0.15] to-transparent pointer-events-none mask-border" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px" }} />

                        {/* Header Controls (Gold Accent) */}
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            {/* < Back Button */}
                            <button className="flex items-center gap-1 text-[#e5b642] hover:opacity-80 transition-opacity active:scale-95 group">
                                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                                <span className="text-lg font-medium tracking-wide">Back</span>
                            </button>

                            {/* Right Actions */}
                            <div className="flex items-center gap-5 text-[#e5b642]">
                                <button className="hover:opacity-80 transition-opacity active:scale-95">
                                    <ShareAppIcon className="w-5 h-5 stroke-[2.5]" />
                                </button>
                                <button className="hover:opacity-80 transition-opacity active:scale-95 w-7 h-7 rounded-full border-[2.5px] border-[#e5b642] flex items-center justify-center">
                                    <MoreHorizontal className="w-4 h-4 stroke-[3]" />
                                </button>
                            </div>
                        </div>

                        {/* Typing Text Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-1 relative z-10">
                            <p className="font-serif 
                                          text-lg md:text-xl lg:text-[22px] 
                                          leading-[1.65] md:leading-[1.8] 
                                          text-[#f3f4f6] tracking-wide whitespace-pre-wrap drop-shadow-md">
                                {typedText}
                                <span
                                    className={`inline-block w-[2px] h-[1em] ml-1 -mb-0.5 bg-[#e5b642] align-baseline transition-opacity duration-100 shadow-[0_0_10px_rgba(229,182,66,0.6)]
                                    ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
