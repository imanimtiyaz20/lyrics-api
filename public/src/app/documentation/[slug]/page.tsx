"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DOCS_STRUCTURE } from "@/components/Documentation/DocsData";

export default function DocPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  useEffect(() => setMounted(true), []);

  const allItems = DOCS_STRUCTURE.flatMap((s) => s.items);
  const currentItem = allItems.find((i) => i.slug === slug);

  if (!currentItem) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <p className="mt-4 text-xl text-gray-700 mb-20">
          Page Not Found.
        </p>
      </main>
    )
  }
  if (!mounted) return null;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-6">{currentItem.title}</h1>
      <div className="space-y-6">{currentItem.content}</div>
    </div>
  );
}
