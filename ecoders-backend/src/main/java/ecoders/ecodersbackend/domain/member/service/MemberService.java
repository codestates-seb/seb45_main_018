package ecoders.ecodersbackend.domain.member.service;

import ecoders.ecodersbackend.auth.email.EmailService;
import ecoders.ecodersbackend.auth.util.VerificationCodeIssuer;
import ecoders.ecodersbackend.domain.member.dto.VerificationCode;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.domain.member.repository.VerificationCodeRepository;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final PasswordEncoder passwordEncoder;

    public UUID signup(Member member) {
        // 해당 이메일 주소로 가입한 회원이 존재하는지 조회, 존재하지 않으면 새 회원 생성 및 데이터베이스에 저장
        String email = member.getEmail();
        checkExistingMemberByEmail(email);
        Member signedUpMember = memberRepository.save(member);
        log.info("신규 회원 DB 등록 완료");
        UUID signedUpMemberId = signedUpMember.getId();

        // 인증 코드 발급 및 데이터베이스에 저장
        String code = VerificationCodeIssuer.issue();
        VerificationCode verificationCode = VerificationCode.builder()
            .memberId(signedUpMemberId)
            .email(email)
            .code(code)
            .build();
        verificationCodeRepository.save(verificationCode);
        log.info("인증 코드 발급 및 DB 저장 완료");

        // 인증 이메일 전송
        emailService.sendVerificationMail(email);
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

    public Member updateUsername(String email, String newUsername) {
        Member foundMember = findMemberByEmail(email);
        foundMember.setUsername(newUsername);
        return memberRepository.save(foundMember);
    }

    public void updatePassword(String email, String currentPassword, String newPassword) {
        Member foundMember = findMemberByEmail(email);
        String encodedPassword = foundMember.getPassword();
        if (!passwordEncoder.matches(currentPassword, encodedPassword)) {
            throw new BusinessLogicException(CURRENT_PASSWORD_MISMATCH);
        }
        foundMember.setPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(foundMember);
    }

    public Member updateProfileImage(String email, String imageUrl) {
        Member foundMember = findMemberByEmail(email);
        foundMember.setImageUrl(imageUrl);
        return memberRepository.save(foundMember);
    }

    public void deleteMember(String email) {
        Member foundMember = findMemberByEmail(email);
        memberRepository.delete(foundMember);
    }

    private void checkExistingMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            log.warn("Member already exists with email: {}", email);
            throw new BusinessLogicException(MEMBER_ALREADY_EXISTS);
        }
    }
}
