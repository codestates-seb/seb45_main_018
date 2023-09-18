package ecoders.ecodersbackend.domain.member.entity;

import ecoders.ecodersbackend.domain.mission.entity.TodayMission;
import ecoders.ecodersbackend.domain.stamp.Stamp;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Member {

    @Id
    protected long id;

    @Column(nullable = false)
    protected String username;

    @Column(nullable = false, unique = true)
    protected String email;

    @Column(nullable = true)
    protected String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected AuthType authType;

    @Column(nullable = false)
    protected boolean isVerified;

    @Getter
    public enum AuthType {

        POLARECO,
        GOOGLE
    }
}
