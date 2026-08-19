'use client';

export default function ResponseCodeSection() {
    const responseCodes = [
        {
            code: 200,
            title: 'OK',
            description: 'The request was successful and the response contains the requested data.',
        },
        {
            code: 400,
            title: 'Bad Request',
            description: 'The request was invalid or malformed. Missing required query parameters like title or trackId.',
        },
        {
            code: 404,
            title: 'Not Found',
            description: 'The requested resource could not be found. This could happen if the song or track does not exist on the specified platform.',
        },
        {
            code: 429,
            title: 'Too Many Requests',
            description: 'The rate limit has been exceeded. Wait before making more requests. Consider caching responses or running the API locally.',
        },
        {
            code: 500,
            title: 'Internal Server Error',
            description: 'The server encountered an unexpected error while processing your request. Try again later or contact the API maintainer.',
        },
    ];

    return (
        <div className="space-y-6">
            <p className="text-lg text-black">
                The following are the response codes that the Lyrics API may return when making requests. Each code indicates the status of your request.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {responseCodes.map((resp) => (
                    <div
                        key={resp.code}
                        className="cursor-pointer p-4 border border-slate-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-slate-50"
                        onClick={() => alert(`${resp.code} ${resp.title}\n\n${resp.description}`)}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-white font-bold px-3 py-1 rounded bg-black">{resp.code}</span>
                            <h3 className="text-md font-semibold text-black">{resp.title}</h3>
                        </div>
                        <p className="mt-2 text-black text-sm line-clamp-3">{resp.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
