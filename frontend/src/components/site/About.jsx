import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck2, Warehouse } from "lucide-react";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const STATS = [
  { value: "22+", label: "Years Experience" },
  { value: "500+", label: "Products Handled" },
  { value: "30+", label: "Districts Covered" },
  { value: "99%", label: "On-Time Delivery" },
];

const CERTS = [
  { icon: ShieldCheck, label: "WHO-GMP Compliant" },
  { icon: FileCheck2, label: "Drug License Holder" },
  { icon: Warehouse, label: "ISO Certified Warehouses" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#F7FBF9]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">
        <div>
          <span className="section-tag" data-testid="about-tag">Our Story</span>
          <h2
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]"
            data-testid="about-title"
          >
            <RevealText as="span" text="Two Decades of" className="block text-slate-900" />
            <span className="block">
              <RevealText as="span" text="Pharmaceutical" className="brand-gradient-text" delay={0.1} />{" "}
              <RevealText as="span" text="Excellence" className="text-slate-900" delay={0.25} />
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-slate-500 leading-relaxed max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Founded in 2002, Zenmed has grown from a single-district distributor to Karnataka's most trusted pharmaceutical
              supply chain partner. Our journey is built on one principle: every medicine matters.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We work with India's leading pharma manufacturers to ensure their products reach chemists, hospitals, and clinics
              across every corner of Karnataka — with full traceability, GDP compliance, and cold chain integrity.
            </motion.p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" data-testid="about-certs">
            {CERTS.map(({ icon: Icon, label }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="pill-badge"
              >
                <Icon size={16} />
                {label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-5" data-testid="about-stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="card-elev p-7 md:p-8"
              data-testid={`about-stat-${i}`}
            >
              <CountUp
                value={s.value}
                className="text-4xl md:text-5xl font-black brand-gradient-text tracking-tight"
              />
              <div className="mt-2 text-slate-500 text-sm md:text-base font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
