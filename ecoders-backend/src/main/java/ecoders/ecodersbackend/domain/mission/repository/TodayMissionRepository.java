package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodayMissionRepository extends JpaRepository<TodayMission, Long> {
}
