package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.mission.dto.MissionCompleteResponse;
import ecoders.ecodersbackend.domain.mission.dto.MissionPatchDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyMissionService {

    private final MissionRepository missionRepository;

    /**
     * 나만의미션 생성
     */
    public MissionPostDto.Response createMission(
            MissionPostDto.Request postDto, Long memberId) throws IOException {

        Mission mission = new Mission(
                postDto.getText(),
                memberId
        );

        missionRepository.save(mission);
        Long missionId = mission.getMissionId();

        MissionPostDto.Response response = new MissionPostDto.Response(
                missionId,
                mission.getText(),
                mission.getCreatedAt(),
                mission.getModifiedAt(),
                memberId
        );

        return response;
    }

    /**
     * 나만의미션 수정
     */
    public MissionPatchDto.Response updateMission(
            Long missionId, MissionPatchDto.Request patchDto, Long memberId) throws IOException {

        Mission mission = missionRepository.findByMissionId(missionId);

        mission.setText(patchDto.getText());
        mission.setModifiedAt(Timestamp.valueOf(LocalDateTime.now()));

        missionRepository.save(mission);

        MissionPatchDto.Response response = new MissionPatchDto.Response(
                missionId,
                mission.getText(),
                mission.getCreatedAt(),
                mission.getModifiedAt(),
                memberId
        );

        return response;
    }

    /**
     * 나만의 미션 삭제
     */
    public void deleteMission(Long missionId, Long memberId) {

        Mission mission = missionRepository.findByMissionId(missionId);
        missionRepository.delete(mission);

    }

//    /**
//     * 나만의 미션 수행 완료, 취소
//     */
//    public MissionCompleteResponse patchMissionCompleted(Long memberId, Long missionId) {
//
//    }

}
