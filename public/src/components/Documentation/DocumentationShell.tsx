"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Documentation/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DOCS_STRUCTURE } from "@/components/Documentation/DocsData";
import { ArrowLeft, ArrowRight, Minus } from "lucide-react";

export default function DocumentationShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const currentSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (slug: string) => {
    router.push(`/documentation/${slug}`);
    setIsMobileMenuOpen(false);
  };

  const allItems = DOCS_STRUCTURE.flatMap((s) => s.items);
  const currentIndex = allItems.findIndex((i) => i.slug === currentSlug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex >= 0 && currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const goPrev = () => prevItem && router.push(`/documentation/${prevItem.slug}`);
  const goNext = () => nextItem && router.push(`/documentation/${nextItem.slug}`);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <div className="md:hidden bg-slate-50 border-b border-slate-200 p-2 flex justify-end items-center">
        <button
          className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-300 hover:cursor-pointer text-black font-medium"
          onClick={() => setIsMobileMenuOpen((p) => !p)}
        >
          {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className="max-w-8xl mx-auto flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 min-w-0 mt-5">
          <div className="max-w-4xl px-5 sm:px-6 lg:px-12 py-10 mx-auto">
            {children}

            <div className="border-t-3 mt-10 border-slate-200 my-6" />

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={goPrev}
                disabled={!prevItem}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${prevItem
                  ? 'bg-white text-black hover:bg-slate-50 hover:cursor-pointer'
                  : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-500'
                  }`}
                aria-disabled={!prevItem}
              >
                {prevItem ? (
                  <span className="flex items-center whitespace-nowrap gap-1">
                    <ArrowLeft className="w-5 h-4 mr-1 mt-0.5" />
                    {prevItem.title}
                  </span>
                ) : <Minus className="w-5 h-4 mt-0.5" />}
              </button>

              <div className="flex-1" />

              <button
                onClick={goNext}
                disabled={!nextItem}
                className={`px-4 py-2 rounded-md border text-sm transition-colors ${nextItem
                  ? 'bg-white text-black hover:bg-slate-50 hover:cursor-pointer'
                  : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-500'
                  }`}
                aria-disabled={!nextItem}
              >
                {nextItem ? (
                  <span className="flex items-center whitespace-nowrap gap-1">
                    {nextItem.title}
                    <ArrowRight className="w-5 h-4 ml-1 mt-0.5" />
                  </span>
                ) : <Minus className="w-5 h-4 mt-0.5" />}
              </button>
            </div>

            <div className="mt-4 text-slate-500 text-sm">
              Last updated: November 28, 2025
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
