package ecoders.ecodersbackend.auth.filter;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
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

@AllArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    private final PolarecoAuthorityUtils polarecoAuthorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        try {
            String accessToken = resolveToken(request, "Authorization").replace("Bearer ", "");
            Claims claims = jwtProvider.getClaims(accessToken);
            setAuthenticationTokenToSecurityContext(claims);
        } catch (ExpiredJwtException accessTokenExpiredException) {
            try {
                String refreshToken = resolveToken(request, "Refresh-Token").replace("Bearer ", "");
                jwtProvider.getClaims(refreshToken);
            } catch (ExpiredJwtException refreshTokenExpiredException) {
                request.setAttribute("exception", refreshTokenExpiredException);
            }
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String accessToken = resolveToken(request, "Authorization");
        String refreshToken = resolveToken(request, "Refresh-Token");
        return accessToken == null
               || refreshToken == null
               || !accessToken.startsWith("Bearer ")
               || !refreshToken.startsWith("Bearer ");
    }

    private String resolveToken(HttpServletRequest request, String header) {
        return request.getHeader(header);
    }

    private void setAuthenticationTokenToSecurityContext(Claims claims) {
        String email = (String) claims.get("email");
        boolean isVerified = (boolean) claims.get("is-verified");
        List<GrantedAuthority> authorities = polarecoAuthorityUtils.createAuthorities(isVerified);
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
