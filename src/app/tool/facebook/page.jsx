import FacebookDownloaderView from "./view"
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

export default async function FacebookDownloaderPage() {
    return <FacebookDownloaderView />;
}

FacebookDownloaderPage.displayName = "FacebookDownloaderPage";

export async function generateMetadata() {
    const headersList = await headers();
    const url = new URL(headersList.get("x-current-url"));
    return metatag('Facebook Downloader | Pownloader', url, 'index, follow');
}