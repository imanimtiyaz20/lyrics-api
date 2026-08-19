package lyricapiv2.server.properties;

import lyricapiv2.server.config.FilterConfig;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class AllowedIPProperties implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(RequestsLoggerProperties.class.getName());
    private final boolean ipBlock;
    private final List<String> allowedIP;

    public AllowedIPProperties(SettingsProperties settingsProperties) {
        this.ipBlock = settingsProperties.getIpBlock();
        this.allowedIP = settingsProperties.getAllowedIP();
    }

    public void init(FilterConfig filterConfig) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (!ipBlock) {
            chain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String fullRequest = httpRequest.getRequestURI() +
                (httpRequest.getQueryString() != null ? "?" + httpRequest.getQueryString() : "");
        String clientIp = httpRequest.getHeader("X-Forwarded-For");

        if (clientIp == null) {
            clientIp = httpRequest.getRemoteAddr();
        }

        if ("0:0:0:0:0:0:0:1".equals(clientIp)) {
            clientIp = "127.0.0.1";
        }

        if (!allowedIP.contains(clientIp)) {
            httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write(
                    "{\n" +
                            "  \"message\": \"Forbidden.\"\n" +
                            "  \"response\": \"403 Forbidden\"\n" +
                            "}"
            );
            logger.warn("Blocked request from IP {} -> {}", clientIp, fullRequest);
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
