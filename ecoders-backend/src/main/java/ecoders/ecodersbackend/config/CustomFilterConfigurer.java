package ecoders.ecodersbackend.config;

import ecoders.ecodersbackend.auth.handler.PolarecoAuthenticationFailureHandler;
import ecoders.ecodersbackend.auth.handler.PolarecoAuthenticationSuccessHandler;
import ecoders.ecodersbackend.auth.jwt.JwtAuthenticationFilter;
import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.jwt.JwtVerificationFilter;
import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

    private final JwtProvider jwtProvider;

    private final PolarecoAuthorityUtils polarecoAuthorityUtils;

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
        jwtAuthenticationFilter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/auth/login", "POST"));
        jwtAuthenticationFilter.setAuthenticationSuccessHandler(new PolarecoAuthenticationSuccessHandler(jwtProvider));
        jwtAuthenticationFilter.setAuthenticationFailureHandler(new PolarecoAuthenticationFailureHandler());
        JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtProvider, polarecoAuthorityUtils);
        builder.addFilter(jwtAuthenticationFilter)
            .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
    }
}
