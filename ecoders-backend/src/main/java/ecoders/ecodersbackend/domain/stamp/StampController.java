package ecoders.ecodersbackend.domain.stamp;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@RestController
@RequiredArgsConstructor
public class StampController {

    private final StampService stampService;
    private final JwtProvider jwtProvider;
    private final MemberService memberService;

    /**
     * 오늘의 미션 완료 개수 가져오기
     */
    @GetMapping("/today_mission/count")
    public ResponseEntity<Integer> getCompletedMissionCount(@RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        LocalDateTime today = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

        UUID memberId = getMemberIdFromAccessToken(accessToken);

        int completedCount = stampService.getStampCount(memberId, today, endOfDay);
        return ResponseEntity.ok(completedCount);
    }


//    /**
//     * 주간 스탬프 조회
//     */
//    @GetMapping("/stamp/weekly")
//    public ResponseEntity<WeeklyStampDto> getWeeklyStampCount(@RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
//
//        UUID memberId = getMemberIdFromAccessToken(accessToken);
//
//        WeeklyStampDto weeklyStampDto = new WeeklyStampDto();
//
//        LocalDateTime currentDate = LocalDateTime.now();
//        DayOfWeek currentDay = currentDate.getDayOfWeek();
//
//        for (int i = 0; i < currentDay.getValue(); i++) {
//
//            LocalDateTime startOfWeekDate = currentDate.minusDays(i).with(LocalDateTime.MIN);
//            LocalDateTime endOfWeekDate = currentDate.plusDays(6 - i).with(LocalDateTime.MAX);
//
//            if (startOfWeekDate.isBefore(endOfWeekDate)) {
//                switch (i) {
//                    case 0:
//                        weeklyStampDto.setSundayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 1:
//                        weeklyStampDto.setMondayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 2:
//                        weeklyStampDto.setTuesdayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 3:
//                        weeklyStampDto.setWednesdayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 4:
//                        weeklyStampDto.setThursdayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 5:
//                        weeklyStampDto.setFridayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                    case 6:
//                        weeklyStampDto.setSaturdayCount(stampService.getStampCount(memberId, startOfWeekDate, endOfWeekDate));
//                        break;
//                }
//            }
//        }
//        return ResponseEntity.ok(weeklyStampDto);
//    }

    private UUID getMemberIdFromAccessToken(String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = memberService.findMemberByEmail(email);
        UUID memberId = member.getId();
        return memberId;
    }
}
