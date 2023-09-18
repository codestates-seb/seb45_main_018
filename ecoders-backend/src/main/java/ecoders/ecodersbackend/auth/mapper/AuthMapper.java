package ecoders.ecodersbackend.auth.mapper;

import ecoders.ecodersbackend.auth.dto.AuthDto;
import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static ecoders.ecodersbackend.domain.member.entity.Member.AuthType.*;

@AllArgsConstructor
@Component
public class AuthMapper {

    private final PasswordEncoder passwordEncoder;

    public Member signupDtoToMember(AuthDto.SignupDto signupDto) {
        return Member.builder()
            .username(signupDto.getUsername())
            .email(signupDto.getEmail())
            .password(passwordEncoder.encode(signupDto.getPassword()))
            .authType(POLARECO)
            .isVerified(false)
            .build();
    }

    public Member googleLoginDtoToMember(AuthDto.GoogleLoginDto googleLoginDto) {
        return Member.builder()
            .email(googleLoginDto.getEmail())
            .username(googleLoginDto.getUsername())
            .authType(GOOGLE)
            .isVerified(true)
            .build();
    }
}
