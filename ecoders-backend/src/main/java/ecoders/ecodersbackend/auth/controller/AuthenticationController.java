package ecoders.ecodersbackend.auth.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.mapper.AuthMapper;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.util.UriCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.UUID;

import static ecoders.ecodersbackend.auth.dto.AuthDto.GoogleLoginDto;
import static ecoders.ecodersbackend.auth.dto.AuthDto.SignupDto;
import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;
import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_REFRESH_TOKEN;

@AllArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final AuthMapper authMapper;

    private final MemberService memberService;

    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupDto signupDto) {
        Member member = authMapper.signupDtoToMember(signupDto);
        UUID id = memberService.signup(member);
        URI location = UriCreator.createUri("/members/{id}", id);
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/oauth/google/login")
    public void googleLogin(@RequestBody GoogleLoginDto googleLoginDto, HttpServletResponse response) {
        Member member = authMapper.googleLoginDtoToMember(googleLoginDto);
        Member signedInMember = memberService.googleLogin(member);

        String memberId = signedInMember.getId().toString();
        String email = signedInMember.getEmail();
        boolean isVerified = signedInMember.isVerified();
        Claims claims = Jwts.claims().setSubject(memberId);
        claims.put("email", email);
        claims.put("isVerified", isVerified);

        response.setHeader(HEADER_AUTHORIZATION, jwtProvider.generateAccessToken(claims));
        response.setHeader(HEADER_REFRESH_TOKEN, jwtProvider.generateRefreshToken(claims));
        response.setHeader("Member-ID", memberId);
    }
}
