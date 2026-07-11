import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a numeric value from 0 to `end` when it scrolls into view.
 * Handles trailing suffixes like "+", "%", "/7", "K", "k" and commas.
 * Usage: <CountUp value="10,000+" />
 */
export default function CountUp({ value = "0", duration = 1600, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const str = String(value);
    const match = str.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match) {
      setDisplay(str);
      return;
    }
    const prefix = match[1] || "";
    const numStr = match[2];
    const suffix = match[3] || "";
    const hasComma = numStr.includes(",");
    const target = parseFloat(numStr.replace(/,/g, ""));
    if (Number.isNaN(target)) {
      setDisplay(str);
      return;
    }

    const start = performance.now();
    let rafId;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - t, 4);
      const current = target * eased;
      const formatted = hasComma
        ? Math.round(current).toLocaleString("en-IN")
        : Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
