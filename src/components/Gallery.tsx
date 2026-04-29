"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Using Unsplash for gallery images (approved remote pattern)
const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    alt: "Students studying together",
    span: "col-span-2 row-span-2",
    label: "Study Lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?w=600&q=80",
    alt: "Hostel common area",
    span: "",
    label: "Common Area",
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    alt: "Friends hanging out",
    span: "",
    label: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1592066575517-58df903152f2?w=600&q=80",
    alt: "Gym session",
    span: "",
    label: "Fitness Centre",
  },
  {
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    alt: "Dining hall with hot meals",
    span: "col-span-2",
    label: "Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    alt: "Students socializing",
    span: "",
    label: "Weekend Vibes",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-28 md:py-40"
      style={{ background: "var(--navy-2)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--gold)" }}
            >
              Life at NeoCasa
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl font-bold"
              style={{ color: "var(--white)" }}
            >
              Real moments,<br />
              <span className="text-gold-gradient">real connections.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm max-w-xs"
            style={{ color: "var(--muted)" }}
          >
            From late-night study sessions to weekend cricket — life at NeoCasa is
            more than just a stay, it's a chapter you&apos;ll never forget.
          </motion.p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={() => setLightbox(i)}
              className={`relative rounded-2xl overflow-hidden cursor-zoom-in group ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(10,15,28,0.9) 0%, transparent 60%)",
                }}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--white)" }}>
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(10,15,28,0.95)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY[lightbox].src}
                alt={GALLERY[lightbox].alt}
                fill
                className="object-cover"
                quality={90}
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-xl"
                style={{ color: "var(--white)" }}
              >
                ×
              </button>
              <button
                onClick={() => setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
                style={{ color: "var(--white)" }}
              >
                ‹
              </button>
              <button
                onClick={() => setLightbox((lightbox + 1) % GALLERY.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
                style={{ color: "var(--white)" }}
              >
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
