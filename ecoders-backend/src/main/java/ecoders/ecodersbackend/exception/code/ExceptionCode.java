package ecoders.ecodersbackend.exception.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum ExceptionCode {

    MEMBER_ALREADY_EXISTS(FORBIDDEN, "Member already exists"),
    MEMBER_NOT_FOUND(NOT_FOUND, "Member not found"),
    AUTHENTICATION_METHOD_NOT_ALLOWED(METHOD_NOT_ALLOWED, "Authentication method not allowed"),
    AUTHENTICATION_FAILED(UNAUTHORIZED, "JWT authentication failed"),
    EXPIRED_ACCESS_TOKEN(UNAUTHORIZED, "Expired access token"),
    EXPIRED_REFRESH_TOKEN(UNAUTHORIZED, "Expired refresh token"),
    CURRENT_PASSWORD_MISMATCH(FORBIDDEN, "Current password mistmatch"),
    POST_NOT_FOUND(NOT_FOUND, "Post not found"),
    CANNOT_CHANGE_POST(FORBIDDEN, "Post cannot change"),
    CANNOT_DELETE_POST(FORBIDDEN, "Post cannot delete"),
    COMMENT_NOT_FOUND(NOT_FOUND, "Comment not found"),
    CANNOT_CHANGE_COMMENT(FORBIDDEN, "Comment cannot change"),
    CANNOT_DELETE_COMMENT(FORBIDDEN, "Comment cannot delete");


    private final HttpStatus httpStatus;

    private final String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
