"use client";
import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import BottomNavigation from "./components/bottomNav";

export const Root = ({ children }) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export const HomeRoot = ({ children }) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}