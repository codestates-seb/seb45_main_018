package ecoders.ecodersbackend.exception.advice;

import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import ecoders.ecodersbackend.exception.response.ErrorResponse;
import ecoders.ecodersbackend.exception.response.FieldErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleBusinessLogicException(BusinessLogicException exception) {
        ExceptionCode exceptionCode = exception.getExceptionCode();
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        return new ResponseEntity<>(errorResponse, exceptionCode.getHttpStatus());
    }

    @ExceptionHandler
    public ResponseEntity<FieldErrorResponse> handleConstraintError(MethodArgumentNotValidException exception) {
        FieldErrorResponse fieldErrorResponse = FieldErrorResponse.of(exception.getBindingResult());
        return ResponseEntity.badRequest().body(fieldErrorResponse);
    }
}
