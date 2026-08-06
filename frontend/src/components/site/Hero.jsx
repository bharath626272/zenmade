import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Magnetic from "./Magnetic";

// Direct ES Imports for 100% reliable Webpack / React image bundling
import banner1 from "@/assets/images/hero-banner-1.png";
import banner2 from "@/assets/images/hero-banner-2.png";
import banner3 from "@/assets/images/hero-banner-3.png";

export const HERO_SLIDES = [
  {
    id: 1,
    image: banner1,
    title: "Trusted-Pharma",
    subtitle: "distribution Partner",
    description:
      "22+ years of pharmaceutical excellence, delivering the right medicine, to the right place, at the right time across Karnataka.",
  },
  {
    id: 2,
    image: banner2,
    title: "Complete Pharma",
    subtitle: "Solutions Under One Roof",
    description:
      "From procurement to distribution, analytics to compliance, Zenmed brings every piece of the pharma supply chain together across Karnataka.",
  },
  {
    id: 3,
    image: banner3,
    title: "Delivering Trust.",
    subtitle: "Every Mile. Every Medicine.",
    description:
      "22+ years of pharmaceutical excellence, delivering the right medicine, to the right place, at the right time across Karnataka.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

export default function Hero({ slides = HERO_SLIDES }) {
  const sectionRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);

  const currentSlideIndex = ((page % slides.length) + slides.length) % slides.length;
  const activeSlide = slides[currentSlideIndex] || slides[0];

  const paginate = useCallback(
    (newDirection) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides, paginate]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacityFade = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.4]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 px-3 sm:px-6 md:px-8 max-w-[1400px] mx-auto bg-white"
      data-testid="hero-section"
    >
      {/* Rounded Hero Card Container */}
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[36px] border border-slate-200/90 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.12)] bg-slate-50 aspect-[4/3] sm:aspect-[16/10] md:aspect-[1866/765] w-full flex flex-col justify-center items-center">
        
        {/* Horizontal Banner Image Track */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 30 },
                duration: 0.7,
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* 100% Full-Clarity PNG Banner Image filling container edge-to-edge */}
              <img
                src={activeSlide.image}
                alt={`Zenmed Banner ${activeSlide.id}`}
                className="w-full h-full object-cover object-center block opacity-100"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Text Content Container */}
        <motion.div
          style={{ opacity: opacityFade }}
          className="relative z-20 max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-8 md:py-12 text-center pointer-events-auto w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1
                className="font-black tracking-tight leading-[1.15] md:leading-[1.08]"
                data-testid="hero-title"
              >
                <span className="block text-[1.4rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.6rem] xl:text-[4rem] text-slate-950 font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
                  {activeSlide.title}
                </span>
                <span className="block text-[1.4rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.6rem] xl:text-[4rem] text-blue-600 font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,1)] mt-0.5 sm:mt-1">
                  {activeSlide.subtitle}
                </span>
              </h1>

              {/* Enhanced High-Contrast Description */}
              <p
                className="mt-3 sm:mt-4 md:mt-5 mx-auto max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl text-slate-950 font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(255,255,255,1)] drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]"
                data-testid="hero-subtitle"
              >
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Left Navigation Button */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous Slide"
          data-testid="hero-prev-btn"
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 z-30 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border border-slate-300/80 bg-white/90 shadow-md backdrop-blur-md flex items-center justify-center text-slate-800 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Navigation Button */}
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next Slide"
          data-testid="hero-next-btn"
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 z-30 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border border-slate-300/80 bg-white/90 shadow-md backdrop-blur-md flex items-center justify-center text-slate-800 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* SCROLL DOWN Button Placed Below Banners */}
      <div className="mt-6 md:mt-8 flex justify-center">
        <Magnetic strength={0.18}>
          <a
            href="#about"
            data-testid="hero-scroll-down"
            className="group flex flex-col items-center gap-2 text-[0.7rem] sm:text-[0.75rem] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>SCROLL DOWN</span>
            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-300 bg-white shadow-md transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="w-4 h-4 text-slate-800" />
            </span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
