package lyricapiv2.server.service.platform.musixmatch;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Token {
    private final String tokenUrl = "https://apic-desktop.musixmatch.com/ws/1.1/token.get?app_id=web-desktop-app-v1.0";
    private static String cachedToken = null;
    private static long tokenExpiry = 0;

    private synchronized void refreshToken() {
        try {
            Connector connector = new Connector();
            String result = connector.get(tokenUrl);
            Pattern pattern = Pattern.compile("\"user_token\":\"(.*?)\"");
            Matcher match = pattern.matcher(result);

            if (match.find()) {
                cachedToken = match.group(1);
                tokenExpiry = System.currentTimeMillis() + (30 * 60 * 1000);
            } else {
                throw new RuntimeException("Failed to extract user token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to refresh token: " + e.getMessage());
        }
    }

    public String getToken() {
        if (cachedToken == null || System.currentTimeMillis() >= tokenExpiry) {
            refreshToken();
        }

        return cachedToken;
    }
}
