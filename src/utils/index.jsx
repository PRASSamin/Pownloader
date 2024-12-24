import axios from "axios";
import { ClientException, ServerException, TimeoutException } from "@/lib/exceptions";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export const getTimedFilename = (name, ext) => {
    const timeStamp = Math.floor(Date.now() / 1000).toString();
    return `${name}-${timeStamp}.${ext}`;
};

export const getClientIp = (request) => {
    let ip;

    ip = request.ip ?? request.headers.get("x-real-ip");
    const forwarded = request.headers.get("x-forwarded-for");

    if (!ip && forwarded) {
        ip = forwarded.split(",")[0] ?? null;
    }

    return ip;
}

export const SuccessResponse = (data) => {
    const response = {
        status: "success",
        data: data,
    };

    return response;
}

export const ErrorResponse = (message = "Something went wrong") => {
    const response = {
        status: "error",
        error: message,
    };

    return response;
}


export const HttpRequest = async ({ ...args }) => {
    try {
        const response = await axios(args);
        return response;
    } catch (err) {
        if (err.response) {
            console.error("Axios Error: ", err.message);
            throw new ClientException(err.message);
        } else if (err.request) {
            console.error("Request Error: ", err.request);
            throw new TimeoutException();
        } else {
            console.error("Server Error: ", err.message);
            throw new ServerException();
        }
    }
}

export const downloadFile = async (url, filename, filetype, setLoading = null) => {
    if (setLoading) setLoading(true);
    try {
        if (filetype === "image") {
            const response = await axios.get(`/api/download`, {
                params: {
                    url: url
                },
                responseType: "json",
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            });

            const { data, contentType } = response.data
            const uint8Array = new Uint8Array(data.data);
            const blob = new Blob([uint8Array], { type: contentType });
            saveAs(blob, `${filename.split(".")[0]}.${contentType.split("/")[1]}`);
        } else {
            const response = await axios.get(url, {
                responseType: "blob",
            });

            saveAs(response.data, filename);
        }
    } catch (err) {
        toast.error("Failed to download file");
    } finally {
        if (setLoading) setLoading(false);
    }
}


export const renderVideo = async (videoUrl, audioUrl, filename, setLoading) => {
    setLoading(true);
    try {
        const response = await axios.post(
            "/api/render",
            { video: videoUrl, audio: audioUrl },
            {
                responseType: "application/json",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        );

        let data;
        if (typeof response.data === "string") {
            try {
                data = JSON.parse(response.data);
            } catch (err) {
                console.log(err);
            }
        } else data = response.data;

        await downloadFile(data.url, filename, "video", setLoading);
    } catch (err) {
        console.log(err);
        toast.error("Failed to render the video");
    } finally {
        setLoading(false);
    }
};

export const fetchImageDimensions = (url) => {
    if (typeof window === "undefined") {
        return
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = url;
    });
};
