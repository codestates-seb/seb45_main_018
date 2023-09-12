package ecoders.ecodersbackend.post;

import lombok.Getter;
import lombok.Setter;

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
    public static class PostResponseDto{

        private long postId;
        private String title;
        private String content;
        private String imageUrl;
    }
}
