package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
    Mission findByMissionId(Long MissionId);
}
