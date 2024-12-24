import { NextResponse } from "next/server";

import { fetchContentJson } from "@/lib/facebook";
import { SuccessResponse } from "@/utils";
import { enableServerAPI } from "@/conf/facebook";
import { handleError } from "../helper";

export async function POST(request) {
    if (!enableServerAPI) {
        return NextResponse.json(
            { error: "Facebook downloading server currently unavailable" },
            { status: 403 }
        );
    }
    try {
        const body = await request.json();
        const { url } = body;

        const postJson = await fetchContentJson(url);
        const response = SuccessResponse(postJson);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
