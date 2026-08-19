'use client';

export default function ExampleResponse() {
    const exampleResponse = [
        {
            data:
            {
                artistName: "Maroon 5",
                trackName: "Maps",
                trackId: "351336583",
                searchEngine: "Musixmatch",
                artworkUrl: "https://s.mxmcdn.net/images-storage/albums/6/1/8/1/3/8/30831816_350_350.jpg",
                lyrics: "I miss the taste of a sweeter life\nI miss the conversation\nI'm searching for a song tonight\n... [truncated for brevity]"
            },
            metadata: {
                apiVersion: "2.0"
            },
        }, {
            data: [
                {
                    trackId: "355174276",
                    trackName: "The Fate of Ophelia",
                    artistName: "Taylor Swift",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/7/5/5/2/4/0/96042557_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "355497369",
                    trackName: "Choosin' Texas",
                    artistName: "Ella Langley",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/2/7/2/9/4/1/96149272_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "352285420",
                    trackName: "The Fate of Ophelia",
                    artistName: "Taylor Swift",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/1/7/0/2/7/8/94872071_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "360649284",
                    trackName: "For Good",
                    artistName: "Wicked Movie Cast",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/3/1/5/3/4/3/98343513_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "319548682",
                    trackName: "Ordinary",
                    artistName: "Alex Warren",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums5/3/8/3/0/2/6/84620383_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "34014321",
                    trackName: "I Can See Clearly Now",
                    artistName: "Jimmy Cliff",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums5/2/7/0/1/8/5/79581072_350_350.jpg",
                    platform: "Musixmatch"
                }
            ],
            metadata: {
                apiVersion: "2.0"
            }
        }, {
            data: [
                {
                    trackId: "351336583",
                    trackName: "Maps",
                    artistName: "Maroon 5",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums/6/1/8/1/3/8/30831816_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "137544297",
                    trackName: "Maps",
                    artistName: "Yeah Yeah Yeahs",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/7/4/2/8/4/2/38248247_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "171200591",
                    trackName: "Maps (iTunes Originals Version)",
                    artistName: "Yeah Yeah Yeahs",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums4/8/1/5/1/2/8/43821518_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "131481609",
                    trackName: "Maps (Single Version)",
                    artistName: "Freya Ridings",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums2/6/2/7/6/5/5/37556726_350_350.jpg",
                    platform: "Musixmatch"
                },
                {
                    trackId: "84428415",
                    trackName: "Maps - Remix",
                    artistName: "Maroon 5 feat. Big Sean",
                    albumCoverArt: "https://s.mxmcdn.net/images-storage/albums/4/6/1/8/6/9/31968164_350_350.jpg",
                    platform: "Musixmatch"
                }
            ],
            metadata: {
                apiVersion: "2.0"
            }
        }
    ];

    return (
        <div className="space-y-6">
            <p className="text-lg text-black">
                Example Responses when fetching lyrics, song recommendations, and metadata from the Lyrics API. All the responses are in JSON format.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">Example Response for Lyrics Fetching: </p>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(exampleResponse[0], null, 2)}
            </pre>

            <p className="text-lg font-semibold text-black mt-4">Example Response for Song Recommendations: </p>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(exampleResponse[1], null, 2)}
            </pre>

            <p className="text-lg font-semibold text-black mt-4">Example Response for Song Search Metadata: </p>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(exampleResponse[2], null, 2)}
            </pre>
        </div>
    );
}
