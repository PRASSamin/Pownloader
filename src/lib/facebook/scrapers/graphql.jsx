import querystring from "querystring";
import { formatGraphqlVideoJson, formatGraphqlStoryJson } from "./formaters";
import { HttpRequest } from "@/utils";
import { handleScraperError } from "./helpers";

const encodeVideoRequestData = (contentId) => {
  const requestData = {
    doc_id: 5279476072161634,
    variables: JSON.stringify({
      UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
      caller: "CHANNEL_VIEW_FROM_PAGE_TIMELINE",
      displayCommentsContextEnableComment: null,
      displayCommentsContextIsAdPreview: null,
      displayCommentsContextIsAggregatedShare: null,
      displayCommentsContextIsStorySet: null,
      displayCommentsFeedbackContext: null,
      feedbackSource: 41,
      feedLocation: "TAHOE",
      focusCommentID: null,
      privacySelectorRenderLocation: "COMET_STREAM",
      renderLocation: "video_channel",
      scale: 1,
      streamChainingSection: false,
      useDefaultActor: false,
      videoChainingContext: null,
      videoID: contentId,
    }),
    server_timestamps: true,
  };
  const encoded = querystring.stringify(requestData);
  return encoded;
};

const encodeStoryRequestData = (contentId) => {
  const requestData = {
    doc_id: 7202535426537683,
    variables: JSON.stringify({
      bucketIDs: [contentId],
      scale: 1,
      blur: 10,
      shouldEnableArmadilloStoryReply: true,
      shouldEnableLiveInStories: true,
      feedbackSource: 65,
      useDefaultActor: false,
      feedLocation: "COMET_MEDIA_VIEWER",
      focusCommentID: null,
      shouldDeferLoad: false,
      isStoriesArchive: false,
      __relay_internal__pv__StoriesIsShareToStoryEnabledrelayprovider: false,
      __relay_internal__pv__IsWorkUserrelayprovider: false,
    }),
    server_timestamps: true,
  };
  const encoded = querystring.stringify(requestData);
  return encoded;
};

export const fetchFromFbGraphQL = async (type, contentId, timeout = 0) => {
  if (!contentId) return null;

  const API_URL = "https://www.facebook.com/api/graphql";
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    "accept-language": "en-US,en;q=0.8",
    accept: "*/*",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-asbd-id": "129477",
    "x-fb-friendly-name": "StoriesViewerBucketPrefetcherMultiBucketsQuery",
    "x-fb-lsd": "jueQkOOsFwea95Sl_R-LU4",
    origin: "https://www.facebook.com",
  };

  const encodedData = type === "video" ? encodeVideoRequestData(contentId) : encodeStoryRequestData(contentId);

  let response;
  try {
    response = await HttpRequest({
      url: API_URL,
      method: "POST",
      headers,
      data: encodedData,
      timeout,
    });
    if (response.statusText === "error") {
      return null;
    }
  } catch (e) {
    handleScraperError(e);
    return null;
  }

  if (response.statusText === "error") return null;

  const contentType = response.headers["content-type"];

  if (contentType !== 'text/html; charset="utf-8"') return null;

  const responseJson = response.data;

  if (!responseJson) return null;

  if (type === "video") {
    return formatGraphqlVideoJson(responseJson);
  } else {
    return formatGraphqlStoryJson(responseJson);
  }
};