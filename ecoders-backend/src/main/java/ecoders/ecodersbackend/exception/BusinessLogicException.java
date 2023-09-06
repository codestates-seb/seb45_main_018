package ecoders.ecodersbackend.exception;

import ecoders.ecodersbackend.exception.code.ExceptionCode;
import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        this.exceptionCode = exceptionCode;
    }
}
