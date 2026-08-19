'use client';

import { useEffect, useState } from 'react';
import { Copy } from 'lucide-react';

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

export default function MetadataSection() {
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
                This will allow you to retrieve detailed metadata about songs, get recommendation songs based on country from Musixmatch.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">Endpoint</p>
            <CopyableCode code={`GET ${baseURL}/v2/musixmatch/metadata`} />
            <CopyableCode code={`GET ${baseURL}/v2/musixmatch/recommendation`} />

            <p className="text-lg font-semibold text-black mt-4">Query Parameters</p>
            <ul className="list-disc list-inside space-y-2 text-black ml-2">
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">title</code> (string, required) – The song title.
                </li>
                <li>
                    <code className="px-1 py-0.5 bg-slate-100 rounded">country</code> (string, optional) – The country code.
                </li>
            </ul>

            <p className="text-lg font-semibold text-black mt-4">Example Requests</p>

            <ul className="list-disc list-inside space-y-1 text-black ml-4">
                <li>
                    Retrieve metadata for up to five songs matching the given title.
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/metadata?title=Maps`} />
                </li>
                <li>
                    Get recommendation songs without country.
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/recommendation`} />
                </li>
                <li>
                    Get recommendation songs for a specific country.
                    <CopyableCode code={`GET ${baseURL}/v2/musixmatch/recommendation?country=US`} />
                </li>

                <p className="text-md text-black mt-4">Refer to <a className="text-blue-600" href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO_3166-1_alpha-2</a> for full country codes.</p>

                <div className="border-t-3 border-slate-200 mt-8"></div>

                <p className="text-lg font-semibold text-black mt-4">Notes</p>
                <ul className="list-disc list-inside space-y-2 text-black ml-2">
                    <li>Rate limits may apply if you send too many requests in a short time.</li>
                </ul>
            </ul>
        </div>
    )
}