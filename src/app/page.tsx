import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomeHero } from "@/components/sections/home-hero";
import { AlbumGallery } from "@/components/sections/album-gallery";
import { About } from "@/components/sections/about";

import { Collections } from "@/components/sections/collections";
import { Exhibitions } from "@/components/sections/exhibitions";
import { Contact } from "@/components/sections/contact";
import { MarqueeArtStrip } from "@/components/sections/marquee-art-strip";
import { ClientReviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 overflow-x-hidden">
        <HomeHero />

        <div className="hidden md:block">
          <MarqueeArtStrip />
        </div>

        {/* Mobile Marquee (Hidden on Desktop, placed AFTER FanWheel) */}
        <div className="block md:hidden">
          <MarqueeArtStrip />
        </div>

        <AlbumGallery />
        <About />
        <Collections />
        <Exhibitions />
        <ClientReviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
