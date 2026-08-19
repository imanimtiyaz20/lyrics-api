package lyricapiv2.server.model;

public class LyricsError {
    private String message;
    private String respone;

    public LyricsError(String message, String response) {
        this.message = message;
        this.respone = response;
    }

    public String getMessage() {
        return message;
    }
    public String getRespone() {
        return respone;
    }
}
