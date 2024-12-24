import InstagramDownloaderView from "./view"
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

export default async function InstagramDownloaderPage() {
    return <InstagramDownloaderView />;
}

InstagramDownloaderPage.displayName = "InstagramDownloaderPage";

export async function generateMetadata() {
    const headersList = await headers();
    const url = new URL(headersList.get("x-current-url"));
    return metatag('Instagram Downloader | Pownloader', url, 'index, follow');
}