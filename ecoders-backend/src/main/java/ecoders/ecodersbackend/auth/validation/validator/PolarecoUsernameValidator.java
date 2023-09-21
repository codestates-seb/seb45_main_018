package ecoders.ecodersbackend.auth.validation.validator;

import ecoders.ecodersbackend.auth.validation.annotation.PolarecoUsername;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PolarecoUsernameValidator implements ConstraintValidator<PolarecoUsername, String> {

    @Override
    public void initialize(PolarecoUsername constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String usernameRegex = "^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z\\d]{4,20}$";
        return value != null && value.matches(usernameRegex);
    }
}
