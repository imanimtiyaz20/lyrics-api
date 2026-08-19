package lyricapiv2.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class RootController {
    @GetMapping("/")
    public RedirectView home() {
        return new RedirectView("https://lyrics.lewdhutao.my.eu.org");
    }
}
