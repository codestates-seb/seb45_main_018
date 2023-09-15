package ecoders.ecodersbackend.domain.member.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.dto.MemberDto;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@Slf4j
@AllArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    private final JwtProvider jwtProvider;

    @GetMapping("/my-info")
    public ResponseEntity<MemberDto.Response> getMyInfo(@RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.findMemberByEmail(email);
        MemberDto.Response responseDto = MemberDto.Response.parse(member);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MemberDto.Response> getMember(@PathVariable("member-id") UUID uuid) {
        Member member = memberService.findMemberById(uuid);
        MemberDto.Response responseDto = MemberDto.Response.parse(member);
        return ResponseEntity.ok(responseDto);
    }
}
