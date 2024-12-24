import { BadRequest, TimeoutException } from "@/lib/exceptions";
import { getTimedFilename } from "@/utils";
import { DOMParser } from 'xmldom';

export const getFbContentFileName = (type, res, ext) => {
  return getTimedFilename(`PRAS-${type}-${res}`, ext);
}

export const handleScraperError = (error) => {
  console.log("Scraper error:", error.message);
  if (error.message.includes("status code 404")) {
    throw new BadRequest("This post is private or does not exist", 404);
  } else if (error instanceof TimeoutException) {
    throw new TimeoutException();
  }
};

export const parseDashManifest = (dashManifest, thumbnail = null) => {
  if (!dashManifest) {
    return [];
  }
  // Parse the XML string into a DOM object
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(dashManifest, 'application/xml');

  // Extract all Representation elements
  const representations = xmlDoc.getElementsByTagName('Representation');

  // Map the representations to an array of objects
  const videoInfoList = Array.from(representations).map(rep => {
    const mime_type = rep.getAttribute('mimeType');
    const id = rep.getAttribute('id');
    const bandwidth = rep.getAttribute('bandwidth');
    const baseURL = rep.getElementsByTagName('BaseURL')[0]?.textContent || '';
    const codecs = rep.getAttribute('codecs');

    if (mime_type.includes('audio')) {
      const bitrate = '128kbps';
      return {
        id,
        type: mime_type.split('/')[0],
        mime_type,
        bandwidth: parseInt(bandwidth, 10),
        bitrate,
        codecs,
        baseURL,
        has_audio: true,
        filename: getFbContentFileName("AUD", bitrate, mime_type.split('/').at(-1)),
        thumbnail: null,
      }
    }
    const quality = rep.getAttribute('FBQualityLabel');
    const width = rep.getAttribute('width');
    const height = rep.getAttribute('height');


    return {
      id,
      type: mime_type.split('/')[0],
      mime_type,
      bandwidth: parseInt(bandwidth, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      quality,
      codecs: codecs.includes('av01') ? 'av1' : codecs.includes('vp09') ? 'vp9' : 'h264',
      baseURL,
      has_audio: false,
      filename: getFbContentFileName("VID", quality, mime_type.split('/').at(-1)),
      thumbnail: thumbnail,
    };
  });

  return videoInfoList;
}
