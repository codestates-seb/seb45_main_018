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

//    @GetMapping("/today_mission")
//    public TodayMissionResponseDto getTodayMission(@RequestParam("size") int size) {
//        if(currentMission == null || currentMission.getSize() != size) {
//            currentMission = missionService.
//        }
//    }


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