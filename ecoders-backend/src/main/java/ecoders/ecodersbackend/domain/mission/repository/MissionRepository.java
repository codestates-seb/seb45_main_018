package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
    Mission findByMissionId(Long MissionId);

    Optional<Mission> findByMissionIdAndMember(Long missionId, Member member);
}
