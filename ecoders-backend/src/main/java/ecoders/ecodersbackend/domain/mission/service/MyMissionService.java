package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.mission.dto.MissionPatchDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.MyMission;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyMissionService {

    private final MissionRepository missionRepository;

    /**
     * 나만의미션 생성
     */
    public MissionPostDto.Response createMission(
            MissionPostDto.Request postDto, UUID memberId) throws IOException {

        MyMission myMission = new MyMission(
                postDto.getText(),
                memberId
        );

        missionRepository.save(myMission);
        Long missionId = myMission.getMissionId();

        MissionPostDto.Response response = new MissionPostDto.Response(
                myMission.getMissionId(),
                myMission.getText(),
                myMission.getCreatedAt(),
                myMission.getModifiedAt(),
                memberId,
                myMission.getCompleted()
        );

        return response;
    }

    /**
     * 나만의미션 수정
     */
    public MissionPatchDto.Response updateMission(
            Long missionId, MissionPatchDto.Request patchDto, UUID memberId) throws IOException {

        MyMission myMission = missionRepository.findByMissionId(missionId);

        myMission.setText(patchDto.getText());
        myMission.setModifiedAt(Timestamp.valueOf(LocalDateTime.now()));

        missionRepository.save(myMission);

        MissionPatchDto.Response response = new MissionPatchDto.Response(
                missionId,
                myMission.getText(),
                myMission.getCreatedAt(),
                myMission.getModifiedAt(),
                myMission.getCompleted()
        );

        return response;
    }

    /**
     * 나만의 미션 전체 조회
     */
    public List<MyMission> getAllMissions() {
        return missionRepository.findAll();
    }

    /**
     * 나만의 미션 수행 완료 및 취소
     */
    @Transactional
    public void patchMissionComplete(Long missionId, Boolean iscompleted) {
        MyMission myMission = missionRepository.findById(missionId).orElse(null);
        if (myMission != null) {
            myMission.setCompleted(iscompleted);
        }
    }
    
    /**
     * 나만의 미션 삭제
     */
    public void deleteMission(Long missionId, UUID memberId) {

        MyMission myMission = missionRepository.findByMissionId(missionId);
        missionRepository.delete(myMission);

    }
}
