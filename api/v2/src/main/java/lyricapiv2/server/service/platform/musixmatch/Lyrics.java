package lyricapiv2.server.service.platform.musixmatch;

import org.apache.commons.text.StringEscapeUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Lyrics {
    private String lyrics;
    private final String lyricsUrlId = "https://apic-desktop.musixmatch.com/ws/1.1/track.subtitle.get?app_id=web-desktop-app-v1.0&subtitle_format=lrc";

    public Lyrics() {}

    public String getLyrics() { return lyrics; }

    public Lyrics getLyricsByTackId(String token, String trackId) {
       Connector connector = new Connector();

        try {
            String url = lyricsUrlId + "&track_id=" + trackId + "&usertoken=" + token;
            String result = connector.get(url);

            Pattern pattern = Pattern.compile("\"subtitle_body\":\"(.*?)\"", Pattern.DOTALL);
            Matcher match = pattern.matcher(result);

            if (match.find()) {
                String raw = match.group(1);
                String lyrics = raw
                        .replace("\\n", "\n")
                        .replace("\\r", "")
                        .replace("\\t", "\t")
                        .replace("\\\"", "\"")
                        .replace("\\/", "/")
                        .replace("\\\\", "\\");
                lyrics = lyrics.replaceAll("\\[\\d{2}:\\d{2}\\.\\d{2}\\]", "");
                lyrics = lyrics
                        .replaceAll("(?m)^\\s+", "")
                        .replaceAll("(?m)\\s+$", "")
                        .replaceAll("\\n{2,}", "\n")
                        .trim();
                lyrics = StringEscapeUtils.unescapeJava(lyrics);
                this.lyrics = lyrics;

                return this;
            } else {
                System.out.println("Failed to fetch lyrics.");

                return null;
            }
        } catch (Exception e) {
            System.out.println("An error occur while fetching lyrics: " + e.getMessage());

            return null;
        }
    }
}
