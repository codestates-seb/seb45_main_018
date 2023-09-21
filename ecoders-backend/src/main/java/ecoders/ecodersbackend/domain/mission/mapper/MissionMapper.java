package ecoders.ecodersbackend.domain.mission.mapper;

import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.MemberMission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    MemberMission missionDtoToMission(MissionPostDto.Request missionDto);

}
