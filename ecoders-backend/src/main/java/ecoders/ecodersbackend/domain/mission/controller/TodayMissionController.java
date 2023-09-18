package ecoders.ecodersbackend.domain.mission.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.service.MyMissionService;
import ecoders.ecodersbackend.domain.mission.service.TodayMissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
public class TodayMissionController {

    private final MyMissionService missionService;
    private final TodayMissionService todayMissionService;
    private final JwtProvider jwtProvider;
    private final MemberService memberService;
    private TodayMissionResponseDto currentMission;


    /**
     * 오늘의미션 API (사용자 설정에 따른 갯수 랜덤)
     */
    @GetMapping("/today_mission")
    public ResponseEntity<?> getTodayMissionList(
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
            @RequestParam(name = "size", defaultValue = "5") int size) {

        List<TodayMissionResponseDto> todayMissionList = todayMissionService.getMission(getMemberIdFromAccessToken(accessToken), size);

        TodayMissionResponseDto[] todayMissionListArray = todayMissionList.toArray(new TodayMissionResponseDto[0]);

        return ResponseEntity.ok().body(todayMissionListArray);
    }

    /**
     * 오늘의 미션 수행 완료 및 취소
     */
    @PatchMapping("/today_mission/{today_mission_id}")
    public ResponseEntity<?> patchTodayMissionComplete(
            @PathVariable ("today_mission_id") Long missionId,
            @RequestBody boolean iscompleted,
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken) throws IOException {

        todayMissionService.patchMissionComplete(missionId, iscompleted);
        return ResponseEntity.ok().build();
    }



    private Long getMemberIdFromAccessToken(String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.findMemberByEmail(email);
        Long memberId = member.getId();
        return memberId;
    }

}