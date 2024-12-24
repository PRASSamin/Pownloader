import { NextResponse } from "next/server";

import { Exception } from "@/lib/exceptions";
import { ErrorResponse } from "@/utils";

export function handleError(error) {
    if (error instanceof Exception) {
        const response = ErrorResponse(error.message);
        return NextResponse.json(response, { status: error.code });
    } else {
        console.error(error);
        const response = ErrorResponse();
        return NextResponse.json(response, { status: 500 });
    }
}