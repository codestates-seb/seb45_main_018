package ecoders.ecodersbackend.domain.mission.util;

import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.entity.MissionType;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class TodayMissionData {

    private final MissionRepository missionRepository;

    public TodayMissionData(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public void todayMissionData() {
        List<Mission> missions = new ArrayList<>();

        String[] missionList = {
                "사용하지 않는 전자제품 플러그 뽑기",
                "빨래 모아서 세탁하기",
                "에어컨 필터 청소하기",
                "여름철 실내 적정 온도 26도 유지하기",
                "사용하지 않는 조명 소등하기",
                "대중교통 이용하기",
                "가까운 거리 걷기나 달리기",
                "읽지 않는 뉴스레터 구독 취소하기",
                "불필요한 메일 삭제하기",
                "텀블러 사용하기",
                "장바구니 사용하기",
                "화면 밝기 줄이기",
                "영상 자동 재생 끄기",
                "유튜브 시청 시간 줄이고 다른 활동하기",
                "배달보다 포장하기",
                "자가용보다 공공자전거 이용하기",
                "샤워 빨리하기(샤워에 집중)",
        };
        for (String missionDescription : missionList) {
            Mission mission = Mission.builder()
                    .missionType(MissionType.TODAY_MISSION)
                    .build();
            missions.add(mission);
        }
        missionRepository.saveAll(missions);
    }
}
