import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo, { LOGO_WIDTH } from "./Logo";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/v-v-mannapur-bb64ba429/",
    bgClass: "bg-[#0A66C2] hover:bg-[#084e96] shadow-[#0A66C2]/20",
    icon: (
      <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590436905548&sk=about_life_events",
    bgClass: "bg-[#1877F2] hover:bg-[#0d65d9] shadow-[#1877F2]/20",
    icon: (
      <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.84 3.73-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.54V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cfazenmed/",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 shadow-[#dc2743]/20",
    icon: (
      <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 pt-20 pb-8" data-testid="site-footer">
      <div className="max-w-[1800px] mx-auto px-5 md:px-10 lg:px-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand column */}
          <div className="flex flex-col">
            <Logo width={LOGO_WIDTH.CONTACT} className="h-auto w-auto -ml-2 self-start" imgClass="" />
            <p className="mt-4 text-slate-900 leading-relaxed text-[0.95rem] max-w-sm">
              Trusted Pharmaceutical Carrying & Forwarding Agent and Super Stockist delivering reliable warehousing, inventory management, and pharmaceutical distribution solutions.
            </p>
            <div className="mt-6 flex items-center gap-3.5" data-testid="footer-social-links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-300 ${social.bgClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-extrabold text-base">Quick Links</h4>
            <ul className="mt-6 space-y-4" data-testid="footer-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-700 hover:text-blue-600 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-900 font-extrabold text-base">Contact</h4>
            <ul className="mt-6 space-y-4" data-testid="footer-contact">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+919513965599" className="text-slate-900 hover:text-blue-600">+91 9513965599</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:zenmedcfa@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=zenmedcfa@gmail.com';
                      const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
                      if (isMobile) return;
                      e.preventDefault();
                      try {
                        const win = window.open(gmail, '_blank', 'noopener,noreferrer');
                        if (!win) window.location.href = 'mailto:zenmedcfa@gmail.com';
                      } catch (err) {
                        window.location.href = 'mailto:zenmedcfa@gmail.com';
                      }
                    }}
                    className="text-slate-900 hover:text-blue-600"
                  >
                    zenmedcfa@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={25} className="text-blue-400" />
                <span className="text-slate-900">No #91. Ground floor, 4th stage, 4th block, W.O.C road industrial town,
Bangalore-560079</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-slate-700">
          <div>© 2026 Zenmed Distribution Pvt. Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

