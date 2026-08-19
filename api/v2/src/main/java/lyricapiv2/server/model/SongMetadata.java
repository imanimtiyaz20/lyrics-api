package lyricapiv2.server.model;

public class SongMetadata {
    private String trackId;
    private String trackName;
    private String artistName;
    private String albumCoverArt;
    private String platform;

    public SongMetadata(String artistName, String trackName, String trackId, String platform, String albumCoverArt) {
        this.artistName = artistName;
        this.trackName = trackName;
        this.trackId = trackId;
        this.platform = platform;
        this.albumCoverArt = albumCoverArt;
    }

    public void setTrackId(String trackId) {
        this.trackId = trackId;
    }
    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }
    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }
    public void setAlbumCoverArt(String albumCoverArt) {
        this.albumCoverArt = albumCoverArt;
    }
    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getTrackId() {
        return trackId;
    }
    public String getTrackName() {
        return trackName;
    }
    public String getArtistName() {
        return artistName;
    }
    public String getAlbumCoverArt() {
        return albumCoverArt;
    }
    public String getPlatform() {
        return platform;
    }
}
