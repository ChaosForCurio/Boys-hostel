"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const ROOMS = [
  {
    id: "single",
    type: "Single",
    tag: "Most Popular",
    desc: "Your own private sanctuary. Perfect for focused students who value personal space and quiet.",
    image: "/room-single.png",
    monthly: 8500,
    annual:  7200,
    perks: ["Private room", "Study desk & chair", "Wardrobe", "1 Gbps WiFi", "3 meals/day", "Housekeeping 2x/week"],
    color: "from-neutral-200/50 to-navy-3",
  },
  {
    id: "double",
    type: "Double",
    tag: "Great Value",
    desc: "Share with a friend or make a new one. Spacious twin rooms built for community living.",
    image: "/room-double.png",
    monthly: 5500,
    annual:  4700,
    perks: ["Shared twin room", "Dedicated study area", "Individual wardrobes", "1 Gbps WiFi", "3 meals/day", "Housekeeping 2x/week"],
    color: "from-neutral-300/50 to-navy-3",
  },
  {
    id: "deluxe",
    type: "Deluxe Suite",
    tag: "Luxury",
    desc: "The pinnacle of hostel living. Spacious, equipped, and designed for those who expect the best.",
    image: "/room-deluxe.png",
    monthly: 12000,
    annual:  10200,
    perks: ["Private suite", "King bed", "En-suite bathroom", "Smart TV", "AC", "Priority laundry", "3 meals/day"],
    color: "from-neutral-400/50 to-navy-3",
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  }),
};

export default function Rooms() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(false);
  const [active, setActive] = useState(0);

  const room = ROOMS[active];

  return (
    <section
      ref={ref}
      id="rooms"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--navy-2)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "var(--gold)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--gold)" }}
            >
              Rooms & Pricing
            </motion.p>
            <motion.h2
              custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ color: "var(--white)" }}
            >
              Find your <span className="text-gold-gradient">perfect space.</span>
            </motion.h2>
          </div>

          {/* Billing toggle */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex items-center gap-3 glass px-4 py-2 rounded-full self-start md:self-auto"
          >
            <span className="text-sm" style={{ color: annual ? "var(--muted)" : "var(--white)" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-all duration-300"
              style={{ background: annual ? "var(--gold)" : "var(--navy-4)" }}
              aria-label="Toggle annual pricing"
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  background: "var(--white)",
                  left: annual ? "calc(100% - 20px)" : "4px",
                }}
              />
            </button>
            <span className="text-sm" style={{ color: annual ? "var(--white)" : "var(--muted)" }}>
              Annual
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.1)", color: "var(--gold)" }}>
                Save 15%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Room selector tabs */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex gap-3 mb-10 flex-wrap"
        >
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActive(i)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active === i ? "linear-gradient(135deg, var(--gold), var(--gold-dim))" : "var(--navy-3)",
                color: active === i ? "var(--navy)" : "var(--muted)",
                border: "1px solid",
                borderColor: active === i ? "transparent" : "var(--border)",
              }}
            >
              {r.type}
            </button>
          ))}
        </motion.div>

        {/* Main room card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Image — 3/5 */}
            <div className="lg:col-span-3 relative h-72 lg:h-auto min-h-[360px]">
              <Image
                src={room.image}
                alt={`${room.type} room at NeoCasa`}
                fill
                className="object-cover"
                quality={85}
              />
              {/* Tag badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--gold), var(--gold-dim))",
                  color: "var(--navy)",
                }}
              >
                {room.tag}
              </div>
              {/* Navigation arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setActive((active - 1 + ROOMS.length) % ROOMS.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ color: "var(--white)" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActive((active + 1) % ROOMS.length)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ color: "var(--white)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Details — 2/5 */}
            <div
              className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-between"
              style={{ background: "var(--navy-3)" }}
            >
              <div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--white)" }}>
                  {room.type}
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                  {room.desc}
                </p>

                {/* Perks */}
                <ul className="flex flex-col gap-3 mb-8">
                  {room.perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}>
                      <Check size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display text-4xl font-bold" style={{ color: "var(--white)" }}>
                    ₹{(annual ? room.annual : room.monthly).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm mb-2" style={{ color: "var(--muted)" }}>/month</span>
                </div>
                {annual && (
                  <p className="text-xs mb-5" style={{ color: "var(--gold)" }}>
                    ✓ Billed annually · saving ₹{((room.monthly - room.annual) * 12).toLocaleString("en-IN")}/yr
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                    color: "var(--navy)",
                  }}
                >
                  Check Availability
                </motion.button>
                <p className="text-center text-xs mt-3" style={{ color: "var(--muted)" }}>
                  🔥 Limited seats — only 3 left
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {ROOMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "24px" : "8px",
                height: "8px",
                background: active === i ? "var(--gold)" : "var(--navy-4)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
