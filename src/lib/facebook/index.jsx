import { BadRequest } from "@/lib/exceptions";
import { fetchFromFbGraphQL } from "./scrapers/graphql";
import axios from "axios";

const isRedirectorUrl = (url) => {
    const redirectorPatterns = [
        /fb\.watch/,
        /facebook\.com\/l\.php/,
    ];
    return redirectorPatterns.some((pattern) => pattern.test(url));
};

const resolveRedirectUrl = async (url) => {
    try {
        const response = await axios.get(url, {
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400
        });

        if (response.headers.location) {
            return response.headers.location;
        }
        return url;
    } catch (error) {
        if (error.response && error.response.headers.location) {
            return error.response.headers.location;
        }
        console.error("Failed to resolve redirect URL:", (error.response.headers));
        throw new BadRequest("Failed to resolve redirect URL");
    }
};

// Extract Facebook content ID from URL
export const getContentFbId = (url) => {
    const videoRegex = /\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/;
    const storyRegex = /stories\/(\d+)/;

    let contentId;

    if (!url) {
        throw new BadRequest("Facebook URL was not provided");
    }

    const videoCheck = url.match(videoRegex);
    if (videoCheck) {
        contentId = videoCheck.at(-1);
        return {
            type: "video",
            contentId,
        };
    }

    const storyCheck = url.match(storyRegex);
    if (storyCheck) {
        contentId = storyCheck.at(-1);
        return {
            type: "story",
            contentId,
        };
    }

    return null;
};

export const fetchContentJson = async (url, timeout) => {
    try {
        const resolvedUrl = isRedirectorUrl(url) ? await resolveRedirectUrl(url) : url;

        let urlDet = getContentFbId(resolvedUrl);

        if (!urlDet) {
            const reResolvedUrl = await resolveRedirectUrl(resolvedUrl);
            urlDet = getContentFbId(reResolvedUrl);

            if (!urlDet) {
                throw new BadRequest("Facebook video/story ID was not found");
            }
        }

        const contentJson = await fetchFromFbGraphQL(
            urlDet.type,
            urlDet.contentId,
            timeout
        );

        if (contentJson) return contentJson;

        throw new BadRequest("Video link for this post is not public.", 401);
    } catch (error) {
        throw new BadRequest(
            error.message || "An error occurred while fetching content"
        );
    }
};
