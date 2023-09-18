package ecoders.ecodersbackend.domain.mission.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.domain.mission.dto.MissionPatchDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.dto.TodayMissionResponseDto;
import ecoders.ecodersbackend.domain.mission.service.MyMissionService;
import ecoders.ecodersbackend.domain.mission.service.TodayMissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
public class MissionController {

    private final MyMissionService missionService;
    private final TodayMissionService todayMissionService;
    private final JwtProvider jwtProvider;
    private final MemberService memberService;
    private TodayMissionResponseDto currentMission;


    /**
     * 오늘의미션 API (사용자 설정에 따른 갯수 랜덤)
     */
    @ResponseBody
    @GetMapping("/today_mission")
    public ResponseEntity<?> getTodayMissionList(
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken,
            @RequestParam(name = "size", defaultValue = "5") int size) {

        List<TodayMissionResponseDto> todayMissionList = todayMissionService.getMission(getMemberIdFromAccessToken(accessToken), size);
        return ResponseEntity.ok().body(todayMissionList);
    }

    /**
     * 오늘의 미션 수행 완료 및 취소
     */
    @ResponseBody
    @PatchMapping("/today_mission/{today_mission_id}")
    public ResponseEntity<?> patchTodayMissionComplete(
            @PathVariable ("today_mission_id") Long missionId,
            @RequestBody boolean iscompleted) {
        todayMissionService.patchMissionComplete(missionId, iscompleted);
        return ResponseEntity.ok("Mission updated successfully!");
    }

    /**
     * 오늘의 미션 완료 개수 가져오기
     */
    @GetMapping("/today_mission/count")
    public ResponseEntity<Integer> getCompletedMissionCount() {
        int completedCount = todayMissionService.getCompletedMissionCount();
        return ResponseEntity.ok(completedCount);
    }

    /**
     * 나만의미션 생성 API
     */
    @PostMapping("/my_mission")
    public ResponseEntity<MissionPostDto.Response> createMission(
            @Valid @RequestBody MissionPostDto.Request postDto,
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken) throws IOException {
        Long memberId = getMemberIdFromAccessToken(accessToken);

        MissionPostDto.Response response = missionService.createMission(postDto, memberId);

        MissionPostDto.Response responseDto = new MissionPostDto.Response(
                response.getId(),
                response.getText(),
                response.getCreatedAt(),
                response.getModifiedAt(),
                response.getMemberId()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    /**
     * 나만의 미션 수정 API
     */
    @PatchMapping("/my_mission/{missionId}")
    public ResponseEntity<MissionPatchDto.Response> updateMission(
            @PathVariable Long missionId,
            @Valid @RequestBody MissionPatchDto.Request patchDto,
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken) throws IOException {
        Long memberId = getMemberIdFromAccessToken(accessToken);

        MissionPatchDto.Response response = missionService.updateMission(missionId, patchDto, memberId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /**
     * 나만의 미션 삭제 API
     */
    @DeleteMapping("/my_mission/{missionId}")
    public ResponseEntity deleteMission(
            @PathVariable Long missionId,
            @RequestHeader(HEADER_AUTHORIZATION) String accessToken) throws IOException {
        Long memberId = getMemberIdFromAccessToken(accessToken);

        missionService.deleteMission(missionId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private Long getMemberIdFromAccessToken(String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.findMemberByEmail(email);
        Long memberId = member.getId();
        return memberId;
    }

}