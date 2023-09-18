package ecoders.ecodersbackend.domain.mission.mapper;

import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.MyMission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    MyMission missionDtoToMission(MissionPostDto.Request missionDto);

}
