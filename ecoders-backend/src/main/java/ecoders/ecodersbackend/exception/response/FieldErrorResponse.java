package ecoders.ecodersbackend.exception.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class FieldErrorResponse {

    private List<FieldErrorInfo> fieldErrorInfos;

    public static FieldErrorResponse of(BindingResult bindingResult) {
        return new FieldErrorResponse(FieldErrorInfo.of(bindingResult));
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Getter
    public static final class FieldErrorInfo {

        private String fieldName;

        private Object rejectedValue;

        private String message;

        public static List<FieldErrorInfo> of(BindingResult bindingResult) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                .map(fieldError -> new FieldErrorInfo(
                    fieldError.getField(),
                    fieldError.getRejectedValue(),
                    fieldError.getDefaultMessage()
                )).collect(Collectors.toList());
        }
    }
}
