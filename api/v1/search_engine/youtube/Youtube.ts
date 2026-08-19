import YTMusic from 'ytmusic-api';
import log from '../../utils/logger';

interface SongData {
  artist: { name: string };
  name: string;
  thumbnails: { url: string }[];
  videoId: string;
}

interface LyricsResponse {
  artist_name: string;
  track_name: string;
  search_engine: string;
  artwork_url: string;
  lyrics: string;
}

interface ErrorResponse {
  message: string;
  response: string;
}

class Youtube {
  async getLyrics(title: string): Promise<LyricsResponse | ErrorResponse> {
    try {
      const ytm = new YTMusic();
      await ytm.initialize();

      const song: SongData[] = await ytm.searchSongs(title);
      const data = song[0];
      const artist_name = data.artist.name;
      const track_name = data.name;
      const search_engine = 'YouTube';
      const artwork_url = data.thumbnails[1].url;
      const video_id = data.videoId;
      const lyrics_array = (await ytm.getLyrics(video_id)) as string[];
      const lyrics = lyrics_array.join('\n');
      const message = "The v1 API endpoint is deprecated and no longer maintained. While it may still work, it will not receive updates, bug fixes, or support. Please migrate to the latest v2 endpoints for improved stability, performance, and new features.";

      return { message, artist_name, track_name, search_engine, artwork_url, lyrics };
    } catch (error) {
      log.error(`Error: ${error as string}`);
      return {
        message: 'No lyrics were found.',
        response: '404 Not Found',
      };
    }
  }
}

export default Youtube;
