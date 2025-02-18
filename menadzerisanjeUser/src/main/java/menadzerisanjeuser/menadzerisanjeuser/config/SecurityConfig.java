package menadzerisanjeuser.menadzerisanjeuser.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource)) // Set CORS configuration
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/auth/login").permitAll() // Explicitly permit login endpoint
                        .requestMatchers("/api/**").permitAll() // Allow all other API endpoints (adjust as needed)
                        .anyRequest().authenticated()); // Other requests require authentication
        return http.build();
    }
}
