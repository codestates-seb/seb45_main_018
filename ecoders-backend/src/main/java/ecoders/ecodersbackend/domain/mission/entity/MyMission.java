package ecoders.ecodersbackend.domain.mission.entity;

import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missionId;

    @Column(nullable = false)
    private String text;

    @Column(updatable = false)
    private Timestamp createdAt;

    @Column
    private Timestamp modifiedAt;

    @Column
    private Boolean completed;

    @Column(name = "mission_type")
    @Enumerated(value = EnumType.STRING)
    private MissionType missionType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    @Enumerated(value = EnumType.STRING)
    private MissionProgress missionProgress;


    /**
     * 챌린지 생성시 사용하는 생성자
     */
    public Mission(String text, Long memberId) {
        this.text = text;
        LocalDateTime currentTime = LocalDateTime.now();
        this.createdAt =  Timestamp.valueOf(currentTime);
        this.modifiedAt = Timestamp.valueOf(currentTime);
    }

    /**
     * 미션 진행중 및 종료 변환 메서드
     */
    public void stopMission() {
        this.missionProgress = missionProgress.STOP;
    }

    public enum MissionType {
        My_Mission,
        Today_Mission
    }

    public enum MissionProgress {
        STOP,
        PROGRESS
    }
}
