package ecoders.ecodersbackend.domain.member.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.validation.annotation.PolarecoUsername;
import ecoders.ecodersbackend.domain.member.dto.MemberDto;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@Slf4j
@AllArgsConstructor
@RequestMapping("/members")
@RestController
@Validated
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

    @DeleteMapping("/my-info")
    public ResponseEntity<?> deleteMyInfo(@RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        memberService.deleteMember(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<MemberDto.Response> getMember(@PathVariable("member-id") UUID uuid) {
        Member member = memberService.findMemberById(uuid);
        MemberDto.Response responseDto = MemberDto.Response.parse(member);
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/username")
    public ResponseEntity<MemberDto.Response> updateUsername(
        @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
        @RequestParam("username") @PolarecoUsername String newUsername
    ) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.updateUsername(email, newUsername);
        MemberDto.Response responseDto = MemberDto.Response.parse(member);
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/password")
    public ResponseEntity<?> updatePassword(
        @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
        @RequestBody @Valid MemberDto.PatchPassword patchPasswordDto
    ) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        memberService.updatePassword(email, patchPasswordDto.getCurrentPassword(), patchPasswordDto.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/profile-image")
    public ResponseEntity<?> updateProfileImage(
        @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
        @RequestParam("img") String imageUrl
    ) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.updateProfileImage(email, imageUrl);
        MemberDto.Response responseDto = MemberDto.Response.parse(member);
        return ResponseEntity.ok(responseDto);
    }
}
