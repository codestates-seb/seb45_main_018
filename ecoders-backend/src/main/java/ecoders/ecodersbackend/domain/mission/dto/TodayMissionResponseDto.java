package ecoders.ecodersbackend.domain.mission.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class TodayMissionResponseDto {
    private Long todayMissionId;
    private String text;
    private boolean completed;

    public TodayMissionResponseDto(Long todayMissionId, String text, boolean completed) {
        this.todayMissionId = todayMissionId;
        this.text = text;
        this.completed = completed;
    }
}
