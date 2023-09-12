package ecoders.ecodersbackend.domain.mission.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class MissionResponseDto {

    private Long myMissionId;
    private String content;
    private LocalDateTime created_at;

}
