"use client";

import { ChevronRight } from "lucide-react";
import { DOCS_STRUCTURE } from "./DocsData";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname?.split("/").pop();
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-slate-200 shadow-lg overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-8 space-y-8 mt-16 md:mt-0">
          {DOCS_STRUCTURE.map((section, idx) => (
            <div key={idx}>
              <h5 className="mb-3 font-semibold text-slate-900 text-sm tracking-wide uppercase">
                {section.category}
              </h5>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => onNavigate(item.slug)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${currentSlug === item.slug
                          ? "bg-slate-300 text-black font-semibold"
                          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 hover:cursor-pointer"
                        }
                      `}
                    >
                      {currentSlug === item.slug}
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
