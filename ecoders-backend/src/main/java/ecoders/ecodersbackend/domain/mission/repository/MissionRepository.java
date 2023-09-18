package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.mission.entity.MyMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MissionRepository extends JpaRepository<MyMission, Long> {
    MyMission findByMissionId(Long MissionId);

    List<MyMission> findByMemberIdOrderByCreatedAt(Long memberId);
    Optional<MyMission> findByMissionIdAndMember(Long missionId, Member member);
}
