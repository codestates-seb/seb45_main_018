package ecoders.ecodersbackend.exception.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ConstraintErrorResponse {

    private List<ConstraintErrorInfo> constraintErrorInfos;

    public static ConstraintErrorResponse of(Set<ConstraintViolation<?>> constraintViolations) {
        return new ConstraintErrorResponse(ConstraintErrorInfo.of(constraintViolations));
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Getter
    public static final class ConstraintErrorInfo {

        private String propertyPath;

        private Object invalidValue;

        private String message;

        public static List<ConstraintErrorInfo> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                .map(constraintViolation -> new ConstraintErrorInfo(
                    constraintViolation.getPropertyPath().toString(),
                    constraintViolation.getInvalidValue(),
                    constraintViolation.getMessage()
                )).collect(Collectors.toList());
        }
    }
}
