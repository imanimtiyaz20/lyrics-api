import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Recommendation from "@/components/Recommendation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />

      <div className="bg-[#FBEBE7] border-b border-[#FBEBE7] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-black text-sm sm:text-base font-medium text-center">
            This page no longer contains the documentation. Please use the new <a href="/documentation/get-started" className="underline underline-offset-2">
              documentation page</a> instead.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-[calc(100vh-250px)] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-black">
            A Simple & Powerful Lyrics API
          </h1>

          <p className="mt-6 text-gray-600 text-xl max-w-2xl mx-auto">
            Fetch lyrics, metadata, and music recommendations through a fast, reliable, and minimal API.
          </p>

          <a
            href="/documentation/get-started"
            className="inline-block mt-6 px-7 py-4 bg-black text-white rounded-lg text-md font-medium transition"
          >
            Get Started
          </a>
        </div>

        <h2 className="text-4xl font-extrabold text-black mt-32 text-center">
          Features
        </h2>

        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Lyrics Search</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Retrieve lyrics instantly by artist, song title, or both with a single API request.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Song Metadata</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Get essential metadata such as song name, video id, artwork, and more.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Recommendations</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Let our recommendation system guide you to more great songs, making it easy to discover music you’ll enjoy.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Fast JSON Responses</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Clean and structured JSON output optimized for frontend and backend systems.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Simple Integration</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Works with modern frameworks like Next.js, React, Vue, Laravel, Spring Boot, and more.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Free & Public</h3>
            <p className="mt-2 text-gray-600 text-sm">
              No complicated API keys required — plug in and start building immediately.
            </p>
          </div>
        </div>

        <Recommendation />
      </main>

      <Footer />
    </div>
  );
}
