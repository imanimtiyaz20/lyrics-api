package lyricapiv2.server.service.platform.musixmatch;

import lyricapiv2.server.model.LyricsError;
import lyricapiv2.server.model.LyricsSuccess;
import lyricapiv2.server.service.platform.PlatformClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class Musixmatch implements PlatformClient {

    @Override
    public ResponseEntity<?> fetchLyrics(String trackId, String title, String artist, String translate) throws Exception {
        trackId = (trackId == null) ? "" : trackId.trim();
        title = (title == null) ? "" : title.trim();
        artist = (artist == null) ? "" : artist.trim();
        translate = (translate == null) ? "" : translate.trim();

        int filled = 0;
        if (!trackId.isEmpty()) filled++;
        if (!title.isEmpty()) filled++;
        if (!artist.isEmpty()) filled++;
        if (!translate.isEmpty()) filled++;

        boolean valid =
                (filled == 1 && !trackId.isEmpty())
                        || (filled == 1 && !title.isEmpty())
                        || (filled == 2 && !title.isEmpty() && !artist.isEmpty())
                        || (filled == 2 && !trackId.isEmpty() && !translate.isEmpty())
                        || (filled == 2 && !title.isEmpty() && !translate.isEmpty())
                        || (filled == 3 && !title.isEmpty() && !artist.isEmpty() && !translate.isEmpty());

        if (!valid) {
            return new ResponseEntity<>(new LyricsError("Invalid parameters provided.", "410 Bad Request"), HttpStatus.BAD_REQUEST);
        }

        Token token = new Token();
        String userToken = token.getToken();

        if (!trackId.isEmpty() && title.isEmpty() && artist.isEmpty() && translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTrackId(userToken, trackId);
            Lyrics lyrics = new Lyrics().getLyricsByTackId(userToken, trackId);

            if (metadata == null || lyrics == null) return new ResponseEntity<>(new LyricsError("No lyrics found for trackId: " + trackId, "404 Not Found"), HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    lyrics.getLyrics()),
                    HttpStatus.OK);
        }

        if (!title.isEmpty() && artist.isEmpty() && translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTitle(userToken, title);
            if (metadata == null) return new ResponseEntity<>(new LyricsError(
                    "No lyrics found for title: " + title,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            Lyrics lyrics = new Lyrics().getLyricsByTackId(userToken, metadata.getTrackId());
            if (lyrics == null) return new ResponseEntity<>(new LyricsError(
                    "No lyrics found for title: " + title,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    lyrics.getLyrics()),
                    HttpStatus.OK);
        }

        if (!title.isEmpty() && !artist.isEmpty() && translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTitleArtist(userToken, title, artist);
            Lyrics lyrics = new Lyrics().getLyricsByTackId(userToken, metadata.getTrackId());

            if (metadata == null || lyrics == null) return new ResponseEntity<>(new LyricsError(
                    "No lyrics found for title: " + title + " and artist: " + artist,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    lyrics.getLyrics()),
                    HttpStatus.OK);
        }

        if (!trackId.isEmpty() && !translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTrackId(userToken, trackId);
            TranslatedLyrics translatedLyrics = new TranslatedLyrics().getTranslatedLyricsByTrackId(userToken, trackId, translate);

            if (metadata == null || translatedLyrics == null) return new ResponseEntity<>(new LyricsError(
                    "No translated lyrics found for trackId: " + trackId,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    translatedLyrics.getTranslatedLyrics().toString()),
                    HttpStatus.OK);
        }

        if (!title.isEmpty() && !translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTitle(userToken, title);
            if (metadata == null) return new ResponseEntity<>(new LyricsError(
                    "No lyrics found for title: " + title,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            TranslatedLyrics translatedLyrics = new TranslatedLyrics().getTranslatedLyricsByTrackId(userToken, metadata.getTrackId(), translate);
            if (translatedLyrics == null) return new ResponseEntity<>(new LyricsError(
                    "No translated lyrics found for title: " + title,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    translatedLyrics.getTranslatedLyrics().toString()),
                    HttpStatus.OK);
        }

        if (!title.isEmpty() && !artist.isEmpty() && !translate.isEmpty()) {
            TrackMetadata metadata = new TrackMetadata().getTrackMetadataByTitleArtist(userToken, title, artist);
            if (metadata == null) return new ResponseEntity<>(new LyricsError(
                    "No translated lyrics found for title: " + title + " and artist: " + artist,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            TranslatedLyrics translatedLyrics = new TranslatedLyrics().getTranslatedLyricsByTrackId(userToken, metadata.getTrackId(), translate);
            if (translatedLyrics == null) return new ResponseEntity<>(new LyricsError(
                    "No translated lyrics found for title: " + title + " and artist: " + artist,
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new LyricsSuccess(
                    metadata.getArtistName(),
                    metadata.getTrackName(),
                    metadata.getTrackId(),
                    "Musixmatch",
                    metadata.getArtworkUrl(),
                    translatedLyrics.getTranslatedLyrics().toString()),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(new LyricsError("Invalid parameters provided.", "410 Bad Request"), HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> fetchSongMetadata(boolean recommendation, String country, String title) {
        Token token = new Token();
        String userToken = token.getToken();

        if (recommendation) {
            TrackRecommendation rec = new TrackRecommendation().getTrackRecommendation(userToken, country);

            if (rec == null) return new ResponseEntity<>(new LyricsError(
                    "No recommendation track found.",
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(rec.getRecommendedTracks(), HttpStatus.OK);
        } else {
            TrackSearch search = new TrackSearch().getTrackSearch(userToken, title);

            if (search == null) return new ResponseEntity<>(new LyricsError(
                    "No search track results found.",
                    "404 Not Found"),
                    HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(search.getSearchResults(), HttpStatus.OK);
        }
    }
}
