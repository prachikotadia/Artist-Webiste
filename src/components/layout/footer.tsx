import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaLinkedinIn, FaCommentSms } from "react-icons/fa6";

export function Footer() {
    const socialLinks = [
        {
            name: "Instagram",
            icon: FaInstagram,
            activeClass: "active:text-[#E1306C]",
            href: "https://www.instagram.com/ar_vishwa?hl=en"
        },
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            activeClass: "active:text-[#25D366]",
            href: "#"
        },
        {
            name: "LinkedIn",
            icon: FaLinkedinIn,
            activeClass: "active:text-[#0077B5]",
            href: "#"
        },
        {
            name: "Text",
            icon: FaCommentSms,
            activeClass: "active:text-[#0B84FF]",
            href: "#"
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-[#1E1E24] to-[#0D0D12] text-cream py-16 px-6 mt-32 rounded-t-[3rem] relative overflow-hidden border-t border-white/5">
            {/* Colorful Ambient Glows in the background */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-rose-500/10 via-orange-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="md:col-span-2">
                    <h2 className="font-serif text-4xl mb-4">ARVISHWA</h2>
                    <p className="opacity-70 max-w-sm leading-relaxed">
                        Original paintings by Vishwa Dadhaniya. Curating timeless art for collections, exhibitions, and life spaces.
                    </p>
                </div>

                {/* Navigation Links with 3D Hover */}
                <div>
                    <h3 className="font-bold mb-6 tracking-wider text-sm uppercase opacity-50">Navigation</h3>
                    <ul className="space-y-4">
                        {["Home", "Gallery", "About", "Collections", "Exhibitions"].map((item) => (
                            <li key={item}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="inline-block opacity-70 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 hover:translate-x-1 hover:drop-shadow-[2px_4px_8px_rgba(255,255,255,0.15)] hover:text-white"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links with Icons and 3D Hover */}
                <div>
                    <h3 className="font-bold mb-6 tracking-wider text-sm uppercase opacity-50">Social</h3>
                    <ul className="space-y-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <li key={social.name} className="relative group/social">
                                    <a
                                        href={social.href}
                                        target={social.href.startsWith("http") ? "_blank" : undefined}
                                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className={`group inline-flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 active:scale-95 ${social.activeClass}`}
                                    >
                                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                                        <span className="font-semibold tracking-wide text-lg">{social.name}</span>
                                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="container mx-auto mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center opacity-50 text-sm relative z-10">
                <p>&copy; {new Date().getFullYear()} ARVISHWA. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:underline transition-colors hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:underline transition-colors hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
