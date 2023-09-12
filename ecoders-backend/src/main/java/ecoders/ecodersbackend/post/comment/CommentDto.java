package ecoders.ecodersbackend.post.comment;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    public static class CommentResponseDto {
        private long commentId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private long memberId;
        private long postId;
    }
    @Getter
    @Setter
    public static class  CommentResponseDTOV1{
        private long postId;
        private long commentId;
        private String content;
        private String userEmail;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;


    }

    @Getter
    @Setter
    public static class CommentCreateDto {

        private String content;
        private long postId;
        private long memberId;

    }

    @Getter
    @Setter
    public static class CommentUpdateDto {
        private  long commentId;
        private String content;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;


    }
}
