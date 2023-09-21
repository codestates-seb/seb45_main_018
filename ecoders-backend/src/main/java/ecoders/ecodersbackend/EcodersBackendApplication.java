package ecoders.ecodersbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class EcodersBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcodersBackendApplication.class, args);
    }
}
