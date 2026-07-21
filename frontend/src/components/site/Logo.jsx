import React from "react";

export const LOGO_WIDTH = {
  NAV_MOBILE: 160,
  NAV_DESKTOP: 220,
  CONTACT: 200,
  FOOTER: 140,
};

export default function Logo({ className = "", width = LOGO_WIDTH.NAV_MOBILE, imgClass = "" }) {
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