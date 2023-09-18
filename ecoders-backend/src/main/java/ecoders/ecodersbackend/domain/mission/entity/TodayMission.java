package ecoders.ecodersbackend.domain.mission.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column
    private boolean completed;

    private LocalDateTime completionDate;

    @PreUpdate
    public void preUpdate() {
        if (this.completed && this.completionDate == null) {
            this.completionDate = LocalDateTime.now();
        }
    }
}
