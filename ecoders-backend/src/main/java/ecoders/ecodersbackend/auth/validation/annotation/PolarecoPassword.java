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

    String message() default "비밀번호는 알파벳, 숫자, 키보드로 입력할 수 있는 특수문자로 구성된 8~20자의 문자열이어야 합니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
