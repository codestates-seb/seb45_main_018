package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import ecoders.ecodersbackend.domain.mission.repository.TodayMissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

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
        Date today = new Date();
        List<TodayMission> missions = todayMissionRepository.findAll();

        for (TodayMission mission : missions) {
            mission.setMissionDate(today);
            todayMissionRepository.save(mission);
        }
    }

    /**
     * 오늘의 미션
     */
    public List<TodayMissionResponseDto> getMission(Long memberId, int size) {

        Date today = new Date();

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
     * 오늘의 미션 랜덤으로 가져오기(사용자가 설정한 갯수만큼)
     */
    private List<Long> getTodayMission(int size) {
        List<TodayMission> missionIdList = todayMissionRepository.findAll();
        ArrayList<Long> todayMissionIds = new ArrayList<>();

        Random random = new Random();
        for (int i = 0; i < size; i ++) {
            int id = random.nextInt(missionIdList.size());
            while(todayMissionIds.contains(missionIdList.get(id).getId())) {
                id = random.nextInt(missionIdList.size());
            }
            todayMissionIds.add(missionIdList.get(id).getId());
        }

        return todayMissionIds;
    }

}
