package ecoders.ecodersbackend.domain.stamp;

import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import ecoders.ecodersbackend.domain.mission.repository.TodayMissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StampService {

    private final TodayMissionRepository todayMissionRepository;
    private final StampRepository stampRepository;

    /**
     * 오늘의 미션 완료 개수 가져오기
     */
    @Transactional
    public int getStampCount(Long memberId, LocalDateTime startDate, LocalDateTime endDate) {

        LocalDateTime completionTime = LocalDateTime.now();


        List<Stamp> existingStamp = stampRepository.findByMemberIdAndStampDateBetween(memberId, startDate, endDate);
        List<TodayMission> competedMissions =
                todayMissionRepository.findByCompletedAndCompletionDateBetween(true, startDate, endDate);

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

