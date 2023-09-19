package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MemberMissionRepository;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import ecoders.ecodersbackend.domain.mission.util.TodayMissionData;
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
    private final TodayMissionData todayMissionData;
    private final MemberService memberService;

    /**
     * 오늘의 미션이 자정에 리셋되도록
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void updateTodayMission() {
//        List<Mission> todayMissions = getTodayMission();

//        missionRepository.saveAll(todayMissions);
    }

    /**
     * 오늘의 미션(getMission)에서 사용자가 설정한 개수만큼 랜덤으로 가져올 때 필요함
     */
    @Transactional
    public List<Mission> getTodayMission(UUID memberId, int size) {
        List<Mission> missionList = new ArrayList<>();
        List<Mission> allMissions = missionRepository.findAll();

        Random random = new Random();
        int missionCount = allMissions.size();

        for (int i = 0; i < size; i++) {
            if (!allMissions.isEmpty()) {
                int randomIndex = random.nextInt(allMissions.size());
                Mission mission = allMissions.get(randomIndex);

                Member memberById = memberService.findMemberById(memberId);

                MemberMission memberMission = new MemberMission();
                memberMission.setMission(mission);
                memberMission.setMember(memberById);

                missionList.add(mission);
                memberMissionRepository.save(memberMission);

                allMissions.remove(randomIndex);

            }
        }
        return missionList;
    }

    /**
     * 오늘의 미션 수행 완료 및 취소
     */
    @Transactional
    public void patchMissionComplete(UUID memberId, Long missionId, boolean completed) {
        MemberMission memberMission = memberMissionRepository.findById(missionId).orElse(null);
        if (memberMission != null) {
            memberMission.setCompleted(completed);
            memberMissionRepository.save(memberMission);
        }
    }
}

