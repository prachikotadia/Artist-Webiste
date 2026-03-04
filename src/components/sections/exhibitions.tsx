"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

// --- DATA MODEL ---
type Exhibition = {
    title: string;
    venue: string;
    city: string;
    country: string;
    dateRange: string;
    note?: string;
};

type ExhibitionsByYear = {
    year: number;
    items: Exhibition[];
};

const mockData: ExhibitionsByYear[] = [
    {
        year: 2022,
        items: [
            {
                title: "Horizons: A Dual Perspective",
                venue: "Vue Gallery",
                city: "Los Angeles, CA",
                country: "USA",
                dateRange: "Mar 2022 – May 2022",
                note: "Collaborative showing focusing on coastal abstracts."
            },
            {
                title: "The Genesis Series",
                venue: "Studio Annex",
                city: "Chicago, IL",
                country: "USA",
                dateRange: "Aug 2022 – Oct 2022",
            }
        ]
    },
    {
        year: 2023,
        items: [
            {
                title: "Contemporary Abstraction Group Show",
                venue: "Metropolitan Arts Center",
                city: "London",
                country: "UK",
                dateRange: "Jan 2023 – Mar 2023",
                note: "Featured alongside 10 emerging artists."
            },
            {
                title: "Textures & Light",
                venue: "Gallery 19",
                city: "Paris",
                country: "France",
                dateRange: "Sep 2023 – Nov 2023",
            }
        ]
    },
    {
        year: 2024,
        items: [
            {
                title: "Ethereal Echoes: Solo Exhibition",
                venue: "Lumina Gallery",
                city: "New York, NY",
                country: "USA",
                dateRange: "Feb 2024 – May 2024",
                note: "A comprehensive showcase of memory and light."
            }
        ]
    },
    {
        year: 2025,
        items: [
            {
                title: "Visions of the Void",
                venue: "National Museum of Modern Art",
                city: "Tokyo",
                country: "Japan",
                dateRange: "Apr 2025 – Jul 2025",
                note: "Upcoming major retrospective."
            },
            {
                title: "Fluid Dynamics",
                venue: "Design Week Pavilion",
                city: "Milan",
                country: "Italy",
                dateRange: "Oct 2025",
            }
        ]
    }
];

export function Exhibitions() {
    const [activeIndex, setActiveIndex] = useState<number>(3); // Default to 2025
    const [lensPositions, setLensPositions] = useState<number[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const yearRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [lensRadius, setLensRadius] = useState(160 / 2); // Desktop default

    const lensX = useMotionValue(0);

    // Calculate Centers
    const calculatePositions = useCallback(() => {
        if (!timelineRef.current) return;
        const timelineRect = timelineRef.current.getBoundingClientRect();

        const positions = mockData.map((_, i) => {
            const el = yearRefs.current[i];
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            // Center of the tick mark relative to the timeline container
            return (rect.left - timelineRect.left) + (rect.width / 2);
        });

        setLensPositions(positions);

        // Update size responsively
        if (window.innerWidth < 640) {
            setLensRadius(60); // 120px diameter on mobile
        } else if (window.innerWidth < 1024) {
            setLensRadius(75); // 150px diameter on tablet
        } else {
            setLensRadius(90); // 180px diameter on desktop
        }
    }, []);

    useEffect(() => {
        calculatePositions();
        window.addEventListener("resize", calculatePositions);
        return () => window.removeEventListener("resize", calculatePositions);
    }, [calculatePositions]);

    // Set initial position once calculated
    useEffect(() => {
        if (lensPositions.length > 0) {
            lensX.set(lensPositions[activeIndex]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lensPositions]);

    // Listen to real-time drag to update the active year instantly exactly at mis-points
    useMotionValueEvent(lensX, "change", (latestX) => {
        if (lensPositions.length === 0) return;

        let closestIndex = 0;
        let minDistance = Infinity;

        lensPositions.forEach((pos, i) => {
            const dist = Math.abs(pos - latestX);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = i;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    });

    const handleSelectYear = (index: number) => {
        if (lensPositions.length > 0) {
            animate(lensX, lensPositions[index], {
                type: "spring",
                stiffness: 300,
                damping: 26,
                mass: 0.8
            });
        }
    };

    const handleDragEnd = () => {
        if (lensPositions.length === 0) return;

        // Find closest snap point upon release
        const currentX = lensX.get();
        let closestIndex = 0;
        let minDistance = Infinity;

        lensPositions.forEach((pos, i) => {
            const dist = Math.abs(pos - currentX);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = i;
            }
        });

        handleSelectYear(closestIndex);
    };

    const activeData = mockData[activeIndex];

    return (
        <section
            id="exhibitions"
            className="py-24 md:py-32 bg-[#121316] relative overflow-hidden flex flex-col items-center select-none"
            style={{ touchAction: "pan-y" }}
        >
            {/* Ambient Vibrant Canvas Lights behind the Timeline */}
            <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-1/2 right-[-5%] w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-1/3 w-[800px] h-[400px] bg-blue-900/20 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 w-full flex flex-col items-center">

                {/* Header Subtitles Phase */}
                <div className="text-center mb-10 md:mb-16 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-3 text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] tracking-tight">Exhibitions</h2>
                        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium">
                            A timeline of shows and showcases.
                        </p>
                    </motion.div>
                </div>

                {/* --- TIMELINE AREA --- */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-4xl h-[160px] md:h-[220px] flex items-center justify-center mb-6 md:mb-10"
                >
                    <div ref={timelineRef} className="w-full relative flex items-center h-full">

                        {/* The base thin line across - Made it softer white for the dark theme */}
                        <div className="absolute left-0 right-0 h-[1.5px] bg-white/10 z-0" />

                        {/* Year Markers Grid */}
                        <div className="absolute left-0 right-0 flex justify-between px-[5%] sm:px-[10%] md:px-[15%] z-20">
                            {mockData.map((data, idx) => {
                                const isActive = activeIndex === idx;

                                return (
                                    <div
                                        key={data.year}
                                        ref={(el) => { if (el) yearRefs.current[idx] = el; }}
                                        className="relative flex flex-col items-center justify-center group cursor-pointer"
                                        onClick={() => handleSelectYear(idx)}
                                    >
                                        {/* Dynamic zooming Year Label perfectly placed directly on timeline */}
                                        <motion.span
                                            initial={false}
                                            animate={{
                                                scale: isActive ? 1.55 : 1.0,
                                                color: isActive ? "#E5B33A" : "rgba(255,255,255,0.35)",
                                                textShadow: isActive ? "0 4px 24px rgba(229,179,58,0.8)" : "0 0 0px rgba(0,0,0,0)",
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 24,
                                                mass: 0.85 // Creating the slight liquid settle overshoot
                                            }}
                                            style={{
                                                transformOrigin: "bottom center",
                                                fontWeight: isActive ? 800 : 600,
                                                // High Z-index guarantees label does not blur inside the lens overlay
                                                zIndex: isActive ? 60 : 10
                                            }}
                                            className="absolute bottom-6 sm:bottom-8 font-serif text-lg sm:text-xl md:text-2xl transition-all duration-300"
                                        >
                                            {data.year}
                                        </motion.span>

                                        {/* Tick Mark */}
                                        <div className="w-[2px] h-[16px] md:h-[20px] bg-white/20 group-hover:bg-white/40 transition-colors rounded-full" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* --- THE EXACT MAGNIFYING GLASS LENS --- */}
                        {/* We sit this at z-40 so the active label (z-60) is vividly clear above the blur layer */}
                        <motion.div
                            drag="x"
                            dragConstraints={timelineRef}
                            dragElastic={0.1}
                            onDragEnd={handleDragEnd}
                            whileTap={{ cursor: "grabbing" }}
                            className="absolute top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-grab rounded-full"
                            style={{
                                x: lensX,
                                marginLeft: -lensRadius,
                                width: lensRadius * 2,
                                height: lensRadius * 2,
                            }}
                        >
                            {/* Colorful Glow behind the lens to make it look like thick refracted glass */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-[20px] rounded-full pointer-events-none mix-blend-screen opacity-60" />

                            {/* Realistic Magnifier Handle Underneath the Lens Edge */}
                            <div className="absolute top-[82%] left-[80%]
                                          w-3 sm:w-4 md:w-5
                                          h-20 sm:h-24 md:h-28
                                          bg-gradient-to-r from-[#2c2d2f] via-[#101113] to-[#0a0a0c]
                                          rounded-full border border-black/80
                                          shadow-[4px_6px_12px_rgba(0,0,0,0.5),inset_1px_0_2px_rgba(255,255,255,0.2)]
                                          origin-top-left -rotate-[42deg]"
                            />

                            {/* Lens Glass Base */}
                            <div className="absolute inset-0 rounded-full border-[6px] sm:border-[8px] md:border-[10px] border-[#1a1b1e] shadow-[0_24px_50px_rgba(0,0,0,0.5),inset_0_8px_16px_rgba(255,255,255,0.15),inset_0_-8px_20px_rgba(229,179,58,0.1)] flex items-center justify-center overflow-hidden">

                                {/* Inner colored ring to simulate chromatic aberration / thick glass edge */}
                                <div className="absolute inset-0 rounded-full border-[2px] border-white/20 mix-blend-overlay z-30 pointer-events-none" />

                                {/* Refractive Backdrop Blur mapping */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-[32px] pointer-events-none z-0" />

                                {/* Convex Specular Layer producing liquid feel overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_25%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.0)_60%)] pointer-events-none mix-blend-overlay z-20" />

                                <div className="absolute top-[4%] left-[10%] right-[10%] h-[20%] bg-gradient-to-b from-white/80 to-transparent rounded-full blur-[2px] pointer-events-none mix-blend-overlay z-20 opacity-90" />

                                <div className="absolute bottom-[4%] left-[15%] right-[15%] h-[15%] bg-gradient-to-t from-white/40 to-transparent rounded-full blur-[6px] pointer-events-none mix-blend-overlay z-20" />

                                {/* Internal physical shadow mimicking thickness around the curve edge */}
                                <div className="absolute inset-0 shadow-[inset_0_0_36px_rgba(0,0,0,0.6)] pointer-events-none rounded-full z-20" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- SELECTION INFO PANEL --- */}
                <div className="w-full max-w-[720px] min-h-[300px] relative px-4 sm:px-0">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeData.year}
                            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full bg-[rgba(10,10,12,0.6)] backdrop-blur-[32px] border border-white/10 rounded-[20px] md:rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.08)] p-5 md:p-10 flex flex-col gap-6"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-2 h-2 rounded-full bg-[#E5B33A] animate-pulse shadow-[0_0_8px_rgba(229,179,58,0.6)]" />
                                <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest">
                                    Shows in {activeData.year}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-8 md:gap-10">
                                {activeData.items.map((exItem, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 group">

                                        {/* Date Side */}
                                        <div className="md:w-[140px] shrink-0 text-white/50 text-xs md:text-sm font-semibold tracking-wider uppercase mt-1">
                                            {exItem.dateRange}
                                        </div>

                                        {/* Content Side */}
                                        <div className="flex flex-col gap-1.5 flex-1 border-l-2 border-white/5 pl-4 md:pl-6 md:border-l-0 md:pl-0">
                                            <h4 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#E5B33A] transition-colors leading-tight drop-shadow-sm">
                                                {exItem.title}
                                            </h4>
                                            <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                                                {exItem.venue} • {exItem.city}, {exItem.country}
                                            </p>
                                            {exItem.note && (
                                                <p className="text-white/40 text-[13px] leading-relaxed mt-2 italic">
                                                    {exItem.note}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
