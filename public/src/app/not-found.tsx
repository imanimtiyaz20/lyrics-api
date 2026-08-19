'use client';

import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oohh… Looks like someone got lost. Want to get back on track?
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-md text-lg font-medium hover:bg-slate-900 transition-colors cursor-pointer"
        >
          Home
        </button>
      </main>

      <Footer />
    </div>
  );
}
