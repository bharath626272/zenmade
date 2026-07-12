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

export default function Logo({ className = "" }) {
  return (
    <a
      href="#top"
      data-testid="brand-logo"
      className={`inline-flex items-center justify-center shrink-0 ${className}`.trim()}
      aria-label="Zenmed home"
      style={{ height: 56, width: 168 }}
    >
      <img
        src="/logo.jpeg"
        alt="Zenmed logo"
        className="h-14 w-auto max-w-none object-contain block select-none"
        loading="eager"
        draggable="false"
      />
    </a>
  );
}