package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;

    /**
     * 나만의미션 생성
     */
    public void createMission(MissionPostDto.Response postDto, Member member) {
        Mission mission = new Mission(
                postDto.getId(),
                postDto.getText(),
                postDto.getCreatedAt().toLocalDateTime(),
                postDto.getModifiedAt().toLocalDateTime(),
                member
        );
        missionRepository.save(mission);
    }

    private Mission findByMissionId(Long missionId) {
        return missionRepository.findByMissionId(missionId);
    }
 }
