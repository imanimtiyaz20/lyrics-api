import { NextResponse } from "next/server";
import { fetchJsonWithCache } from "@/utils/cache";

const CACHE_TTL = 30 * 60 * 1000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const platform = segments[1];
  const trackid = url.searchParams.get("trackid") ?? url.searchParams.get("trackId") ?? undefined;
  const title = url.searchParams.get("title") ?? undefined;
  const artist = url.searchParams.get("artist") ?? undefined;
  const langcode = url.searchParams.get("translate") ?? undefined;
  const backendUrl = new URL(`${process.env.API_URL}/api/v2/lyrics`);
  backendUrl.searchParams.append("platform", platform);

  if (trackid) backendUrl.searchParams.append("trackid", trackid);
  if (title) backendUrl.searchParams.append("title", title);
  if (artist) backendUrl.searchParams.append("artist", artist);
  if (langcode) backendUrl.searchParams.append("translate", langcode);

  const { data } = await fetchJsonWithCache(backendUrl.toString(), CACHE_TTL);

  return NextResponse.json(data);
}
