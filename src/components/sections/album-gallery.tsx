"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import { albums, Album, AlbumArtwork } from "@/data/albums";

// --- Subcomponents ---

const ChipsRow = () => (
    <div className="flex items-center gap-2 mt-2 px-4 overflow-x-auto no-scrollbar pb-2">
        {["2024", "ARVISHWA", "Vishwa Dadhaniya", "Collection"].map((chip) => (
            <span key={chip} className="px-3 py-1 bg-gray-100 text-ink/70 text-[10px] rounded-full whitespace-nowrap font-medium">
                {chip}
            </span>
        ))}
    </div>
);

const AlbumCard = ({ album, onClick }: { album: Album; onClick: () => void }) => {
    // Top 3 artworks for fan, 1 for front thumbnail
    const fanImages = album.artworks.slice(1, 4);
    const frontImage = album.artworks[0];

    return (
        <motion.div
            layoutId={`album-container-${album.name}`}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            // Significantly increased margins and height for maximum visibility and dramatic hover space
            className="cursor-pointer group relative mt-[70px] sm:mt-[90px] mb-8 sm:mb-12 h-[130px] sm:h-[160px] w-full max-w-[180px] sm:max-w-[220px] mx-auto isolate z-10 hover:z-50"
        >
            {/* Back of the Folder - Refined Soft Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EAE6DF] to-[#DFDCD2] rounded-b-[1.25rem] sm:rounded-b-[1.5rem] rounded-tr-[1.25rem] sm:rounded-tr-[1.5rem] rounded-tl-[10px] sm:rounded-tl-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 z-0 transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                {/* Folder Tab */}
                <div className="absolute -top-[16px] sm:-top-[20px] left-0 w-[45%] h-[17px] sm:h-[21px] bg-gradient-to-b from-[#EAE6DF] to-[#E6E2DA] rounded-t-[10px] sm:rounded-t-[12px] border-t border-l border-white/60"
                    style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }} />

                {/* Inner folder depth shadow */}
                <div className="absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-black/10 to-transparent rounded-b-[1.25rem] sm:rounded-b-[1.5rem] pointer-events-none opacity-60" />
            </div>

            {/* Fanned Images Inside Folder - Visibly protruding by default */}
            <div className="absolute inset-x-0 bottom-[12%] sm:bottom-[15%] h-full flex justify-center items-end pointer-events-none z-10 transition-transform duration-500 ease-out group-hover:-translate-y-4">
                {/* Left Card Wrapper */}
                {fanImages[2] && (
                    <div className="absolute origin-bottom-right transition-all duration-500 ease-out group-hover:-rotate-[18deg] group-hover:-translate-x-[2.5rem] sm:group-hover:-translate-x-[3.25rem] group-hover:-translate-y-[1.5rem] sm:group-hover:-translate-y-[2rem] z-[1]">
                        <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                            // Prominent default state: pushed up and rotated
                            className="relative w-[100px] sm:w-[125px] h-[80px] sm:h-[100px] rounded-lg sm:rounded-xl overflow-hidden shadow-md -translate-x-[25px] sm:-translate-x-[35px] -translate-y-[35px] sm:-translate-y-[45px] -rotate-[8deg] border-[2px] border-white/80 bg-white group-hover:shadow-xl group-hover:border-white transition-all duration-500"
                        >
                            <Image src={fanImages[2].image} alt="" fill className="object-cover" />
                        </motion.div>
                    </div>
                )}

                {/* Right Card Wrapper */}
                {fanImages[1] && (
                    <div className="absolute origin-bottom-left transition-all duration-500 ease-out group-hover:rotate-[18deg] group-hover:translate-x-[2.5rem] sm:group-hover:translate-x-[3.25rem] group-hover:-translate-y-[1.5rem] sm:group-hover:-translate-y-[2rem] z-[2]">
                        <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                            className="relative w-[100px] sm:w-[125px] h-[80px] sm:h-[100px] rounded-lg sm:rounded-xl overflow-hidden shadow-md translate-x-[25px] sm:translate-x-[35px] -translate-y-[35px] sm:-translate-y-[45px] rotate-[8deg] border-[2px] border-white/80 bg-white group-hover:shadow-xl group-hover:border-white transition-all duration-500"
                        >
                            <Image src={fanImages[1].image} alt="" fill className="object-cover" />
                        </motion.div>
                    </div>
                )}

                {/* Center Card Wrapper */}
                {fanImages[0] && (
                    <div className="absolute origin-bottom transition-all duration-500 ease-out group-hover:-translate-y-[2.5rem] sm:group-hover:-translate-y-[3.5rem] group-hover:scale-[1.08] z-[3]">
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative w-[115px] sm:w-[145px] h-[95px] sm:h-[115px] rounded-lg sm:rounded-xl overflow-hidden shadow-lg -translate-y-[45px] sm:-translate-y-[55px] border-[3px] border-white/90 bg-white group-hover:shadow-2xl group-hover:border-white transition-all duration-500"
                        >
                            <Image src={fanImages[0].image} alt="" fill className="object-cover" />
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Main Cover Card (Front Flap of Folder) */}
            <motion.div
                layoutId={`album-cover-${album.name}`}
                className="absolute inset-x-0 bottom-0 h-[65%] sm:h-[65%] bg-white/40 backdrop-blur-xl rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[0_4px_24px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/50 flex flex-row items-center p-2.5 sm:p-3.5 gap-3 z-20 transition-all duration-500 ease-out origin-bottom group-hover:bg-white/70 group-hover:backdrop-blur-2xl group-hover:border-white/80 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] group-hover:-translate-y-1"
            >
                {/* Front Thumbnail */}
                <motion.div layoutId={`album-image-${album.name}`} className="relative w-12 h-12 sm:w-[58px] sm:h-[58px] rounded-[10px] sm:rounded-xl overflow-hidden shrink-0 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.05)] border-[2px] border-white/60 bg-white/40 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-md group-hover:border-white/90">
                    <Image src={frontImage?.image || "/placeholder.jpg"} alt={album.name} fill className="object-cover" />
                </motion.div>
                <div className="flex-1 min-w-0 flex flex-col items-start justify-center">
                    <motion.h3 layoutId={`album-title-${album.name}`} className="font-serif text-[16px] sm:text-[18px] font-medium text-ink truncate leading-tight w-full drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-500">
                        {album.name}
                    </motion.h3>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wide text-ink/70 font-semibold bg-white/30 px-[10px] sm:px-[12px] py-[3px] rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),0_1px_2px_rgba(0,0,0,0.04)] border border-white/40 mt-1.5 transition-colors duration-500 group-hover:bg-white/60 group-hover:border-white/60">
                        {album.artworks.length} works
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ArtworkThumb = ({ artwork, index, onClick }: { artwork: AlbumArtwork; index: number; onClick: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            onClick={onClick}
            className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-sm cursor-pointer group bg-gray-100"
            whileTap={{ scale: 0.96 }}
        >
            <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 20vw"
            />
        </motion.div>
    );
};

const ArtworkLightboxModal = ({
    activeArtwork,
    onClose,
    onNext,
    onPrev
}: {
    activeArtwork: AlbumArtwork | null;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) => {
    // Touch handlers for swipe
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchY, setTouchY] = useState<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchY(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStart || !touchY) return;
        const currentX = e.targetTouches[0].clientX;
        const currentY = e.targetTouches[0].clientY;

        const diffX = touchStart - currentX;
        const diffY = touchY - currentY;

        // Swipe down to close
        if (diffY < -100 && Math.abs(diffX) < 50) {
            onClose();
            setTouchStart(null);
            setTouchY(null);
            return;
        }

        // Horizontal swipes
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) onNext();
            else onPrev();
            setTouchStart(null);
        }
    };

    if (!activeArtwork) return null;

    return (
        <AnimatePresence>
            {activeArtwork && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 240, damping: 28 }}
                    className="fixed inset-0 z-[100] bg-cream/95 backdrop-blur-md flex flex-col pt-12 pb-8 px-4 touch-none"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={() => { setTouchStart(null); setTouchY(null); }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-ink shadow-sm z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex-1 relative w-full flex items-center justify-center">
                        <motion.div
                            key={activeArtwork.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative w-full h-full max-h-[70vh] rounded-2xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src={activeArtwork.image}
                                alt={activeArtwork.title}
                                fill
                                className="object-cover sm:object-contain bg-white/50"
                                priority
                            />
                        </motion.div>
                    </div>

                    <div className="mt-6 text-center shrink-0">
                        <h2 className="font-serif text-2xl text-ink leading-tight">{activeArtwork.title}</h2>
                        <p className="text-sm text-ink/60 mt-2 font-medium">
                            {activeArtwork.category} · {activeArtwork.year}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Main Components ---

export const AlbumGallery = () => {
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [lightboxArtwork, setLightboxArtwork] = useState<AlbumArtwork | null>(null);

    // Lock body scroll when modal active
    useEffect(() => {
        if (selectedAlbum || lightboxArtwork) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [selectedAlbum, lightboxArtwork]);

    const navigateLightbox = (direction: 'next' | 'prev') => {
        if (!selectedAlbum || !lightboxArtwork) return;
        const currentIndex = selectedAlbum.artworks.findIndex(a => a.id === lightboxArtwork.id);
        if (direction === 'next' && currentIndex < selectedAlbum.artworks.length - 1) {
            setLightboxArtwork(selectedAlbum.artworks[currentIndex + 1]);
        } else if (direction === 'prev' && currentIndex > 0) {
            setLightboxArtwork(selectedAlbum.artworks[currentIndex - 1]);
        }
    };

    return (
        <section id="gallery" className="pt-12 pb-24 md:pt-16 bg-cream relative min-h-screen">
            {/* Gallery Albums Grid View */}
            <div className="max-w-7xl mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Gallery</h2>
                    <p className="text-sm sm:text-base text-ink/60 font-medium">Explore collections by medium & style</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-[4.5rem] sm:gap-x-6 sm:gap-y-16 pb-24">
                    {albums.map((album) => (
                        <AlbumCard key={album.name} album={album} onClick={() => setSelectedAlbum(album)} />
                    ))}
                </div>
            </div>

            {/* Album Detail View */}
            <AnimatePresence>
                {selectedAlbum && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                        className="fixed inset-0 z-[150] bg-cream flex flex-col"
                    >
                        {/* Detail Header */}
                        <div className="pt-12 pb-4 px-4 sm:px-8 bg-cream/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
                            <div className="flex items-center mb-1">
                                <button
                                    onClick={() => setSelectedAlbum(null)}
                                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-ink active:bg-gray-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <motion.h2 layoutId={`album-title-${selectedAlbum.name}`} className="font-serif text-2xl text-ink ml-1">
                                    {selectedAlbum.name}
                                </motion.h2>
                            </div>
                            <ChipsRow />
                        </div>

                        {/* Grid */}
                        <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
                                {selectedAlbum.artworks.map((artwork, i) => (
                                    <ArtworkThumb
                                        key={artwork.id}
                                        artwork={artwork}
                                        index={i}
                                        onClick={() => setLightboxArtwork(artwork)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox Viewer */}
            <ArtworkLightboxModal
                activeArtwork={lightboxArtwork}
                onClose={() => setLightboxArtwork(null)}
                onNext={() => navigateLightbox('next')}
                onPrev={() => navigateLightbox('prev')}
            />
        </section>
    );
};
