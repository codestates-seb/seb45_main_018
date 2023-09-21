package ecoders.ecodersbackend.auth.validation.annotation;

import ecoders.ecodersbackend.auth.validation.validator.PolarecoPasswordValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PolarecoPasswordValidator.class })
public @interface PolarecoPassword {

    String message() default "Password constraint violation";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
