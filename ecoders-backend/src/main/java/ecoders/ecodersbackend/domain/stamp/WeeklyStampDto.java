package ecoders.ecodersbackend.domain.stamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WeeklyStampDto {

    private int sundayCount;
    private int mondayCount;
    private int tuesdayCount;
    private int wednesdayCount;
    private int thursdayCount;
    private int fridayCount;
    private int saturdayCount;

}
