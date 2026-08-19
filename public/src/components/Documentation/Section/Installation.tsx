'use client';

export default function InstallationSection() {
    return (
        <div className="space-y-6">
            <p className="text-lg text-black">
                This guide will walk you through the steps to install the API locally, or installing both the API and frontend on your machine.
            </p>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-4">
                Prerequisites
            </p>
            <ul className="list-disc list-inside space-y-2 text-black ml-2">
                <li>
                    If you plan to run <span className="font-medium">only the API</span>, you need:
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>Java 17 or newer installed</li>
                    </ul>
                </li>

                <li>
                    If you want to run <span className="font-medium">both the API and the frontend</span>, you need:
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>Java 17 or newer installed</li>
                        <li>Node.js 18+ installed</li>
                    </ul>
                </li>
            </ul>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-6">Installation & Setup to run the API locally</p>

            <ol className="list-decimal list-inside space-y-4 text-black">
                <li>
                    <span className="font-medium text-black">Download the Latest Release</span>
                    <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                        <li>Visit the <a className="text-blue-600 font-medium" href="https://github.com/LewdHuTao/lyrics-api/releases">Releases</a> page.</li>
                        <li>Download the latest <code className="px-1 py-0.5 bg-slate-100 rounded">LyricsApi.jar</code> file.</li>
                    </ul>
                </li>

                <li>
                    <span className="font-medium text-black">Run the API</span>
                    <ul className="list-disc list-inside ml-5 mt-1 space-y-3">
                        <li>
                            Start the API using the default port (Default port is set to: 8888):
                            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                                java -jar LyricsApi.jar
                            </pre>
                        </li>

                        <li>
                            Or run the API on a custom port:
                            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                                java -jar LyricsApi.jar --server.port=8085
                            </pre>
                        </li>

                        <p className="text-md text-black mt-6">
                            You can now access the API at <code className="px-1 py-0.5 bg-slate-100 rounded">http://localhost:8888</code> (or your specified port).
                        </p>
                        <p className="text-md text-black mt-2">
                            If you want to use a custom domain or reverse proxy, configure your server to forward requests to the API port.
                        </p>

                    </ul>
                </li>
            </ol>

            <div className="border-t-3 border-slate-200"></div>

            <p className="text-lg font-semibold text-black mt-6">Installation & Setup to run the frontend locally</p>
            <ol className="list-decimal list-inside space-y-4 text-black">
                <li>
                    <span className="font-medium text-black">Clone the Repository</span>
                    <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                        git clone https://github.com/LewdHuTao/lyrics-api.git<br></br>
                        cd lyrics-api
                    </pre>
                </li>

                <li>
                    <span className="font-medium text-black">Install Dependencies</span>
                    <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                        npm install
                    </pre>
                </li>

                <li>
                    <span className="font-medium text-black">Configure Environment Variables</span>

                    <ul className="list-disc list-inside ml-5 mt-2 space-y-2 text-black">
                        <li>
                            Rename <code className="px-1 py-0.5 bg-slate-100 rounded">.env.example</code> to <code className="px-1 py-0.5 bg-slate-100 rounded">.env</code>
                        </li>
                        <li>
                            Open the <code className="px-1 py-0.5 bg-slate-100 rounded">.env</code> file and set the <code className="px-1 py-0.5 bg-slate-100 rounded">API_URL</code> to your API endpoint:
                            <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                                API_URL=http://localhost:8888
                            </pre>
                            <p className="mt-1 text-black">
                                Replace the URL with your API endpoint if using a remote API or a custom port.
                                If you're not running the API locally you can use the public API endpoint: <code className="px-1 py-0.5 bg-slate-100 rounded">https://lyrics-api-v2.lewdhutao.my.eu.org</code>.
                            </p>
                        </li>
                    </ul>
                </li>


                <li>
                    <span className="font-medium text-black">Run the Development Server</span>
                    <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg mt-2 text-sm overflow-x-auto">
                        npm run dev
                    </pre>
                    <p className="mt-1 text-black">
                        The app will be available at <code className="px-1 py-0.5 bg-slate-100 rounded">http://localhost:3000</code>.
                    </p>
                </li>
            </ol>

            <p className="text-lg font-semibold text-black mt-6">
                Deploy to Vercel
            </p>

            <div className="mt-6">
                <a
                    href="https://vercel.com/import/project?template=https://github.com/LewdHuTao/lyrics-api&env[API_URL]=http://localhost:8888&env[NODE_ENV]=production&env[RATELIMIT]=false"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                >
                    Deploy to Vercel
                </a>
            </div>
        </div>
    )
}