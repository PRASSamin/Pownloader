import TiktokDownloaderView from "./view"
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

export default async function TiktokDownloaderPage() {
    return <TiktokDownloaderView />;
}

TiktokDownloaderPage.displayName = "TiktokDownloaderPage";

export async function generateMetadata() {
    const headersList = await headers();
    const url = new URL(headersList.get("x-current-url"));
    return metatag('Tiktok Downloader | Pownloader', url, 'index, follow');
}