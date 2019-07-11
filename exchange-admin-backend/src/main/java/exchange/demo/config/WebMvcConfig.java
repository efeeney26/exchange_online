package exchange.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	private final long MAX_AGE_SECS = 3600;

	public void addCorsMapping(CorsRegistry corsRegistry) {
		corsRegistry.addMapping("/**")
					.allowedOrigins("*")
					.allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
					.maxAge(MAX_AGE_SECS);
	}
}
