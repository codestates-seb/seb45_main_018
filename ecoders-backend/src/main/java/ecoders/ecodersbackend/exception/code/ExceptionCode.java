package ecoders.ecodersbackend.exception.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(FORBIDDEN, "Member already exists"),
    MEMBER_NOT_FOUND(NOT_FOUND, "Member not found"),
    JWT_AUTHENTICATION_METHOD_NOT_ALLOWED(METHOD_NOT_ALLOWED, "Authentication method not allowed"),
    MEMBER_JWT_AUTHENTICATION_FAILED(UNAUTHORIZED, "JWT authentication failed");

    private final HttpStatus httpStatus;

    private final String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
