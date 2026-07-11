import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Text reveal wrapper.
 * - Uses a single overflow-hidden mask on the outer span
 * - Slides the whole text block up from below with an easeOut curve
 * - Preserves gradient / background-clip styling passed via className
 *
 * Props:
 *   as        — element tag for the outer wrapper (default: "span")
 *   text      — string to render (preferred over children when provided)
 *   className — utility classes applied to the visible content
 *   delay     — animation delay (seconds)
 *   duration  — animation duration (seconds)
 *   once      — animate only the first time it enters view (default: true)
 */
export default function RevealText({
  as: Tag = "span",
  text,
  children,
  className = "",
  delay = 0,
  duration = 0.85,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const content = text ?? children;

  return (
    <Tag ref={ref} className="inline-block overflow-hidden align-baseline">
      <motion.span
        className={`inline-block will-change-transform ${className}`}
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {content}
      </motion.span>
    </Tag>
  );
}
