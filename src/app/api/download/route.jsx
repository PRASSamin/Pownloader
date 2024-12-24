import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({
            status: "error",
            message: "URL parameter is missing",
        }, { status: 400 });
    }

    try {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
            headers: {
                "Content-Type": "application/octet-stream",
            },
        })

        const contentType = response.headers["content-type"];
        
        return NextResponse.json({
            status: "success",
            data: response.data,
            contentType: contentType
        })
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: error.message
        }, { status: 500 })
    }
}