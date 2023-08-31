package ecoders.ecodersbackend.domain.member.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static ecoders.ecodersbackend.exception.ExceptionCode.*;

@AllArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public long signup(Member member) {
        checkExistingMemberByEmail(member.getEmail());
        return memberRepository.save(member).getId();
    }

    public void checkExistingMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new BusinessLogicException(MEMBER_ALREADY_EXISTS);
        }
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }
}
