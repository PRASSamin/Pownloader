import { NextResponse } from "next/server";

import { upstashBanDuration } from "@/conf/upstash";
import { enableServerAPI } from "@/conf/instagram";

import { getClientIp } from "@/utils";
import { isRatelimited } from "@/lib/rate-limit";
import { navItems } from "./app/components/nav.list"

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

    const tools = navItems()
        .filter((item) => item.title.toLowerCase() === "tools")
        .flatMap((item) => item.subItems);

    if (pathname === "/tools" || pathname === "/tool" && tools.length > 0 && tools[0].url) {
        return NextResponse.redirect(new URL(tools[0].url, request.url));
    }

    if (process.env.NEXT_STAGE === "production") {
        const requestPath = request.nextUrl.pathname;
        const country = request.geo?.country ?? "Country";

        if (request.headers.get('referer') !== 'https://pownloader.pras.me/') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (isStaticPath(requestPath)) {
            return NextResponse.next();
        }

        if (requestPath.startsWith("/api") && enableServerAPI) {
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

        const clientIp = getClientIp(request);
        console.log(`${request.method} ${clientIp} (${country}) -> ${requestPath}`);
    }
}

export const config = {
    matcher: ["/api/:path*", "/:path*"],
};
