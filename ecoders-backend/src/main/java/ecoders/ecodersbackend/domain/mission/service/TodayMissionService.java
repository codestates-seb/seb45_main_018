package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import ecoders.ecodersbackend.domain.mission.repository.TodayMissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TodayMissionService {

    private final TodayMissionRepository todayMissionRepository;

    /**
     * 오늘의 미션이 자정에 리셋되도록
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void updateTodayMission() {
    }

    /**
     * 오늘의 미션
     */
    public List<TodayMissionResponseDto> getMission(UUID memberId, int size) {

//        LocalDateTime today = LocalDateTime.now();

        // 오늘의 미션 랜덤으로 목록 가져오기
        List<Long> todayMissionIds = getTodayMission(size);

        List<TodayMissionResponseDto> missions = new ArrayList<>();
        for (Long missionId : todayMissionIds) {
            TodayMission todayMission = todayMissionRepository.findById(missionId).orElse(null);
            if (todayMission != null) {
                TodayMissionResponseDto todayMissionResponseDto = new TodayMissionResponseDto(
                        todayMission.getId(),
                        todayMission.getMissionContent(),
                        todayMission.isCompleted()
                );
                missions.add(todayMissionResponseDto);
            }
        }
        return missions;
    }


    /**
     * 오늘의 미션(getMission)에서 사용자가 설정한 개수만큼 랜덤으로 가져올 때 필요함
     */
    private List<Long> getTodayMission(int size) {
        List<TodayMission> allMissions = todayMissionRepository.findAll();
        ArrayList<Long> todayMissionIds = new ArrayList<>();

        Random random = new Random();
        for (int i = 0; i < size; i++) {
            if (!allMissions.isEmpty()) {
                int randomIndex = random.nextInt(allMissions.size());
                TodayMission mission = allMissions.get(randomIndex);
                todayMissionIds.add(mission.getId());
                allMissions.remove(randomIndex);
            }
        }
        return todayMissionIds;
    }

    /**
     * 오늘의 미션 수행 완료 및 취소
     */
    @Transactional
    public void patchMissionComplete(Long missionId, Boolean iscompleted) {
        TodayMission todayMission = todayMissionRepository.findById(missionId).orElse(null);
        if (todayMission != null) {
            todayMission.setCompleted(iscompleted);
        }
    }


}

