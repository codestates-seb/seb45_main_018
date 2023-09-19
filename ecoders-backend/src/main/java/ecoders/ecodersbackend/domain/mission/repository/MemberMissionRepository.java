package ecoders.ecodersbackend.domain.mission.repository;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.MissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberMissionRepository extends JpaRepository<MemberMission, Long> {
    MemberMission findByMissionId(Long MissionId);

    List<MemberMission> findByMemberIdOrderByCreatedAt(UUID memberId);
    Optional<MemberMission> findByIdAndMemberId(Long missionId, UUID memberId);

    // 나만의 미션 전체 삭제시
    void deleteByMemberId(UUID memberId);

    // findByMemberIdAndMissionId 메서드 정의
    MemberMission findByMemberIdAndMissionId(UUID memberId, Long missionId);

    List<MemberMission> findByMissionMissionTypeAndCompletedAndCompletedAtBetween(
        MissionType missionType, boolean completed, LocalDateTime startDate, LocalDateTime endDate);

}
