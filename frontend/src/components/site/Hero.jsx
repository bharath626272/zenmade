import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1Desktop from "@/assets/images/hero-banner-desktop-1.png";
import banner2Desktop from "@/assets/images/hero-banner-desktop-2.png";
import banner3Desktop from "@/assets/images/hero-banner-desktop-3.png";

export const HERO_SLIDES = [
  {
    id: 1,
    imageMobile: banner1Desktop,
    imageDesktop: banner1Desktop,
    alt: "Zenmed - Trusted Pharma Distribution Partner",
  },
  {
    id: 2,
    imageMobile: banner2Desktop,
    imageDesktop: banner2Desktop,
    alt: "Zenmed - Your Growth is Our Priority",
  },
  {
    id: 3,
    imageMobile: banner3Desktop,
    imageDesktop: banner3Desktop,
    alt: "Zenmed - Right Medicine. Right Place. Right Time.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.9,
  }),
};

export default function Hero({ slides = HERO_SLIDES }) {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentSlideIndex =
    ((page % slides.length) + slides.length) % slides.length;

  const activeSlide = slides[currentSlideIndex];

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const goToSlide = (index) => {
    const diff = index - currentSlideIndex;

    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Preload 4K banners for maximum clarity & zero transition flicker
  useEffect(() => {
    slides.forEach((slide) => {
      const imgMobile = new Image();
      imgMobile.src = slide.imageMobile;
      const imgDesktop = new Image();
      imgDesktop.src = slide.imageDesktop;
    });
  }, [slides]);

  // Auto slideshow - 5 seconds
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [paginate, slides.length]);

  return (
    <section
      id="hero"
      className="relative pt-16 md:pt-20 w-full overflow-hidden bg-white"
    >
      {/* SEO heading */}
      <h1 className="sr-only">
        Zenmed Distributing Trust - Right Medicine. Right Place. Right Time.
      </h1>

      {/* 100% FULL-WIDTH EDGE-TO-EDGE CONTAINER WITH ULTRA-SMOOTH SPRING SLIDE */}
      <div className="relative w-full overflow-hidden bg-white select-none rounded-none">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 260,
                damping: 32,
                mass: 0.8,
              },
              opacity: {
                duration: 0.35,
                ease: "easeInOut",
              },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(event, info) => {
              const { offset, velocity } = info;
              const swipe = Math.abs(offset.x) * velocity.x;

              if (offset.x < -50 || swipe < -500) {
                paginate(1);
              }
              if (offset.x > 50 || swipe > 500) {
                paginate(-1);
              }
            }}
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            className="w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y bg-white rounded-none will-change-transform transform-gpu"
          >
            <picture className="w-full h-auto block bg-white rounded-none">
              <source media="(min-width: 768px)" srcSet={activeSlide.imageDesktop} />
              <img
                src={activeSlide.imageMobile}
                alt={activeSlide.alt}
                draggable="false"
                loading="eager"
                decoding="async"
                fetchPriority={currentSlideIndex === 0 ? "high" : "auto"}
                className="
                  block
                  w-full
                  h-auto
                  object-cover
                  object-center
                  pointer-events-none
                  select-none
                  bg-white
                  transform-gpu
                  rounded-none
                "
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                  filter: "contrast(1.02) brightness(1.01) saturate(1.02)",
                }}
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM CENTER DOTS */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/30 backdrop-blur-md">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlideIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* OVERLAY FLOATING LEFT BUTTON */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
          className="
            absolute
            left-3
            md:left-6
            top-1/2
            -translate-y-1/2
            z-30

            flex
            items-center
            justify-center

            w-10
            h-10
            md:w-12
            md:h-12

            rounded-full
            bg-white/90
            backdrop-blur-sm
            border
            border-slate-200
            shadow-lg

            text-slate-700
            transition-all
            duration-200

            hover:bg-white
            hover:text-blue-600
            hover:scale-110

            active:scale-95
          "
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* OVERLAY FLOATING RIGHT BUTTON */}
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next slide"
          className="
            absolute
            right-3
            md:right-6
            top-1/2
            -translate-y-1/2
            z-30

            flex
            items-center
            justify-center

            w-10
            h-10
            md:w-12
            md:h-12

            rounded-full
            bg-white/90
            backdrop-blur-sm
            border
            border-slate-200
            shadow-lg

            text-slate-700
            transition-all
            duration-200

            hover:bg-white
            hover:text-blue-600
            hover:scale-110

            active:scale-95
          "
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  );
}
