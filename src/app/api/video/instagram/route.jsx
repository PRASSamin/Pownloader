import { NextResponse } from "next/server";

import { fetchPostJson } from "@/lib/instagram";
import { SuccessResponse } from "@/utils";

import { enableServerAPI } from "@/conf/instagram";
import { handleError } from "../helper";

export async function POST(request) {
    if (!enableServerAPI) {
        return NextResponse.json(
            { error: "Instagram downloading server currently unavailable" },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { url } = body;

        if (/\/stories|highlights\//.test(url)) {
            return NextResponse.json(
                { error: "Downloading stories and highlights is not supported yet" },
                { status: 400 }
            );
        }

        const postJson = await fetchPostJson(url, 15000);
        const response = SuccessResponse(postJson);

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
