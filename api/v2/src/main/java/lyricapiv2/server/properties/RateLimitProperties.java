package lyricapiv2.server.properties;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitProperties implements Filter {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final SettingsProperties settings;

    public RateLimitProperties(SettingsProperties settings) {
        this.settings = settings;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (settings.getRateLimit() == null || !settings.getRateLimit().isEnabled()) {
            chain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String ip = httpRequest.getRemoteAddr();
        int reqPerMinute = settings.getRateLimit().getReqPerMinute();
        Bucket bucket = buckets.computeIfAbsent(ip, k -> newBucket(reqPerMinute));

        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            httpResponse.setHeader("X-Rate-Limit-Limit", String.valueOf(reqPerMinute));
            httpResponse.setHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            chain.doFilter(request, response);
        } else {
            long retryAfter = TimeUnit.NANOSECONDS.toSeconds(probe.getNanosToWaitForRefill());
            httpResponse.setHeader("Retry-After", String.valueOf(retryAfter));
            httpResponse.setStatus(429);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write(
                    "{\n" +
                            "  \"message\": \"Too many requests. Try again in " + retryAfter + " seconds.\"\n" +
                            "  \"response\": \"429 Too Many Requests\"\n" +
                            "}"
            );
        }
    }

    private Bucket newBucket(int reqPerMinute) {
        return Bucket.builder()
                .addLimit(limit -> limit.capacity(reqPerMinute)
                        .refillGreedy(reqPerMinute, Duration.ofMinutes(1)))
                .build();
    }
}
