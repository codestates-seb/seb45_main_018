package ecoders.ecodersbackend.auth.jwt;

import ecoders.ecodersbackend.auth.service.PolarecoMemberDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

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

    public String generateAccessToken(PolarecoMemberDetails memberDetails) {
        return Jwts.builder()
            .setSubject(memberDetails.getMemberId() + "-access-token")
            .claim("id", memberDetails.getMemberId())
            .claim("username", memberDetails.getUsername())
            .claim("email", memberDetails.getEmail())
            .setIssuedAt(new Date())
            .setExpiration(getExpiration(accessTokenExpirationMinutes))
            .signWith(secretKey)
            .compact();
    }

    public String generateRefreshToken(long memberId) {
        return Jwts.builder()
            .setSubject(memberId + "-refresh-token")
            .setIssuedAt(new Date())
            .setExpiration(getExpiration(refreshTokenExpirationMinutes))
            .signWith(secretKey)
            .compact();
    }

    private Date getExpiration(int expirationMinutes) {
        return new Date(System.currentTimeMillis() + expirationMinutes * 60000L);
    }
}
