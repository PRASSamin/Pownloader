"use client";
import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clipboard } from 'lucide-react'
import { Loader } from 'lucide-react'
import { toast } from 'sonner';

const UrlInput = ({ allowedDomains, onFetch }) => {
    const [url, setUrl] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch (error) {
            toast.error("Failed to paste from clipboard");
        }
    };

    const haandleOnclick = async () => {
        const domainRegex = new RegExp(
            `^https?://(www\\.)?(${allowedDomains.join("|")})`,
            "i"
        );

        // Check if the URL is empty
        if (!url) {
            toast.error("Please enter a valid URL");
            return;
        }

        // Check if the URL is from allowed domains
        if (!domainRegex.test(url)) {
            toast.error("Url is not whitelisted for this tool. Please enter a valid URL");
            return;
        }
        // Custom fetch logic
        try {
            setIsFetching(true);
            await onFetch(url);
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            setIsFetching(false);
        }
    }

    return (
        <div className="flex flex-col gap-3 items-start">
            <div className='w-full flex flex-col gap-1'>
                <p className="text-sm font-bold">Enter your URL</p>
                <div className="relative w-full"> <Input onChange={(e) => setUrl(e.target.value)} value={url} className={`bg-black border-2 border-purple-800 py-5 outline-none placeholder:text-zinc-500`} placeholder="https://..."></Input>
                    <Button
                        onClick={handlePaste}
                        variant="ghost"
                        className="absolute !px-2.5 top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-sm transition-all duration-300"><Clipboard size={26} /></Button>
                </div>
            </div>
            <Button
                size="lg"
                className="self-center"
                onClick={haandleOnclick}
                variant="secondary">{
                    isFetching ? <Loader className="animate-spin" size={20} /> : "Download"
                }</Button>
        </div>
    )
}

export default UrlInput
