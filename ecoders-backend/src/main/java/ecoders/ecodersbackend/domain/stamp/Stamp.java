package ecoders.ecodersbackend.domain.stamp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Stamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "binary(16)")
    private UUID memberId;

    private LocalDateTime stampDate;

    private int completedCount;

}
