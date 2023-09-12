package ecoders.ecodersbackend.domain.member.entity;

import lombok.*;

import javax.persistence.*;

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
