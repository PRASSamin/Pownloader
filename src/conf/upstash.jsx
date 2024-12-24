// Upstash configs
export const upstashUrl = process.env.NEXT_UPSTASH_REDIS_REST_URL ?? "";
export const upstashToken = process.env.NEXT_UPSTASH_REDIS_REST_TOKEN ?? "";
const isUsingUpstash = process.env.NEXT_USE_UPSTASH ?? "";
export const enableUpstash = isUsingUpstash === "true";
// Ratelimit configs
export const maxRequests = 30; // Max requests every requests window
export const requestsWindow = "1 m"; //  5 requests allowed every 1 min
// Ban configs
export const upstashBanEnabled = true;
export const upstashBanDuration = 1800; // 30 minutes;