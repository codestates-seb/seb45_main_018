package ecoders.ecodersbackend.auth.jwt;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    public static final String HEADER_AUTHORIZATION = "Authorization";

    public static final String HEADER_REFRESH_TOKEN = "Refresh-Token";

    private final Key secretKey;

    private final int accessTokenExpirationMinutes;

    private final int refreshTokenExpirationMinutes;

    public JwtProvider(
        @Value("${jwt.secret-key}") String secretKey,
        @Value("${jwt.access-token-expiration-minutes}") int accessTokenExpirationMinutes,
        @Value("${jwt.refresh-token-expiration-minutes}") int refreshTokenExpirationMinutes
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpirationMinutes = accessTokenExpirationMinutes;
        this.refreshTokenExpirationMinutes = refreshTokenExpirationMinutes;
    }

    public String generateAccessToken(Claims claims) {
        return generateToken(claims, accessTokenExpirationMinutes);
    }

    public String generateRefreshToken(Claims claims) {
        return generateToken(claims, refreshTokenExpirationMinutes);
    }

    private String generateToken(Claims claims, int expirationMinutes) {
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMinutes * 60000L))
            .signWith(secretKey)
            .compact();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(removePrefix(token))
            .getBody();
    }

    private String removePrefix(String bearerToken) {
        return bearerToken.replace("Bearer ", "");
    }

    public String getEmailFromToken(String token) {
        return (String) getClaims(token).get("email");
    }

    public void issueTokens(Member member, HttpServletResponse response) {
        String uuid = member.getId().toString();
        String email = member.getEmail();
        boolean isVerified = member.isVerified();

        Claims claims = Jwts.claims().setSubject(uuid);
        claims.put("email", email);
        claims.put("isVerified", isVerified);

        String accessToken = generateAccessToken(claims);
        String refreshToken = generateRefreshToken(claims);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh-Token", "Bearer " + refreshToken);
        response.setHeader("Member-ID", uuid);
    }
}
