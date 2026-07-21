import React from "react";
import { motion } from "framer-motion";
import RevealText from "./RevealText";
import { Sparkles, Users , Layers, ShieldCheck, Award, Handshake } from "lucide-react";

const STATS = [
  { value: "22+", label: "Years Experience" },
  { value: "500+", label: "Products Handled" },
  { value: "30+", label: "Districts Covered" },
  { value: "99%", label: "On-Time Delivery" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#F7FBF9]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid gap-14 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)] items-start">
        <div className="lg:pr-10">
          <span className="section-tag brand-gradient-text" data-testid="about-tag">About us</span>
          {/*
          <h2
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900"
            data-testid="about-title"
          >
            About <span className="text-blue-600">Zenmed</span>
          </h2>
          */}

          <div className="mt-8 space-y-6 text-slate-500 leading-relaxed max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Zenmed is a trusted Pharma Carrying & Forwarding Agent (CFA) and Super Stockist based in Bengaluru, Karnataka.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Built on over <strong>22 years</strong> of experience in pharmaceutical distribution and supply chain management, Zenmed was founded with a vision to deliver reliable, efficient, and compliant distribution solutions to the healthcare industry. Our extensive industry expertise enables us to understand the evolving needs of pharmaceutical companies and provide seamless supply chain support.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              We specialize in pharmaceutical warehousing, inventory management, order processing, and distribution services, ensuring timely product availability across Karnataka. With a strong focus on quality, compliance, and operational excellence, we are committed to delivering dependable services that support the growth of our principals.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Over the years, Zenmed has earned the trust of pharmaceutical companies through its integrity, transparency, and customer-centric approach, making us a reliable distribution partner in the healthcare ecosystem.
            </motion.p>
          </div>
        </div>

        <div className="self-center grid grid-cols-1 sm:grid-cols-2 gap-5 lg:mt-6" data-testid="about-stats">
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
              <div className="text-4xl md:text-5xl font-black brand-gradient-text tracking-tight">{s.value}</div>
              <div className="mt-2 text-slate-500 text-sm md:text-base font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/*
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-16 lg:mt-20">
        <div className="text-center max-w-3xl mx-auto">
           <span className="section-tag" data-testid="about-tag">Core Values</span>
          <h2
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]"
            data-testid="about-title"
          >
            <RevealText as="span" text="The principles that guide us" className="block text-slate-900" />
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-testid="about-core-values-grid">
          
          {[
            { 
              icon: Handshake,
              title: "Integrity", desc: "Doing business with honesty and transparency at every step." },
            { 
              icon: Award,
              title: "Quality", desc: "Uncompromising standards across storage, handling and dispatch." },
            { 
              icon: ShieldCheck,
              title: "Reliability", desc: "Dependable execution that our principals can plan around." },
            { 
              icon: Layers,
              title: "Compliance", desc: "Aligned with pharmaceutical storage and distribution norms." },
            { 
              icon: Users,
              title: "Customer Focus", desc: "Long-term partnerships built on service and responsiveness." },
            { 
              icon: Sparkles,
              title: "Operational Excellence", desc: "Disciplined processes that deliver consistent results."},
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="card-elev p-7"
              data-testid={`about-core-value-${index}`}
            >
              <div className="icon-tile bg-blue-50 inline-flex items-center justify-center rounded-2xl w-12 h-12 mb-5">
                <value.icon className="text-blue-600" size={24} />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">{value.title}</h4>
              <p className="mt-2 text-sm md:text-[0.95rem] text-slate-500 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      */}
    </section>
  );
}
