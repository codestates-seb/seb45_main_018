package ecoders.ecodersbackend.domain.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class PostDto {

    @Getter
    @Setter
    public static class PostCreateDto{

        private String title;
        private String content;
        private String category;
        private String thumbnailUrl;

    }

    @Getter
    @Setter
    public static class PostUpdateDto{
        private String title;
        private String content;
        private String category;
        private String thumbnailUrl;
    }

    @Getter
    @Setter
    public static class PostResponseDtoV1{

        private long postId;
        private String title;
        private String content;
        private String category;
        private String thumbnailUrl;
        private String username;
        private long memberId;
        private long views;
        private long likes;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;
        private List<CommentResponseDTO> comments;
        private Set<Long> likedByUserIds;


    }

    @Getter
    @Setter
    public  static class PostResponseDtoV2{
        private long postId;
        private String title;
        private String category;
        private String thumbnailUrl;
        private String username;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        private long likes;
        private Set<Long> likedByUserIds;
    }
    @Getter
    @Setter
    public static class CommentResponseDTO {
        private long commentId;
        private String content;
        private String username;
        private long memberId;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updatedAt;


    }
}
