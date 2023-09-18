package ecoders.ecodersbackend.domain.member.entity;


import ecoders.ecodersbackend.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "binary(16)")
    protected UUID id;

    @Setter
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
