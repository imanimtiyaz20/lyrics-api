'use client'

export default function RateLimitSection() {
    return (
        <div className="space-y-6">
            <p className="text-lg text-slate-900">
                The Lyrics API enforces rate limits to prevent abuse and ensure fair usage. Each IP address is allowed a certain number of requests within a time window.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <h2 className="text-md font-semibold text-black mt-4">Limit Details</h2>
            <ul className="list-disc list-inside text-slate-900 ml-4 space-y-1">
                <li>Maximum of <strong>10 requests per minute</strong> per IP address.</li>
                <li>If the limit is exceeded, the API returns a <code>429 Too Many Requests</code> status code.</li>
                <li>Rate limits reset automatically after the time window expires.</li>
            </ul>

            <h2 className="text-md font-semibold text-black mt-4">Best Practices</h2>
            <ul className="list-disc list-inside text-slate-900 ml-4 space-y-1">
                <li>Cache API responses whenever possible to reduce repeated requests.</li>
                <li>Handle <code>429</code> responses by waiting until the limit resets before retrying.</li>
                <li>Run this API locally on your machine to avoid hitting rate limits.</li>
            </ul>

            <p className="text-lg font-semibold text-black mt-4">Notes</p>
            <ul className="list-disc list-inside space-y-2 text-black ml-2">
                <li>Since the public API is used by many users, requests are limited. To avoid rate limits, you can run the API locally on your machine.</li>
            </ul>
        </div>
    )
}
