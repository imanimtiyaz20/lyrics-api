package lyricapiv2.server.service.platform.musixmatch;

import lyricapiv2.server.model.SongMetadata;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class TrackSearch {
    private List<SongMetadata> searchResults;
    private final String trackSearchUrl = "https://apic-desktop.musixmatch.com/ws/1.1/track.search?app_id=web-desktop-app-v1.0&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0";

    public TrackSearch() {
        searchResults = new ArrayList<>();
    }

    public List<SongMetadata> getSearchResults() {
        return searchResults;
    }

    public TrackSearch getTrackSearch(String token, String title) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url = trackSearchUrl
                    + "&usertoken=" + token
                    + "&q_track=" + URLEncoder.encode(title, StandardCharsets.UTF_8);
            String result = connector.get(url);
            JsonNode trackList = mapper.readTree(result)
                    .path("message")
                    .path("body")
                    .path("track_list");

            searchResults.clear();

            if (trackList.isArray()) {
                for (int i = 0; i < trackList.size(); i++) {
                    JsonNode node = trackList.get(i);
                    JsonNode track = node.get("track");
                    searchResults.add(new SongMetadata(
                            track.path("artist_name").asText(),
                            track.path("track_name").asText(),
                            track.path("track_id").asText(),
                            "Musixmatch",
                            track.path("album_coverart_350x350").asText().replace("\\/", "/")
                    ));
                }
            }

            if (searchResults.isEmpty()) {
                System.out.println("Cannot find recommendation track.");

                return null;
            }

            return this;
        } catch (Exception e) {
            System.out.println("An error occur while fetching recommendation track: " + e.getMessage());

            return null;
        }
    }
}
