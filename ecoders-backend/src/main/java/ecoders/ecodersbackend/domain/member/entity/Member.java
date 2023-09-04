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
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthType authType;

    @Column(name = "verified", nullable = false)
    private Boolean isVerified;

    public Boolean isVerified() {
        return isVerified;
    }

    @Getter
    public enum AuthType {

        POLARECO,
        GOOGLE
    }
}
