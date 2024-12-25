"use client";
import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import BottomNavigation from "./components/bottomNav";

import CanvasBackground from "@/app/components/background";
import GoogleAna from "@/app/GoogleAna";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from '@/lib/utils';

const RootCommon = ({ children, className }) => {
    return (
        <body
            className={cn(`antialiased overflow-hidden bg-black font-sans`, className)}
        >
            <CanvasBackground />
            {children}
            <Analytics />
            <SpeedInsights />
            <GoogleAna />
        </body>
    )
}

export const Root = ({ children }) => {
    return (
        <RootCommon className="md:overflow-auto">
            <SidebarProvider>
                <AppSidebar />
                <main
                    className="w-full flex items-start
                 justify-center md:max-h-full max-h-[calc(100vh-56px-env(safe-area-inset-bottom))] pb-14 md:pb-0 overflow-auto"
                >
                    {children}
                </main>
                <Toaster />
            </SidebarProvider>
            <BottomNavigation />
        </RootCommon>
    )
}

export const HomeRoot = ({ children }) => {
    return (
        <RootCommon>
            {children}
        </RootCommon>
    )
}