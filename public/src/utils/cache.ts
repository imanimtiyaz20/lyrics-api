const GLOBAL_CACHE_KEY = "__lyricsapi_server_cache__";
const globalCache: Map<string, { data: any; expiry: number }> = (globalThis as any)[GLOBAL_CACHE_KEY] || new Map();
(globalThis as any)[GLOBAL_CACHE_KEY] = globalCache;

export async function fetchJsonWithCache(url: string, ttlMs: number) {
    const entry = globalCache.get(url);

    if (entry && Date.now() < entry.expiry) {
        return { fromCache: true, data: entry.data };
    }

    const seconds = Math.max(1, Math.floor(ttlMs / 1000));
    const res = await fetch(url, { next: { revalidate: seconds } });
    const data = await res.json();

    try {
        globalCache.set(url, { data, expiry: Date.now() + ttlMs });
    } catch (e) { }

    return { fromCache: false, data };
}

export function clearCacheFor(url: string) {
    return globalCache.delete(url);
}

export function clearAllCache() {
    globalCache.clear();
}
