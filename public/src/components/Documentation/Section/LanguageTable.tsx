"use client";

import { useState, useEffect } from "react";

interface Language {
    name: string;
    iso1: string;
    iso3: string;
}

const LANGUAGES: Language[] = [
    { name: "Afar", iso1: "aa", iso3: "aar" },
    { name: "Abkhazian", iso1: "ab", iso3: "abk" },
    { name: "Afrikaans", iso1: "af", iso3: "afr" },
    { name: "Akan", iso1: "ak", iso3: "aka" },
    { name: "Albanian", iso1: "sq", iso3: "sqi" },
    { name: "Amharic", iso1: "am", iso3: "amh" },
    { name: "Arabic", iso1: "ar", iso3: "ara" },
    { name: "Armenian", iso1: "hy", iso3: "hye" },
    { name: "Basque", iso1: "eu", iso3: "eus" },
    { name: "Bengali", iso1: "bn", iso3: "ben" },
    { name: "Bulgarian", iso1: "bg", iso3: "bul" },
    { name: "Chinese (Simplified)", iso1: "zh", iso3: "zho" },
    { name: "Dutch", iso1: "nl", iso3: "nld" },
    { name: "English", iso1: "en", iso3: "eng" },
    { name: "Filipino", iso1: "f1", iso3: "fil" },
    { name: "French", iso1: "fr", iso3: "fra" },
    { name: "German", iso1: "de", iso3: "deu" },
    { name: "Greek", iso1: "el", iso3: "ell" },
    { name: "Hebrew", iso1: "he", iso3: "heb" },
    { name: "Hindi", iso1: "hi", iso3: "hin" },
    { name: "Indonesian", iso1: "id", iso3: "ind" },
    { name: "Italian", iso1: "it", iso3: "ita" },
    { name: "Japanese", iso1: "ja", iso3: "jpn" },
    { name: "Japanese (Romanized)", iso1: "rj", iso3: "rja" },
    { name: "Korean", iso1: "ko", iso3: "kor" },
    { name: "Korean (Romanized)", iso1: "rk", iso3: "rkr" },
    { name: "Malay", iso1: "ms", iso3: "msa" },
    { name: "Portuguese", iso1: "pt", iso3: "por" },
    { name: "Russian", iso1: "ru", iso3: "rus" },
    { name: "Russian (Romanized)", iso1: "r2", iso3: "ru2" },
    { name: "Spanish", iso1: "es", iso3: "spa" },
    { name: "Tamil", iso1: "ta", iso3: "tam" },
    { name: "Tamil (Romanized)", iso1: "t2", iso3: "ta2" },
    { name: "Thai", iso1: "th", iso3: "tha" },
    { name: "Thai (Romanized)", iso1: "t4", iso3: "tr1" },
    { name: "Turkish", iso1: "tr", iso3: "tur" },
    { name: "Urdu", iso1: "ur", iso3: "urd" },
    { name: "Urdu (Romanized)", iso1: "u1", iso3: "ur1" },
    { name: "Vietnamese", iso1: "vi", iso3: "vie" },
];

export default function LanguageTable() {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<Language[]>(LANGUAGES);

    useEffect(() => {
        if (!search) {
            setFiltered(LANGUAGES);
        } else {
            const lower = search.toLowerCase();
            setFiltered(
                LANGUAGES.filter(
                    (lang) =>
                        lang.name.toLowerCase().includes(lower) ||
                        lang.iso1.toLowerCase().includes(lower) ||
                        lang.iso3.toLowerCase().includes(lower)
                )
            );
        }
    }, [search]);

    return (
        <div className="mt-5">
            <h4 className="mb-3 text-black font-semibold text-lg">Supported Languages</h4>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                placeholder="Search language or code..."
            />

            <div className="mt-4 overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-1">Language</th>
                            <th className="border border-gray-300 px-3 py-1">ISO-1</th>
                            <th className="border border-gray-300 px-3 py-1">ISO-3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((lang, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-1">{lang.name}</td>
                                <td className="border border-gray-300 px-3 py-1">{lang.iso1}</td>
                                <td className="border border-gray-300 px-3 py-1">{lang.iso3}</td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center px-3 py-2 text-gray-500">
                                    No languages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
