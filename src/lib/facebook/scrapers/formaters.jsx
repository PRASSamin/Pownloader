import { BadRequest } from "@/lib/exceptions";
import { getFbContentFileName, parseDashManifest } from "./helpers";

export const formatGraphqlVideoJson = (data) => {

  if (!data) {
    throw new BadRequest("This post does not exist");
  }

  let responseData = data.split("\n");
  const d1 = JSON.parse(responseData[0]);
  const d2 = responseData.filter(
    (i) =>
      JSON.parse(i).label ===
      "CometTahoeRootQuery$defer$CometTahoeSidepaneRenderer_video"
  );


  responseData = [d1, JSON.parse(d2[0])];

  const videoUrls = parseDashManifest(
    responseData.at(0).data?.video?.dash_manifest, responseData.at(0).data?.video?.preferred_thumbnail?.image?.uri
  );


  const owner = responseData.at(-1)?.data?.tahoe_sidepane_renderer?.video
    ?.creation_story?.comet_sections?.actor_photo?.story?.actors?.[0] || {};

  const keysToRemove = [
    "story_bucket",
    "delegate_page",
    "is_additional_profile_plus",
    "work_info",
    "work_foreign_entity_info",
    "__isActor",
    "__isEntity",
    "url",
  ];

  keysToRemove.forEach((key) => {
    if (key in owner) delete owner[key];
  });

  owner.profile_pic = responseData.at(-1)?.data?.tahoe_sidepane_renderer?.video?.owner?.owner_as_page?.profile_pic_uri || owner?.profile_picture?.uri || null;


  const videoData = responseData.at(0)?.data?.video || {};
  const sidePaneData = responseData.at(-1)?.data?.tahoe_sidepane_renderer?.video
    ?.creation_story?.comet_sections || {};

  const contentInfo = {
    id: videoData.id || null,
    owner: Object.keys(owner).length ? owner : null,
    type: "video",
    title: sidePaneData?.message?.story?.message?.text || null,
    source_url: videoData.url || null,
    thumbnail: videoData?.preferred_thumbnail?.image?.uri || null,
    resources: [
      {
        id: _generateRandomId(),
        filename: getFbContentFileName("VID", "SD", "mp4"),
        type: "video",
        mime_type: "video/mp4",
        quality: "SD",
        codecs: "h264",
        has_audio: true,
        baseURL: videoData.playable_url || null,
        thumbnail: videoData?.preferred_thumbnail?.image?.uri || null,
      },
      {
        id: _generateRandomId(),
        filename: getFbContentFileName("VID", "HD", "mp4"),
        type: "video",
        mime_type: "video/mp4",
        quality: "HD",
        codecs: "h264",
        has_audio: true,
        baseURL: videoData.playable_url_quality_hd || null,
        thumbnail: videoData?.preferred_thumbnail?.image?.uri || null,
      },
      ...videoUrls,
    ],
  };

  return contentInfo;
};

export function _generateRandomId() {
  return Math.random().toString(10).substring(2, 15);
}

import { writeFileSync } from "fs";

export const formatGraphqlStoryJson = (data) => {
  if (!data) {
    throw new BadRequest("This post does not exist");
  }

  let responseData;
  try {
    responseData = JSON.parse(data.split("\n").at(0));
  } catch (e) {
    responseData = data;
  }

  const owner = responseData?.data?.nodes?.[0]?.story_bucket_owner || {};
  owner.profile_pic = owner?.profilePicture?.uri || null;
  owner.profile_url = owner?.url || null;

  const keysToRemove = [
    "__isCameraPostBucketOwnerUnion",
    "__isNode",
    "is_viewer_friend",
    "work_info",
    "work_foreign_entity_info",
    "__isActor",
    "__isEntity",
    "url",
    "short_name",
    "delegate_page",
    "is_verified",
    "gender",
    "profilePicture"
  ];

  keysToRemove.forEach((key) => {
    if (key in owner) delete owner[key];
  });

  let contentInfo = {
    owner: responseData?.data?.nodes?.[0]?.story_bucket_owner || null,
    type: 'story',
    stories: [],
  };

  const edges =
    responseData?.data?.nodes?.[0]?.unified_stories?.edges || [];

  if (Array.isArray(edges) && edges.length > 0) {
    edges.forEach((item) => {
      const media = item?.node?.attachments?.[0]?.media;
      if (media) {
        const resources = [
          {
            id: _generateRandomId(),
            filename: getFbContentFileName("IMG", `${media?.image?.width}x${media?.image?.height}`, "jpg"),
            type: "image",
            mime_type: "image/jpg",
            has_audio: false,
            width: media?.image?.width,
            height: media?.image?.height,
            baseURL: media?.image?.uri || media?.previewImage?.uri,
          }
        ];

        if (media?.videoDeliveryLegacyFields?.browser_native_sd_url) {
          resources.push({
            id: _generateRandomId(),
            filename: getFbContentFileName("VID", "SD", "mp4"),
            type: "video",
            mime_type: "video/mp4",
            quality: "SD",
            codecs: "h264",
            has_audio: true,
            baseURL: media?.videoDeliveryLegacyFields?.browser_native_sd_url,
          });
        }

        if (media?.videoDeliveryLegacyFields?.browser_native_sd_url) {
          resources.push({
            id: _generateRandomId(),
            filename: getFbContentFileName("VID", "HD", "mp4"),
            type: "video",
            mime_type: "video/mp4",
            quality: "HD",
            codecs: "h264",
            has_audio: true,
            baseURL: media?.videoDeliveryLegacyFields?.browser_native_hd_url,
          });
        }

        resources.push(...parseDashManifest(media?.videoDeliveryLegacyFields?.dash_manifest_xml_string, item?.node?.story_card_info?.story_thumbnail?.uri),)

        contentInfo.stories.push({
          id: media.id,
          type: media.__typename,
          resources,
          thumbnail: item?.node?.story_card_info?.story_thumbnail?.uri,
          thumbnail_bg: item?.node?.story_default_background,
        });
      }
    });
  }

  return contentInfo;
}

