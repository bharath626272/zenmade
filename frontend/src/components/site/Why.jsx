import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Truck, Cpu } from "lucide-react";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const FEATURES = [
  {
    icon: Shield,
    title: "Trust & Reliability",
    desc: "22+ years of transparent, consistent operations trusted by 100+ pharma manufacturers and brands.",
  },
  {
    icon: Award,
    title: "GDP Compliance",
    desc: "Fully compliant with Good Distribution Practices — licensed and regularly audited by state drug authorities.",
  },
  {
    icon: Truck,
    title: "Fast Distribution",
    desc: "24–48 hour delivery windows across Karnataka with our dedicated fleet and verified 3PL network.",
  },
  {
    icon: Cpu,
    title: "Technology Driven",
    desc: "Integrated ERP, real-time GPS tracking, and digital invoicing for complete supply chain transparency.",
  },
];

const METRICS = [
  { value: "100+", label: "Pharma Brands" },
  { value: "10,000+", label: "Monthly Orders" },
  { value: "5,000+", label: "Retail Outlets" },
  { value: "24/7", label: "Support Available" },
];

export default function Why() {
  return (
    <section id="why" className="relative py-24 md:py-32 bg-[#F7FBF9]" data-testid="why-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center">
            <span className="section-tag" data-testid="why-tag">Why Zenmed</span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]" data-testid="why-title">
            <span className="block">
              <RevealText as="span" text="Built on" className="text-slate-900" />{" "}
              <RevealText as="span" text="Trust" className="brand-gradient-text" delay={0.12} />
              <RevealText as="span" text="," className="text-slate-900" delay={0.2} />{" "}
              <RevealText as="span" text="Driven by" className="text-slate-900" delay={0.24} />{" "}
              <RevealText as="span" text="Technology" className="brand-blue-text" delay={0.35} />
            </span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="why-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="card-elev p-7 md:p-8"
              data-testid={`why-card-${i}`}
            >
              <motion.div
                className="icon-tile bg-blue-50"
                whileHover={{ rotate: -10, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
              >
                <f.icon className="text-blue-600" size={22} />
              </motion.div>
              <h3 className="mt-6 text-lg md:text-xl font-extrabold text-slate-900">{f.title}</h3>
              <p className="mt-3 text-slate-500 leading-relaxed text-[0.95rem]">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 md:mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12"
          style={{
            background: "linear-gradient(120deg, #2563EB 0%, #1D4ED8 55%, #1E40AF 100%)",
          }}
          data-testid="why-metrics"
        >
          {/* Animated shine sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
            }}
            animate={{ x: ["-30%", "130%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25), transparent 40%)",
            }}
          />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-white text-center">
            {METRICS.map((m) => (
              <div key={m.label} data-testid={`why-metric-${m.label}`}>
                <CountUp
                  value={m.value}
                  className="text-3xl md:text-5xl font-black tracking-tight block"
                />
                <div className="mt-2 text-blue-50/90 text-sm md:text-base font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
