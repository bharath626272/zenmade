import React from "react";
import { motion } from "framer-motion";
import { Building2, Package, BarChart3, Thermometer, Network, Zap, ArrowRight } from "lucide-react";
import RevealText from "./RevealText";
import TiltCard from "./TiltCard";

const SERVICES = [
  {
    icon: Building2,
    title: "Carrying & Forwarding (CFA)",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "Comprehensive warehousing, inventory management, order processing, dispatch coordination, and logistics support.",
  },
  {
    icon: Package,
    title: "Super Stockist Operations",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "Efficient stock management ensuring uninterrupted product availability across the region.",
  },
  {
    icon: BarChart3,
    title: "Pharmaceutical Distribution",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "Reliable distribution network ensuring timely deliveries across Karnataka.",
  },
  {
    icon: Thermometer,
    title: "Warehousing & Storage",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "GDP-compliant warehousing with organized and temperature-controlled storage facilities.",
  },
  {
    icon: Network,
    title: "Inventory Management",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "Technology-driven inventory tracking ensuring stock accuracy and operational efficiency.",
  },
  {
    icon: Zap,
    title: "Supply Chain Solutions",
    color: "text-blue-700",
    bg: "bg-blue-100",
    desc: "End-to-end logistics support helping pharmaceutical companies improve market reach and efficiency.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-white" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center">
            <span className="section-tag" data-testid="services-tag">What We Do</span>
          </div>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]" data-testid="services-title">
            <span className="block">
              <RevealText as="span" text="Comprehensive Pharma" className="text-slate-900" />{" "}
              <RevealText as="span" text="Services" className="brand-gradient-text" delay={0.2} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-slate-500 text-base md:text-lg leading-relaxed"
          >
            From cold chain storage to last-mile delivery — we handle every link in the pharmaceutical distribution chain.
          </motion.p>
        </div>

        <div className="mt-14 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            >
              <TiltCard className="card-elev p-7 md:p-8 group h-full" intensity={6}>
                <article data-testid={`service-card-${i}`} className="h-full">
                  <motion.div
                    className={`icon-tile ${s.bg}`}
                    whileHover={{ rotate: -8, scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  >
                    <s.icon className={s.color} size={24} />
                  </motion.div>
                  <h3 className="mt-6 text-xl md:text-[1.35rem] font-extrabold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-500 leading-relaxed">{s.desc}</p>
                  <a
                    href="#contact"
                    className={`mt-6 inline-flex items-center gap-1.5 font-bold ${s.color}`}
                  >
                    Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
