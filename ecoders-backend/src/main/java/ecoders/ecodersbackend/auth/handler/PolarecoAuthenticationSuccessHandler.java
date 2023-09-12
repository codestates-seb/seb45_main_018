package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.service.PolarecoMemberDetails;
import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@AllArgsConstructor
public class PolarecoAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {
        PolarecoMemberDetails memberDetails = (PolarecoMemberDetails) authentication.getPrincipal();
        Claims claims = Jwts.claims().setSubject(Long.toString(memberDetails.getId()));
        claims.put("email", memberDetails.getEmail());
        claims.put("isVerified", memberDetails.isVerified());
        String accessToken = jwtProvider.generateAccessToken(claims);
        String refreshToken = jwtProvider.generateRefreshToken(claims);
//        String email = memberDetails.getEmail();
//        List<GrantedAuthority> authorities = PolarecoAuthorityUtils.getAuthorities(memberDetails.isVerified());
//        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh-Token", "Bearer " + refreshToken);
        response.setHeader("Member-ID", Long.toString(memberDetails.getId()));
        log.info("Authenticated successfully");
    }
}
