import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import KarnatakaMap from "./KarnatakaMap";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

const HUBS = [
  { name: "Bengaluru HQ", desc: "Primary distribution hub & cold storage facility" },
  { name: "Hubli Hub", desc: "North Karnataka operations center" },
  { name: "Mangaluru Depot", desc: "Coastal Karnataka distribution point" },
  { name: "Mysuru Branch", desc: "South Karnataka service center" },
];

export default function Coverage() {
  return (
    <section id="coverage" className="relative py-24 md:py-32 bg-white" data-testid="coverage-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-blue-50/60 p-6 md:p-10 border border-blue-100/70"
          data-testid="coverage-map-wrap"
        >
          <KarnatakaMap />
        </motion.div>

        {/* Content */}
        <div>
          <span className="section-tag" data-testid="coverage-tag">Coverage</span>
          <h2
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]"
            data-testid="coverage-title"
          >
            <span className="block">
              <RevealText as="span" text="All Across" className="text-slate-900" />{" "}
              <RevealText as="span" text="Karnataka" className="brand-gradient-text" delay={0.15} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-500 leading-relaxed max-w-xl"
          >
            Our distribution network spans all 30 districts of Karnataka, from Bidar in the north to Chamarajanagar in the south.
            With strategically located warehouses in Bengaluru, Hubli, and Mangaluru, we ensure rapid delivery statewide.
          </motion.p>

          <ul className="mt-8 space-y-4" data-testid="coverage-hubs">
            {HUBS.map((h, i) => (
              <motion.li
                key={h.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={22} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-extrabold text-slate-900">{h.name}</span>{" "}
                  <span className="text-slate-500">— {h.desc}</span>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10"
          >
            <Magnetic strength={0.25}>
              <a href="#contact" data-testid="coverage-cta" className="btn-outline-pill">
                Enquire About Your Area <ArrowRight size={16} />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
