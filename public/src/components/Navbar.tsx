'use client';

import Search from "./Search";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-100 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <a href="/" className="text-black text-2xl font-bold">
                        LyricsAPI
                    </a>

                    <div className="hidden md:flex items-center space-x-6">
                        <a href="/" className="text-gray-700 hover:text-primary-700 text-sm">
                            Home
                        </a>
                        <a href="/documentation/get-started" className="text-gray-700 hover:text-primary-700 text-sm">
                            Documentation
                        </a>
                        <a href="https://github.com/LewdHuTao/lyrics-api" className="text-gray-700 hover:text-primary-700 text-sm" target="_blank" rel="noopener noreferrer">
                            Github
                        </a>


                        <Search className="w-64" />
                    </div>

                    <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />}
                    </button>

                </div>

                {open && (
                    <div className="md:hidden pb-4 space-y-4">
                        <a href="/" className="block text-gray-700 text-sm">
                            Home
                        </a>
                        <a href="/documentation/get-started" className="block text-gray-700 text-sm">
                            Documentation
                        </a>
                        <a href="https://github.com/LewdHuTao/lyrics-api" className="block text-gray-700 text-sm">
                            Github
                        </a>

                        <Search className="w-full" />
                    </div>
                )}
            </div>
        </nav>
    );
}
