package ecoders.ecodersbackend.auth.jwt;

import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import io.jsonwebtoken.Claims;
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
            Claims claims = verifyToken(request);
            setAuthenticationTokenToSecurityContext(claims);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String accessToken = request.getHeader("Authorization");
        return accessToken == null || !accessToken.startsWith("Bearer ");
    }

    private Claims verifyToken(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        return jwtProvider.getClaims(accessToken);
    }

    private void setAuthenticationTokenToSecurityContext(Claims claims) {
        String email = (String) claims.get("email");
        boolean isVerified = (boolean) claims.get("is-verified");
        List<GrantedAuthority> authorities = polarecoAuthorityUtils.createAuthorities(isVerified);
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
