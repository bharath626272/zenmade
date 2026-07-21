import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Loader2, ArrowRight, Send } from "lucide-react";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";
import Logo, { LOGO_WIDTH } from "./Logo";
import { getApiUrl } from "../../lib/api";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const [submitting, setSubmitting] = useState(false);
  const phoneNumber = "+919513965599";
  const whatsappUrl = "https://wa.me/919513965599";

  const handleCallClick = (event) => {
    event.preventDefault();
    window.location.href = `tel:${phoneNumber.replace(/\D/g, "")}`;
  };

  const handleWhatsAppClick = (event) => {
    event.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);

      const response = await fetch(getApiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        keepalive: true,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      console.info("Contact form submitted", values);
      toast.success(data.message || "Message received. We will reach out shortly.");
      reset();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContactClick = (e) => {
    const mailto = 'mailto:zenmedcfa@gmail.com?subject=Inquiry%20from%20website';
    const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=zenmedcfa@gmail.com&su=Inquiry%20from%20website';
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    if (isMobile) {
      // let the native mail app handle it
      return;
    }

    // Desktop: try opening Gmail compose in new tab; fall back to mailto if blocked
    e.preventDefault();
    try {
      const win = window.open(gmail, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = mailto;
      }
    } catch (err) {
      window.location.href = mailto;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#F7FBF9_0%,#F2F8F4_100%)] py-24 md:py-32" data-testid="contact-section">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[-6%] top-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-4%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <span className="section-tag brand-gradient-text" data-testid="contact-tag">Contact Us</span>
          </div>
        </div>

        <div className="mt-14 rounded-[2.2rem] border border-slate-200/80 bg-white/95 p-4 shadow-[0_40px_100px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-5 text-slate-900 shadow-[0_20px_50px_-24px_rgba(2,6,23,0.2)] md:p-6"
            >
              <div className="absolute inset-0">
                <div className="absolute left-[-8%] top-[-10%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-8%] h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute left-0 top-0 h-full w-full bg-white/90 pointer-events-none" />
              </div>
              <div className="relative z-10">
                <div className="pb-4">
                  <Logo width={LOGO_WIDTH.CONTACT} className="h-auto w-auto" imgClass="" />
                </div>
                <div className="border-b border-slate-200 pb-3 text-left">
                  <p className="text-sm text-slate-600">Pharma CFA & Super Stockist Partner</p>
                </div>

                <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
                  <div className="flex gap-3">
                    <MapPin size={18} className="mt-1 shrink-0 text-blue-600" />
                    <span>No #91. Ground floor, 4th stage, 4th block, W.O.C road industrial town,
Bangalore-560079</span>
                  </div>
                  <a href="tel:+919513965599" className="flex gap-3 transition hover:text-slate-900">
                    <Phone size={18} className="mt-1 shrink-0 text-blue-600" />
                    <span>+91 9513965599</span>
                  </a>
                  <a href="mailto:zenmedcfa@gmail.com" className="flex gap-3 transition hover:text-slate-900">
                    <Mail size={18} className="mt-1 shrink-0 text-blue-600" />
                    <span>zenmedcfa@gmail.com</span>
                  </a>
                </div>

                <div className="mt-8 rounded-[1.4rem] border border-slate-200 bg-slate-50/90 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 text-lg font-extrabold text-slate-900">
                    <Clock size={18} className="text-blue-600" />
                    Business Hours
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-4">
                      <span>Monday – Saturday</span>
                      <span className="font-semibold text-slate-900">10:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Sunday</span>
                      <span className="font-semibold text-slate-900">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-black text-slate-900">Partner With Us</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Looking for a reliable Pharma CFA or Super Stockist partner? Reach out to discuss your distribution, warehousing, and supply chain requirements.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.25)] md:p-8"
              data-testid="contact-form"
              noValidate
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <Send size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">Send us an inquiry</p>
                  <p className="text-sm text-slate-500">Share a few details and our team will get back to you shortly.</p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Field label="Full Name" error={errors.name?.message}>
                  <input
                    type="text"
                    data-testid="contact-input-name"
                    placeholder="Your name"
                    className={inputCls(errors.name)}
                    aria-invalid={!!errors.name}
                    {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
                  />
                </Field>
                <Field label="Company Name">
                  <input
                    type="text"
                    data-testid="contact-input-company"
                    placeholder="Your company"
                    className={inputCls(errors.company)}
                    {...register("company")}
                  />
                </Field>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field label="Email Address" error={errors.email?.message}>
                  <input
                    type="email"
                    data-testid="contact-input-email"
                    placeholder="you@company.com"
                    className={inputCls(errors.email)}
                    aria-invalid={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    type="tel"
                    data-testid="contact-input-phone"
                    placeholder="+91 9999999999"
                    className={inputCls(errors.phone)}
                    {...register("phone")}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Subject">
                  <input
                    type="text"
                    data-testid="contact-input-subject"
                    placeholder="What would you like to discuss?"
                    className={inputCls(errors.subject)}
                    {...register("subject")}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={4}
                    data-testid="contact-input-message"
                    placeholder="Tell us about your distribution requirements..."
                    className={`${inputCls(errors.message)} min-h-[120px] resize-none`}
                    aria-invalid={!!errors.message}
                    {...register("message", { required: "Message is required", minLength: { value: 5, message: "Please add more details" } })}
                  />
                </Field>
              </div>

              <Magnetic strength={0.15} className="mt-7 block w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="contact-submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[oklch(44%_0.19_258)] px-6 py-4 text-base font-bold text-white shadow-[0_12px_34px_-12px_rgba(37,99,235,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending live...
                    </>
                  ) : (
                    <>
                      Send Inquiry <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </Magnetic>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  onClick={handleCallClick}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <Phone size={16} className="text-[oklch(44%_0.19_258)]" />
                  Call Us
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <Send size={16} />
                  WhatsApp
                </a>
              </div>

            </motion.form>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-50/90">
          <div className="border-b border-slate-200 bg-slate-100 px-6 py-4 text-sm text-slate-700">
            No #91. Ground floor, 4th stage, 4th block, W.O.C road industrial town, Bangalore-560079
          </div>
          <iframe
            title="Zenmed location on Google Maps"
            src="https://maps.google.com/maps?q=No+91,+Ground+Floor,+4th+Stage,+4th+Block,+W.O.C+Road,+Industrial+Town,+Bangalore+560079&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[28rem] w-full border-0"
          />
        </div>

      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {error && <span data-testid="field-error" className="mt-1.5 inline-block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  );
}

function inputCls(err) {
  return `w-full rounded-xl border px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${err ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white"}`;
}
