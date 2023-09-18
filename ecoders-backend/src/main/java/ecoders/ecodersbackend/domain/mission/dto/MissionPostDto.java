package ecoders.ecodersbackend.domain.mission.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.UUID;


public class MissionPostDto {

    @Getter
    public static class Request {

        private String text;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private final Long id;
        private final String text;
        private final Timestamp createdAt;
        private final Timestamp modifiedAt;
        private final UUID memberId;
        private final boolean completed;

    }

}
