package ecoders.ecodersbackend.domain.calendar;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CalendarController {

    private CalendarRepository calendarRepository;

    @GetMapping("/mission/stickers")
    private List<Calendar> getCalendarByStamp(@RequestParam Long stamp) {

        return calendarRepository.findByStamp(stamp);

    }
}
