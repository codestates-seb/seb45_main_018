package ecoders.ecodersbackend.domain.stamp;

import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.entity.MissionType;
import ecoders.ecodersbackend.domain.mission.repository.MemberMissionRepository;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StampService {

    private final MissionRepository missionRepository;
    private final MemberMissionRepository memberMissionRepository;
    private final StampRepository stampRepository;

    /**
     * 오늘의 미션 완료 개수 가져오기
     */
    @Transactional
    public int getStampCount(UUID memberId, LocalDateTime startDate, LocalDateTime endDate) {

        LocalDateTime completionTime = LocalDateTime.now();


        List<Stamp> existingStamp = stampRepository.findByMemberIdAndStampDateBetween(memberId, startDate, endDate);
        List<MemberMission> competedMissions =
                memberMissionRepository.findByMissionMissionTypeAndCompletedAndCompletedAtBetween(MissionType.TODAY_MISSION, true, startDate, endDate);

        int completedMissionCount = competedMissions.size();

        if (completedMissionCount > 0) {

            boolean stampAlreadyExists = existingStamp.stream()
                    .anyMatch(stamp -> stamp.getStampDate().isEqual(completionTime));

            if (!stampAlreadyExists) {
                long stampCountOnThisDate = existingStamp.stream()
                        .filter(stamp -> stamp.getStampDate().toLocalDate().isEqual(completionTime.toLocalDate()))
                        .count();

                if (stampCountOnThisDate < 5) {
                    Stamp stamp = new Stamp();
                    stamp.setMemberId(memberId);
                    stamp.setStampDate(startDate);
                    stamp.setCompletedCount(1);

                    stampRepository.save(stamp);
                }
            }
        }
        return completedMissionCount;
    }
}

