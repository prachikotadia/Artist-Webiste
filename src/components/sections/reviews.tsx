"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { clientReviews, Review } from "@/data/reviews";

const ReviewCard = ({ review }: { review: Review }) => (
    <div className="w-[300px] sm:w-[400px] shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)] mr-4 sm:mr-8 transition-transform hover:scale-[1.02]">
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

            {/* The Infinite Carousel */}
            <div className="relative w-full overflow-hidden py-4 flex group">
                <motion.div
                    className="flex shrink-0 will-change-transform"
                    animate={{
                        x: [0, -100 * clientReviews.length + "%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: clientReviews.length * 6, // 6 seconds per card approx
                            ease: "linear",
                        },
                    }}
                >
                    {doubledReviews.map((review, i) => (
                        <ReviewCard key={`${review.id}-${i}`} review={review} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
