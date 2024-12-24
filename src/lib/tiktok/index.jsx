import { BadRequest } from "@/lib/exceptions";
import { fetchTiktokContent } from "./scrapers/api";

export const fetchTiktokContentJson = async (url, timeout = 5000) => {

    const result = await fetchTiktokContent(url, timeout);
    if (result) {
        return result;
    }

    throw new BadRequest("Unfortunately, this video may be private or does not exist", 401);
};
