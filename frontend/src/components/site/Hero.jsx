import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "./Logo";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

export default function Hero() {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);

  // Parallax on the hero content driven by scroll position of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yIcon = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.4]);

  // Subtle float on the brand mark (independent from scroll)
  useEffect(() => {
    let raf;
    let t = 0;
    const loop = () => {
      t += 0.02;
      if (iconRef.current) {
        iconRef.current.style.transform = `translateY(${Math.sin(t) * 8}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-bg relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
      data-testid="hero-section"
    >
      {/* Ambient animated blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle at center, #A7F3D0, transparent 60%)" }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
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
        {/* floating orbiting mark */}
        <motion.div style={{ y: yIcon }} className="flex justify-center mb-8">
          <div ref={iconRef} className="relative">
            <BrandMark size={96} orbit />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="pill-badge" data-testid="hero-badge">
            <span className="pill-dot" />
            Karnataka's Premier Pharma Distributor
          </span>
        </motion.div>

        <motion.h1
          style={{ y: yTitle }}
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          data-testid="hero-title"
        >
          <RevealText as="span" text="Trusted Pharma" className="block text-slate-900" />
          <RevealText
            as="span"
            text="Distribution Partner"
            className="block brand-gradient-text"
            delay={0.15}
          />
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
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic>
            <a href="#services" data-testid="hero-cta-explore" className="btn-primary-pill group">
              Explore Services{" "}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a href="#contact" data-testid="hero-cta-contact" className="btn-outline-pill">
              Contact Us
            </a>
          </Magnetic>
        </motion.div>

      </motion.div>
    </section>
  );
}
