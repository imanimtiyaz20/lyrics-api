package lyricapiv2.server.service.platform.musixmatch;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TranslatedLyrics {
    private StringBuilder translatedLyrics;
    private final String translatedLyricsUrl = "https://apic-desktop.musixmatch.com/ws/1.1/crowd.track.translations.get?app_id=web-desktop-app-v1.0";

    public TranslatedLyrics() {}

    public StringBuilder getTranslatedLyrics() { return translatedLyrics; }

    public TranslatedLyrics getTranslatedLyricsByTrackId(String token, String trackId, String langCode) {
        Connector connector = new Connector();
        ObjectMapper mapper = new ObjectMapper();

        try {
            String url = translatedLyricsUrl + "&track_id=" + trackId
                    + "&selected_language=" + langCode
                    + "&usertoken=" + token;
            String result = connector.get(url);
            JsonNode rootNode = mapper.readTree(result);
            StringBuilder translatedLyrics = new StringBuilder();
            JsonNode translation = rootNode.path("message").path("body").path("translations_list");

            if (translation.isArray()) {
                for (int i = 0; i < translation.size(); i++) {
                    JsonNode node = translation.get(i);
                    JsonNode description = node.path("translation").path("description");

                    if (!description.isMissingNode()) {
                        String line = description.asText();
                        line = line
                                .replace("\\n", "\n")
                                .replace("\\r", "")
                                .replace("\\t", "\t")
                                .replace("\\\"", "\"")
                                .replace("\\/", "/")
                                .replace("\\\\", "\\");

                        Matcher unicodeMatcher = Pattern.compile("\\\\u([0-9A-Fa-f]{4})").matcher(line);
                        StringBuffer sb = new StringBuffer();

                        while (unicodeMatcher.find()) {
                            String unicodeChar = String.valueOf((char) Integer.parseInt(unicodeMatcher.group(1), 16));
                            unicodeMatcher.appendReplacement(sb, Matcher.quoteReplacement(unicodeChar));
                        }

                        unicodeMatcher.appendTail(sb);
                        line = sb.toString().trim();

                        if (!line.isEmpty()) {
                            translatedLyrics.append(line).append("\n");
                        }
                    }
                }
            }

            if (translatedLyrics.isEmpty()) {
                System.out.println("No translated lyrics found.");

                return null;
            }

            this.translatedLyrics = translatedLyrics;

            return this;
        } catch (Exception e) {
            System.out.println("An error occur while fetching translated lyrics: " + e.getMessage());

            return null;
        }
    }
}
