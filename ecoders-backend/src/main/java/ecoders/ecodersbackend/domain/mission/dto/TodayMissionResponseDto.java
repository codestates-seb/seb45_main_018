package ecoders.ecodersbackend.domain.mission.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class TodayMissionResponseDto {
    private Long todayMissionId;
    private String content;
    private boolean completed;
    private int size;

    public TodayMissionResponseDto(Long todayMissionId, String content, boolean completed) {
        this.todayMissionId = todayMissionId;
        this.content = content;
        this.completed = completed;
    }
}
