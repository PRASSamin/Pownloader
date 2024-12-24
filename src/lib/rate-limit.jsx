import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ipAddress } from "@vercel/functions";
import {
    upstashToken,
    upstashUrl,
    enableUpstash,
    upstashBanEnabled,
    upstashBanDuration,
    maxRequests,
    requestsWindow,
} from "@/conf/upstash";

const isValidUpstash = () => {
    if (!upstashUrl) {
        console.error("Upstash URL is not set");
    }

    if (!upstashToken) {
        console.error("Upstash Token is not set");
    }

    return upstashUrl !== "" && upstashToken !== "";
}

export const redisClient = new Redis({
    url: upstashUrl,
    token: upstashToken,
});

export const ratelimit = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(maxRequests, requestsWindow),
});


export const isRatelimited = async (request) => {
    if (!enableUpstash) return false;

    const validUpstash = isValidUpstash();
    if (!validUpstash) return false;

    try {
        const identifier = ipAddress(request);
        if (!identifier) return false;
        const result = await ratelimit.limit(identifier);
        if (result.success) return false;
        if (upstashBanEnabled) {
            await redisClient.setex(
                `ban:${identifier}`,
                upstashBanDuration,
                "banned"
            );
        }
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
};