package ecoders.ecodersbackend.auth.validation.annotation;

import ecoders.ecodersbackend.auth.validation.validator.PolarecoUsernameValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.PARAMETER, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { PolarecoUsernameValidator.class })
public @interface PolarecoUsername {

    String message() default "닉네임은 한글, 알파벳, 숫자를 포함하는 4~20자의 문자열이어야 하며 공백을 포함할 수 없습니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
