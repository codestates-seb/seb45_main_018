package ecoders.ecodersbackend.domain.mission.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.domain.mission.dto.MemberMissionDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionPatchDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MemberMissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyMissionService {

    private final MemberMissionRepository memberMissionRepository;
    private final MemberRepository memberRepository;

    /**
     * 나만의미션 생성
     */
    public MissionPostDto.Response createMission(
            MissionPostDto.Request postDto, UUID memberId) throws IOException {

        Mission mission = new Mission();
        mission.setText(postDto.getText());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        MemberMission memberMission = new MemberMission();
        memberMission.setMission(mission);
        memberMission.setMember(member);
        memberMission.setCreatedAt(LocalDateTime.now());

        memberMissionRepository.save(memberMission);

        log.info("미션 생성 : memberId={}, missionId={}", memberId, mission.getId());

        return mapToMissionResponse(memberMission);
    }

    /**
     * 나만의미션 수정
     */
    public MissionPatchDto.Response updateMission(
            Long missionId, MissionPatchDto.Request patchDto, UUID memberId) throws IOException {

        MemberMission memberMission = memberMissionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("미션을 찾을 수 없습니다."));


        // 미션 내용 수정
        memberMission.getMission().setText(patchDto.getText());
        memberMission.setModifiedAt(LocalDateTime.now());

        // 변경 사항 저장
        memberMissionRepository.save(memberMission);

        log.info("미션업데이트: memberId={}, missionId={}", memberId, missionId);

        return mapToMissionPatchResponse(memberMission);
    }

    /**
     * 나만의 미션 전체 조회
     */
    public List<MemberMissionDto> getAllMissions() {
        List<MemberMission> missions = memberMissionRepository.findAll();

        return missions.stream()
                .map(this::mapToMemberMissionDto)
                .collect(Collectors.toList());
    }


    /**
     * 나만의 미션 수행 완료 및 취소
     */
    @Transactional
    public void patchMissionComplete(Long missionId, boolean isCompleted) {
        MemberMission memberMission = memberMissionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("미션을 찾을 수 없습니다."));

        memberMission.setCompleted(isCompleted);

        log.info("미션 완료 설정: missionId={}, isCompleted={}", missionId, isCompleted);
    }

    /**
     * 나만의 미션 삭제
     */
    public void deleteMission(Long missionId, UUID memberId) {

        MemberMission memberMission = memberMissionRepository.findById(missionId)
                .orElseThrow(() -> new IllegalArgumentException("미션을 찾을 수 없습니다."));

        if (memberMission.getMember().getId().equals(memberId)) {
            memberMissionRepository.delete(memberMission);
            log.info("미션 삭제: memberId={}, missionId={}", memberId, missionId);
        } else {
            throw new IllegalStateException("해당 미션을 삭제할 권한이 없습니다.");
        }
    }

    /**
     * 나만의 전체 삭제
     */
    @Transactional
    public void deleteAllMission(UUID memberId) {

        memberMissionRepository.deleteByMemberId(memberId);

    }


    private MissionPostDto.Response mapToMissionResponse(MemberMission memberMission) {
        return new MissionPostDto.Response(
                memberMission.getMission().getId(),
                memberMission.getMission().getText(),
                memberMission.getCreatedAt(),
                memberMission.getCompletedAt(),
                memberMission.getMember().getId(),
                memberMission.isCompleted()
        );
    }

    private MissionPatchDto.Response mapToMissionPatchResponse(MemberMission memberMission) {
        return new MissionPatchDto.Response(
                memberMission.getMission().getId(),
                memberMission.getMission().getText(),
                memberMission.getCreatedAt(),
                memberMission.getModifiedAt(),
                memberMission.getCompletedAt(),
                memberMission.isCompleted()
        );
    }

    private MemberMissionDto mapToMemberMissionDto(MemberMission memberMission) {
        MemberMissionDto memberMissionDto = new MemberMissionDto();
        memberMissionDto.setId(memberMission.getMission().getId());
        memberMissionDto.setText(memberMission.getMission().getText());
        memberMissionDto.setCreatedAt(memberMission.getCreatedAt());
        memberMissionDto.setCompletedAt(memberMission.getCompletedAt());
        memberMissionDto.setCompleted(memberMission.isCompleted());
        return memberMissionDto;
    }
}
