package ecoders.ecodersbackend.config;

import ecoders.ecodersbackend.auth.handler.PolarecoAuthenticationFailureHandler;
import ecoders.ecodersbackend.auth.handler.PolarecoAuthenticationSuccessHandler;
import ecoders.ecodersbackend.auth.jwt.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

    private final PolarecoAuthenticationSuccessHandler polarecoAuthenticationSuccessHandler;

    private final PolarecoAuthenticationFailureHandler polarecoAuthenticationFailureHandler;

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(polarecoAuthenticationSuccessHandler);
        jwtAuthenticationFilter.setAuthenticationFailureHandler(polarecoAuthenticationFailureHandler);
        builder.addFilter(jwtAuthenticationFilter);
    }
}
