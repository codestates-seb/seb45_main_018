package ecoders.ecodersbackend.domain.mission.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Mission {

    @Id
    @GeneratedValue
    @Column
    private long id;

    @Column(nullable = false)
    private String text;

    @Enumerated(EnumType.STRING)
    private MissionType missionType;

}
