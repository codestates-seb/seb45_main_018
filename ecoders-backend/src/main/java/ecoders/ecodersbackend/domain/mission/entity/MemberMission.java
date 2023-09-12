package ecoders.ecodersbackend.domain.mission.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class MemberMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_mission_id")
    private Long id;

    /**
     * member 테이블과 Join
     */


    /**
     * mission 테이블과 Join (n:1)
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @Column(updatable = false)
    private LocalDateTime created_at;

    @Column(updatable = false)
    private LocalDateTime completed_at;

    @Column
    private Long stamp;

}
