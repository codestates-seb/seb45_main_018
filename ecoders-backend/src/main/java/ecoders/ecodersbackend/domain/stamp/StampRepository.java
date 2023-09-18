package ecoders.ecodersbackend.domain.stamp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface StampRepository extends JpaRepository<Stamp, Long> {

    List<Stamp> findByMemberIdAndStampDateBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
}
