package lyricapiv2.server.properties;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "settings")
public class SettingsProperties {
    private final static Logger logger = LoggerFactory.getLogger(SettingsProperties.class);
    private boolean ipBlock;
    private List<String> allowedIP;
    private RateLimit rateLimit; // nested object

    public boolean getIpBlock() {
        return ipBlock;
    }

    public void setIpBlock(boolean ipBlock) {
        this.ipBlock = ipBlock;
    }

    public List<String> getAllowedIP() {
        return allowedIP;
    }

    public void setAllowedIP(List<String> allowedIP) {
        this.allowedIP = allowedIP;
    }

    public RateLimit getRateLimit() {
        return rateLimit;
    }

    public void setRateLimit(RateLimit rateLimit) {
        this.rateLimit = rateLimit;
    }

    public static class RateLimit {
        private boolean enabled;
        private int reqPerMinute;

        public boolean isEnabled() {
            return enabled;
        }

        public void setEnabled(boolean enabled) {
            this.enabled = enabled;
        }

        public int getReqPerMinute() {
            return reqPerMinute;
        }

        public void setReqPerMinute(int reqPerMinute) {
            this.reqPerMinute = reqPerMinute;
        }
    }

    @PostConstruct
    public void validateSettings() {
        if (!ipBlock) {
            logger.warn("Start application without IP blocking.");
        } else {
            logger.info("Start application with IP blocking.");
        }

        if (rateLimit == null || !rateLimit.isEnabled()) {
            logger.warn("Start application without Rate limit.");
        } else {
            logger.info("Start application with Rate limit: " + rateLimit.getReqPerMinute() + " req/min.");
        }

        if (ipBlock && (allowedIP == null || allowedIP.isEmpty())) {
            logger.error("IP blocking is enabled but no allowed IPs are configured! Application cannot start properly.");
        }
    }
}
