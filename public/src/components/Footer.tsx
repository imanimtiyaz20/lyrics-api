'use client';

import { useEffect, useState } from "react";

export default function Footer() {
    const [date, setDate] = useState(0);

    useEffect(() => {
        setDate(new Date().getFullYear());
    }, []);

    const buildId = process.env.NEXT_PUBLIC_BUILD_ID || "0.0.0";

    return (
        <footer className="bg-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-gray-600 text-sm">
                    &copy; {date} LyricsAPI. All rights reserved.
                </p>
                <p className="text-center text-gray-500 text-sm mt-2">
                    Build ID: {buildId}
                </p>
            </div>
        </footer>
    );
}
