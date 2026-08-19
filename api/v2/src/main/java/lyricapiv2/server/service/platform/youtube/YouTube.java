package lyricapiv2.server.service.platform.youtube;

import lyricapiv2.server.model.LyricsSuccess;
import lyricapiv2.server.model.LyricsError;
import lyricapiv2.server.service.platform.PlatformClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class YouTube implements PlatformClient {

    @Override
    public ResponseEntity<?> fetchLyrics(String trackId, String title, String artist, String translate) throws IOException {
        trackId = (trackId == null) ? "" : trackId.trim();
        title = (title == null) ? "" : title.trim();
        artist = (artist == null) ? "" : artist.trim();

        int filled = 0;
        if (!trackId.isEmpty()) filled++;
        if (!title.isEmpty()) filled++;
        if (!artist.isEmpty()) filled++;

        boolean valid =
                (filled == 1 && !trackId.isEmpty()) ||
                        (filled == 1 && !title.isEmpty()) ||
                        (filled == 2 && !title.isEmpty() && !artist.isEmpty());

        if (!valid) {
            return new ResponseEntity<>(new LyricsError("Invalid parameters provided.", "410 Bad Request"), HttpStatus.BAD_REQUEST);
        }

        Extractor extractor = new Extractor();

        if (!trackId.isEmpty() && title.isEmpty() && artist.isEmpty()) {
            String browseId = extractor.trackBrowseIdExtractor(trackId);

            TrackMetadata metadata = new TrackMetadata().getTrackMetadata(trackId);
            if (metadata == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for track id: " + trackId, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            Lyrics lyrics = new Lyrics().getLyrics(browseId);
            if (lyrics == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for track id: " + trackId, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "YouTube",
                    metadata.getArtworkUrl(),
                    lyrics.getLyricsText()
            ), HttpStatus.OK);
        }

        if (trackId.isEmpty() && !title.isEmpty() && artist.isEmpty()) {
            List<String> results = extractor.trackVideoIdSearch(title);

            if (results == null || results.isEmpty()) {
                return new ResponseEntity<>(new LyricsError("No results found for: " + title, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            String videoId = results.get(0);
            String browseId = extractor.trackBrowseIdExtractor(videoId);

            TrackMetadata metadata = new TrackMetadata().getTrackMetadata(videoId);
            if (metadata == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for: " + title, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            Lyrics lyrics = new Lyrics().getLyrics(browseId);
            if (lyrics == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for: " + title, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "YouTube",
                    metadata.getArtworkUrl(),
                    lyrics.getLyricsText()
            ), HttpStatus.OK);
        }

        if (trackId.isEmpty() && !title.isEmpty() && !artist.isEmpty()) {
            String query = title + " " + artist;
            List<String> results = extractor.trackVideoIdSearch(query);

            if (results == null || results.isEmpty()) {
                return new ResponseEntity<>(new LyricsError("No results found for: " + title, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            String videoId = results.get(0);
            String browseId = extractor.trackBrowseIdExtractor(videoId);

            TrackMetadata metadata = new TrackMetadata().getTrackMetadata(videoId);
            if (metadata == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for: " + query, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            Lyrics lyrics = new Lyrics().getLyrics(browseId);
            if (lyrics == null) {
                return new ResponseEntity<>(new LyricsError("No lyrics found for: " + query, "404 Not Found"), HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "YouTube",
                    metadata.getArtworkUrl(),
                    lyrics.getLyricsText()
            ), HttpStatus.OK);
        }

        return new ResponseEntity<>(new LyricsError("Invalid parameters provided.", "410 Bad Request"), HttpStatus.BAD_REQUEST);
    }

    /**
     * TODO: add new method to fetch metadata/recommendation track from youtube
     * As for now this will do nothing much
     */
    @Override
    public ResponseEntity<?> fetchSongMetadata(boolean recommendation, String country, String title) {
        return null;
    }
}
