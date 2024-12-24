"use client";
import React from "react";
import Stars from "./components/Stars";
import ShootingStars from "./components/ShootingStars";
import Bird from "./components/Bird";
import Moon from "./components/Moon";
import { useRouter } from "next/navigation";

const NotFoundView = () => {
    const router = useRouter();

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-gradient-to-b from-[#08051a] via-[#3a1b5f] to-[#5a1f8b] after:w-full after:h-full after:absolute after:top-0 after:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(15,10,38,0.2)_100%)]">
                <Stars />
            </div>
            <div
                className="w-full h-full absolute inset-0 overflow-hidden">
                <ShootingStars />
                <Bird />
                <div className="w-[600px] h-[450px] left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 text-white leading-[1] font-[700] text-center justify-center items-center flex flex-col">
                    <div>
                        <div
                            style={{
                                textShadow: "20px 20px 20px rgba(0, 0, 0, 0.2)"
                            }}
                            className="px-10 font-russo text-[100px] sm:text-[200px] inline-block">4</div>
                        <Moon />
                        <div
                            style={{
                                textShadow: "20px 20px 20px rgba(0, 0, 0, 0.2)"
                            }}
                            className="px-10 font-russo sm:text-[200px] text-[100px] inline-block">4</div>
                    </div>
                    <div className="max-[580px]:w-screen max-[580px]:flex max-[580px]:flex-col max-[580px]:items-center max-[580px]:justify-center">
                        <div
                            style={{
                                textShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)"
                            }}
                            className="text-xl mt-10 max-[580px]:items-center max-[580px]:text-lg max-[580px]:py-4">The link you followed may be broken, or the page may have been removed.</div>
                        <button
                            onClick={() => {
                                router.back();
                            }}
                            style={{
                                textShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)"
                            }}
                            className="text-lg mt-6 px-4 py-2 text-white bg-transparent cursor-pointer z-[999] border-2 border-white rounded-md transition-all duration-300 hover:opacity-[0.7]">Go back</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default NotFoundView;
