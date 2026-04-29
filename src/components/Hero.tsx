"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToAbout = () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 scale-110 will-change-transform"
      >
        <Image
          src="/hero.png"
          alt="NeoCasa Boys Hostel premium interior"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,15,28,0.2) 0%, rgba(10,15,28,0.6) 50%, rgba(10,15,28,1) 100%)",
          }}
        />
      </motion.div>

      {/* Animated noise grain */}
      <div className="absolute inset-0 noise pointer-events-none z-10" />

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 glass text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--gold)", borderColor: "rgba(0,0,0,0.3)" }}
        >
          <Sparkles size={12} />
          Premium Co-Living · Est. 2019
          <Sparkles size={12} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
          style={{ color: "var(--white)" }}
        >
          More than a hostel.
          <br />
          <span className="text-gold-gradient">A lifestyle.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="text-base md:text-xl max-w-2xl leading-relaxed mb-10"
          style={{ color: "var(--muted)" }}
        >
          Where ambitious students find their tribe — premium rooms, world-class
          amenities, 24/7 security, and a community that pushes you forward.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              color: "var(--navy)",
              boxShadow: "0 0 40px rgba(0,0,0,0.15)",
            }}
          >
            Book a Visit
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button
            onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-semibold text-base glass transition-all duration-300 hover:scale-105"
            style={{ color: "var(--white)", borderColor: "rgba(0,0,0,0.2)" }}
          >
            Explore Rooms
          </button>
        </motion.div>

        {/* Trust signals strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-12"
          style={{ color: "var(--muted)" }}
        >
          {[
            "✦ 500+ Happy Students",
            "✦ 5-Star Rated",
            "✦ 24/7 CCTV Security",
            "✦ 3 Meals Daily",
          ].map((item) => (
            <span key={item} className="text-xs tracking-wider uppercase">
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 scroll-bounce"
        style={{ color: "var(--muted)" }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
