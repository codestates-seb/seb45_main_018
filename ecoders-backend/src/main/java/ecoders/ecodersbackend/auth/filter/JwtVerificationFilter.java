package ecoders.ecodersbackend.auth.filter;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import ecoders.ecodersbackend.exception.response.ErrorResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.*;

@Slf4j
@AllArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            verifyAccessToken(request);
            log.info("액세스 토큰 검증 완료");
        } catch (ExpiredJwtException expiredAccessTokenException) {
            try {
                verifyRefreshToken(request, response);
                log.info("리프레시 토큰 검증 완료");
                ErrorResponse.send(response, ExceptionCode.EXPIRED_ACCESS_TOKEN);
                return;
            } catch (ExpiredJwtException expiredRefreshTokenException) {
                log.warn("리프레시 토큰 만료");
                ErrorResponse.send(response, ExceptionCode.EXPIRED_REFRESH_TOKEN);
                return;
            }
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String accessToken = resolveAccessToken(request);
        String refreshToken = resolveAccessToken(request);
        return accessToken == null
               || refreshToken == null
               || !accessToken.startsWith("Bearer ")
               || !refreshToken.startsWith("Bearer ");
    }

    private String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader(HEADER_AUTHORIZATION);
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader(HEADER_REFRESH_TOKEN);
    }

    private void verifyAccessToken(HttpServletRequest request) throws JwtException {
        String accessToken = resolveAccessToken(request).replace("Bearer ", "");
        Claims claims = jwtProvider.getClaims(accessToken);
        log.info("Valid access token");
        setAuthenticationTokenToSecurityContext(claims);
    }

    private void verifyRefreshToken(HttpServletRequest request, HttpServletResponse response) throws JwtException {
        String refreshToken = resolveRefreshToken(request).replace("Bearer ", "");
        Claims claims = jwtProvider.getClaims(refreshToken);
        log.info("Valid refresh token");
        setReissuedTokensToResponseHeader(claims, response);
        setAuthenticationTokenToSecurityContext(claims);
    }

    private void setReissuedTokensToResponseHeader(Claims claims, HttpServletResponse response) {
        String reissuedAccessToken = jwtProvider.generateAccessToken(claims);
        String reissuedRefreshToken = jwtProvider.generateRefreshToken(claims);
        response.setHeader(HEADER_AUTHORIZATION, reissuedAccessToken);
        response.setHeader(HEADER_REFRESH_TOKEN, reissuedRefreshToken);
    }

    private void setAuthenticationTokenToSecurityContext(Claims claims) {
        String email = (String) claims.get("email");
        boolean isVerified = (boolean) claims.get("isVerified");
        List<GrantedAuthority> authorities = PolarecoAuthorityUtils.getAuthorities(isVerified);
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
