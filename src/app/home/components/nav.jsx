"use client";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { GitHub } from "@mui/icons-material";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { navItems } from "@/app/components/nav.list";


export default function Navigation({ className }) {
    const tools = navItems().filter((item) => item.title.toLowerCase() === "tools").flatMap((item) => item.subItems);

    return (
        <Fragment>
            <header className={cn("sticky border-b-[1px] top-0 z-40 w-full  border-b-[#333] bg-background", className)}>
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                        <NavigationMenuItem className="font-bold flex h-full py-2">
                            <a
                                rel="noreferrer noopener"
                                href="/"
                                className="ml-2 font-bold text-xl flex"
                            >
                                <Image
                                    src={"/logo.png"}
                                    width={100}
                                    height={100}
                                    alt="pownloader"
                                    className="h-full w-auto"
                                />
                            </a>
                        </NavigationMenuItem>


                        <div className="flex gap-5">
                            <div className="flex gap-2">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {tools.map((tool, index) => (
                                                <NavigationMenuLink key={index} asChild>
                                                    <Link
                                                        href={tool.url}
                                                        className={
                                                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative"}
                                                    >
                                                        <div className="text-sm font-medium leading-none">{tool.title}{tool?.status === "new" && <span className="ml-1 text-[10px] bg-purple-700 font-black px-1.5 py-1 absolute top-1 rounded-full">new</span>}</div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                            {tool.description}
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </div>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                >
                                    <Link
                                        rel="noreferrer noopener"
                                        href="https://github.com/PRASSamin/pownloader"
                                        target="_blank"
                                        className={`border ${buttonVariants({ variant: "ghost" })}`}
                                    >
                                        <GitHub className="mr-2 w-5 h-5" />
                                        Github
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>






            </header>
        </Fragment >
    );
}