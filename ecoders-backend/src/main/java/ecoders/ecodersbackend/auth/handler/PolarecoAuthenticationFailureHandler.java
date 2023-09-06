package ecoders.ecodersbackend.auth.handler;

import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import ecoders.ecodersbackend.exception.response.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static ecoders.ecodersbackend.exception.code.ExceptionCode.MEMBER_JWT_AUTHENTICATION_FAILED;

@Slf4j
public class PolarecoAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
        HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationException exception
    ) throws IOException, ServletException {
        log.error("Authentication failure: {}", exception.getMessage());
        Throwable cause = exception.getCause();
        ExceptionCode exceptionCode = cause == null
            ? MEMBER_JWT_AUTHENTICATION_FAILED
            : ((BusinessLogicException) cause).getExceptionCode();
        ErrorResponder.sendErrorResponse(response, exceptionCode);
    }
}
