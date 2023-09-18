package ecoders.ecodersbackend.auth.validation.annotation;

import ecoders.ecodersbackend.auth.validation.validator.PolarecoUsernameValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target({ ElementType.PARAMETER, ElementType.FIELD })
@Constraint(validatedBy = { PolarecoUsernameValidator.class })
public @interface PolarecoUsername {

    String message() default "Username constraint violation";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
