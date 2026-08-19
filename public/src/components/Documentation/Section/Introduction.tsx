'use client';

export default function IntroductionSection() {
    return (
        <div className="space-y-6">
            <p className="text-lg text-black leading-relaxed">
                Welcome to the LyricsAPI documentation! This API provides an easy and
                flexible way to access song lyrics, translations, and detailed metadata
                from multiple platforms. With LyricsAPI, you can quickly retrieve
                information about your favorite songs all without needing an API key. Whether
                you’re building a music app, creating lyric-based features, or simply exploring song data,
                this API is designed to be straightforward and easy to use.
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-black mt-14">Get Started</h1>
            <p className="text-lg text-slate-900 leading-relaxed">
                You can start by installing this project locally or by using the public API.
                If you choose to run your own instance, you can follow the <a className="text-blue-600" href="/documentation/installation">installation guide</a>. 
                Using your own instance gives you 
                full control over the data and allows for
                customization to fit your specific needs. If you plan to use the public API, you
                can immediately begin exploring the available endpoints and integrating them into your
                applications. This makes it simple to get started quickly, whether you are building a
                new project or experimenting with lyrics and metadata retrieval.
            </p>
        </div>
    )
}