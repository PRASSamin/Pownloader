import { BadRequest } from "@/lib/exceptions";
import { fetchFromGraphQL } from "./scrapers/graphql";

export const getPostId = (url) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels|reel?\/([a-zA-Z0-9_-]+)\/?/;
    
  let postId;

  if (!url) {
    throw new BadRequest("Instagram URL was not provided");
  }

  const postCheck = url.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = url.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    throw new BadRequest("Instagram post/reel ID was not found");
  }

  return postId;
};

export const fetchPostJson = async (
  url, timeout
) => {
  const postId = getPostId(url);

  const apiJson = await fetchFromGraphQL(postId, timeout);
  if (apiJson) return apiJson;

  throw new BadRequest("Video link for this post is not public.", 401);
};
