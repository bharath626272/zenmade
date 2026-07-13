import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 pt-20 pb-8" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <Logo width={220} showTagline className="h-auto w-auto" />
            </div>
            <p className="mt-6 text-slate-900 leading-relaxed text-[0.95rem] max-w-sm">
              Trusted Pharmaceutical Carrying & Forwarding Agent and Super Stockist delivering reliable warehousing, inventory management, and pharmaceutical distribution solutions.
            </p>
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
                <a href="tel:+918045678901" className="text-slate-900 hover:text-blue-600">+91 9513965599</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:zenmedcfa@gmail.com" className="text-slate-900 hover:text-blue-600">zenmedcfa@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-slate-900">No #91. Ground floor, 4th stage, 4th block, W.O.C road industrial town,
Bangalore-560079</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-slate-700">
          <div>© 2024 Zenmed Distribution Pvt. Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
