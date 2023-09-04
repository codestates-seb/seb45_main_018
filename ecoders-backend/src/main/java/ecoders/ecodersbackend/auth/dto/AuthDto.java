package ecoders.ecodersbackend.auth.dto;

import lombok.Getter;
import lombok.Setter;

public class AuthDto {

    @Getter
    public static class SignupDto {

        private String username;

        private String email;

        private String password;
    }

    @Getter
    @Setter
    public static class LoginDto {

        private String email;

        private String password;
    }
}
