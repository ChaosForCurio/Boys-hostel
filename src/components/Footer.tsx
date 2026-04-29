"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, MessageCircle, Play, ExternalLink } from "lucide-react";

const QUICK_LINKS = [
  { label: "About",      href: "#about"       },
  { label: "Rooms",      href: "#rooms"       },
  { label: "Amenities",  href: "#amenities"   },
  { label: "Gallery",    href: "#gallery"     },
  { label: "Location",   href: "#location"    },
  { label: "Book a Visit",href: "#booking"    },
];

const SOCIAL = [
  { icon: Globe,         href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircle, href: "https://twitter.com",   label: "Twitter"   },
  { icon: Play,          href: "https://youtube.com",   label: "YouTube"   },
  { icon: ExternalLink,  href: "https://linkedin.com",  label: "LinkedIn"  },
];

export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{ background: "var(--navy-2)", borderTop: "1px solid var(--border)" }}
    >
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 blur-[100px] opacity-10 pointer-events-none" style={{ background: "var(--gold)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="32" viewBox="0 0 64 72" fill="none">
                <path d="M32 2L61 18.5V53.5L32 70L3 53.5V18.5L32 2Z" stroke="var(--gold)" strokeWidth="2" fill="none" />
                <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="var(--gold)" fontSize="26" fontWeight="700" fontFamily="serif">N</text>
              </svg>
              <span className="font-display font-bold text-xl" style={{ color: "var(--white)" }}>
                Neo<span style={{ color: "var(--gold)" }}>Casa</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--muted)" }}>
              Premium co-living for ambitious students. More than a hostel — a community that fuels your growth.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-all duration-200"
                  style={{ color: "var(--muted)" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--gold)" }}>Quick Links</p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--muted)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: "var(--gold)" }}>Contact</p>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="tel:+919876543210" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "var(--muted)" }}>
                  <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@neocasa.in" className="flex items-start gap-3 text-sm hover:text-white transition-colors" style={{ color: "var(--muted)" }}>
                  <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                  hello@neocasa.in
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                  <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                  <span>Plot 42, Sector 14 Extension,<br />Rohini, New Delhi — 110085</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Marquee strip */}
        <div
          className="overflow-hidden py-6 mb-10"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="marquee-inner flex whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8 text-xs tracking-widest uppercase mr-8" style={{ color: "var(--muted)" }}>
                {["Premium Co-Living", "500+ Students", "5 Stars Rated", "24/7 Security", "Chef-Cooked Meals", "1 Gbps WiFi", "Rohini, Delhi"].map((t) => (
                  <span key={t} className="flex items-center gap-8">
                    <span style={{ color: "var(--gold)" }}>✦</span> {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} NeoCasa Boys Hostel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-xs hover:text-white transition-colors" style={{ color: "var(--muted)" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden"
      >
        <button
          onClick={() => scrollTo("#booking")}
          className="px-8 py-3.5 rounded-full font-semibold text-sm shadow-2xl"
          style={{
            background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
            color: "var(--navy)",
            boxShadow: "0 0 40px rgba(0,0,0,0.15)",
          }}
        >
          🔥 Book Now · Limited Seats
        </button>
      </motion.div>
    </footer>
  );
}
