import axios from "axios";
import { extractUsername, getTiktokContentFileName } from "./helper";
import { _PRASCdnServeitApi, _tiktokProfileFetchApiByPRAS } from "@/constants";
import { _generateRandomId } from "@/lib/facebook/scrapers/formaters";
import { keyToDeleteInOwner } from "./extra/keyToRemove";
import imageSize from "image-size";

export const formatTiktokDataJson = async (data) => {
    data.owner.username = data.owner.uniqueId;
    data.owner.name = data.owner.nickname;
    data.owner.profile_url = `https://www.tiktok.com/@${data.owner.uniqueId}`;

    keyToDeleteInOwner.forEach((key) => {
        delete data.owner[key]
    })

    return data;
}


export const formatSSSTikJson = async (data, url) => {
    if (!data) {
        throw new BadRequest("This post does not exist");
    }

    if (/\/music\//.test(url)) {
        const cdnIzeUrls = {}
        if (data.music) cdnIzeUrls.music = { url: data.music, contentType: "audio/mp3" };
        if (data.direct) cdnIzeUrls.direct = { url: data.direct, contentType: "audio/mp3" };

        const cdnUrls = await axios.post(_PRASCdnServeitApi, cdnIzeUrls, {
            headers: {
                "Content-Type": "application/json",
                "Access-Key": process.env.NEXT_CDN_ACCESS_KEY,
            }
        });

        data.resources = [];

        for (const [key, value] of Object.entries(cdnUrls.data)) {
            const id = _generateRandomId();
            data.resources.push({
                id,
                filename: getTiktokContentFileName("AUD", id, "mp3"),
                type: "audio",
                mime_type: "audio/mp3",
                bitrate: "128kbps",
                has_audio: true,
                baseURL: value.url,
            });
        }

        delete data.music;
        delete data.direct;

        return data;
    }

    const userprofile_url = `https://www.tiktok.com/@${extractUsername(url)}`;
    let owner;
    try {
        owner = await axios.get(`${_tiktokProfileFetchApiByPRAS}${userprofile_url}`);
    } catch (e) {
        console.log(e);
        return null;
    }
    data.id = _generateRandomId();

    data.owner = owner.data || {
        id: _generateRandomId(),
        username: extractUsername(url),
        name: data.author.nickname,
        profile_pic: data.author.avatar,
        profile_url: userprofile_url,
    };

    delete data.author;

    const cdnIzeUrls = [
        ...data.images.map((image) => ({ url: image, contentType: "image/jpeg" })),
        { url: data.music, contentType: "audio/mp3" },
    ];

    const requestPayload = cdnIzeUrls.reduce((acc, { url, contentType }, index) => {
        if (url === data.music) {
            acc['music'] = { url, contentType };
        } else {
            acc[`image${index + 1}`] = { url, contentType };
        }
        return acc;
    }, {});

    const cdnUrls = await axios.post(_PRASCdnServeitApi, requestPayload, {
        headers: {
            "Content-Type": "application/json",
            "Access-Key": process.env.NEXT_CDN_ACCESS_KEY,
        },
    });

    data.thumbnail = cdnUrls.data.image1.url;

    data.resources = [];

    for (let index = 0; index < data.images.length; index++) {
        try {
            const imageKey = `image${index + 1}`;
            const imageUrl = requestPayload[imageKey]?.url;

            const response = await fetch(imageUrl);
            const buffer = await response.arrayBuffer();
            const Uint8A = new Uint8Array(buffer);

            const dimensions = imageSize(Uint8A);

            // Generate resource object
            const imageId = _generateRandomId();
            data.resources.push({
                id: imageId,
                filename: getTiktokContentFileName("IMG", imageId, "jpg"),
                type: "image",
                mime_type: "image/jpeg",
                width: dimensions.width,
                height: dimensions.height,
                baseURL: cdnUrls.data[imageKey]?.url,
                thumbnail: cdnUrls.data[imageKey]?.url,
            });
        } catch (error) {
            console.error(`Error processing image ${index + 1}:`, error.message);
        }
    }


    const musicId = _generateRandomId();
    data.resources.push({
        id: musicId,
        filename: getTiktokContentFileName("AUD", musicId, "mp3"),
        type: "audio",
        mime_type: "audio/mp3",
        bitrate: "128kbps",
        has_audio: true,
        baseURL: cdnUrls.data.music.url,
    });

    const keyToDelete = [
        "type",
        "music",
        "images",
        "statistics",
    ]

    keyToDelete.forEach((key) => {
        delete data[key];
    });

    data.owner.username = data.owner.uniqueId;
    data.owner.name = data.owner.nickname;
    data.owner.profile_url = `https://www.tiktok.com/@${data.owner.uniqueId}`;

    keyToDeleteInOwner.forEach((key) => {
        delete data.owner[key];
    });

    return data;
}
