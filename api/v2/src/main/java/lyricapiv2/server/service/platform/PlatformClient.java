package lyricapiv2.server.service.platform;

import org.springframework.http.ResponseEntity;

public interface PlatformClient {
    ResponseEntity<?> fetchLyrics(String trackId, String title, String artist, String langCode) throws Exception;
    ResponseEntity<?> fetchSongMetadata(boolean recommendation, String country, String title);
}
