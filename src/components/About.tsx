"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Shield, Users, Trophy, Clock } from "lucide-react";

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="counter-num">
      {prefix}{count}{suffix}
    </span>
  );
}

const STATS = [
  { icon: Users,  label: "Students Housed",  value: 500, suffix: "+"  },
  { icon: Trophy, label: "Years of Trust",    value: 5,   suffix: "+"  },
  { icon: Shield, label: "Safety Rating",     value: 99,  suffix: "%"  },
  { icon: Clock,  label: "Support",           value: 24,  suffix: "/7" },
];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-40 overflow-hidden section-glow"
      style={{ background: "var(--navy)" }}
    >
      {/* Decorative vertical line */}
      <div
        className="absolute top-0 left-1/2 w-px h-24 -translate-x-1/2"
        style={{ background: "linear-gradient(to bottom, transparent, var(--gold-dim))" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: "var(--gold)" }}
        >
          Our Story
        </motion.p>

        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column – headline */}
          <div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
              style={{ color: "var(--white)" }}
            >
              Built for the boys
              <br />
              who{" "}
              <span className="text-gold-gradient">dare to dream.</span>
            </motion.h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    custom={i + 2}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="glass p-5 rounded-2xl"
                  >
                    <Icon size={20} className="mb-3" style={{ color: "var(--gold)" }} />
                    <div
                      className="font-display text-3xl font-bold mb-1"
                      style={{ color: "var(--white)" }}
                    >
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right column – story text */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:pt-16 flex flex-col gap-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              NeoCasa was born from a simple question:{" "}
              <em style={{ color: "var(--white)" }}>
                &ldquo;Why can&apos;t student housing feel premium?&rdquo;
              </em>{" "}
              In 2019, we reimagined what a boys hostel could be — a place that
              nurtures ambition, builds lifelong friendships, and feels like home.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Every detail — from the imported mattresses to the high-speed fiber
              internet, from the 3 chef-prepared meals to the 24/7 security staff
              — is curated with one goal: to let you focus on becoming your best
              self.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-2">
              {["🔒 CCTV Monitored", "🍽️ Home-cooked Meals", "📶 1 Gbps WiFi", "🏥 Medical Support"].map((badge) => (
                <span
                  key={badge}
                  className="text-sm px-4 py-2 rounded-full"
                  style={{
                    background: "var(--navy-3)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-4 self-start flex items-center gap-2 text-sm font-semibold group"
              style={{ color: "var(--gold)" }}
            >
              Schedule a Visit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
