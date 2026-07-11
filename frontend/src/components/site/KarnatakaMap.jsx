import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Karnataka state map — silhouette + distribution network with animated
 * stroke-drawing (state outline + connector lines) and a staggered node reveal.
 */
export default function KarnatakaMap() {
  const HUB = { x: 400, y: 445, label: "Bengaluru" };
  const nodes = [
    { x: 195, y: 155, label: "Belagavi" },
    { x: 210, y: 235, label: "Dharwad" },
    { x: 220, y: 265, label: "Hubli" },
    { x: 420, y: 175, label: "Kalaburagi" },
    { x: 305, y: 290, label: "Davangere" },
    { x: 275, y: 370, label: "Shivamogga" },
    { x: 345, y: 415, label: "Tumakuru" },
    { x: 190, y: 445, label: "Mangaluru" },
    { x: 310, y: 505, label: "Mysuru" },
  ];

  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  const linesRef = useRef([]);
  const nodesRef = useRef([]);

  useEffect(() => {
    const outline = pathRef.current;
    if (!outline) return;

    const outlineLen = outline.getTotalLength();
    gsap.set(outline, { strokeDasharray: outlineLen, strokeDashoffset: outlineLen });
    linesRef.current.forEach((l) => {
      if (!l) return;
      const len = l.getTotalLength();
      gsap.set(l, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.55 });
    });
    nodesRef.current.forEach((n) => n && gsap.set(n, { scale: 0, transformOrigin: "center" }));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const tl = gsap.timeline();
          tl.to(outline, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
          tl.to(
            linesRef.current.filter(Boolean),
            {
              strokeDashoffset: 0,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.09,
            },
            "-=0.9"
          );
          tl.to(
            nodesRef.current.filter(Boolean),
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2.2)",
              stagger: 0.06,
            },
            "-=0.9"
          );

          io.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full aspect-[6/6.4]" data-testid="karnataka-map">
      <svg viewBox="0 0 600 640" className="w-full h-full">
        <defs>
          <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="100%" stopColor="#D1FAE5" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Fill layer (kept faint until stroke draws in) */}
        <path
          d="M 235 60 L 260 55 L 285 70 L 310 65 L 335 80 L 360 78 L 390 92 L 415 90 L 440 105 L 455 130 L 445 155 L 465 170 L 495 185 L 505 210 L 480 225 L 495 250 L 470 265 L 445 280 L 435 260 L 405 265 L 385 285 L 400 310 L 425 320 L 460 335 L 480 360 L 490 395 L 470 420 L 445 435 L 435 470 L 415 490 L 395 520 L 375 545 L 350 555 L 325 570 L 300 550 L 285 530 L 265 545 L 245 555 L 225 540 L 210 515 L 195 495 L 175 475 L 160 450 L 155 425 L 175 405 L 170 375 L 190 355 L 175 330 L 160 305 L 175 285 L 195 275 L 180 250 L 190 220 L 175 195 L 195 175 L 205 145 L 215 115 L 220 85 Z"
          fill="url(#mapFill)"
          opacity="0.9"
          filter="url(#softShadow)"
        />

        {/* Animated outline stroke */}
        <path
          ref={pathRef}
          d="M 235 60 L 260 55 L 285 70 L 310 65 L 335 80 L 360 78 L 390 92 L 415 90 L 440 105 L 455 130 L 445 155 L 465 170 L 495 185 L 505 210 L 480 225 L 495 250 L 470 265 L 445 280 L 435 260 L 405 265 L 385 285 L 400 310 L 425 320 L 460 335 L 480 360 L 490 395 L 470 420 L 445 435 L 435 470 L 415 490 L 395 520 L 375 545 L 350 555 L 325 570 L 300 550 L 285 530 L 265 545 L 245 555 L 225 540 L 210 515 L 195 495 L 175 475 L 160 450 L 155 425 L 175 405 L 170 375 L 190 355 L 175 330 L 160 305 L 175 285 L 195 275 L 180 250 L 190 220 L 175 195 L 195 175 L 205 145 L 215 115 L 220 85 Z"
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Connector lines — animated draw */}
        <g fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round">
          {nodes.map((n, i) => (
            <line
              key={`ln-${n.label}`}
              ref={(el) => (linesRef.current[i] = el)}
              x1={n.x}
              y1={n.y}
              x2={HUB.x}
              y2={HUB.y}
            />
          ))}
        </g>

        {/* Hub pulse */}
        <g>
          <circle cx={HUB.x} cy={HUB.y} r="20" fill="#10B981" opacity="0.18">
            <animate attributeName="r" values="15;32;15" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx={HUB.x} cy={HUB.y} r="10" fill="#059669" stroke="white" strokeWidth="3" />
        </g>

        {/* District nodes */}
        {nodes.map((n, i) => (
          <circle
            key={`nd-${n.label}`}
            ref={(el) => (nodesRef.current[i] = el)}
            cx={n.x}
            cy={n.y}
            r="6.5"
            fill="#10B981"
            stroke="white"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      {/* HTML labels */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((n, i) => (
          <MapLabel key={`lbl-${n.label}`} x={n.x} y={n.y} label={n.label} delay={0.7 + i * 0.08} />
        ))}
        <MapLabel x={HUB.x + 14} y={HUB.y + 10} label="Bengaluru" bold delay={1.5} />
      </div>
    </div>
  );
}

function MapLabel({ x, y, label, bold, delay = 0 }) {
  const leftPct = (x / 600) * 100;
  const topPct = (y / 640) * 100;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, delay, duration: 0.5, ease: "power2.out" }
    );
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`absolute -translate-y-1/2 whitespace-nowrap text-[11px] md:text-[13px] ${
        bold ? "font-extrabold text-blue-800" : "font-semibold text-blue-700"
      }`}
      style={{ left: `calc(${leftPct}% + 14px)`, top: `${topPct}%`, opacity: 0 }}
    >
      {label}
    </div>
  );
}
