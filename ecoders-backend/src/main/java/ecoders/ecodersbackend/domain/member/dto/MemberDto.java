package ecoders.ecodersbackend.domain.member.dto;

import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static final class Response {

        private UUID id;

        private String email;

        private String username;

        public static Response parse(Member member) {
            return new Response(member.getId(), member.getEmail(), member.getUsername());
        }
    }
}
