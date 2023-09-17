package ecoders.ecodersbackend.domain.member.service;

import ecoders.ecodersbackend.auth.email.EmailService;
import ecoders.ecodersbackend.auth.util.VerificationCodeIssuer;
import ecoders.ecodersbackend.domain.member.dto.VerificationCode;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.domain.member.repository.VerificationCodeRepository;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

import static ecoders.ecodersbackend.exception.code.ExceptionCode.*;

@Slf4j
@AllArgsConstructor
@Transactional
@Service
public class MemberService {

    private final EmailService emailService;

    private final MemberRepository memberRepository;

    private final VerificationCodeRepository verificationCodeRepository;

    public UUID signup(Member member) {
        // 해당 이메일 주소로 가입한 회원이 존재하는지 조회, 존재하지 않으면 새 회원 생성 및 데이터베이스에 저장
        String email = member.getEmail();
        checkExistingMemberByEmail(email);
        Member signedUpMember = memberRepository.save(member);
        log.info("새 유저 이메일: {}", signedUpMember.getEmail());
        log.info("새 유저 ID: {}", signedUpMember.getId());
        log.info("새 유저 닉네임: {}", signedUpMember.getUsername());
        log.info("새 유저 가입 벤더: {}", signedUpMember.getAuthType());
        log.info("새 유저 이메일 인증 여부: {}", signedUpMember.isVerified());
        UUID signedUpMemberId = signedUpMember.getId();

        // 인증 코드 발급 및 데이터베이스에 저장
        String code = VerificationCodeIssuer.issue();
        log.info("인증 코드: {}", code);
        VerificationCode verificationCode = VerificationCode.builder()
            .memberId(signedUpMemberId)
            .email(email)
            .code(code)
            .build();
        verificationCodeRepository.save(verificationCode);

//        // 인증 이메일 전송
//        emailService.sendVerificationMail(email);
//        log.info("이메일 전송 완료");
        return signedUpMemberId;
    }

    public void verifyEmail() {

    }

    public Member googleLogin(Member member) {
        try {
            return findMemberByEmail(member.getEmail());
        } catch (BusinessLogicException e) {
            return memberRepository.save(member);
        }
    }

    public Member findMemberById(UUID uuid) {
        Optional<Member> member = memberRepository.findById(uuid);
        if (member.isEmpty()) {
            log.warn("Member not found with id: {}", uuid);
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

    public Member updateMember(String email, Member member) {
        Member foundMember = findMemberByEmail(email);
        foundMember.setUsername(member.getUsername());
        return memberRepository.save(foundMember);
    }

    private void checkExistingMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            log.warn("Member already exists with email: {}", email);
            throw new BusinessLogicException(MEMBER_ALREADY_EXISTS);
        }
    }
}
