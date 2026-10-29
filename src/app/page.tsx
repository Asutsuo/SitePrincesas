import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import OriginStory from "@/components/home/OriginStory";
import EditionsShowcase from "@/components/home/EditionsShowcase";
import PrincessManual from "@/components/home/PrincessManual";
import ItineraryTimeline from "@/components/home/ItineraryTimeline";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[var(--color-primary-light)] selection:text-[var(--color-primary-deep)]">
      <Navbar />
      <HeroSection />
      <OriginStory />
      <EditionsShowcase />
      <PrincessManual />
      <ItineraryTimeline />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </main>
  );
}
