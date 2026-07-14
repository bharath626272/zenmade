import React from "react";

export default function Logo({ className = "", width = 160, imgClass = "" }) {
  return (
    <a
      href="#top"
      data-testid="brand-logo"
      className={`inline-flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity ${className}`.trim()}
      aria-label="Zenmed home"
    >
      <img
        src="/logooo.PNG"
        alt="Zenmed - Trusted Pharma Distribution Partner"
        className={`h-auto object-contain block ${imgClass}`.trim()}
        style={{ width: `${width}px` }}
      />
    </a>
  );
}