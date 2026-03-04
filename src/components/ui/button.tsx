"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    withArrow?: boolean;
    children?: React.ReactNode;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    withArrow,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-ink text-cream hover:bg-ink-light",
        secondary: "bg-accent text-ink hover:bg-accent/80",
        outline: "border border-ink/20 text-ink hover:bg-ink/5",
        ghost: "text-ink hover:bg-ink/5",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
            {withArrow && (
                <span className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-cream text-ink">
                    <ArrowUpRight className="w-4 h-4" />
                </span>
            )}
        </motion.button>
    );
}
