package ecoders.ecodersbackend.domain.member.repository;

import ecoders.ecodersbackend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    Optional<Member> findByEmail(String email);

    @Modifying
    @Query("update Member m set m.username = :username where m.email = :email")
    Member updateUsername(String email, String username);
}
