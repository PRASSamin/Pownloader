import { BadRequest, TimeoutException } from "@/lib/exceptions";
import { getTimedFilename } from "@/utils";

export const getIGVideoFileName = (id) =>
  getTimedFilename(`PRAS_IG_VID_${id}`, "mp4");

export const getIGImageFileName = (id) =>
  getTimedFilename(`PRAS_IG_IMG_${id}`, "jpg");

export const handleScraperError = (error) => {
  console.log("Scraper error:", error.message);
  if (error.message.includes("status code 404")) {
    throw new BadRequest("This post is private or does not exist", 404);
  } else if (error instanceof TimeoutException) {
    throw new TimeoutException();
  }
};



