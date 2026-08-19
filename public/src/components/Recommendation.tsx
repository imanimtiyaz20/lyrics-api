'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown } from 'lucide-react';

interface RecommendationData {
    trackId: string;
    thumbnailUrl: string;
    trackName: string;
    artistName: string;
}

const RecommendationCard = ({
    data,
    isLoading,
    color,
    onClick,
}: {
    data: RecommendationData;
    isLoading: boolean;
    color: string;
    onClick: () => void;
}) => (
    <div
        onClick={onClick}
        className={`
        cursor-pointer
        ${color} 
        rounded-xl 
        shadow-lg 
        p-6 
        transition-all 
        duration-500 
        hover:shadow-2xl
        ${isLoading ? 'animate-pulse' : ''}
    `}
    >
        {isLoading ? (
            <div className="flex items-center space-x-6">
                <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-4 py-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        ) : (
            <div className="flex items-center space-x-6">
                <img
                    src={data.thumbnailUrl || "/no_bg.png"}
                    alt={`${data.trackName} thumbnail`}
                    className="h-20 w-20 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{data.trackName}</p>
                    <p className="text-sm text-gray-600 truncate">{data.artistName}</p>
                </div>
            </div>
        )}
    </div>
);

export default function Recommendation() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<RecommendationData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const cardColors = ['bg-white', 'bg-gray-50', 'bg-gray-100'];
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const res = await fetch('/v2/musixmatch/recommendation');
                const json = await res.json();

                if (!json?.data || !Array.isArray(json.data) || json.data.length === 0) {
                    throw new Error('No recommendation data available');
                }

                const firstSix = json.data.slice(0, 6).map((item: any) => ({
                    trackId: item.trackId,
                    thumbnailUrl: item.albumCoverArt,
                    trackName: item.trackName,
                    artistName: item.artistName,
                }));

                setData(firstSix);
            } catch (error) {
                console.error('Failed to fetch recommendation data:', error);
                setErrorMessage('Failed to fetch recommendations');
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    if (errorMessage) {
        return null;
    }

    const itemsToRender: RecommendationData[] = isLoading
        ? Array.from({ length: 6 }, () => ({ trackId: '', thumbnailUrl: '', trackName: '', artistName: '' }))
        : data;

    return (
        <div className="bg-white py-16 transition-colors duration-300 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-6 flex flex-col items-center space-y-3">
                    <p className="text-black text-3xl font-extrabold mb-5">
                        Try our API now
                    </p>
                    <div className="bg-slate-300 mt-4 flex size-10 animate-bounce items-center justify-center rounded-full mb-10">
                        <ArrowDown className="w-8 h-8 text-black" />
                    </div>
                </div>

                <h2 className="text-4xl font-extrabold text-gray-900 mb-10">
                    Recommended For You
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {itemsToRender.map((item, index) => (
                        <RecommendationCard
                            key={index}
                            data={item}
                            isLoading={isLoading}
                            color={cardColors[index % cardColors.length]}
                            onClick={() => {
                                if (item.trackId) router.push(`/lyrics/${item.trackId}`);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
