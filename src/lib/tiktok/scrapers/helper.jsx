import { getTimedFilename } from "@/utils";

export const getTiktokContentFileName = (type, title, ext) => {
    return getTimedFilename(`PRAS-${type}-${title}`, ext);
}

export const extractUsername = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^\/?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null; 
  }