package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.service.PolarecoMemberDetails;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@AllArgsConstructor
@Component
public class PolarecoAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {
        PolarecoMemberDetails memberDetails = (PolarecoMemberDetails) authentication.getPrincipal();
        String accessToken = jwtProvider.generateAccessToken(memberDetails);
        String refreshToken = jwtProvider.generateRefreshToken(memberDetails.getMemberId());
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh-Token", "Bearer " + refreshToken);
        log.info("Authenticated successfully");
    }
}
