package menadzerisanjeuser.menadzerisanjeuser.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendActivationEmail(String email, String token) {
//        System.out.println(token + "   " +  email);
//        System.out.println("pocinje");
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("imenkoprezimic123@gmail.com");
//        message.setTo(email);
//        message.setSubject("Account Activation");
//        message.setText("ћ ћаааао");
//        mailSender.send(message);
//
//        System.out.println("zavrsio");
//    }

}
