package ecoders.ecodersbackend.auth.controller;

import ecoders.ecodersbackend.auth.mapper.AuthMapper;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.util.UriCreator;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

import static ecoders.ecodersbackend.auth.dto.AuthDto.SignupDto;

@AllArgsConstructor
@RestController
public class AuthenticationController {

    private final AuthMapper authMapper;

    private final MemberService memberService;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto) {
        Member member = authMapper.signupDtoToMember(signupDto);
        long id = memberService.signup(member);
        URI location = UriCreator.createUri("/members/{id}", id);
        return ResponseEntity.created(location).build();
    }
}
