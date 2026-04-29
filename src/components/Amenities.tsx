"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Wifi, UtensilsCrossed, ShieldCheck, WashingMachine,
  Dumbbell, BookOpen, Zap, Coffee, Thermometer, Car,
  Moon, Headphones,
} from "lucide-react";

const AMENITIES = [
  { icon: Wifi,            label: "1 Gbps WiFi",          desc: "Blazing-fast fiber, no throttling"         },
  { icon: UtensilsCrossed, label: "Chef-cooked Meals",    desc: "3 nutritious meals every day"              },
  { icon: ShieldCheck,     label: "24/7 Security",        desc: "CCTV + trained security guards"            },
  { icon: WashingMachine,  label: "Laundry Service",      desc: "Complimentary wash & fold"                 },
  { icon: Dumbbell,        label: "Fitness Centre",        desc: "Fully equipped gym on premises"           },
  { icon: BookOpen,        label: "Study Lounge",          desc: "Quiet zones + collaborative spaces"       },
  { icon: Zap,             label: "Power Backup",          desc: "24/7 UPS for rooms & common areas"       },
  { icon: Coffee,          label: "Café Lounge",           desc: "Coffee, snacks & chill vibes"             },
  { icon: Thermometer,     label: "AC Rooms",              desc: "Climate controlled for comfort"           },
  { icon: Car,             label: "Parking",               desc: "Secure two-wheeler parking"               },
  { icon: Moon,            label: "Quiet Hours",           desc: "Dedicated study silence after 10 PM"     },
  { icon: Headphones,      label: "Entertainment Zone",   desc: "PS5, streaming, gaming setup"             },
];

export default function Amenities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="amenities"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Left glow */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "var(--gold)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Amenities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--white)" }}
          >
            Everything you need.
            <br />
            <span className="text-gold-gradient">Nothing you don't.</span>
          </motion.h2>
        </div>

        {/* Amenity grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="amenity-card group relative p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "var(--navy-3)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05), transparent 70%)",
                  }}
                />

                <div className="amenity-icon mb-4" style={{ color: "var(--muted)" }}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--white)" }}>
                  {a.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {a.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
