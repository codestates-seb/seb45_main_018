package ecoders.ecodersbackend.auth.validation.validator;

import ecoders.ecodersbackend.auth.validation.annotation.PolarecoPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PolarecoPasswordValidator implements ConstraintValidator<PolarecoPassword, String> {

    @Override
    public void initialize(PolarecoPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String passwordRegex = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[`~!@#$%^&*()\\-_=+;:'\"{}\\[\\]\\\\|,.<>/?])"
                               + "[a-zA-Z\\d`~!@#$%^&*()\\-_=+;:'\"{}\\[\\]\\\\|,.<>/?]{8,20}$";
        return value != null && value.matches(passwordRegex);
    }
}
