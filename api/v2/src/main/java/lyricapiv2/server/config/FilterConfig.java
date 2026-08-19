package lyricapiv2.server.config;

import lyricapiv2.server.properties.AllowedIPProperties;
import lyricapiv2.server.properties.RateLimitProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    private final AllowedIPProperties allowedIPFilter;
    private final RateLimitProperties rateLimitFilter;

    public FilterConfig(AllowedIPProperties allowedIPFilter, RateLimitProperties rateLimitFilter) {
        this.allowedIPFilter = allowedIPFilter;
        this.rateLimitFilter = rateLimitFilter;
    }

    @Bean
    public FilterRegistrationBean<AllowedIPProperties> allowedIPPropertiesFilterRegistration() {
        FilterRegistrationBean<AllowedIPProperties> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(allowedIPFilter);
        registrationBean.addUrlPatterns("/api/v2/*");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<RateLimitProperties> rateLimitPropertiesFilterRegistration() {
        FilterRegistrationBean<RateLimitProperties> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(rateLimitFilter);
        registrationBean.addUrlPatterns("/api/v2/*");
        return registrationBean;
    }
}

