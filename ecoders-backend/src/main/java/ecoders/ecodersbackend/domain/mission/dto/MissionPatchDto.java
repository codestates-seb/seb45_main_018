package ecoders.ecodersbackend.domain.mission.dto;

import ecoders.ecodersbackend.domain.mission.entity.Mission;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class MissionPatchDto {

    @Getter
    public static class Patch {

        private long missionId;

        private String text;

        private Mission.MissionProgress missionProgress;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private final Long id;
        private final String text;
        private final String createdAt;
        private final String modifiedAt;
        private final Long memberId;
    }
}
