"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  roomType: string;
  moveIn: string;
  message: string;
};

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Booking inquiry:", data);
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  const inp = `w-full px-4 py-3.5 rounded-xl text-sm form-input transition-all duration-200`;
  const inpStyle = { background: "var(--navy-3)", border: "1px solid var(--border)", color: "var(--white)" };

  return (
    <section ref={ref} id="booking" className="relative py-28 md:py-40 overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>Inquire Now</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }} className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--white)" }}>
            Ready to move in?<br /><span className="text-gold-gradient">Let&apos;s talk.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }} className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            Fill in the form and we&apos;ll get back within 2 hours. <span style={{ color: "var(--gold)" }}>🔥 Limited seats available.</span>
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.8 }} className="glass rounded-3xl p-8 md:p-12">
          {status === "success" ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle size={56} style={{ color: "#22c55e" }} />
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--white)" }}>Inquiry Sent!</h3>
              <p style={{ color: "var(--muted)" }}>Our team will reach out within 2 hours. Looking forward to welcoming you to NeoCasa!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Full Name *</label>
                <input {...register("name", { required: "Name is required" })} placeholder="Arjun Mehta" className={inp} style={inpStyle} />
                {errors.name && <p className="text-xs flex items-center gap-1" style={{ color: "#f87171" }}><AlertCircle size={11} />{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Phone Number *</label>
                <input {...register("phone", { required: "Phone is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" } })} placeholder="98765 43210" type="tel" className={inp} style={inpStyle} />
                {errors.phone && <p className="text-xs flex items-center gap-1" style={{ color: "#f87171" }}><AlertCircle size={11} />{errors.phone.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Email</label>
                <input {...register("email")} placeholder="you@example.com" type="email" className={inp} style={inpStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Room Type *</label>
                <select {...register("roomType", { required: "Select a room type" })} className={inp} style={{ ...inpStyle, appearance: "none" }}>
                  <option value="" style={{ background: "var(--navy-3)" }}>Select room…</option>
                  <option value="single" style={{ background: "var(--navy-3)" }}>Single — ₹8,500/mo</option>
                  <option value="double" style={{ background: "var(--navy-3)" }}>Double — ₹5,500/mo</option>
                  <option value="deluxe" style={{ background: "var(--navy-3)" }}>Deluxe — ₹12,000/mo</option>
                </select>
                {errors.roomType && <p className="text-xs flex items-center gap-1" style={{ color: "#f87171" }}><AlertCircle size={11} />{errors.roomType.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Preferred Move-in Date</label>
                <input {...register("moveIn")} type="date" className={inp} style={{ ...inpStyle, colorScheme: "dark" }} />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Message (optional)</label>
                <textarea {...register("message")} placeholder="Any specific requirements…" rows={3} className={inp} style={{ ...inpStyle, resize: "none" }} />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4">
                <motion.button type="submit" disabled={status === "sending"} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "var(--navy)" }}>
                  {status === "sending" ? <><span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />Sending…</> : <><Send size={16} />Send Inquiry</>}
                </motion.button>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20NeoCasa%20Hostel." target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-base hover:scale-105 transition-transform"
                  style={{ background: "#25d366", color: "#fff" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
