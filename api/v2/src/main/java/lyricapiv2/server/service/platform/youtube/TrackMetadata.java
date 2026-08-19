package lyricapiv2.server.service.platform.youtube;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;

import java.io.IOException;
import java.util.Map;

public class TrackMetadata {
    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private String trackName;
    private String trackId;
    private String artistName;
    private String artworkUrl;

    public String getTrackName() { return trackName; }
    public String getTrackId() { return trackId; }
    public String getArtistName() { return artistName; }
    public String getArtworkUrl() { return artworkUrl; }

    public TrackMetadata getTrackMetadata(String videoId) throws IOException {
        Token token = new Token().init();

        try {
            String url = "https://music.youtube.com/youtubei/v1/next?key=" + token.getApiKey();

            Map<String, Object> payload = Map.of(
                    "context", token.getContext(),
                    "videoId", videoId
            );

            RequestBody body = RequestBody.create(objectMapper.writeValueAsString(payload), MediaType.parse("application/json"));
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("X-YouTube-Client-Name", token.getClientName())
                    .addHeader("X-YouTube-Client-Version", token.getClientVersion())
                    .addHeader("X-Origin", "https://music.youtube.com")
                    .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful() || response.body() == null) {
                    System.out.println("No track metadata found for video id: " + videoId);

                    return null;
                }

                JsonNode root = objectMapper.readTree(response.body().string());
                JsonNode playlistNode = root
                        .at("/contents/singleColumnMusicWatchNextResultsRenderer/tabbedRenderer/watchNextTabbedResultsRenderer/tabs/0/tabRenderer/content/musicQueueRenderer/content/playlistPanelRenderer/contents/0/playlistPanelVideoRenderer");

                String title = playlistNode.at("/title/runs/0/text").asText(null);
                String artist = playlistNode.at("/longBylineText/runs/0/text").asText(null);
                String thumbnailUrl = playlistNode.at("/thumbnail/thumbnails/1/url").asText(null);
                String trackId = playlistNode.at("/videoId").asText(null);

                this.trackName = title;
                this.artistName = artist;
                this.artworkUrl = thumbnailUrl;
                this.trackId = trackId;

                return this;
            }
        } catch (IOException e)  {
            System.out.println("An error occurred while fetching track metadata: " + e.getMessage());
            return null;
        }
    }
}
