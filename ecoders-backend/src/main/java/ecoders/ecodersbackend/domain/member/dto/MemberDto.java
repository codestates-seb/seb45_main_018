package ecoders.ecodersbackend.domain.member.dto;

import ecoders.ecodersbackend.auth.validation.annotation.PolarecoPassword;
import ecoders.ecodersbackend.auth.validation.annotation.PolarecoUsername;
import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

public class MemberDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static final class PatchPassword {

        private String currentPassword;

        @PolarecoPassword
        private String newPassword;
    }

    @AllArgsConstructor
    @Getter
    public static final class Response {

        private UUID id;

        private String email;

        private String username;

        private String imageUrl;

        private String authType;

        private boolean isVerified;

        public static Response parse(Member member) {
            return new Response(
                member.getId(),
                member.getEmail(),
                member.getUsername(),
                member.getImageUrl(),
                member.getAuthType().name(),
                member.isVerified()
            );
        }
    }
}
