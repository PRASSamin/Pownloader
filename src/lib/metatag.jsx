export const metatag = (pageTitle, pageUrl, robots, keywords = []) => {
    const fav = "https://pownloader.pras.me/logo.svg";

    const fixedKeywords = [
        "PRAS",
        "Pownloader",
        "Video Downloader",
        "Free Video Downloader",
        "Download Video",
        "Download Video Free",
        "Tiktok Video Downloader",
        "Tiktok",
        "Tiktok Downloader",
        "Tiktok Music Downloader",
        "Tiktok Music",
        "Tiktok Photo Downloader",
        "Facebook Video Downloader",
        "Facebook",
        "Facebook Downloader",
        "Facebook Story Downloader",
        "Facebook Reel Downloader",
        "Instagram Video Downloader",
        "Instagram",
        "Instagram Downloader",
        "Instagram Photo Downloader",
        "Instagram Reel Downloader",
        "Free Downloader",
    ];

    const margedkeywords = fixedKeywords.concat(keywords);

    return {
        title: pageTitle,
        canonical: pageUrl,
        keywords: margedkeywords,
        openGraph: {
            title: pageTitle,
            url: pageUrl,
            siteName: pageTitle,
            images: [
                {
                    url: fav,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: pageTitle,
            creator: "@prassamin78",
            images: [fav],
        },
        alternates: {
            canonical: pageUrl,
            languages: { "en-US": pageUrl },
        },
        robots: robots,
        structuredData: {
            name: pageTitle,
            url: pageUrl,
        },
    };
};