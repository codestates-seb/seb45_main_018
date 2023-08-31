package ecoders.ecodersbackend.auth.dto;

import lombok.Getter;

public class AuthDto {

    @Getter
    public static class SignupDto {

        private String username;

        private String email;

        private String password;
    }
}
