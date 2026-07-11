import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="mission-vision" className="relative py-24 md:py-32 bg-[#F7FBF9]" data-testid="mission-vision-section">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-tag" data-testid="mission-vision-tag">
            Mission & Vision
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-slate-900" data-testid="mission-vision-title">
            Building a <span className="brand-gradient-text">stronger</span> healthcare <span className="brand-gradient-text">future</span>
          </h2>
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
              To create a seamless, compliant, and dependable pharmaceutical supply network that ensures healthcare access across Karnataka without compromises.
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
              To be Karnataka’s most trusted pharmaceutical distribution partner, recognized for excellence, transparency, and service that reaches every corner of the state.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
