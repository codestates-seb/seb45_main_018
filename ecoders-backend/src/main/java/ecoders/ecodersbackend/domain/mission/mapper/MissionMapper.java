package ecoders.ecodersbackend.domain.mission.mapper;

import ecoders.ecodersbackend.domain.mission.dto.MissionPostDto;
import ecoders.ecodersbackend.domain.mission.entity.Mission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MissionMapper {
    Mission missionDtoToMission(MissionPostDto.Request missionDto);

}
