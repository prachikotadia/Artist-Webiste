"use client";

import { FanWheel } from "@/components/sections/FanWheel";

const artworks = [
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

export function FanWheelSection() {
    return (
        <section className="relative w-full overflow-hidden bg-[#F9F9F9] pt-12 md:pt-20 pb-10 min-h-[750px] md:min-h-[800px] flex flex-col justify-between">
            <div className="w-full px-8 text-center z-10 pointer-events-none mt-2 md:mt-8">
                <h2 className="text-4xl md:text-5xl font-serif text-ink mb-3">Interactive Gallery</h2>
                <p className="text-ink/60 text-sm md:text-base max-w-sm mx-auto">Swipe to explore the latest pieces or let it spin automatically.</p>
            </div>

            <div className="w-full relative z-20 mt-8 md:mt-0">
                <FanWheel items={artworks} />
            </div>
        </section>
    );
}
