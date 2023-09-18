package ecoders.ecodersbackend.domain.mission.util;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {

    @Scheduled(cron = "0 0 0 * * ?")
    public void generateTodayMission() {

    }
}
