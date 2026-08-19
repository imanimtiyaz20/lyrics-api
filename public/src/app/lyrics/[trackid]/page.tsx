'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface LyricsData {
    trackId: string;
    trackName: string;
    artistName: string;
    artworkUrl?: string;
    searchEngine: string;
    lyrics: string;
}

export default function LyricsPage() {
    const pathName = usePathname();
    const trackid = pathName.split("/").pop();

    const [data, setData] = useState<LyricsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLyrics() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(
                    `/v2/musixmatch/lyrics?&trackid=${trackid}`
                );
                const json = await res.json();

                if (json.data) {
                    setData(json.data);
                } else if (json.error) {
                    setError(json.error);
                } else {
                    setError("Lyrics not found.");
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch lyrics.");
            } finally {
                setLoading(false);
            }
        }

        fetchLyrics();
    }, [trackid]);

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans">
            <Navbar />

            <main className="flex-1 max-w-4xl mx-auto p-6">
                {loading ? (
                    <div className="space-y-6 animate-pulse">
                        <div className="flex items-center space-x-4">
                            <div className="w-32 h-32 bg-gray-200 rounded-lg shadow-lg" />
                            <div className="flex-1 py-2 space-y-3">
                                <div className="h-6 bg-gray-200 rounded w-full" />
                                <div className="h-5 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>

                        <div className="bg-gray-200 h-64 rounded-lg shadow-inner p-4 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                        </div>
                    </div>
                ) : data && data.lyrics ? (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={data.artworkUrl || "/no_bg.png"}
                                alt={`${data.trackName} cover`}
                                className="w-32 h-32 object-cover rounded-lg shadow-lg"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{data.trackName}</h2>
                                <p className="text-lg text-gray-700">{data.artistName}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner whitespace-pre-wrap">
                            {data.lyrics}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <h1 className="text-3xl font-bold text-gray-700 mb-2 mt-10">Lyrics Not Found</h1>
                        <p className="text-gray-500 mb-4">Sorry but you'll have to guess the lyrics for this one.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
