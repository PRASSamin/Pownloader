import { handleScraperError } from "@/lib/facebook/scrapers/helpers";
import { _tiktokVideoFetchApiByPRAS } from "@/constants";
import axios from "axios";
import { SSSTik } from "./sssTik";
import { formatSSSTikJson, formatTiktokDataJson } from "./formaters";

export const fetchTiktokContent = async (url, timeout = 0) => {
    if (!url) return null;

    if (/\/photo|music\//.test(url)) {
        try {
            const response = await SSSTik(url)
            return formatSSSTikJson(response.result, url);
        } catch (e) { }
    } else {
        try {
            const response = await axios.get(`
                ${_tiktokVideoFetchApiByPRAS}${url}
            `, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Origin: 'https://cdn.pras.me',
                    Referer: 'https://cdn.pras.me/',
                    Accept: '*/*',
                    Host: 'cdn.pras.me',
                }
            })
            return formatTiktokDataJson(response.data);
        } catch (e) {
            console.log(e)
            handleScraperError(e);
            return null;
        }
    }
};
