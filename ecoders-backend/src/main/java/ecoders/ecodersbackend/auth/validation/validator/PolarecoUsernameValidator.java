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
        return value != null
               && !value.isBlank()
               && value.length() <= 20;
    }
}
