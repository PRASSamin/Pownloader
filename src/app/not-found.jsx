import NotFoundView from "./notfound/view";
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

const NotFoundPage = () => {
    return (
        <NotFoundView />
    )
};

NotFoundPage.displayName = "NotFoundPage";

export default NotFoundPage;

export async function generateMetadata() {
    const headersList = await headers();
    const url = new URL(headersList.get("x-current-url"));
    return metatag('404 | Page Not Found', url, 'noindex, nofollow');
}