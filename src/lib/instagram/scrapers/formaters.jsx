import { BadRequest } from "@/lib/exceptions";
import { getIGVideoFileName, getIGImageFileName } from "./helpers";
import { _generateRandomId } from "@/lib/facebook/scrapers/formaters";

export const formatGraphqlJson = async (postJson) => {
  const data = postJson.data.xdt_shortcode_media;

  if (!data) {
    throw new BadRequest("This post does not exist");
  }

  const owner = data.owner;
  owner.profile_pic = owner.profile_pic_url;
  owner.name = owner.full_name;
  owner.profile_url = `https://www.instagram.com/${owner.username}/`;

  const keysToRemove = [
    "is_verified",
    "blocked_by_viewer",
    "followed_by_viewer",
    "restricted_by_viewer",
    "followed_by_viewer",
    "has_blocked_viewer",
    "is_embeds_disabled",
    "is_unpublished",
    "requested_by_viewer",
    "pass_tiering_recommendation",
    "edge_owner_to_timeline_media",
    "edge_followed_by",
    "profile_pic_url",
    "full_name",
  ];

  keysToRemove.forEach((key) => {
    if (key in owner) delete owner[key];
  });


  if (!data.is_video) {
    const childrenEdges = data.edge_sidecar_to_children?.edges || [{
      node: {
        id: _generateRandomId(),
        width: data.display_resources.at(-1).config_width,
        height: data.display_resources.at(-1).config_height,
        display_url: data.display_resources.at(-1).src,
      }
    }] || [];

    const PostJson = {
      id: data.id,
      owner: owner,
      thumbnail: data.thumbnail_src,
      resources: [
        ...childrenEdges.map(edge => ({
          id: edge.node.id,
          filename: edge.node.is_video ? getIGVideoFileName(edge.node.id) : getIGImageFileName(edge.node.id),
          type: edge.node.is_video ? "video" : "image",
          quality: edge.node.is_video ? "720p" : "",
          has_audio: edge.node.is_video ? true : false,
          width: edge.node?.dimensions?.width?.toString() || edge.node.width.toString(),
          height: edge.node?.dimensions?.height?.toString() || edge.node.height.toString(),
          baseURL: edge.node.is_video ? edge.node.video_url : edge.node.display_url,
          thumbnail: edge.node.display_url,
        })),
      ],
    };
    return PostJson;
  }


  const filename = getIGVideoFileName(data.id);
  const videoUrl = data.video_url;
  const { width, height } = data.dimensions;
  const thumbnailUrl = data.thumbnail_src;
  const displayUrl = data.display_url;

  if (!videoUrl || !thumbnailUrl) {
    return null;
  }

  const videoJson = {
    id: data.id,
    thumbnail: thumbnailUrl,
    displayUrl: displayUrl,
    owner: owner,
    resources: [
      {
        id: data.id,
        filename: filename,
        type: "video",
        quality: "720p",
        has_audio: true,
        width: width.toString(),
        height: height.toString(),
        baseURL: videoUrl,
        thumbnail: thumbnailUrl,
      },
    ]
  };

  return videoJson;
};