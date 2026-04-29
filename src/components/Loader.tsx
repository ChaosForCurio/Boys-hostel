"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current!);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 700);
          }, 300);
          return 100;
        }
        return p + Math.random() * 4 + 1;
      });
    }, 55);
    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: "var(--navy)" }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-12 flex flex-col items-center"
          >
            {/* Animated hexagon logo */}
            <svg
              width="64"
              height="72"
              viewBox="0 0 64 72"
              fill="none"
              className="mb-4"
            >
              <motion.path
                d="M32 2L61 18.5V53.5L32 70L3 53.5V18.5L32 2Z"
                stroke="var(--gold)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.text
                x="50%"
                y="54%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--gold)"
                fontSize="22"
                fontWeight="700"
                fontFamily="serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                N
              </motion.text>
            </svg>

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              NeoCasa
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 flex flex-col items-center gap-3">
            <div
              className="w-full h-[1px] rounded-full overflow-hidden"
              style={{ background: "rgba(0,0,0,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))",
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.span
              className="text-xs font-mono counter-num"
              style={{ color: "var(--muted)" }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </motion.span>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            Premium Co-Living Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
