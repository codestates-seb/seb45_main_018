package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MemberMissionRepository;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class TodayMissionService {

    private final MissionRepository missionRepository;
    private final MemberMissionRepository memberMissionRepository;

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

        // 오늘의 미션 랜덤으로 목록 가져오기
        List<Long> todayMissionIds = getTodayMission(size);

        List<TodayMissionResponseDto> missions = new ArrayList<>();
        for (Long missionId : todayMissionIds) {
            Optional<MemberMission> missionOptional = memberMissionRepository.findByIdAndMemberId(missionId, memberId);
            if (missionOptional.isPresent()) {
                MemberMission memberMission = missionOptional.get();
                TodayMissionResponseDto todayMissionResponseDto = new TodayMissionResponseDto(
                        memberMission.getMission().getId(),
                        memberMission.getMission().getText(),
                        memberMission.isCompleted()
                );
                missions.add(todayMissionResponseDto);
            }
            // 예외처리?
        }
        return missions;
    }


    /**
     * 오늘의 미션(getMission)에서 사용자가 설정한 개수만큼 랜덤으로 가져올 때 필요함
     */
    private List<Long> getTodayMission(int size) {
        List<Mission> allMissions = missionRepository.findAll();
        ArrayList<Long> todayMissionIds = new ArrayList<>();

        Random random = new Random();
        for (int i = 0; i < size; i++) {
            if (!allMissions.isEmpty()) {
                int randomIndex = random.nextInt(allMissions.size());
                Mission mission = allMissions.get(randomIndex);
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
    public void patchMissionComplete(Long missionId, Boolean completed) {
        MemberMission memberMission = memberMissionRepository.findById(missionId).orElse(null);
        if (memberMission != null) {
            memberMission.setCompleted(completed);
        }
    }
}

