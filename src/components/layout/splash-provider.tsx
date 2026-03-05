"use client";

import { useState } from "react";
import { IntroSplash } from "./intro-splash";

export function SplashProvider() {
    const [showSplash, setShowSplash] = useState(true);

    if (!showSplash) return null;

    return (
        <IntroSplash onComplete={() => {
            sessionStorage.setItem("splashPlayed", "true");
            setShowSplash(false);
        }} />
    );
}
