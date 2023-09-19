package ecoders.ecodersbackend.auth.email;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@AllArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public void sendVerificationMail(String to) {
        try {
            javaMailSender.send(writeTestMessage(to));
            log.info("테스트 이메일 전송 완료");
        } catch (Exception e) {
            log.error("메시지 작성 중 예외 발생: {}", e.toString());
        }
    }

    private MimeMessage writeTestMessage(String to) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.setSubject("Polareco 메일 전송 테스트");
        message.setRecipients(Message.RecipientType.TO, to);
        message.setText("메일 전송 테스트입니다.");
        return message;
    }

    private MimeMessage writeVerificationMessage(String to) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.setSubject("Polareco 회원 가입 인증 메일");
        message.setRecipients(Message.RecipientType.TO, to);
        return message;
    }
}
