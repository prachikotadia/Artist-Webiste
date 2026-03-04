"use client";

import { Home, Search, MessageSquare, User } from "lucide-react";
import { FanWheel } from "@/components/sections/FanWheel";

// Use 8 items as requested
const artworks = [
    { id: "1", title: "Skyline Study", year: "2024", medium: "Acrylic", size: "18x24", status: "Available", image: "/images/art-01.jpg" },
    { id: "2", title: "Silent Horizon", year: "2022", medium: "Oil", size: "36x36", status: "Sold", image: "/images/art-02.jpg" },
    { id: "3", title: "Golden Hour", year: "2024", medium: "Oil", size: "24x30", status: "Available", image: "/images/art-03.jpg" },
    { id: "4", title: "Whispering Pines", year: "2023", medium: "Charcoal", size: "40x50", status: "Available", image: "/images/art-04.jpg" },
    { id: "5", title: "Tide Pool", year: "2021", medium: "Watercolor", size: "18x24", status: "Sold", image: "/images/art-05.jpg" },
    { id: "6", title: "Urban Geometry", year: "2024", medium: "Mixed Media", size: "60x72", status: "Available", image: "/images/art-06.jpg" },
    { id: "7", title: "Symphony in Blue", year: "2022", medium: "Oil", size: "30x40", status: "Sold", image: "/images/art-07.jpg" },
    { id: "8", title: "Autumn Canopy", year: "2023", medium: "Acrylic", size: "36x48", status: "Available", image: "/images/art-08.jpg" },
];

export default function FanDemoPage() {
    return (
        <div className="flex bg-ink/5 min-h-screen items-center justify-center p-4">
            {/* Mobile Device Mockup */}
            <div className="relative w-full max-w-[390px] h-[844px] bg-[#F9F9F9] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-ink flex flex-col justify-end pb-24">

                {/* Header Context */}
                <div className="absolute top-20 left-0 right-0 px-8 text-center">
                    <h1 className="text-3xl font-serif text-ink mb-2">Collections</h1>
                    <p className="text-ink/60 text-sm">Swipe or let it spin</p>
                </div>

                {/* The Extracted Fan Wheel Component */}
                <div className="w-full relative z-10">
                    <FanWheel items={artworks} />
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white shadow-[0_-4px_30px_rgba(0,0,0,0.06)] flex items-center justify-between px-8 z-50 rounded-t-[2rem] border-t border-ink/5 pointer-events-auto">
                    <button className="text-ink/40 hover:text-ink transition-colors"><Home className="w-6 h-6" /></button>
                    <button className="text-ink/40 hover:text-ink transition-colors mr-10"><Search className="w-6 h-6" /></button>
                    <button className="text-ink/40 hover:text-ink transition-colors ml-10"><MessageSquare className="w-6 h-6" /></button>
                    <button className="text-ink/40 hover:text-ink transition-colors"><User className="w-6 h-6" /></button>
                </div>

            </div>
        </div>
    );
}
