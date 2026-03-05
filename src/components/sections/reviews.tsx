"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { clientReviews, Review } from "@/data/reviews";

import { useState, useEffect } from "react";

const liquidColors = [
    { glow: "bg-pink-500/10 group-hover:bg-pink-500/20", border: "border-pink-300/10", gradient: "from-pink-500/10 via-pink-400/0" },
    { glow: "bg-cyan-500/10 group-hover:bg-cyan-500/20", border: "border-cyan-300/10", gradient: "from-cyan-500/10 via-cyan-400/0" },
    { glow: "bg-amber-500/10 group-hover:bg-amber-500/20", border: "border-amber-300/10", gradient: "from-amber-500/10 via-amber-400/0" },
    { glow: "bg-emerald-500/10 group-hover:bg-emerald-500/20", border: "border-emerald-300/10", gradient: "from-emerald-500/10 via-emerald-400/0" },
    { glow: "bg-violet-500/10 group-hover:bg-violet-500/20", border: "border-violet-300/10", gradient: "from-violet-500/10 via-violet-400/0" },
    { glow: "bg-rose-500/10 group-hover:bg-rose-500/20", border: "border-rose-300/10", gradient: "from-rose-500/10 via-rose-400/0" }
];

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
    const color = liquidColors[index % liquidColors.length];

    return (
        <div className="w-[85vw] sm:w-[500px] shrink-0 relative group h-full mr-4 sm:mr-8 transition-all duration-500 hover:scale-[1.02]">
            {/* Deep 3D Shadow Underlay + Colored Glow */}
            <div className={`absolute inset-x-2 -bottom-2 h-full blur-md rounded-[2.5rem] -z-10 transition-all duration-500 ${color.glow}`} />
            <div className="absolute inset-x-4 -bottom-4 h-full bg-black/50 blur-lg rounded-[2.5rem] -z-20 transition-all duration-500" />

            {/* Ultra-Transparent Glass Card */}
            <div className={`h-full bg-white/[0.005] backdrop-blur-md border ${color.border} rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_16px_rgba(0,0,0,0.1)]`}>

                {/* Soft inner colored glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} to-transparent pointer-events-none opacity-40`} />

                <div className="relative z-10">
                    <div className="flex gap-1 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                        ))}
                    </div>
                    <p className="text-white/90 text-base sm:text-lg italic leading-relaxed font-serif tracking-wide drop-shadow-sm">
                        "{review.text}"
                    </p>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col">
                    <span className="font-semibold text-white tracking-widest uppercase font-sans text-sm sm:text-[15px] drop-shadow-sm">
                        {review.name}
                    </span>
                    <span className="text-white/50 text-xs sm:text-sm mt-1 uppercase tracking-wider font-medium">
                        {review.location}
                    </span>
                </div>
            </div>
        </div>
    );
};

export function ClientReviews() {
    // Duplicate the array to create a seamless infinite loop
    const doubledReviews = [...clientReviews, ...clientReviews];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance interval every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 3500);
        return () => clearInterval(timer);
    }, [isPaused]);

    // Handle seamless infinite looping
    useEffect(() => {
        // When we hit the exact length of original reviews, we've swiped one full block.
        // Item exactly at `clientReviews.length` looks identical to index 0.
        if (currentIndex === clientReviews.length) {
            // Wait for the animation to fully finish sliding into place
            const timeout = setTimeout(() => {
                setIsTransitioning(false); // Turn off animations
                setCurrentIndex(0); // Snap instantly back to actual beginning
            }, 600);
            return () => clearTimeout(timeout);
        } else if (currentIndex === 0) {
            // Once we're safely back at 0, turn animations back on for the next move
            const timeout = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex]);

    const handleDragEnd = (e: any, { offset }: any) => {
        const swipe = offset.x;
        // Swipe left (next)
        if (swipe < -50) {
            setCurrentIndex((prev) => prev + 1);
        }
        // Swipe right (prev)
        else if (swipe > 50) {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    const nextReview = () => setCurrentIndex((prev) => prev + 1);
    const prevReview = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

    return (
        <section className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden flex flex-col justify-center min-h-[80vh]">

            {/* Deep Dark Grid Background */}
            <div className="absolute inset-0 bg-slate-950" />

            {/* Geometric Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '4rem 4rem'
                }}
            />

            {/* Subtle Center Glow to illuminate the glass */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 sm:mb-20 text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
                        Client Experiences
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg sm:text-xl font-light tracking-wide">
                        Hear from collectors and art enthusiasts across the globe who have welcomed an Arvishwa original into their lives.
                    </p>
                </motion.div>
            </div>

            {/* Stepped Carousel */}
            <div
                className="relative w-full overflow-hidden py-4 px-4 sm:px-8 max-w-[1920px] mx-auto cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* 
                  Mobile: 85vw width + 1rem (16px) mr-4
                  Desktop: 500px width + 2rem (32px) mr-8
                */}
                <motion.div
                    className="flex shrink-0 will-change-transform items-stretch"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: `calc(-${currentIndex} * (min(500px, 85vw) + min(2rem, 1rem + 2vw)))`
                    }}
                    transition={{
                        duration: isTransitioning ? 0.6 : 0,
                        ease: [0.16, 1, 0.3, 1] // Soft, premium snap ease
                    }}
                >
                    {doubledReviews.map((review, i) => (
                        <ReviewCard key={`${review.id}-${i}`} review={review} index={i} />
                    ))}
                </motion.div>

                {/* Manual Swipe Controls */}
                <button
                    onClick={prevReview}
                    className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all z-30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    aria-label="Previous Review"
                >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                    onClick={nextReview}
                    className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all z-30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                    aria-label="Next Review"
                >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
            </div>
        </section>
    );
}
