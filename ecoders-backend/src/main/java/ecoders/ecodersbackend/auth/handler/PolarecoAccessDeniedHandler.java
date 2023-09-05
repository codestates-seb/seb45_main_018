package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.exception.response.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ecoders.ecodersbackend.exception.ExceptionCode.MEMBER_JWT_AUTHENTICATION_FAILED;

@Slf4j
public class PolarecoAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(
        HttpServletRequest request,
        HttpServletResponse response,
        AccessDeniedException accessDeniedException
    ) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        String logMessage = exception == null ? accessDeniedException.getMessage() : exception.getMessage();
        log.warn("Authentication Exception: {}", logMessage);
        ErrorResponder.sendErrorResponse(response, MEMBER_JWT_AUTHENTICATION_FAILED);
    }
}
