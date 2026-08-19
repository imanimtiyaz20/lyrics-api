package lyricapiv2.server.service.platform.musixmatch;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Connector {
    public String get(String url) throws Exception {
        URL obj = new URL(url);
        HttpURLConnection conn = (HttpURLConnection) obj.openConnection();

        conn.setInstanceFollowRedirects(false);
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0");
        conn.setRequestProperty("cookie", "AWSELBCORS=0; AWSELB=0;");

        int status = conn.getResponseCode();
        if (status == 301 || status == 302) {
            String redirectUrl = conn.getHeaderField("Location");

            if (redirectUrl == null) {
                throw new RuntimeException("Redirected but no location header found.");
            }

            return get(redirectUrl);
        }

        if (status != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException("Unexpected response code: " + status);
        }

        BufferedReader input = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder content = new StringBuilder();
        String inputLine;

        while ((inputLine = input.readLine()) != null) {
            content.append(inputLine);
        }

        input.close();
        conn.disconnect();

        return content.toString();
    }
}
