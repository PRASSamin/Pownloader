import { NextResponse } from "next/server";
import { fetchTiktokContentJson } from "@/lib/tiktok";
import { SuccessResponse } from "@/utils";
import { handleError } from "../helper";
import { enableServerAPI } from "@/conf/tiktok";

export async function POST(request) {
    if (!enableServerAPI) {
        return NextResponse.json(
            { error: "Tiktok downloading server currently unavailable" },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { url } = body;

        const postJson = await fetchTiktokContentJson(url);
        const response = SuccessResponse(postJson);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}