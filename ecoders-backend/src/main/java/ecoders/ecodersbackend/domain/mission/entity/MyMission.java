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
public class MyMission {

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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    /**
     * 챌린지 생성시 사용하는 생성자
     */
    public MyMission(String text, Long memberId) {
        this.text = text;
        LocalDateTime currentTime = LocalDateTime.now();
        this.createdAt =  Timestamp.valueOf(currentTime);
        this.modifiedAt = Timestamp.valueOf(currentTime);
        this.completed = false;
    }
}
