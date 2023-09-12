package ecoders.ecodersbackend.auth.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class AuthDto {

    @Getter
    public static class SignupDto {

        private String username;

        private String email;

        private String password;
    }

    @Getter
    @Setter
    @ToString
    public static class LoginDto {

        private String email;

        private String password;
    }
}
