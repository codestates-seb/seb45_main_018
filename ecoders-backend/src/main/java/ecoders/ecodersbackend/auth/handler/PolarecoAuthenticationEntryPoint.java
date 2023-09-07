package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ecoders.ecodersbackend.exception.code.ExceptionCode.MEMBER_JWT_AUTHENTICATION_FAILED;

@Slf4j
@Component
public class PolarecoAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException authException
    ) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        String logMessage = exception == null ? authException.getMessage() : exception.getMessage();
        log.warn("Authentication Exception: {}", logMessage);
        ErrorResponse.send(response, MEMBER_JWT_AUTHENTICATION_FAILED);
    }
}
