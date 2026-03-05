"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSplashProps {
    onComplete: () => void;
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
    const [phase, setPhase] = useState<"playing" | "shrinking">("playing");
    const videoRef = useRef<HTMLVideoElement>(null);

    const [hasPlayed, setHasPlayed] = useState(true);

    useEffect(() => {
        // Check session storage to see if we already played this
        const played = sessionStorage.getItem("splashPlayed");
        if (played) {
            setHasPlayed(true);
            onComplete();
            return;
        }

        setHasPlayed(false);
        const timer = setTimeout(() => {
            setPhase("shrinking");
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    // When the shrinking animation finishes, tell the parent to remove the splash screen
    // so the real navbar logo can take over.
    const handleAnimationComplete = () => {
        if (phase === "shrinking") {
            // Provide a tiny delay for a smooth handoff
            setTimeout(() => {
                onComplete();
            }, 100);
        }
    };

    if (hasPlayed) return null;

    const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-cream origin-top-left"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* 
                    Using Framer Motion's layout animations to smoothly transition from full-screen
                    center to the exact fixed coordinates of the Navbar logo format.
                */}
                <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        // If playing, dead center. If shrinking, mimic the navbar logo fixed coordinates.
                        // Using viewport percentages and precise pixels based on navbar.tsx
                        ...(phase === "shrinking" && {
                            position: "fixed",
                            top: "24px",     // Rough physical top padding from navbar (py-6)
                            left: "24px",    // Rough container padding px-6
                            // Logo sizing in navbar is w-24 h-24 (96px) to md:w-32 md:h-32 (128px)
                            width: isDesktop ? 128 : 96,
                            height: isDesktop ? 128 : 96,
                            x: 0,
                            y: 0,
                        })
                    }}
                    transition={{
                        // Add spring physics for the shrink
                        layout: { type: "spring", bounce: 0.1, duration: 1.2 },
                        opacity: { duration: 0.8 }
                    }}
                    onAnimationComplete={handleAnimationComplete}
                    className={`relative overflow-hidden ${phase === "playing" ? "w-[80vw] max-w-[800px] aspect-video rounded-3xl" : "rounded-none"}`}
                    style={{
                        // Match the maskImage from the static navbar logo for a seamless handoff
                        maskImage: phase === "shrinking" ? "radial-gradient(circle, black 40%, transparent 100%)" : "none",
                        WebkitMaskImage: phase === "shrinking" ? "radial-gradient(circle, black 50%, transparent 100%)" : "none",
                    }}
                >
                    <video
                        ref={videoRef}
                        src="/videos/Merging_Colors_Video_and_Logo.mp4"
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover mix-blend-multiply"
                    />
                </motion.div>

                {/* Background overlay that fades out when shrinking */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: phase === "shrinking" ? 0 : 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-cream -z-10"
                />
            </motion.div>
        </AnimatePresence>
    );
}
