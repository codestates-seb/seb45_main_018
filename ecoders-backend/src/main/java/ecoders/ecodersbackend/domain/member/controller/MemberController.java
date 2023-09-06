package ecoders.ecodersbackend.domain.member.controller;

import ecoders.ecodersbackend.domain.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{member-id}")
    public ResponseEntity<?> test(@PathVariable("member-id") long memberId) {
        return ResponseEntity.ok("my id: " + memberId);
    }
}
