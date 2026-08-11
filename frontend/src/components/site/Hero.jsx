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
    image: banner3,
    alt: "Zenmed - Trusted Pharma Distribution Partner",
  },
  {
    id: 2,
    image: banner2,
    alt: "Zenmed - Your Growth is Our Priority",
  },
  {
    id: 3,
    image: banner1,
    alt: "Zenmed - Right Medicine. Right Place. Right Time.",
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

  const goToSlide = (index) => {
    const diff = index - currentSlideIndex;
    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Preload all banner images for instant crisp display
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

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
      className="relative pt-24 sm:pt-32 md:pt-36 lg:pt-40 pb-6 sm:pb-8 md:pb-12 px-3 sm:px-6 md:px-8 max-w-[1400px] mx-auto bg-white overflow-hidden"
      data-testid="hero-section"
    >
      {/* Screen reader heading for accessibility & SEO */}
      <h1 className="sr-only">
        Zenmed Distributing Trust - Right Medicine. Right Place. Right Time.
      </h1>

      {/* Hero Container - Responsive 16:9 aspect ratio for mobile and desktop screens */}
      <div className="relative overflow-hidden rounded-[14px] sm:rounded-[24px] md:rounded-[32px] border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.12)] bg-slate-50 aspect-[16/9] w-full flex items-center justify-center touch-pan-y">
        
        {/* Horizontal Banner Image Track with Mobile Touch Drag/Swipe */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.8 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (offset.x < -30 || swipe < -300) {
                  paginate(1);
                } else if (offset.x > 30 || swipe > 300) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full transform-gpu cursor-grab active:cursor-grabbing"
            >
              {/* Ultra-HD Banner Image */}
              <img
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="w-full h-full object-cover object-center block transform-gpu select-none pointer-events-none"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                }}
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left Navigation Button - Hidden on mobile to keep banner 100% clear, visible on sm+ */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous Slide"
          data-testid="hero-prev-btn"
          className="hidden sm:flex absolute left-3 md:left-6 lg:left-8 z-30 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border border-slate-300/80 bg-white/90 shadow-md backdrop-blur-md items-center justify-center text-slate-800 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Navigation Button - Hidden on mobile to keep banner 100% clear, visible on sm+ */}
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next Slide"
          data-testid="hero-next-btn"
          className="hidden sm:flex absolute right-3 md:right-6 lg:right-8 z-30 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border border-slate-300/80 bg-white/90 shadow-md backdrop-blur-md items-center justify-center text-slate-800 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 z-30 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlideIndex
                  ? "w-5 sm:w-8 bg-white"
                  : "w-1.5 sm:w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* SCROLL DOWN Button Placed Below Banners */}
      <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
        <Magnetic strength={0.18}>
          <a
            href="#about"
            data-testid="hero-scroll-down"
            className="group flex flex-col items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.75rem] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>SCROLL DOWN</span>
            <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-300 bg-white shadow-md transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800" />
            </span>
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
