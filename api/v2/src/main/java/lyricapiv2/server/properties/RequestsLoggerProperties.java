package lyricapiv2.server.properties;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RequestsLoggerProperties implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(RequestsLoggerProperties.class.getName());

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String ip = httpRequest.getRemoteAddr();
        String uri = httpRequest.getRequestURI();
        String query = httpRequest.getQueryString();
        String fullQuery = (query == null) ? uri : uri + "?" + query;

        logger.info("Request from IP: {} -> {}", ip, fullQuery);

        chain.doFilter(request, response);
    }
}
