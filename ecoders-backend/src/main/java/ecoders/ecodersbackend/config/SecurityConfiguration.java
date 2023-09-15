package ecoders.ecodersbackend.config;

import ecoders.ecodersbackend.auth.handler.PolarecoAccessDeniedHandler;
import ecoders.ecodersbackend.auth.handler.PolarecoAuthenticationEntryPoint;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@AllArgsConstructor
@Configuration
public class SecurityConfiguration {

    private final CustomFilterConfigurer customFilterConfigurer;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity builder) throws Exception {
        builder
            .headers().frameOptions().sameOrigin()
            .and().csrf().disable()
            .cors(Customizer.withDefaults())
            .formLogin().disable()
            .httpBasic().disable()
            .exceptionHandling()
            .authenticationEntryPoint(new PolarecoAuthenticationEntryPoint())
            .accessDeniedHandler(new PolarecoAccessDeniedHandler())
            .and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout", "DELETE"))
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().authorizeHttpRequests(registry -> registry
                .antMatchers(POST, "/auth/").permitAll()
                .antMatchers(GET, "/members/my-info").hasAnyRole("UNVERIFIED", "VERIFIED")
                .antMatchers(GET, "/members/").permitAll()
                .antMatchers(POST, "/mission/my-mission").hasAnyRole("UNVERIFIED", "VERIFIED")
                .antMatchers(POST, "/posts/uploadImage").hasRole("VERIFIED")
                .antMatchers(POST, "/posts/").hasRole("VERIFIED")
                .antMatchers(GET, "/posts/").permitAll()
                .anyRequest().permitAll()
            )
            .apply(customFilterConfigurer);
        return builder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://polareco-deploy.s3-website.ap-northeast-2.amazonaws.com"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setExposedHeaders(List.of("Authorization", "Refresh-Token", "Member-UUID"));
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
