"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Collections", href: "#collections" },
    { name: "Exhibitions", href: "#exhibitions" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "py-4 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" : "py-6 bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavClick("#home");
                        }}
                        className="relative z-[110] flex items-center justify-center group"
                    >
                        {/* Logo without any box/glassmorphism background */}
                        <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-105 active:scale-95">
                            {/* Inner mix-blend image to remove white rendering artifacts if any remain */}
                            <div className="relative w-full h-full mix-blend-multiply overflow-hidden">
                                <Image
                                    src="/images/logo-raw.png"
                                    alt="AVS AR VISHWA ART STUDIO"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className="text-sm font-medium hover:text-ink/70 transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <Button
                            variant="primary"
                            size="sm"
                            withArrow
                            onClick={() => handleNavClick("#contact")}
                        >
                            Get in touch
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open mobile menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[120] bg-cream flex flex-col items-center justify-center"
                    >
                        <button
                            className="absolute top-6 right-6 p-2 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close mobile menu"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <ul className="flex flex-col items-center gap-8 text-3xl sm:text-4xl font-serif">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className="hover:opacity-70 transition-opacity"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12">
                            <Button
                                variant="primary"
                                size="lg"
                                className="px-8 py-6 text-lg"
                                withArrow
                                onClick={() => handleNavClick("#contact")}
                            >
                                Get in touch
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
