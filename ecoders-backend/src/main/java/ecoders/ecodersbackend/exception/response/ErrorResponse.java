package ecoders.ecodersbackend.exception.response;

import ecoders.ecodersbackend.exception.ExceptionCode;
import lombok.Getter;


@Getter
public class ErrorResponse {

    private final String status;

    private final String message;

    private ErrorResponse(ExceptionCode exceptionCode) {
        this.status = exceptionCode.getHttpStatus().toString();
        this.message = exceptionCode.getMessage();
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode);
    }
}
