package ecoders.ecodersbackend.domain.mission.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class MissionPatchDto {

    @Getter
    public static class Request {

        private long missionId;

        private String text;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private final Long id;
        private final String text;
        private final LocalDateTime createdAt;
        private final LocalDateTime completedAt;
        private final boolean completed;
    }
}
