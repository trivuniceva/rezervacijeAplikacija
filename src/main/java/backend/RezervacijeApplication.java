package backend;

import menadzerisanjeuser.menadzerisanjeuser.MenadzerisanjeUserApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import smestajMenadzment.SmestajMenadzmentApplication;

@SpringBootApplication
@Import({MenadzerisanjeUserApplication.class, SmestajMenadzmentApplication.class})
public class RezervacijeApplication {

    public static void main(String[] args) {
        SpringApplication.run(RezervacijeApplication.class, args);

    }

}
