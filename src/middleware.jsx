import { NextResponse } from "next/server";

import { upstashBanDuration } from "./conf/upstash";

import { isRatelimited } from "./lib/rate-limit";
import { navItems } from "./app/components/nav.list"
import { geolocation, ipAddress } from "@vercel/functions";

const isStaticPath = (path) => {
    const staticPaths = [
        "/_next",
        "/images",
        "/favicon.ico",
        "/robots.txt",
        "/webmanifest.json",
    ];
    for (const staticPath of staticPaths) {
        if (path.startsWith(staticPath)) {
            return true;
        }
    }

    return false;
};

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const { country, city, latitude, longitude, countryRegion, flag } = geolocation(request);
    const ip = ipAddress(request);

    const headers = new Headers(request.headers);
    headers.set("x-current-url", request.nextUrl.href);
    headers.set("x-current-path", pathname);

    const tools = navItems()
        .filter((item) => item.title.toLowerCase() === "tools")
        .flatMap((item) => item.subItems);

    if (pathname === "/tools" || pathname === "/tool" && tools.length > 0 && tools[0].url) {
        return NextResponse.redirect(new URL(tools[0].url, request.url));
    }

    if (pathname === "/home") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (process.env.NEXT_STAGE === "production") {
        const requestPath = request.nextUrl.pathname;

        if (request.headers.get('host') !== 'pownloader.pras.me') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (isStaticPath(requestPath)) {
            return NextResponse.next({ headers });
        }

        if (requestPath.startsWith("/api")) {
            const isLimited = await isRatelimited(request);
            if (!isLimited) return;

            const banDuration = Math.floor(upstashBanDuration / 60 / 60);
            return NextResponse.json(
                {
                    error: `Too many requests, you have been banned for ${banDuration} hours.`,
                },
                { status: 429 }
            );
        }

        console.log(`${request.method} ${ip} (${country}${flag}) -> ${requestPath}`);
    }

    return NextResponse.next({ headers });
}

export const config = {
    matcher: ["/api/:path*", "/:path*"],
};
