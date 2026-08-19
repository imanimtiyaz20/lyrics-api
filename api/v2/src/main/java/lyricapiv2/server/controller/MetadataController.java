package lyricapiv2.server.controller;

import lyricapiv2.server.model.ApiResponse;
import lyricapiv2.server.model.ApiVersion;
import lyricapiv2.server.service.LyricsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/metadata")
public class MetadataController {

    private final LyricsService lyricsService;

    public MetadataController(LyricsService lyricsService) {
        this.lyricsService = lyricsService;
    }

    @GetMapping
    public ResponseEntity<?> getSongMetadata(
            @RequestParam String platform,
            @RequestParam(required = false, defaultValue = "false") boolean recommendation,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String country
    ) throws Exception {
        ResponseEntity<?> songMetadata = lyricsService.getSongMetadata(platform, recommendation, country, title);
        Object body = songMetadata.getBody();
        HttpStatus status = (HttpStatus) songMetadata.getStatusCode();
        ApiVersion version = new ApiVersion();
        ApiResponse<Object> apiResponse = new ApiResponse<>(body, version);

        return new ResponseEntity<>(apiResponse, status);
    }
}

