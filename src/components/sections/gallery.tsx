"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "@/data/artworks";
import { Button } from "@/components/ui/button";

type FilterType = "All" | "Available" | "Sold" | "New";
type SortType = "Newest" | "Oldest" | "Popular";

export function Gallery() {
    const [filter, setFilter] = useState<FilterType>("All");
    const [sort, setSort] = useState<SortType>("Newest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);

    // Filtering and Sorting
    const filteredAndSortedArtworks = artworks
        .filter((art) => {
            if (filter === "All") return true;
            if (filter === "Available") return art.status === "Available";
            if (filter === "Sold") return art.status === "Sold";
            if (filter === "New") return art.year >= 2024;
            return true;
        })
        .sort((a, b) => {
            if (sort === "Newest") return b.year - a.year;
            if (sort === "Oldest") return a.year - b.year;
            // Mock popular sorting (featured first)
            if (sort === "Popular") return (a.featured === b.featured) ? 0 : a.featured ? -1 : 1;
            return 0;
        });

    // Lightbox Handlers
    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedArtworkIndex === null) return;
        setSelectedArtworkIndex(prev =>
            prev !== null && prev > 0 ? prev - 1 : filteredAndSortedArtworks.length - 1
        );
    }, [selectedArtworkIndex, filteredAndSortedArtworks.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedArtworkIndex === null) return;
        setSelectedArtworkIndex(prev =>
            prev !== null && prev < filteredAndSortedArtworks.length - 1 ? prev + 1 : 0
        );
    }, [selectedArtworkIndex, filteredAndSortedArtworks.length]);

    const handleClose = () => setSelectedArtworkIndex(null);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedArtworkIndex === null) return;
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedArtworkIndex, handlePrev, handleNext]);

    return (
        <section id="gallery" className="py-24 bg-cream relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-4">Gallery</h2>
                        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
                            {(["All", "Available", "Sold", "New"] as FilterType[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${filter === f
                                        ? "bg-ink text-cream"
                                        : "bg-transparent border border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-ink/20 text-sm font-medium hover:border-ink/50 transition-colors"
                        >
                            Sort by: {sort} <ChevronDown className="w-4 h-4 opacity-50" />
                        </button>
                        <AnimatePresence>
                            {isSortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-ink/5 overflow-hidden z-20"
                                >
                                    {(["Newest", "Oldest", "Popular"] as SortType[]).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                setSort(s);
                                                setIsSortOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-ink/5 font-medium transition-colors"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Artworks Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredAndSortedArtworks.map((art, idx) => (
                            <motion.div
                                key={art.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: idx % 3 * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedArtworkIndex(idx)}
                            >
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 mb-4 bg-ink/5">
                                    <Image
                                        src={art.image}
                                        alt={art.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {art.status === "Sold" && (
                                        <div className="absolute top-4 right-4 bg-ink text-cream text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Sold
                                        </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="flex justify-between items-start px-1">
                                    <div>
                                        <h3 className="font-serif text-lg font-bold">{art.title}</h3>
                                        <p className="text-sm opacity-60 mt-1">{art.medium}, {art.year}</p>
                                    </div>
                                    <span className="text-xs font-semibold tracking-wider text-ink/50 mt-1">
                                        {art.size}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedArtworkIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                        onClick={handleClose}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-2 text-cream/70 hover:text-cream transition-colors z-[110]"
                            aria-label="Close modal"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            onClick={handlePrev}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-cream/50 hover:text-cream bg-cream/10 rounded-full backdrop-blur transition-all z-[110]"
                            aria-label="Previous artwork"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-cream/50 hover:text-cream bg-cream/10 rounded-full backdrop-blur transition-all z-[110]"
                            aria-label="Next artwork"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {filteredAndSortedArtworks[selectedArtworkIndex] && (
                            <motion.div
                                key={filteredAndSortedArtworks[selectedArtworkIndex].id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="bg-cream rounded-3xl flex flex-col md:flex-row overflow-hidden max-w-6xl w-full max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative w-full md:w-3/5 lg:w-2/3 h-[40vh] md:h-auto bg-ink/5">
                                    <Image
                                        src={filteredAndSortedArtworks[selectedArtworkIndex].image}
                                        alt={filteredAndSortedArtworks[selectedArtworkIndex].title}
                                        fill
                                        className="object-contain"
                                        sizes="100vw"
                                    />
                                </div>
                                <div className="w-full md:w-2/5 lg:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-cream">
                                    <div className="mb-2">
                                        <span className="text-xs uppercase tracking-widest text-ink/50 font-bold">
                                            {filteredAndSortedArtworks[selectedArtworkIndex].category}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold mb-6 text-ink">
                                        {filteredAndSortedArtworks[selectedArtworkIndex].title}
                                    </h2>

                                    <div className="space-y-4 text-sm mb-10 text-ink/80 divide-y divide-ink/5">
                                        <div className="flex justify-between py-2">
                                            <span className="opacity-60">Year</span>
                                            <span className="font-medium text-ink">{filteredAndSortedArtworks[selectedArtworkIndex].year}</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="opacity-60">Medium</span>
                                            <span className="font-medium text-ink">{filteredAndSortedArtworks[selectedArtworkIndex].medium}</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="opacity-60">Dimensions</span>
                                            <span className="font-medium text-ink">{filteredAndSortedArtworks[selectedArtworkIndex].size}</span>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="opacity-60">Status</span>
                                            <span className="font-medium text-ink">
                                                {filteredAndSortedArtworks[selectedArtworkIndex].status}
                                            </span>
                                        </div>
                                    </div>

                                    {filteredAndSortedArtworks[selectedArtworkIndex].status === "Available" ? (
                                        <Button className="w-full justify-center" size="lg" withArrow>
                                            Request Inquiry
                                        </Button>
                                    ) : (
                                        <Button variant="outline" className="w-full justify-center opacity-50 cursor-not-allowed">
                                            Artwork Sold
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
