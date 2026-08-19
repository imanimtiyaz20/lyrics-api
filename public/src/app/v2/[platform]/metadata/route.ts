import { NextResponse } from "next/server";
import { fetchJsonWithCache } from "@/utils/cache";

const CACHE_TTL = 5 * 60 * 1000;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const backendUrl = `${process.env.API_URL}/api/v2/metadata?platform=musixmatch&title=${title}`;
    const { data } = await fetchJsonWithCache(backendUrl, CACHE_TTL);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
