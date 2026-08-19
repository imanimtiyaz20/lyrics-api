package lyricapiv2.server.service.platform.musixmatch;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class TrackMetadata {
    private String trackId;
    private String trackName;
    private String artistName;
    private String artworkUrl;
    private final String trackMetadataUrlId = "https://apic-desktop.musixmatch.com/ws/1.1/track.get?app_id=web-desktop-app-v1.0";
    private final String trackMetadataUrlTitle = "https://apic-desktop.musixmatch.com/ws/1.1/track.search?app_id=web-desktop-app-v1.0&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0";
    private final String trackMetadataUrlArtist = "https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get?format=json&namespace=lyrics_richsynched&subtitle_format=mxm&app_id=web-desktop-app-v1.0";

    public TrackMetadata() {}

    public String getTrackId() { return trackId; }
    public String getTrackName() { return trackName; }
    public String getArtistName() { return artistName; }
    public String getArtworkUrl() { return artworkUrl; }

    public TrackMetadata getTrackMetadataByTrackId(String token, String trackId) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url =  trackMetadataUrlId + "&track_id=" + trackId + "&usertoken=" + token;
            String result = connector.get(url);

            JsonNode track = mapper.readTree(result).path("message").path("body").path("track");
            this.trackId = trackId;
            this.trackName = track.path("track_name").asText();
            this.artistName = track.path("artist_name").asText();
            this.artworkUrl = track.path("album_coverart_350x350").asText().replace("\\/", "/");

            return this;
        } catch (Exception e) {
            System.out.println("An error occur while fetching track metadata: " + e.getMessage());

            return null;
        }
    }

    public TrackMetadata getTrackMetadataByTitle(String token, String title) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url  = trackMetadataUrlTitle + "&q_track=" + URLEncoder.encode(title, StandardCharsets.UTF_8) + "&usertoken=" + token;
            String result = connector.get(url);
            JsonNode trackNode = mapper.readTree(result).path("message").path("body").path("track_list");

            if (!trackNode.isArray() || trackNode.isEmpty()) throw new RuntimeException("No lyrics found for title: " + title);

            JsonNode track = trackNode.get(0).path("track");
            this.trackId = track.path("track_id").asText();
            this.trackName = track.path("track_name").asText();
            this.artistName = track.path("artist_name").asText();
            this.artworkUrl = track.path("album_coverart_350x350").asText().replace("\\/", "/");

            return this;
        } catch (Exception e) {
            System.out.println("An error occur while fetching track metadata: " + e.getMessage());

            return null;
        }
    }

    public TrackMetadata getTrackMetadataByTitleArtist(String token, String title, String artist) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url = trackMetadataUrlArtist + "&q_album=&q_artist=" + URLEncoder.encode(artist, StandardCharsets.UTF_8)
                    + "&q_artists=&track_spotify_id=&q_track=" + URLEncoder.encode(title, StandardCharsets.UTF_8)
                    + "&usertoken=" + token;
            String result = connector.get(url);
            JsonNode rootNode = mapper.readTree(result);
            JsonNode trackNode = rootNode
                    .path("message")
                    .path("body")
                    .path("macro_calls")
                    .path("matcher.track.get")
                    .path("message")
                    .path("body")
                    .path("track");

            if (trackNode.isMissingNode()) {
                System.out.println("No track metadata found for artist: " + artist + " and title: " + title);

                return null;
            }

            this.trackId = trackNode.path("track_id").asText();
            this.trackName = trackNode.path("track_name").asText();
            this.artistName = trackNode.path("artist_name").asText();
            this.artworkUrl = trackNode.path("album_coverart_350x350").asText().replace("\\/", "/");

            return this;
        } catch (Exception e) {
            System.out.println("An error occur while fetching track metadata: " + e.getMessage());

            return null;
        }
    }
}
