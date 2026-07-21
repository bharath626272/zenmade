import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="mission-vision" className="relative py-24 md:py-32 bg-[#F7FBF9]" data-testid="mission-vision-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-tag brand-gradient-text" data-testid="mission-vision-tag">
            Mission & Vision
          </span>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2" data-testid="mission-vision-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="card-elev rounded-[1.8rem] p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Target size={22} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Mission</h3>
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              To provide efficient, reliable, and compliant pharmaceutical distribution solutions that ensure seamless product availability and support the growth of our principals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-elev rounded-[1.8rem] p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                <Eye size={22} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Vision</h3>
            </div>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              To be the preferred Pharma CFA and Super Stockist in South India, recognized for trust, reliability, and service excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
