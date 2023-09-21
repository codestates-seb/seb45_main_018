package ecoders.ecodersbackend.domain.mission.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import ecoders.ecodersbackend.domain.mission.repository.MemberMissionRepository;
import ecoders.ecodersbackend.domain.mission.repository.MissionRepository;
import ecoders.ecodersbackend.domain.mission.service.MyMissionService;
import ecoders.ecodersbackend.domain.mission.service.TodayMissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
@Slf4j
public class TodayMissionController {

    private final MyMissionService missionService;
    private final TodayMissionService todayMissionService;
    private final MemberMissionRepository memberMissionRepository;
    private final MissionRepository missionRepository;
    private final JwtProvider jwtProvider;
    private final MemberService memberService;
    private TodayMissionResponseDto currentMission;


    /**
     * 오늘의미션 API (사용자 설정에 따른 갯수 랜덤)
     */
    @GetMapping("/today_mission")
    public ResponseEntity<List<TodayMissionResponseDto>> getTodayMissionList(
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        UUID memberId = getMemberIdFromAccessToken(accessToken);

        List<Mission> todayMissionList = todayMissionService.getTodayMission(memberId, size);

        List<TodayMissionResponseDto> responseDtos = new ArrayList<>();
        for (Mission mission : todayMissionList) {
            TodayMissionResponseDto responseDto = new TodayMissionResponseDto();
            responseDto.setId(mission.getId());
            responseDto.setText(mission.getText());
            responseDto.setMemberId(memberId);
            responseDtos.add(responseDto);
        }

        return ResponseEntity.ok(responseDtos);
    }

    /**
     * 오늘의 미션 수행 완료 및 취소
     */
    @PatchMapping("/today_mission/{mission_id}")
    public ResponseEntity<?> patchTodayMissionComplete(
            @PathVariable("mission_id") Long missionId,
            @RequestBody Boolean iscompleted,
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken) throws IOException {
        log.info("message");
        UUID memberId = getMemberIdFromAccessToken(accessToken);

        MemberMission memberMission = memberMissionRepository.findByMemberIdAndMissionId(memberId, missionId);

        if (memberMission != null) {
            log.info("message2");
            memberMission.setCompleted(iscompleted);
            memberMissionRepository.save(memberMission);
        }

        return ResponseEntity.ok().build();
    }

    private UUID getMemberIdFromAccessToken(String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.findMemberByEmail(email);
        UUID memberId = member.getId();
        return memberId;
    }
}