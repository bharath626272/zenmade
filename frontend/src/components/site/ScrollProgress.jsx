import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** A slim gradient progress bar that tracks page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      data-testid="scroll-progress"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background: "white",
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] rounded-r-full"
    />
  );
}
