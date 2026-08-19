package lyricapiv2.server.service.platform.youtube;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;

import java.io.IOException;
import java.util.Map;

public class Lyrics {
    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private String lyrics;

    private final Token token;
    private final String apiKey;

    public Lyrics() throws IOException {
        this.token = new Token().init();
        this.apiKey = token.getApiKey();
    }

    public Lyrics getLyrics(String browseId) throws IOException {
        String url = "https://music.youtube.com/youtubei/v1/browse?key=" + apiKey;

        Map<String, Object> payload = Map.of(
                "context", token.getContext(),
                "browseId", browseId
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
            if (!response.isSuccessful() || response.body() == null) {
                System.out.println("No lyrics found for browse id: " + browseId);

                return null;
            }

            JsonNode browseJson = objectMapper.readTree(response.body().string());

            JsonNode runs = browseJson.at("/contents/sectionListRenderer/contents/0/musicDescriptionShelfRenderer/description/runs");

            if (!runs.isArray() || runs.size() == 0) {
                runs = browseJson.at("/contents/musicDescriptionShelfRenderer/description/runs");
            }

            if (!runs.isArray() || runs.size() == 0) {
                System.out.println("No lyrics found for browse id: " + browseId);

                return null;
            }

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < runs.size(); i++) {
                JsonNode run = runs.get(i);
                JsonNode textNode = run.get("text");

                if (textNode != null) sb.append(textNode.asText());
            }

            this.lyrics = sb.toString().trim();

            return this;
        } catch (IOException e) {
            System.out.println("An error occurred while fetching lyrics: " + e.getMessage());

            return null;
        }
    }

    public String getLyricsText() {
        return lyrics;
    }
}
