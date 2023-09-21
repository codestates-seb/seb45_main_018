package ecoders.ecodersbackend.domain.mission.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberMissionDto {
    private Long id;
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private boolean completed;
}
