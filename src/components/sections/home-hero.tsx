"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FanWheel } from "@/components/sections/FanWheel";

// Use the exact artworks from the original fan-wheel-section
const fanWheelArtworks = [
    { id: "1", title: "Skyline Study", year: "2024", medium: "Acrylic", size: "18x24", status: "Available", image: "/images/art-01.jpg" },
    { id: "2", title: "Silent Horizon", year: "2022", medium: "Oil", size: "36x36", status: "Sold", image: "/images/art-02.jpg" },
    { id: "3", title: "Golden Hour", year: "2024", medium: "Oil", size: "24x30", status: "Available", image: "/images/art-03.jpg" },
    { id: "4", title: "Whispering Pines", year: "2023", medium: "Charcoal", size: "40x50", status: "Available", image: "/images/art-04.jpg" },
    { id: "5", title: "Tide Pool", year: "2021", medium: "Watercolor", size: "18x24", status: "Sold", image: "/images/art-05.jpg" },
    { id: "6", title: "Urban Geometry", year: "2024", medium: "Mixed Media", size: "60x72", status: "Available", image: "/images/art-06.jpg" },
    { id: "7", title: "Symphony in Blue", year: "2022", medium: "Oil", size: "30x40", status: "Sold", image: "/images/art-07.jpg" },
    { id: "8", title: "Autumn Canopy", year: "2023", medium: "Acrylic", size: "36x48", status: "Available", image: "/images/art-08.jpg" },
    { id: "9", title: "Desert Mirage", year: "2022", medium: "Pastel", size: "24x24", status: "Available", image: "/images/art-09.jpg" },
    { id: "10", title: "Ocean's Edge", year: "2024", medium: "Oil", size: "30x40", status: "Sold", image: "/images/art-10.jpg" },
    { id: "11", title: "Winter Silence", year: "2023", medium: "Acrylic", size: "18x24", status: "Available", image: "/images/art-11.jpg" },
    { id: "12", title: "Spring Awakening", year: "2024", medium: "Watercolor", size: "22x30", status: "Available", image: "/images/art-12.jpg" },
    { id: "13", title: "Midnight Sun", year: "2022", medium: "Mixed Media", size: "36x48", status: "Sold", image: "/images/art-01.jpg" },
    { id: "14", title: "Morning Mist", year: "2023", medium: "Oil", size: "24x36", status: "Available", image: "/images/art-02.jpg" },
];

export function HomeHero() {
    return (
        <section id="home" className="pt-0 relative overflow-hidden flex flex-col items-center justify-start min-h-screen bg-[#FDFBF7]">

            {/* FanWheel arches OVER the text */}
            {/* FanWheel arches OVER the text */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full relative z-30 shrink-0 md:-mt-10 pointer-events-none"
            >
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FDFBF7] to-transparent z-40 pointer-events-none" />
                <div className="pointer-events-auto">
                    <FanWheel items={fanWheelArtworks}>
                        {/* Main Typography Headline INJECTED inside Wheel */}
                        <div className="flex flex-col items-center pointer-events-auto z-[100] w-full">
                            <h1 className="font-['IBM_Plex_Serif'] font-medium text-[clamp(1.25rem,4vw,1.75rem)] md:text-[clamp(1.75rem,5vw,2.25rem)] text-ink leading-relaxed max-w-[600px] md:max-w-[700px] mx-auto tracking-wide text-balance pt-8 drop-shadow-md">
                                <span>Capturing </span>
                                <span className="font-['Shadows_Into_Light_Two'] text-[115%] font-normal text-ink/90 -rotate-1 inline-block mx-1">stories</span>
                                <span> through brush and </span>
                                <span className="font-['Shadows_Into_Light_Two'] text-[115%] font-normal text-ink/90 rotate-1 inline-block mx-1">color.</span>
                            </h1>
                        </div>
                    </FanWheel>
                </div>
            </motion.div>

            {/* Text Content */}
            <div className="container mx-auto px-4 md:px-6 z-10 w-full flex flex-col items-center text-center pb-10 pointer-events-none relative pt-4 md:pt-8">

                {/* Subheading matched to reference */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-sm md:text-[15px] text-ink/50 mt-4 md:mt-5 max-w-xl mx-auto font-medium pointer-events-auto leading-relaxed"
                >
                    Transform your ideas into breathtaking visuals with curated collections and exclusive commissions.
                </motion.p>

                {/* Main Call to Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-6 md:mt-8 mb-12 md:mb-16 pointer-events-auto"
                >
                    <button className="bg-[#2A2D34] hover:bg-[#1C1C1C] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                        Start Exploring Now <span className="text-lg">→</span>
                    </button>
                </motion.div>


            </div>
        </section>
    );
}
