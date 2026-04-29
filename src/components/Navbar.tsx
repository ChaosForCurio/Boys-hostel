"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Rooms",      href: "#rooms" },
  { label: "Amenities",  href: "#amenities" },
  { label: "Gallery",    href: "#gallery" },
  { label: "Location",   href: "#location" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500"
        style={{
          background: scrolled ? "var(--glass)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <svg width="32" height="36" viewBox="0 0 64 72" fill="none">
              <path
                d="M32 2L61 18.5V53.5L32 70L3 53.5V18.5L32 2Z"
                stroke="var(--gold)"
                strokeWidth="2"
                fill="none"
              />
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--gold)"
                fontSize="26"
                fontWeight="700"
                fontFamily="serif"
              >
                N
              </text>
            </svg>
            <span
              className="font-display font-bold text-lg tracking-wide group-hover:opacity-80 transition-opacity"
              style={{ color: "var(--white)" }}
            >
              Neo<span style={{ color: "var(--gold)" }}>Casa</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm tracking-wide transition-colors duration-200 relative group"
                  style={{ color: "var(--muted)" }}
                >
                  <span className="group-hover:text-white transition-colors">{link.label}</span>
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: "var(--gold)" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + mobile burger */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-2 text-sm transition-colors"
              style={{ color: "var(--muted)" }}
            >
              <Phone size={14} />
              +91 98765 43210
            </a>
            <button
              onClick={() => scrollTo("#booking")}
              className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--gold), var(--gold-dim))",
                color: "var(--navy)",
              }}
            >
              Book a Visit
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ color: "var(--white)" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
            style={{ background: "var(--navy-2)" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="font-display text-3xl font-bold hover:text-gold-light transition-colors"
                style={{ color: "var(--white)" }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={() => scrollTo("#booking")}
              className="mt-4 px-8 py-3 rounded-full font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, var(--gold), var(--gold-dim))",
                color: "var(--navy)",
              }}
            >
              Book a Visit
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
