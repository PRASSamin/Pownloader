"use client";
import React from "react";
import CursorProvider from "./home/components/cursor";
import Navigation from "./home/components/nav";
import Footer from "./home/components/footer";
import BottomNavigation from "./components/bottomNav";

import { HomeRoot } from "./root";

import HeroSection from "./home/components/hero";
import FAQ from "./home/components/faq";

export default function Home() {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <HomeRoot>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full pt-3 pb-8 bg-background">
          <img src="/logo.png" className="w-20 preloader" alt="preloader" />
        </div>
      ) : (
        <CursorProvider>
          {window.innerWidth > 768 ? (
            <Navigation className={"hidden md:block"} />
          ) : (
            <BottomNavigation />
          )}
          <HeroSection />
          <section className="min-h-[calc(100vh-57px)] pb-[56px] md:pb-0 flex flex-col justify-between">
            <FAQ />
            <Footer />
          </section>
        </CursorProvider>
      )}
    </HomeRoot>
  );
}
