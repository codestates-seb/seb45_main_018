package ecoders.ecodersbackend.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecoders.ecodersbackend.auth.dto.AuthDto;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@AllArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        AuthDto.PolarecoLoginDto polarecoLoginDto = objectMapper.readValue(request.getInputStream(), AuthDto.PolarecoLoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(polarecoLoginDto.getEmail(), polarecoLoginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }
}
