package ecoders.ecodersbackend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(FORBIDDEN, "Member already exists"),
    MEMBER_NOT_FOUND(NOT_FOUND, "Member not found"),
    MEMBER_JWT_AUTHENTICATION_FAILED(UNAUTHORIZED, "JWT Authentication Failed");

    private final HttpStatus httpStatus;

    private final String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
