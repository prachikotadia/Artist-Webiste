"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { clientReviews, Review } from "@/data/reviews";

import { useState, useEffect } from "react";

const ReviewCard = ({ review }: { review: Review }) => (
    <div className="w-[85vw] sm:w-[400px] shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)] mr-4 sm:mr-8 transition-transform hover:scale-[1.02] h-full">
        <div>
            <div className="flex text-amber-500 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} className="mr-1" />
                ))}
            </div>
            <p className="text-ink/80 text-sm sm:text-base italic leading-relaxed font-serif">
                "{review.text}"
            </p>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col">
            <span className="font-semibold text-ink text-[15px] tracking-wide uppercase font-sans">
                {review.name}
            </span>
            <span className="text-ink/60 text-xs sm:text-sm mt-0.5">
                {review.location}
            </span>
        </div>
    </div>
);

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
        <section className="py-24 sm:py-32 bg-cream relative overflow-hidden">
            {/* Background glowing orbs to enhance glassmorphism */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 sm:mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-4 sm:mb-6">
                        Client Experiences
                    </h2>
                    <p className="text-ink/60 max-w-2xl mx-auto text-base sm:text-lg">
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
                  Desktop: 400px width + 2rem (32px) mr-8
                */}
                <motion.div
                    className="flex shrink-0 will-change-transform items-stretch"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: `calc(-${currentIndex} * (min(400px, 85vw) + min(2rem, 1rem + 2vw)))`
                    }}
                    transition={{
                        duration: isTransitioning ? 0.6 : 0,
                        ease: [0.16, 1, 0.3, 1] // Soft, premium snap ease
                    }}
                >
                    {doubledReviews.map((review, i) => (
                        <ReviewCard key={`${review.id}-${i}`} review={review} />
                    ))}
                </motion.div>

                {/* Manual Swipe Controls */}
                <button
                    onClick={prevReview}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-ink/70 hover:bg-white/30 hover:text-ink transition-colors z-20 shadow-lg"
                    aria-label="Previous Review"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={nextReview}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-ink/70 hover:bg-white/30 hover:text-ink transition-colors z-20 shadow-lg"
                    aria-label="Next Review"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
        </section>
    );
}
