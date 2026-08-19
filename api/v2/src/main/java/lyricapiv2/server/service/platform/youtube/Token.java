package lyricapiv2.server.service.platform.youtube;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Token {
    private String apiKey;
    private String clientName;
    private String clientVersion;

    public Token init() throws IOException {
        Document doc = Jsoup.connect("https://music.youtube.com/")
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
                .header("Accept-Language", "en-US,en;q=0.9")
                .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                .get();
        String homeHtml = doc.html();

        apiKey = extract(homeHtml, "\"INNERTUBE_API_KEY\":\"([^\"]+)\"");
        clientName = extract(homeHtml, "\"INNERTUBE_CLIENT_NAME\":\"([^\"]+)\"");
        clientVersion = extract(homeHtml, "\"INNERTUBE_CLIENT_VERSION\":\"([^\"]+)\"");

        if (apiKey == null || clientName == null || clientVersion == null) {
            throw new RuntimeException("Failed to extract api key and/or client name.");
        }

        return this;
    }

    private String extract(String html, String pattern) {
        Matcher matcher = Pattern.compile(pattern).matcher(html);
        return matcher.find() ? matcher.group(1) : null;
    }

    public String getApiKey() { return apiKey; }
    public String getClientName() { return clientName; }
    public String getClientVersion() { return clientVersion; }
    public Map<String, Object> getContext() { return Map.of("client", Map.of("clientName", clientName, "clientVersion", clientVersion)); }
}
