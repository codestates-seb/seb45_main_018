package ecoders.ecodersbackend.auth.mapper;

import ecoders.ecodersbackend.auth.dto.AuthDto;
import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.AllArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@AllArgsConstructor
@Component
public class AuthMapper {

    private final PasswordEncoder passwordEncoder;

    public Member signupDtoToMember(AuthDto.SignupDto signupDto) {
        return Member.builder()
            .id(new Date().getTime())
            .username(signupDto.getUsername())
            .email(signupDto.getEmail())
            .password(passwordEncoder.encode(signupDto.getPassword()))
            .authType(Member.AuthType.POLARECO)
            .isVerified(false)
            .build();
    }
}
