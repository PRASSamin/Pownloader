import { BadRequest } from "@/lib/exceptions";
import { fetchTiktokContent } from "./scrapers/api";
import { resolveRedirectUrl } from "../facebook";

const isRedirectorUrl = (url) => {
    const redirectorPatterns = [
        /https?:\/\/(?:vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/
    ];
    return redirectorPatterns.some((pattern) => pattern.test(url));
};

export const fetchTiktokContentJson = async (url, timeout = 5000) => {
    const resolvedUrl = isRedirectorUrl(url) ? await resolveRedirectUrl(url) : url;

    const result = await fetchTiktokContent(resolvedUrl, timeout);
    if (result) {
        return result;
    }

    throw new BadRequest("Unfortunately, this video may be private or does not exist", 401);
};
