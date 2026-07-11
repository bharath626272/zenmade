import React from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import MissionVision from "@/components/site/MissionVision";
import Services from "@/components/site/Services";
import Why from "@/components/site/Why";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function Home() {
  useSmoothScroll();
  return (
    <div data-testid="home-page" className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Services />
        <Why />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
