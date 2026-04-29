"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Engineering Student, IIT Delhi",
    rating: 5,
    text: "NeoCasa genuinely changed my college experience. The study environment is unmatched — I finished my semester projects with zero stress. The food alone is worth it!",
    avatar: "AM",
    color: "from-neutral-200 to-neutral-400",
  },
  {
    name: "Rahul Verma",
    role: "CA Aspirant, Delhi",
    rating: 5,
    text: "My parents were concerned about shifting to a new city. After visiting NeoCasa, they were more relieved than I was! The security, cleanliness, and food quality are top-notch.",
    avatar: "RV",
    color: "from-stone-200 to-stone-400",
  },
  {
    name: "Karan Singh",
    role: "B.Tech CSE, DTU",
    rating: 5,
    text: "I've stayed in 3 hostels before — none come close to NeoCasa. It's not just a place to sleep, it's a community. I made my closest friends here.",
    avatar: "KS",
    color: "from-zinc-200 to-zinc-400",
  },
  {
    name: "Priya's Dad — Parent Review",
    role: "Parent of 2nd year student",
    rating: 5,
    text: "As a parent, the 24/7 security and daily meal updates give us peace of mind. My son has flourished here both academically and personally. Highly recommended!",
    avatar: "PD",
    color: "from-gray-200 to-gray-400",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Background quote mark */}
      <div
        className="absolute top-16 left-12 font-display text-[20rem] font-bold leading-none select-none pointer-events-none opacity-[0.025]"
        style={{ color: "var(--gold)" }}
      >
        "
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--white)" }}
          >
            Loved by students &
            <br />
            <span className="text-gold-gradient">trusted by parents.</span>
          </motion.h2>
        </div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="glass rounded-3xl p-10 md:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold)" style={{ color: "var(--gold)" }} />
                ))}
              </div>

              {/* Quote icon */}
              <Quote
                size={36}
                className="mx-auto mb-6 opacity-30"
                style={{ color: "var(--gold)" }}
              />

              {/* Text */}
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
                style={{ color: "var(--white)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {t.avatar}
                </div>
                <p className="font-semibold" style={{ color: "var(--white)" }}>{t.name}</p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
              style={{ color: "var(--white)" }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current ? "var(--gold)" : "var(--navy-4)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
              style={{ color: "var(--white)" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
