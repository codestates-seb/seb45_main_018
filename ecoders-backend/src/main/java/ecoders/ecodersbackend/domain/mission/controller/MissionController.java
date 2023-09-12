package ecoders.ecodersbackend.domain.mission.controller;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.auth.service.PolarecoMemberDetails;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.dto.MissionResponseDto;
import ecoders.ecodersbackend.domain.mission.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/mission")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;
    private final JwtProvider jwtProvider;


    /**
     * 오늘의미션 API (사용자 설정에 따른 갯수 랜덤)
     */



    /**
     * 나만의미션 생성 API
     */
    @PostMapping("/my_mission")
        public ResponseEntity<String> createMission(@RequestBody MissionPostDto.Response postDto,
                                                    @AuthenticationPrincipal Member member) {
        try {
            missionService.createMission(postDto, member);
            return ResponseEntity.status(HttpStatus.CREATED).body("나만의 미션이 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("나만의 미션 생성중 오류가 발생했습니다.");
        }
    }


}
