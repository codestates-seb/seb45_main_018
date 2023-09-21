package ecoders.ecodersbackend.domain.member.repository;

import ecoders.ecodersbackend.domain.member.dto.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    Optional<VerificationCode> findByEmail(String email);
}
