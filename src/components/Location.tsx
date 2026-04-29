"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Train, GraduationCap, ShoppingBag, Bus } from "lucide-react";

const NEARBY = [
  { icon: GraduationCap, label: "DTU",              dist: "1.2 km",  time: "5 min"  },
  { icon: GraduationCap, label: "NSUT",             dist: "2.4 km",  time: "8 min"  },
  { icon: Train,         label: "Metro Station",    dist: "400 m",   time: "5 min walk" },
  { icon: Bus,           label: "Bus Stand",        dist: "200 m",   time: "2 min walk" },
  { icon: ShoppingBag,   label: "Market",           dist: "600 m",   time: "3 min"  },
  { icon: MapPin,        label: "Hospital",         dist: "1.8 km",  time: "7 min"  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="location"
      className="relative py-28 md:py-40"
      style={{ background: "var(--navy-2)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--gold)" }}
          >
            Location
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "var(--white)" }}
          >
            Strategically located.
            <br />
            <span className="text-gold-gradient">Conveniently connected.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map embed — 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{ height: "420px", border: "1px solid var(--border)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.292!2d77.1167!3d28.7502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01e4b21b7d7d%3A0xf3e1bcbf281ac0f5!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NeoCasa Location Map"
            />
          </motion.div>

          {/* Nearby highlights — 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Address card */}
            <div
              className="glass p-6 rounded-2xl mb-2"
            >
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <p className="font-semibold mb-1" style={{ color: "var(--white)" }}>
                    NeoCasa Boys Hostel
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    Plot 42, Sector 14 Extension,<br />
                    Rohini, New Delhi — 110085
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby list */}
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>
              Nearby
            </p>
            <div className="grid grid-cols-1 gap-3">
              {NEARBY.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                      background: "var(--navy-3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} style={{ color: "var(--gold)" }} />
                      <span className="text-sm" style={{ color: "var(--white)" }}>{item.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium" style={{ color: "var(--gold)" }}>{item.dist}</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>{item.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
