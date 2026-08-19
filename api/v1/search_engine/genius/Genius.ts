import * as cheerio from 'cheerio';
import log from "../../utils/logger";

interface LyricsResponse {
  artist_name: string;
  track_name: string;
  search_engine: string;
  artwork_url: string | null;
  lyrics: string;
}

interface ErrorResponse {
  message: string;
  response: string;
}

class Genius {
  private geniusURL = 'https://api.genius.com/search';

  async getLyrics(title: string, api_key: string | null = null): Promise<LyricsResponse | ErrorResponse> {
    try {
      const res = await fetch(`${this.geniusURL}?q=${encodeURIComponent(title)}`, {
        headers: {
          Authorization: `Bearer ${api_key}`,
          'User-Agent': 'Mozilla/5.0',
        },
      });

      if (!res.ok) {
        throw new Error(`Genius API error: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.meta.status !== 200 || !data.response.hits.length) {
        throw new Error('No lyrics results found.');
      }

      const result = data.response.hits[0].result;
      const track_name = result.title;
      const artist_name = result.primary_artist.name;
      const artwork_url = result.song_art_image_thumbnail_url || null;
      const search_engine = 'Genius';

      const lyricsUrl = result.url;
      const lyricsResponse = await fetch(lyricsUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      if (!lyricsResponse.ok) {
        throw new Error('No lyrics result found.');
      }

      const lyricsHtml = await lyricsResponse.text();
      const $ = cheerio.load(lyricsHtml);
      let lyrics = '';

      $('div[data-lyrics-container="true"]').each((_, elem) => {
        const snippet = $(elem)
          .html()
          ?.replace(/<br\s*\/?>/g, '\n')
          .replace(/<(?!br\s*\/?)[^>]+>/gi, '')
          .trim();

        if (snippet) lyrics += snippet + "\n\n";
      });

      if (!lyrics) {
        throw new Error('Lyrics could not be extracted.');
      }

      const message = "The v1 API endpoint is deprecated and no longer maintained. While it may still work, it will not receive updates, bug fixes, or support. Please migrate to the latest v2 endpoints for improved stability, performance, and new features.";

      return { message, artist_name, track_name, search_engine, artwork_url, lyrics: lyrics.trim() };
    } catch (error) {
      log.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
      return { message: 'No lyrics were found.', response: '404 Not Found' };
    }
  }
}

export default Genius;
