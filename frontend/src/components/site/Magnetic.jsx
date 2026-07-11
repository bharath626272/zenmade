import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Magnetic button — subtly translates toward the cursor on hover.
 * Wrap any button/anchor. It preserves the original element via `as` prop.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  // Also subtle scale on hover
  const scale = useTransform([springX, springY], ([sx, sy]) => {
    const d = Math.min(1, Math.hypot(sx, sy) / 40);
    return 1 + d * 0.03;
  });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY, scale }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
