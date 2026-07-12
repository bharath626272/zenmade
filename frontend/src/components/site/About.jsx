import React from "react";
import { motion } from "framer-motion";
import RevealText from "./RevealText";
import CountUp from "./CountUp";

const STATS = [
  { value: "22+", label: "Years Experience" },
  { value: "500+", label: "Products Handled" },
  { value: "30+", label: "Districts Covered" },
  { value: "99%", label: "On-Time Delivery" },
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
              Established in <strong>2015</strong>, Zenmed is a trusted Pharmaceutical Carrying & Forwarding (CFA) Agent and
              Super Stockist headquartered in Bengaluru, Karnataka.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Built on more than <strong>22 years</strong> of pharmaceutical distribution expertise, Zenmed specializes in
              warehousing, inventory management, order fulfillment, and supply chain solutions. Our commitment to quality,
              compliance, transparency, operational excellence, and customer satisfaction has earned the trust of pharmaceutical
              companies across Karnataka.
            </motion.p>
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
