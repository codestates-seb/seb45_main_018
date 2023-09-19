package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ecoders.ecodersbackend.exception.code.ExceptionCode.AUTHENTICATION_FAILED;

@Slf4j
public class PolarecoAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception
    ) throws IOException, ServletException {
        ErrorResponse.send(response, AUTHENTICATION_FAILED);
        log.error("Authentication failed: {}", exception.toString());
    }
}
