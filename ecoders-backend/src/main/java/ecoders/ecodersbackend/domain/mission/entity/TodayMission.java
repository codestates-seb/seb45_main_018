package ecoders.ecodersbackend.domain.mission.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TodayMission {

    @Id @GeneratedValue
    @Column(name = "today_mission_id")
    private long id;

    private String missionContent;

    private boolean completed;

    @Temporal(TemporalType.DATE)
    private Date missionDate;
}
