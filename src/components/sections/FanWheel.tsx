"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimationFrame, animate, MotionValue } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Default Mobile Configuration
const DEFAULT_LAYOUT = {
    radius: 250,
    cardWidth: 100,
    cardHeight: 140,
    containerHeight: 420,
    baseSize: 520,
    baseBottom: -260,
    fanBottom: 0
};

const AUTO_ROTATE_SPEED = 1.5; // Degrees per second

export interface FanArtwork {
    id: string;
    title: string;
    year: string;
    medium: string;
    size: string;
    status: string;
    image: string;
}

interface FanWheelProps {
    items: FanArtwork[];
}

export function FanWheel({ items }: FanWheelProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Core motion value for the wheel's rotation in degrees.
    const rotation = useMotionValue(0);

    // Layout state for responsive scaling
    const [layout, setLayout] = useState(DEFAULT_LAYOUT);

    useEffect(() => {
        const updateLayout = () => {
            if (window.innerWidth >= 1024) {
                // Large Desktop
                setLayout({
                    radius: 380,
                    cardWidth: 160,
                    cardHeight: 220,
                    containerHeight: 680,
                    baseSize: 940,
                    baseBottom: -470,
                    fanBottom: 0
                });
            } else if (window.innerWidth >= 640) {
                // Tablet
                setLayout({
                    radius: 280,
                    cardWidth: 130,
                    cardHeight: 180,
                    containerHeight: 540,
                    baseSize: 680,
                    baseBottom: -340,
                    fanBottom: 0
                });
            } else {
                // Mobile
                setLayout(DEFAULT_LAYOUT);
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Physics / Drag state
    const dragInfo = useRef({
        startX: 0,
        startRot: 0,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
    });

    const autoRotateDelayTimeout = useRef<NodeJS.Timeout | null>(null);
    const [canAutoRotate, setCanAutoRotate] = useState(true);

    // Lightbox State
    const [selectedItem, setSelectedItem] = useState<FanArtwork | null>(null);

    const updateActiveIndex = useCallback((rot: number) => {
        const itemAngle = 360 / items.length;
        const index = Math.round(-rot / itemAngle);

        const wrappedIndex = ((index % items.length) + items.length) % items.length;

        setActiveIndex((prev) => {
            if (prev !== wrappedIndex) return wrappedIndex;
            return prev;
        });
    }, [items.length]);

    // -----------------------------------------------------
    // Inertia & Snapping Logic
    // -----------------------------------------------------
    const snapToNearest = useCallback((currentRot: number, velocity: number = 0) => {
        const itemAngle = 360 / items.length;
        const projectedRot = currentRot + (velocity * 0.15);

        const targetIndex = Math.round(projectedRot / itemAngle);
        const targetRot = targetIndex * itemAngle;

        animate(rotation, targetRot, {
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 1,
            onUpdate: (latest) => {
                updateActiveIndex(latest);
            }
        });

    }, [rotation, items.length, updateActiveIndex]);

    // -----------------------------------------------------
    // Auto Rotation Loop
    // -----------------------------------------------------
    useAnimationFrame((time, delta) => {
        if (isDragging || !canAutoRotate || selectedItem) return;

        const currentRef = rotation.get();
        // Endlessly loop
        const newRot = currentRef - (AUTO_ROTATE_SPEED * (delta / 1000));

        rotation.set(newRot);
        updateActiveIndex(newRot);
    });

    // -----------------------------------------------------
    // Pointer Handlers
    // -----------------------------------------------------
    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        setCanAutoRotate(false);
        if (autoRotateDelayTimeout.current) clearTimeout(autoRotateDelayTimeout.current);

        dragInfo.current = {
            startX: e.clientX,
            startRot: rotation.get(),
            lastX: e.clientX,
            lastTime: performance.now(),
            velocity: 0,
        };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;

        const { startX, startRot, lastX, lastTime } = dragInfo.current;
        const dx = e.clientX - startX;

        const sensitivity = 0.5;
        const newRot = startRot + (dx * sensitivity);

        rotation.set(newRot);
        updateActiveIndex(newRot);

        const currentTime = performance.now();
        const dt = currentTime - lastTime;
        if (dt > 0) {
            dragInfo.current.velocity = ((e.clientX - lastX) / dt) * 1000;
        }

        dragInfo.current.lastX = e.clientX;
        dragInfo.current.lastTime = currentTime;
    };

    const handlePointerUp = () => {
        setIsDragging(false);

        snapToNearest(rotation.get(), dragInfo.current.velocity * 0.5);

        autoRotateDelayTimeout.current = setTimeout(() => {
            setCanAutoRotate(true);
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (autoRotateDelayTimeout.current) clearTimeout(autoRotateDelayTimeout.current);
        };
    }, []);

    const itemAngle = 360 / items.length;

    return (
        <div
            className="relative w-full flex justify-center touch-none select-none overflow-hidden transition-all duration-500"
            style={{ height: layout.containerHeight }}
        >

            {/* The Wheel Base Arc (Background) */}
            <div
                className="absolute rounded-full bg-[#fcfcfc] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] pointer-events-none z-10 border border-ink/5 transition-all duration-500"
                style={{
                    width: layout.baseSize,
                    height: layout.baseSize,
                    bottom: layout.baseBottom
                }}
            />

            {/* The Rotating Fan container */}
            <div
                ref={containerRef}
                className="absolute left-1/2 z-20 w-0 h-0 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-500"
                style={{ bottom: layout.fanBottom }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerOut={(e) => {
                    if (isDragging && e.clientY < window.innerHeight - 360) {
                        handlePointerUp();
                    }
                }}
            >
                <motion.div
                    style={{ rotate: rotation }}
                    className="relative w-0 h-0 flex items-center justify-center text-center"
                >
                    {items.map((item, i) => (
                        <FanItem
                            key={item.id}
                            item={item}
                            i={i}
                            itemAngle={itemAngle}
                            totalItems={items.length}
                            rotation={rotation}
                            activeIndex={activeIndex}
                            isDragging={isDragging}
                            setActiveIndex={setActiveIndex}
                            setSelectedItem={setSelectedItem}
                            layout={layout}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-8 pointer-events-auto"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#fcfcfc] rounded-3xl overflow-hidden w-full max-w-sm flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full aspect-[4/5] bg-ink/5">
                                <Image
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 text-center text-ink flex flex-col items-center">
                                <h3 className="font-serif text-2xl mb-1">{selectedItem.title}</h3>
                                <p className="text-ink/60 text-sm mb-6">{selectedItem.medium}, {selectedItem.year}</p>
                                <Button className="w-4/5 justify-center rounded-full bg-ink text-white hover:bg-ink/90 flex" onClick={() => setSelectedItem(null)}>
                                    Close Preview
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

interface FanItemProps {
    item: FanArtwork;
    i: number;
    itemAngle: number;
    totalItems: number;
    rotation: MotionValue<number>;
    activeIndex: number;
    isDragging: boolean;
    setActiveIndex: (index: number) => void;
    setSelectedItem: (item: FanArtwork) => void;
    layout: typeof DEFAULT_LAYOUT;
}

function FanItem({ item, i, itemAngle, totalItems, rotation, activeIndex, isDragging, setActiveIndex, setSelectedItem, layout }: FanItemProps) {
    const baseAngle = i * itemAngle;
    const isCenter = activeIndex === i;

    // Calculate dynamic scale & opacity based on shortest path distance to 0 (top center)
    const itemScale = useTransform(rotation, (r: number) => {
        let dist = (r + baseAngle) % 360;
        if (dist > 180) dist -= 360;
        if (dist < -180) dist += 360;

        dist = Math.abs(dist);
        if (dist > itemAngle * 1.5) return 0.85;
        return 0.85 + (0.25 * (1 - dist / (itemAngle * 1.5)));
    });

    // Dynamic Z-index using MotionValue so it updates continuously without React re-rendering
    const itemZ = useTransform(rotation, (r: number) => {
        let dist = (r + baseAngle) % 360;
        if (dist > 180) dist -= 360;
        if (dist < -180) dist += 360;

        dist = Math.abs(dist);
        // Pure distance-based Z-index: 100 at center, drops off identically in both directions. 
        // Eliminates any integer rounding ties that cause DOM-order overlap bugs.
        return Math.floor(100 - dist);
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                bottom: '0px',
                left: `-${Math.round(layout.cardWidth / 2)}px`,
                width: `${layout.cardWidth}px`,
                height: `${layout.radius + layout.cardHeight}px`,
                transformOrigin: 'bottom center',
                rotate: baseAngle,
                scale: itemScale,
                zIndex: itemZ,
            }}
            className="flex flex-col justify-start items-center pointer-events-none"
        >
            <div
                style={{ width: layout.cardWidth, height: layout.cardHeight }}
                className={`rounded-[16px] lg:rounded-[24px] overflow-hidden relative transition-all duration-300 pointer-events-auto cursor-pointer ${isCenter ? 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-[1.02]' : 'shadow-lg opacity-80 hover:opacity-100 hover:shadow-xl hover:scale-[1.01]'}`}
                onClick={() => {
                    if (isDragging) return;
                    if (isCenter) {
                        setSelectedItem(item);
                    } else {
                        // Find the shortest path around the circle to snap to this item
                        const currentRot = rotation.get();
                        const targetRotUnwrapped = -baseAngle;

                        let diff = (targetRotUnwrapped - currentRot) % 360;
                        if (diff > 180) diff -= 360;
                        if (diff < -180) diff += 360;

                        const targetRot = currentRot + diff;

                        animate(rotation, targetRot, {
                            type: "spring", stiffness: 150, damping: 20
                        });
                        setActiveIndex(i);
                    }
                }}
            >
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 240px"
                        priority={i < 4}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    <AnimatePresence>
                        {isCenter && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-center text-center pointer-events-none"
                            >
                                <span className="text-white text-xs font-serif leading-tight drop-shadow-md">{item.title}</span>
                                <span className="text-white/80 text-[10px] mt-0.5 drop-shadow-md">{item.year}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
