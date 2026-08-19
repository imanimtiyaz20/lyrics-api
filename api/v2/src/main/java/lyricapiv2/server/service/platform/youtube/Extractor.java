package lyricapiv2.server.service.platform.youtube;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Extractor {
    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Token token;
    private final String apiKey;

    public Extractor() throws IOException {
        this.token = new Token().init();
        this.apiKey = token.getApiKey();
    }

    public List<String> trackVideoIdSearch(String query) throws IOException {
        String url = "https://music.youtube.com/youtubei/v1/search?key=" + apiKey;

        Map<String, Object> payload = new HashMap<>();
        payload.put("context", token.getContext());
        payload.put("query", query);
        payload.put("params", "EgWKAQIIAWoKEAMQBRAKEAkQBA==");

        RequestBody requestBody = RequestBody.create(
                objectMapper.writeValueAsString(payload),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-YouTube-Client-Name", token.getClientName())
                .addHeader("X-YouTube-Client-Version", token.getClientVersion())
                .addHeader("X-Origin", "https://music.youtube.com")
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful() || response.body() == null) {
                return List.of();
            }

            JsonNode rootNode = objectMapper.readTree(response.body().string());
            return trackVideoIdExtractor(rootNode);
        } catch (IOException e) {
            System.out.println("An error occurred while searching track video id: " + e.getMessage());

            return null;
        }
    }

    public List<String> trackVideoIdExtractor(JsonNode node) {
        List<String> ids = new ArrayList<>();

        if (node == null || node.isMissingNode()) return ids;

        if (node.has("musicResponsiveListItemFlexColumnRenderer")
                && node.get("musicResponsiveListItemFlexColumnRenderer").has("text")) {
            JsonNode runs = node.get("musicResponsiveListItemFlexColumnRenderer").get("text").get("runs");

            if (runs != null && runs.isArray()) {
                for (int i = 0; i < runs.size(); i++) {
                    JsonNode run = runs.get(i);
                    JsonNode videoIdNode = run.at("/navigationEndpoint/watchEndpoint/videoId");

                    if (!videoIdNode.isMissingNode() && !videoIdNode.asText().isBlank()) {
                        ids.add(videoIdNode.asText());
                    }
                }
            }
        }

        if (node.isObject()) {
            node.fields().forEachRemaining(entry -> ids.addAll(trackVideoIdExtractor(entry.getValue())));
        } else if (node.isArray()) {
            for (int i = 0; i < node.size(); i++) {
                JsonNode item = node.get(i);
                ids.addAll(trackVideoIdExtractor(item));
            }
        }

        return ids;
    }

    public String trackBrowseIdExtractor(String videoId) throws IOException {
        String url = "https://music.youtube.com/youtubei/v1/next?key=" + apiKey;

        Map<String, Object> payload = Map.of(
                "context", token.getContext(),
                "videoId", videoId
        );

        RequestBody body = RequestBody.create(
                objectMapper.writeValueAsString(payload),
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("X-YouTube-Client-Name", token.getClientName())
                .addHeader("X-YouTube-Client-Version", token.getClientVersion())
                .addHeader("X-Origin", "https://music.youtube.com")
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful() || response.body() == null) return null;

            JsonNode nextJson = objectMapper.readTree(response.body().string());

            JsonNode tabs = nextJson.at("/contents/singleColumnMusicWatchNextResultsRenderer/tabbedRenderer/tabs");
            if (!tabs.isArray() || tabs.size() == 0) {
                tabs = nextJson.at("/contents/singleColumnMusicWatchNextResultsRenderer/tabbedRenderer/watchNextTabbedResultsRenderer/tabs");
            }
            if (!tabs.isArray() || tabs.size() == 0) {
                System.out.println("No browse id found for track id: " + videoId);

                return null;
            }

            for (int i = 0; i < tabs.size(); i++) {
                JsonNode tab = tabs.get(i);
                JsonNode tabRenderer = tab.get("tabRenderer");

                if (tabRenderer != null) {
                    String title = tabRenderer.at("/title").asText(null);

                    if (title == null || title.isBlank()) {
                        title = tabRenderer.at("/title/runs/0/text").asText(null);
                    }

                    if ("Lyrics".equalsIgnoreCase(title)) {
                        return tabRenderer.at("/endpoint/browseEndpoint/browseId").asText(null);
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("An error occurred while extracting browseId: " + e.getMessage());

            return null;
        }

        return null;
    }
}
