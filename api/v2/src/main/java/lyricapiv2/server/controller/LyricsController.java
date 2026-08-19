package lyricapiv2.server.controller;

import lyricapiv2.server.model.ApiResponse;
import lyricapiv2.server.model.ApiVersion;
import lyricapiv2.server.service.LyricsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/lyrics")
public class LyricsController {

    private final LyricsService lyricsService;

    public LyricsController(LyricsService lyricsService) {
        this.lyricsService = lyricsService;
    }

    @GetMapping
    public ResponseEntity<?> getLyrics(
            @RequestParam String platform,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String trackid,
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) String translate
    ) throws Exception {
        ResponseEntity<?> lyricsResponse = lyricsService.getLyrics(platform, trackid, title, artist, translate);
        Object body = lyricsResponse.getBody();
        HttpStatus status = (HttpStatus) lyricsResponse.getStatusCode();
        ApiVersion version = new ApiVersion();
        ApiResponse<Object> apiResponse = new ApiResponse<>(body, version);

        return new ResponseEntity<>(apiResponse, status);
    }
}
