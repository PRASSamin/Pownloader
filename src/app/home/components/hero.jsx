"use client";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Galaxy from "./galaxy";

const HeroSection = () => {
    useEffect(() => {
        let startY = 0; // Initial touch position on Y-axis

        const handleWheel = (e) => {
            e.preventDefault(); // Prevent default scrolling behavior

            const scrollDirection = e.deltaY > 0 ? "down" : "up"; // Detect scroll direction
            const scrollHeight = window.innerHeight - 57; // Set custom scroll height (100vh - 57px)
            const currentScroll = window.scrollY; // Get current scroll position

            if (scrollDirection === "down") {
                window.scrollTo({
                    top: Math.ceil(currentScroll / scrollHeight) * scrollHeight + scrollHeight,
                    behavior: "smooth",
                });
            } else {
                window.scrollTo({
                    top: Math.floor(currentScroll / scrollHeight) * scrollHeight - scrollHeight,
                    behavior: "smooth",
                });
            }
        };

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY; // Record the initial touch position
        };

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent default touch behavior

            const currentY = e.touches[0].clientY; // Current touch position on Y-axis
            const scrollHeight = window.innerHeight - 57; // Set custom scroll height
            const currentScroll = window.scrollY; // Get current scroll position
            const scrollDirection = startY > currentY ? "down" : "up"; // Detect scroll direction

            if (scrollDirection === "down") {
                window.scrollTo({
                    top: Math.ceil(currentScroll / scrollHeight) * scrollHeight + scrollHeight,
                    behavior: "smooth",
                });
            } else {
                window.scrollTo({
                    top: Math.floor(currentScroll / scrollHeight) * scrollHeight - scrollHeight,
                    behavior: "smooth",
                });
            }
        };

        // Add event listeners for both wheel (PC) and touch (mobile)
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            // Cleanup event listeners
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);



    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 mx-auto">
            <div className="text-center lg:text-start space-y-6 h-[calc(100vh-10rem-57px)] md:h-[calc(100vh-16rem-57px)] flex flex-col justify-between md:justify-start">
                <div className="flex flex-col space-y-6">
                    <main className="text-5xl md:text-6xl font-bold">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-[#7837d1] to-[#cba6ff] text-transparent bg-clip-text">
                                Pownloader,
                            </span>{" "}
                            The Ultimate Free Video Downloader for Everyone
                        </h1>
                    </main>
                    <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                        Download videos and photos in high quality from your favorite platforms with just one click.
                    </p>
                </div>
                <div className="space-y-4 md:space-y-0 md:space-x-4 px-2 md:px-0">
                    <Button asChild className="w-full md:w-1/3">
                        <Link href="/tools">Get Started</Link>
                    </Button>
                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/PRASSamin/pownloader"
                        target="_blank"
                        className={`w-full md:w-1/3 ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        Star on GitHub
                        <GitHub className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="z-10 hidden lg:flex">
                <Galaxy />
            </div>
        </section>
    )
}

export default HeroSection
