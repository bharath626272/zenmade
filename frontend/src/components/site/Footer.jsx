import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { BrandMark } from "./Logo";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1220] text-slate-200 pt-20 pb-8" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Zenmed logo"
                className="h-12 w-auto object-contain"
                draggable="false"
              />
            </div>
            <p className="mt-6 text-slate-400 leading-relaxed text-[0.95rem] max-w-sm">
              Karnataka's trusted pharmaceutical distribution partner since 2002. GDP-compliant, technology-driven, and committed
              to healthcare excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-base">Quick Links</h4>
            <ul className="mt-6 space-y-4" data-testid="footer-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-400 hover:text-blue-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-extrabold text-base">Contact</h4>
            <ul className="mt-6 space-y-4" data-testid="footer-contact">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+918045678901" className="text-slate-300 hover:text-blue-300">+91 80 4567 8901</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:info@zenmed.in" className="text-slate-300 hover:text-blue-300">info@zenmed.in</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-slate-300">Peenya, Bengaluru — 560 058</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-slate-500">
          <div>© 2024 Zenmed Distribution Pvt. Ltd. All rights reserved.</div>
          <div>Drug License No. KA/DL/2002/XXXXX</div>
        </div>
      </div>
    </footer>
  );
}
