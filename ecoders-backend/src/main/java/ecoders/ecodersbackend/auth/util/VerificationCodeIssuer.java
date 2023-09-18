package ecoders.ecodersbackend.auth.util;

import java.security.SecureRandom;

public class VerificationCodeIssuer {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private static final int VERIFICATION_CODE_LENGTH = 6;

    public static String issue() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < VERIFICATION_CODE_LENGTH; i++) {
            int num = SECURE_RANDOM.nextInt(35);
            char character = num < 10
                ? (char) (num + '0')
                : (char) (num - 10 + 'a');
            stringBuilder.append(character);
        }
        return stringBuilder.toString();
    }
}
