"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Loader     from "@/components/Loader";
import Navbar     from "@/components/Navbar";
import Hero       from "@/components/Hero";
import About      from "@/components/About";
import Rooms      from "@/components/Rooms";
import Amenities  from "@/components/Amenities";
import Gallery    from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Location   from "@/components/Location";
import Booking    from "@/components/Booking";
import Footer     from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Init Lenis smooth scroll after loader
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Rooms />
          <Amenities />
          <Gallery />
          <Testimonials />
          <Location />
          <Booking />
        </main>
        <Footer />
      </div>
    </>
  );
}
