package lyricapiv2.server.service;

import lyricapiv2.server.service.platform.musixmatch.Musixmatch;
import lyricapiv2.server.service.platform.youtube.YouTube;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LyricsService {

    private final Musixmatch musixmatch;
    private final YouTube youtube;

    public LyricsService(Musixmatch musixmatch, YouTube youtube) {
        this.musixmatch = musixmatch;
        this.youtube = youtube;
    }

    public ResponseEntity<?> getLyrics(String platform, String trackId, String title, String artist, String translate) throws Exception {
        switch (platform.toLowerCase()) {
            case "musixmatch":
                return musixmatch.fetchLyrics(trackId, title, artist, translate);
            case "youtube":
                return youtube.fetchLyrics(trackId, title, artist, translate);
            default:
                throw new IllegalArgumentException("Unsupported platform: " + platform);
        }
    }

    public ResponseEntity<?> getSongMetadata(String platform, boolean recommendation, String country, String title) throws Exception {
        switch (platform.toLowerCase()) {
            case "musixmatch":
                return musixmatch.fetchSongMetadata(recommendation, country, title);
            case "youtube":
                return youtube.fetchSongMetadata(recommendation, country, title);
            default:
                throw new IllegalArgumentException("Invalid parameter.");
        }
    }
}
