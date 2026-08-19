'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
    className?: string;
    placeholder?: string;
}

export default function Search({ className = "", placeholder = "Search..." }: SearchProps) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const search = async (q: string) => {
        if (!q.trim()) {
            setResult(null);
            return;
        }

        const key = q.toLowerCase();

        setLoading(true);
        try {
            const res = await fetch(
                `/v2/musixmatch/metadata?platform=musixmatch&title=${encodeURIComponent(q)}`,
                { cache: "no-store" }
            );

            const data = await res.json();

            if (!data) {
                return;
            }

            const decodedData = data.data?.map((item: any) => ({
                ...item,
                trackName: item.trackName,
                artistName: item.artistName,
            }));

            setResult({ data: decodedData });
        } catch (err) {
            console.error(err);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            search(query);
        }, 400);

        return () => clearTimeout(timeoutRef.current!);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setResult(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClick = (trackId: string) => {
        setResult(null);
        setQuery("");
        router.push(`/lyrics/${trackId}`);
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>

            {loading && (
                <div className="absolute top-full left-0 bg-white text-sm p-2 shadow-md rounded w-full mt-4">
                    Searching...
                </div>
            )}

            {result && !loading && (
                <div className="absolute top-full left-0 bg-white text-sm p-2 shadow-md rounded w-full max-h-60 overflow-y-auto mt-4">
                    {Array.isArray(result.data) && result.data.length > 0 ? (
                        result.data.map((item: any, i: number) => (
                            <div
                                key={i}
                                onClick={() => handleClick(item.trackId)}
                                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
                            >
                                <img
                                    src={item.albumCoverArt || "/no_bg.png"}
                                    alt={item.trackName}
                                    className="w-10 h-10 rounded mr-3 object-cover"
                                />

                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">
                                        {item.trackName}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {item.artistName}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-gray-500">No results</div>
                    )}
                </div>
            )}
        </div>
    );
}
