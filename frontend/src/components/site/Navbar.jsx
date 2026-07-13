import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event, item) => {
    setOpen(false);

    if (item.label === "Home") {
      event.preventDefault();
      event.stopPropagation();
      if (typeof window !== "undefined") {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      return;
    }
  };

  return (
    <motion.header
      id="top"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-[0_6px_20px_-18px_rgba(15,23,42,0.4)]" : "bg-transparent"
      }`}
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo width={160} showTagline={false} className="h-auto w-auto md:hidden" />
          <Logo width={220} showTagline className="hidden md:inline-flex h-auto w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item)}
              data-testid={`nav-link-${item.label.toLowerCase()}`}
              className="text-[0.95rem] font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-get-in-touch"
          className="hidden md:inline-flex btn-primary-pill text-sm px-4 py-2.5"
        >
          Get In Touch
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 shadow-sm bg-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item)}
                data-testid={`nav-mobile-link-${item.label.toLowerCase()}`}
                className="py-2 text-slate-700 font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 btn-primary-pill text-sm justify-center"
              data-testid="nav-mobile-get-in-touch"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
