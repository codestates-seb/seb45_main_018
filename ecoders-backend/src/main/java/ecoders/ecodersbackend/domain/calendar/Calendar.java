package ecoders.ecodersbackend.domain.calendar;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long stamp;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    public Long getStamp() {
        return stamp;
    }

    public void setStamp(Long stamp) {
        this.stamp = stamp;
    }
}
