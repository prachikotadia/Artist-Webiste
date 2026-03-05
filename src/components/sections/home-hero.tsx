"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FanWheel } from "@/components/sections/FanWheel";

// Use the exact artworks from the original fan-wheel-section
const fanWheelArtworks = [
    { id: "1", title: "Skyline Study", year: "2024", medium: "Acrylic", size: "18x24", status: "Available", image: "https://source.unsplash.com/random/800x1000/?abstract,painting,colorful&sig=1" },
    { id: "2", title: "Silent Horizon", year: "2022", medium: "Oil", size: "36x36", status: "Sold", image: "https://source.unsplash.com/random/800x1000/?oil,art,texture&sig=2" },
    { id: "3", title: "Golden Hour", year: "2024", medium: "Oil", size: "24x30", status: "Available", image: "https://source.unsplash.com/random/800x1000/?canvas,painting,gold&sig=3" },
    { id: "4", title: "Whispering Pines", year: "2023", medium: "Charcoal", size: "40x50", status: "Available", image: "https://source.unsplash.com/random/800x1000/?landscape,painting,acrylic&sig=4" },
    { id: "5", title: "Tide Pool", year: "2021", medium: "Watercolor", size: "18x24", status: "Sold", image: "https://source.unsplash.com/random/800x1000/?watercolor,colorful,art&sig=5" },
    { id: "6", title: "Urban Geometry", year: "2024", medium: "Mixed Media", size: "60x72", status: "Available", image: "https://source.unsplash.com/random/800x1000/?vibrant,painting,modern&sig=6" },
    { id: "7", title: "Symphony in Blue", year: "2022", medium: "Oil", size: "30x40", status: "Sold", image: "https://source.unsplash.com/random/800x1000/?blue,painting,oil&sig=7" },
    { id: "8", title: "Autumn Canopy", year: "2023", medium: "Acrylic", size: "36x48", status: "Available", image: "https://source.unsplash.com/random/800x1000/?warm,painting,abstract&sig=8" },
    { id: "9", title: "Desert Mirage", year: "2022", medium: "Pastel", size: "24x24", status: "Available", image: "https://source.unsplash.com/random/800x1000/?texture,painting,canvas&sig=9" },
    { id: "10", title: "Ocean's Edge", year: "2024", medium: "Oil", size: "30x40", status: "Sold", image: "https://source.unsplash.com/random/800x1000/?ocean,painting,oil&sig=10" },
    { id: "11", title: "Winter Silence", year: "2023", medium: "Acrylic", size: "18x24", status: "Available", image: "https://source.unsplash.com/random/800x1000/?white,painting,minimal&sig=11" },
    { id: "12", title: "Spring Awakening", year: "2024", medium: "Watercolor", size: "22x30", status: "Available", image: "https://source.unsplash.com/random/800x1000/?floral,painting,colorful&sig=12" },
    { id: "13", title: "Midnight Sun", year: "2022", medium: "Mixed Media", size: "36x48", status: "Sold", image: "https://source.unsplash.com/random/800x1000/?night,painting,vibrant&sig=13" },
    { id: "14", title: "Morning Mist", year: "2023", medium: "Oil", size: "24x36", status: "Available", image: "https://source.unsplash.com/random/800x1000/?soft,painting,oil&sig=14" },
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
                className="w-full relative z-30 shrink-0 -mt-48 sm:-mt-56 md:-mt-10 pointer-events-none"
            >
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#FDFBF7] to-transparent z-40 pointer-events-none" />
                <div className="pointer-events-auto">
                    <FanWheel items={fanWheelArtworks} />
                </div>
            </motion.div>

            {/* Ambient Background Video - Positioned between FanWheel (z-30) and Text (z-60) */}
            <div className="absolute top-[18%] md:top-[25%] left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-video z-[40] pointer-events-none opacity-30 mix-blend-multiply flex items-center justify-center">
                <video
                    src="/videos/Merging_Colors_Video_and_Logo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ maskImage: "radial-gradient(circle, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}
                />
            </div>

            {/* Text Content - Positioned UP directly into the negative space of the wheel */}
            <div className="container mx-auto px-4 md:px-6 relative z-[60] w-full flex flex-col items-center text-center -mt-[100px] md:-mt-[220px] pointer-events-none pb-10">

                {/* Main Typography Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col items-center pointer-events-auto z-10 w-full mb-6 max-w-[90vw] md:max-w-none"
                >
                    <h1 className="font-['IBM_Plex_Serif'] font-medium text-[clamp(1.25rem,5.5vw,1.35rem)] md:text-[clamp(1.75rem,5vw,2.25rem)] text-ink leading-[1.3] md:leading-relaxed max-w-[600px] md:max-w-[700px] mx-auto tracking-wide text-balance md:drop-shadow-md pb-2 px-2 md:px-0">
                        <span>Capturing </span>
                        <span className="font-['Shadows_Into_Light_Two'] text-[120%] font-normal text-ink/90 -rotate-1 inline-block mx-1 drop-shadow-sm">stories</span>
                        <br className="hidden sm:block md:hidden" />
                        <span> through brush and </span>
                        <span className="font-['Shadows_Into_Light_Two'] text-[120%] font-normal text-ink/90 rotate-1 inline-block mx-1 drop-shadow-sm flex-shrink-0">color.</span>
                    </h1>
                </motion.div>

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
