package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodayMissionRepository extends JpaRepository<TodayMission, Long> {

    int countByCompleted(boolean completed);

    List<TodayMission> findByCompletedAndCompletionDateBetween(boolean completed, LocalDateTime startDate, LocalDateTime endDate);
}
