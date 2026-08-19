'use client';

import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';
import LanguageTable from './LanguageTable';

function CopyableCode({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = code.startsWith('GET ') ? code.slice(4) : code;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mt-2 ml-6">
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-sm overflow-x-auto">
                {code}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:cursor-pointer"
            >
                <Copy size={12} />
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
}

export default function LyricsSection() {
    const [baseURL, setBaseURL] = useState('http://localhost:3000');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { protocol, hostname, port } = window.location;
            if (hostname === 'localhost') {
                setBaseURL(`http://localhost:${port || 3000}`);
            } else {
                setBaseURL(`${protocol}//${hostname}`);
            }
        }
    }, []);

    return (
        <div className="space-y-6">
            <p className="text-lg text-black">
                The Lyrics API allows you to fetch song lyrics and translations quickly and easily from Musixmatch and YouTube.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">Endpoint</p>
            <CopyableCode code={`GET ${baseURL}/v2/[platform]/lyrics`} />

            <p className="text-lg font-semibold text-black mt-4">Query Parameters</p>
            <ul className="list-disc list-inside space-y-2 text-black ml-2">
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">title</code> (string, optional) – The song title.
                </li>
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">artist</code> (string, optional) – The artist name.
                </li>
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">trackId</code> (string, optional) – The trackId or videoId of the song.
                </li>
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">translation</code> (string, optional) – Language code for lyrics translation.
                </li>
            </ul>

            <p className="text-md text-black mt-4">
                Note: At least one of <code className="px-1 py-0.5 bg-slate-100 rounded">title</code> or <code className="px-1 py-0.5 bg-slate-100 rounded">trackId</code> must be provided. Both cannot be empty or null.
            </p>

            <p className="text-lg font-semibold text-black mt-4">Example Requests</p>

            <p className="text-md text-black mt-3">Musixmatch</p>
            <ul className="list-disc list-inside space-y-1 text-black ml-4">
                <li>
                    With trackId
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?trackId=219478378`} />
                </li>
                <li>
                    With title
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?title=Maps`} />
                </li>
                <li>
                    With title and artist
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?title=Shape of You&artist=Ed Sheeran`} />
                </li>
            </ul>

            <p className="text-md text-black mt-4">YouTube</p>
            <ul className="list-disc list-inside space-y-1 text-black ml-4">
                <li>
                    With videoId
                    <CopyableCode code={`GET ${baseURL}/v2/youtube/lyrics?trackId=lYBUbBu4W08`} />
                </li>
                <li>
                    With title
                    <CopyableCode code={`GET ${baseURL}/v2/youtube/lyrics?title=Maps`} />
                </li>
                <li>
                    With title and artist
                    <CopyableCode code={`GET ${baseURL}/v2/youtube/lyrics?title=Shape of You&artist=Ed Sheeran`} />
                </li>
            </ul>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">Get Translated Lyrics</p>
            <p className="text-lg font-semibold text-black mt-4">Example Requests</p>

            <p className="text-md text-black mt-3">The translation feature for lyrics is currently available only for Musixmatch.</p>
            <ul className="list-disc list-inside space-y-1 text-black ml-4">
                <li>
                    With trackId
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?trackId=292206174&translate=rj`} />
                </li>
                <li>
                    With title
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?title=Undead&translate=rj`} />
                </li>
                <li>
                    With title and artist
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/lyrics?title=Undead&artist=Yoasobi&translate=en`} />
                </li>

                <LanguageTable />
            </ul>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">Notes</p>
            <ul className="list-disc list-inside space-y-2 text-black ml-2">
                <li>Translated lyrics may be incomplete or not fully accurate.</li>
                <li>Translated lyrics might not be available for all songs or languages.</li>
                <li>Rate limits may apply if you send too many requests in a short time.</li>
            </ul>
        </div>
    );
}
