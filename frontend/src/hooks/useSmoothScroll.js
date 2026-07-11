import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global buttery-smooth scroll powered by Lenis.
 * Also drives GSAP ScrollTrigger updates via requestAnimationFrame.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks and let Lenis handle them.
    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (href === "#top") {
        lenis.scrollTo(0, { duration: 1.3 });
        return;
      }
      lenis.scrollTo(target, { offset: -70, duration: 1.3 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);
}
