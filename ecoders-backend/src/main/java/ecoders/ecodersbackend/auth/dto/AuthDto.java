package ecoders.ecodersbackend.auth.dto;

import ecoders.ecodersbackend.auth.validation.annotation.PolarecoPassword;
import ecoders.ecodersbackend.auth.validation.annotation.PolarecoUsername;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;

public class AuthDto {

    @Getter
    public static class SignupDto {

        @PolarecoUsername
        private String username;

        @Email
        private String email;

        @PolarecoPassword
        private String password;
    }

    @Getter
    @Setter
    public static class PolarecoLoginDto {

        private String email;

        private String password;
    }

    @Getter
    public static class GoogleLoginDto {

        private String username;

        private String email;
    }
}
