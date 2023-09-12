package ecoders.ecodersbackend.domain.member.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static ecoders.ecodersbackend.exception.code.ExceptionCode.*;

@Slf4j
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
        memberRepository.findByEmail(email).ifPresent(member -> {
            log.warn("Member already exists with email: {}", email);
            throw new BusinessLogicException(MEMBER_ALREADY_EXISTS);
        });
    }

    public Member findMemberById(long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (member.isEmpty()) {
            log.warn("Member not found with id: {}", memberId);
            throw new BusinessLogicException(MEMBER_NOT_FOUND);
        }
        return member.get();
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            throw new BusinessLogicException(MEMBER_NOT_FOUND);
        }
        return member.get();
    }
}
