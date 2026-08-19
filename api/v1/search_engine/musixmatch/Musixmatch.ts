import log from "../../utils/logger";

interface TrackInfo {
  artist_name: string;
  track_name: string;
  track_id: string;
  search_engine: string;
  artwork_url: string | null;
  lyrics: string;
}

interface TrackData {
  track: {
    track_id: string;
    track_name: string;
    artist_name: string;
    album_coverart_350x350: string | null;
  };
  track_id: string;
  track_name: string;
  artist_name: string;
  album_coverart_350x350: string | null;
}

interface TokenResponse {
  message: {
    header: { status_code: number };
    body: { user_token: string };
  };
}

interface LyricsResponse {
  message: {
    body: {
      subtitle: {
        subtitle_body: string;
      };
    };
  };
}

interface SearchResult {
  message: {
    body: {
      track_list: { track: TrackData }[];
    };
  };
}

interface AlternativeLyricsResponse {
  message: {
    body: {
      macro_calls: {
        'track.lyrics.get': { message: { body: { lyrics: { lyrics_body: string } } } };
        'matcher.track.get': { message: { body: TrackData } };
      };
    };
  };
}

interface ErrorResponse {
  message: string;
  response: string;
}

type MusixmatchResponse = TrackInfo | ErrorResponse;

class Musixmatch {
  private tokenUrl = 'https://apic-desktop.musixmatch.com/ws/1.1/token.get?app_id=web-desktop-app-v1.0';
  private searchTermUrl =
    'https://apic-desktop.musixmatch.com/ws/1.1/track.search?app_id=web-desktop-app-v1.0&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0';
  private lyricsUrl =
    'https://apic-desktop.musixmatch.com/ws/1.1/track.subtitle.get?app_id=web-desktop-app-v1.0&subtitle_format=lrc';
  private lyricsAlternative =
    'https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get?format=json&namespace=lyrics_richsynched&subtitle_format=mxm&app_id=web-desktop-app-v1.0';

  private async get(url: string): Promise<string> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        authority: 'apic-desktop.musixmatch.com',
        cookie: 'AWSELBCORS=0; AWSELB=0;',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  }

  async getToken(): Promise<string> {
    const result = await this.get(this.tokenUrl);
    const tokenJson: TokenResponse = JSON.parse(result);

    if (tokenJson.message.header.status_code !== 200) {
      throw new Error(result);
    }

    return tokenJson.message.body.user_token;
  }

  async getLyrics(trackId: string, userToken: string): Promise<string> {
    const formattedUrl = `${this.lyricsUrl}&track_id=${trackId}&usertoken=${userToken}`;
    const result = await this.get(formattedUrl);
    const lyricsJson: LyricsResponse = JSON.parse(result);
    let lyrics = lyricsJson.message.body.subtitle.subtitle_body;
    lyrics = lyrics.replace(/\[\d+:\d+\.\d+\]/g, '');
    return lyrics
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .join('\n');
  }

  async searchTrack(title: string, userToken: string): Promise<MusixmatchResponse> {
    try {
      const formattedUrl = `${this.searchTermUrl}&q_track=${title}&usertoken=${userToken}`;
      const result = await this.get(formattedUrl);
      const listResult: SearchResult = JSON.parse(result);

      const data = listResult.message.body.track_list;
      const lyricsData = data[0].track;
      const lyrics = await this.getLyrics(lyricsData.track_id, userToken);
      const artist_name = lyricsData.artist_name;
      const track_name = lyricsData.track_name;
      const track_id = lyricsData.track_id;
      const artwork_url = lyricsData.album_coverart_350x350 || null;
      const search_engine = 'Musixmatch';
      const message = "The v1 API endpoint is deprecated and no longer maintained. While it may still work, it will not receive updates, bug fixes, or support. Please migrate to the latest v2 endpoints for improved stability, performance, and new features.";

      return {
        message,
        artist_name,
        track_name,
        track_id,
        search_engine,
        artwork_url,
        lyrics,
      };
    } catch (error) {
      log.error(`Error: ${error as string}`);
      return { message: 'No lyrics were found.', response: '404 Not Found' };
    }
  }

  async getLyricsSearch(title: string, artist: string, userToken: string): Promise<MusixmatchResponse> {
    try {
      const formattedUrl = `${this.lyricsAlternative}&usertoken=${userToken}&q_album=&q_artist=${artist}&q_artists=&track_spotify_id=&q_track=${title}`;
      const result = await this.get(formattedUrl);

      const lyricsData: AlternativeLyricsResponse = JSON.parse(result);

      const trackLyrics = lyricsData.message.body.macro_calls['track.lyrics.get'];
      const trackInfo = lyricsData.message.body.macro_calls['matcher.track.get'].message.body.track;

      const lyrics = trackLyrics.message.body.lyrics.lyrics_body;
      const track_id = trackInfo.track_id;
      const track_name = trackInfo.track_name;
      const artist_name = trackInfo.artist_name;
      const artwork_url = trackInfo.album_coverart_350x350 || null;
      const search_engine = 'Musixmatch';
      const message = "The v1 API endpoint is deprecated and no longer maintained. While it may still work, it will not receive updates, bug fixes, or support. Please migrate to the latest v2 endpoints for improved stability, performance, and new features.";

      return {
        message,
        artist_name,
        track_name,
        track_id,
        search_engine,
        artwork_url,
        lyrics,
      };
    } catch (error) {
      log.error(`Error: ${error as string}`);
      return { message: 'No lyrics were found.', response: '404 Not Found' };
    }
  }
}

export default Musixmatch;
