import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

export default function Hero() {
  const sectionRef = useRef(null);

  // Parallax on the hero content driven by scroll position of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.4]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden pt-40 md:pt-50 pb-20 md:pb-28 bg-white"
      data-testid="hero-section"
    >
      {/* Ambient animated blobs */}
      <motion.div
        aria-hidden
        className="absolute top-40 -right-32 w-[560px] h-[560px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle at center, #BFDBFE, transparent 60%)" }}
        animate={{ x: [0, -25, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* soft grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <motion.div style={{ opacity: opacityFade }} className="relative max-w-6xl mx-auto px-5 md:px-8 text-center">
        <motion.h1
          style={{ y: yTitle, marginTop: '5rem', fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}
          className="font-black tracking-tight leading-[1.05]"
          data-testid="hero-title"
        >
          <RevealText as="span" text="Trusted-Pharma" className="block text-slate-900" />
          <span className="inline md:block md:mt-2">
            <RevealText
              as="span"
              text=" distribution Partner"
              className="block brand-gradient-text"
              delay={0.15}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-6 md:mt-8 mx-auto max-w-2xl text-base md:text-lg text-slate-500 leading-relaxed"
          data-testid="hero-subtitle"
        >
          22+ years of pharmaceutical excellence — delivering the right medicine, to the right place, at the right time across Karnataka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Magnetic strength={0.18}>
            <a
              href="#services"
              data-testid="hero-scroll-down"
              className="group flex flex-col items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>Scroll down</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/80 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowRight size={18} className="rotate-90" />
              </span>
            </a>
          </Magnetic>
        </motion.div>

      </motion.div>
    </section>
  );
}
