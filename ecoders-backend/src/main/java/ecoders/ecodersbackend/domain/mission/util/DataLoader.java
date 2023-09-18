package ecoders.ecodersbackend.domain.mission.util;

import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import ecoders.ecodersbackend.domain.mission.repository.TodayMissionRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private final TodayMissionRepository todayMissionRepository;
    private boolean dataInitialized = false;

    public DataLoader(TodayMissionRepository todayMissionRepository) {
        this.todayMissionRepository = todayMissionRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!dataInitialized) {
            initializeData();
            dataInitialized = true;
        }
    }

    public void initializeData() {
        TodayMission mission1 = TodayMission.builder().missionContent("사용하지 않는 전자제품 플러그 뽑기").build();
        todayMissionRepository.save(mission1);
        TodayMission mission2 = TodayMission.builder().missionContent("빨래 모아서 세탁하기").build();
        todayMissionRepository.save(mission2);
        TodayMission mission3 = TodayMission.builder().missionContent("에어컨 필터 청소하기").build();
        todayMissionRepository.save(mission3);
        TodayMission mission4 = TodayMission.builder().missionContent("여름철 실내 적정 온도 26도 유지하기").build();
        todayMissionRepository.save(mission4);
        TodayMission mission5 = TodayMission.builder().missionContent("사용하지 않는 조명 소등하기").build();
        todayMissionRepository.save(mission5);
        TodayMission mission6 = TodayMission.builder().missionContent("대중교통 이용하기").build();
        todayMissionRepository.save(mission6);
        TodayMission mission7 = TodayMission.builder().missionContent("가까운 거리 걷기나 달리기").build();
        todayMissionRepository.save(mission7);
        TodayMission mission8 = TodayMission.builder().missionContent("읽지 않는 뉴스레터 구독 취소하기").build();
        todayMissionRepository.save(mission8);
        TodayMission mission9 = TodayMission.builder().missionContent("불필요한(이미 확인한 메일, 오랫동안 읽지 않은 메일) 메일 삭제하기(메일함 비우기)").build();
        todayMissionRepository.save(mission9);
        TodayMission mission10 = TodayMission.builder().missionContent("텀블러 사용하기").build();
        todayMissionRepository.save(mission10);
        TodayMission mission11 = TodayMission.builder().missionContent("장바구니 사용하기").build();
        todayMissionRepository.save(mission11);
        TodayMission mission12 = TodayMission.builder().missionContent("화면 밝기 줄이기").build();
        todayMissionRepository.save(mission12);
        TodayMission mission13 = TodayMission.builder().missionContent("영상 자동 재생 끄기").build();
        todayMissionRepository.save(mission13);
        TodayMission mission14 = TodayMission.builder().missionContent("유튜브 시청 시간 줄이고 다른 활동하기").build();
        todayMissionRepository.save(mission14);
        TodayMission mission15 = TodayMission.builder().missionContent("배달보다 포장하기").build();
        todayMissionRepository.save(mission15);
        TodayMission mission16 = TodayMission.builder().missionContent("자가용보다 공공자전거 이용하기").build();
        todayMissionRepository.save(mission16);
        TodayMission mission17 = TodayMission.builder().missionContent("샤워 빨리하기(샤워에 집중)").build();
        todayMissionRepository.save(mission17);
    }
}
