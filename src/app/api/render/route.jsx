import { NextResponse } from "next/server";
import axios from "axios";
import { _PRASCdnMergeItApi } from "@/constants";

export async function POST(request) {
    try {
        const { video, audio } = await request.json();

        if (!video || !audio) {
            return NextResponse.json(
                { error: "Missing video or audio file URL" },
                { status: 400 }
            );
        }

        const cdnResponse = await axios.post(
            _PRASCdnMergeItApi,
            { video, audio },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Key": process.env.NEXT_CDN_ACCESS_KEY,
                },
            }
        );

        const data = cdnResponse.data; 

        return NextResponse.json(data, {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error) {
        console.error("Failed to combine video and audio: ", error);

        return NextResponse.json(
            { error: "Failed to combine video and audio" },
            { status: 500 }
        );
    }
}
