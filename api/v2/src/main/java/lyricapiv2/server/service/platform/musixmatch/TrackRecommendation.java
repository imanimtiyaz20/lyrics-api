package lyricapiv2.server.service.platform.musixmatch;

import lyricapiv2.server.model.SongMetadata;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class TrackRecommendation {
    private List<SongMetadata> recommendedTracks;
    private final String trackChartUrl = "https://apic-desktop.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page_size=6&app_id=web-desktop-app-v1.0";

    public TrackRecommendation() {
        recommendedTracks = new ArrayList<>();
    }

    public List<SongMetadata> getRecommendedTracks() {
        return recommendedTracks;
    }

    public TrackRecommendation getTrackRecommendation(String token, String country) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url = trackChartUrl
                    + "&usertoken=" + token
                    + "&country=" + country;
            String result = connector.get(url);
            JsonNode trackList = mapper.readTree(result)
                    .path("message")
                    .path("body")
                    .path("track_list");

            recommendedTracks.clear();

            if (trackList.isArray()) {
                for (int i = 0; i < trackList.size(); i++) {
                    JsonNode node = trackList.get(i);
                    JsonNode track = node.get("track");
                    recommendedTracks.add(new SongMetadata(
                            track.path("artist_name").asText(),
                            track.path("track_name").asText(),
                            track.path("track_id").asText(),
                            "Musixmatch",
                            track.path("album_coverart_350x350").asText().replace("\\/", "/")
                    ));
                }
            }

            if (recommendedTracks.isEmpty()) {
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
