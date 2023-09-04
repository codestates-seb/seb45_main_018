package ecoders.ecodersbackend.auth.handler;

import com.google.gson.Gson;
import ecoders.ecodersbackend.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ecoders.ecodersbackend.exception.ExceptionCode.MEMBER_JWT_AUTHENTICATION_FAILED;

@Slf4j
@Component
public class PolarecoAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception
    ) throws IOException, ServletException {
        log.error("Authentication failure: {}", exception.getMessage());
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(MEMBER_JWT_AUTHENTICATION_FAILED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(MEMBER_JWT_AUTHENTICATION_FAILED.getHttpStatus().value());
        response.getWriter().write(gson.toJson(errorResponse));
    }
}
