"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, Pause, X } from "lucide-react";
import { useState, useRef } from "react";

export function Collections() {
    const studioVideos = [
        {
            title: "Fluid Motion",
            desc: "Abstract color blending and dispersion.",
            url: "/videos/fluid-motion.mp4",
            shape: "rounded-tr-[3rem] rounded-tl-xl rounded-bl-3xl rounded-br-[4rem]", // Slight asymmetrical curves
            gridClass: "md:col-span-2 lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[420px]",
        },
        {
            title: "Color Mixing",
            desc: "The organic interaction of raw liquids.",
            url: "/videos/color-mix.mp4",
            shape: "rounded-tr-xl rounded-tl-[3rem] rounded-br-2xl rounded-bl-[4rem]",
            gridClass: "md:col-span-2 lg:col-span-5 h-[300px] sm:h-[400px] lg:h-[420px]",
        },
        {
            title: "Canvas Flow",
            desc: "Deep hues colliding in a fluid canvas.",
            url: "/videos/72497-543260691_medium.mp4",
            shape: "rounded-tr-[4rem] rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-[3rem]",
            gridClass: "md:col-span-2 lg:col-span-6 h-[300px] sm:h-[400px] lg:h-[460px]",
        },
        {
            title: "Texture Details",
            desc: "Mesmerizing metallic textures in motion.",
            url: "/videos/texture-details.mp4",
            shape: "rounded-tl-xl rounded-tr-[3rem] rounded-bl-[4rem] rounded-br-2xl",
            gridClass: "md:col-span-2 lg:col-span-6 h-[300px] sm:h-[400px] lg:h-[460px]",
        }
    ];

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const openVideo = (url: string) => {
        setSelectedVideo(url);
        setIsPlaying(true);
    };

    const closeVideo = () => {
        setSelectedVideo(null);
    };

    return (
        <section id="collections" className="py-24 bg-cream">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                        <span className="text-ink/60 uppercase tracking-widest text-sm font-bold mb-3 block">Inside the Studio</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-ink tracking-tight">The Process</h2>
                    </div>
                    <p className="text-ink/70 max-w-md text-lg leading-relaxed">
                        A glimpse into the daily rituals, the mixing of pigments, and the tactile reality of bringing a canvas to life.
                    </p>
                </div>

                {/* 12 Column Asymmetrical Grid for Desktop, 1 Column for Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    {studioVideos.map((video, index) => (
                        <motion.div
                            key={index}
                            onClick={() => openVideo(video.url)}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative group overflow-hidden bg-ink cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-shadow duration-700 w-full ${video.gridClass}`}
                            style={{ borderRadius: '2.5rem' }} // Forcing perfect rounded rectangles matching the UI, overriding dynamic shapes
                        >
                            {/* Auto-playing, looping background video */}
                            <video
                                src={video.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105 pointer-events-none"
                            />

                            {/* Refined gradient overlay for perfect text legibility */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Added subtle top gradient for icons */}
                            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Text Content Overlay */}
                            <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end text-cream pointer-events-none">
                                <motion.h3
                                    className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-2 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                >
                                    {video.title}
                                </motion.h3>
                                <motion.p
                                    className="text-cream/90 text-[15px] sm:text-base max-w-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-medium leading-relaxed"
                                >
                                    {video.desc}
                                </motion.p>
                            </div>

                            {/* Premium Corner Play Icon */}
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-500 transform group-hover:scale-110 group-hover:bg-white/20 pointer-events-none">
                                <Play className="w-4 h-4 ml-0.5" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm"
                    >
                        {/* Close Background Overlay */}
                        <div className="absolute inset-0 cursor-pointer" onClick={closeVideo} />

                        {/* Video Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mx-4"
                        >
                            <video
                                ref={videoRef}
                                src={selectedVideo}
                                className="w-full h-full object-contain"
                                autoPlay
                                playsInline
                                onEnded={() => setIsPlaying(false)}
                            />

                            {/* Controls Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group">
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <button
                                    onClick={togglePlay}
                                    className="pointer-events-auto w-20 h-20 rounded-full bg-cream/20 backdrop-blur-md flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 hover:scale-100"
                                >
                                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeVideo}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-cream hover:bg-cream hover:text-ink transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
