import React from "react";

export function BrandMark({ size = 40, showDots = true, orbit = false, className = "" }) {
  const tile = size;
  const orbitSize = Math.round(tile * 1.55);
  const dotSize = Math.max(6, Math.round(tile * 0.09));
  const r = orbitSize / 2;
  const cx = orbitSize / 2;

  const dot = (angleDeg, color) => {
    const rad = (angleDeg * Math.PI) / 180;
    const left = cx + r * Math.cos(rad) - dotSize / 2;
    const top = cx + r * Math.sin(rad) - dotSize / 2;
    return (
      <span
        key={`${angleDeg}-${color}`}
        className={`absolute rounded-full ${color}`}
        style={{
          width: dotSize,
          height: dotSize,
          left,
          top,
          boxShadow: "0 4px 10px -3px rgba(15,23,42,0.25)",
        }}
      />
    );
  };

  const Tile = null;

  // if (!orbit) {
  //   return (
  //     <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: tile, height: tile }}>
  //       {Tile}
  //       {showDots && (
  //         <>
  //           <span className="absolute rounded-full bg-blue-500" style={{ width: 5, height: 5, top: -3, right: -3 }} />
  //           <span className="absolute rounded-full bg-sky-500" style={{ width: 5, height: 5, bottom: 2, left: -5 }} />
  //           <span className="absolute rounded-full bg-indigo-500" style={{ width: 5, height: 5, bottom: -4, right: 2 }} />
  //         </>
  //       )}
  //     </span>
  //   );
  // }

  // return (
  //   <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: orbitSize, height: orbitSize }}>
  //     <span className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(15, 23, 42, 0.10)", borderStyle: "dashed" }} aria-hidden />
  //     <span className="absolute inset-0 zm-orbit" aria-hidden style={{ transformOrigin: "center" }}>
  //       {dot(-90, "bg-blue-500")}
  //       {dot(30, "bg-sky-500")}
  //       {dot(150, "bg-indigo-500")}
  //     </span>
  //     <span className="relative">{Tile}</span>
  //     <style>{`
  //       @keyframes zm-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  //       .zm-orbit { animation: zm-spin 14s linear infinite; }
  //     `}</style>
  //   </span>
  // );

  return (
    <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: tile, height: tile }}>
      {Tile}
    </span>
  );
}

function ZenmedLogo({ width = 320, showTagline = true, className = "" }) {
  const blue = "#1F5FD6";
  const red = "#EE1C25";
  const dark = "#1A1A1A";

  return (
    <svg
      className={className}
      width={width}
      height={(width * (showTagline ? 300 : 260)) / 760}
      viewBox={`0 0 760 ${showTagline ? 300 : 260}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Zenmed - Distributing Trust"
    >
      <g>
        <rect x="10" y="70" width="150" height="60" rx="14" fill={blue} />
        <rect x="55" y="25" width="60" height="150" rx="14" fill={blue} />
        <path
          d="M45 165
             C55 130, 75 100, 100 80
             L88 78
             L125 62
             L128 100
             L118 90
             C98 108, 82 132, 72 165
             Z"
          fill="#FFFFFF"
        />
      </g>

      <g fill={red}>
        <path d="M172 40 h8 v14 h14 v8 h-14 v14 h-8 v-14 h-14 v-8 h14 z" />
        <path d="M200 55 h5 v9 h9 v5 h-9 v9 h-5 v-9 h-9 v-5 h9 z" />
        <path d="M188 20 h5 v9 h9 v5 h-9 v9 h-5 v-9 h-9 v-5 h9 z" />
      </g>

      <text
        x="192"
        y="168"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="110"
        letterSpacing="-2"
      >
        <tspan fill={red}>Zen</tspan>
        <tspan fill={blue}>med</tspan>
      </text>

      {showTagline && (
        <text
          x="290"
          y="205"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="400"
          fontSize="30"
          fill={dark}
        >
          Distributing Trust
        </text>
      )}
    </svg>
  );
}

export default function Logo({ className = "", showTagline = false, width = 168 }) {
  return (
    <a
      href="#top"
      data-testid="brand-logo"
      className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
      aria-label="Zenmed home"
      style={{ width, height: "auto" }}
    >
      <ZenmedLogo width={width} showTagline={showTagline} className="h-full w-auto" />
    </a>
  );
}