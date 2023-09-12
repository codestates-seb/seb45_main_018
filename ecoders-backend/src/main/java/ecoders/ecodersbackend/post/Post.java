package ecoders.ecodersbackend.post;

import ecoders.ecodersbackend.audit.Auditable;
import ecoders.ecodersbackend.post.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column
    private String category;

    @Column
    private long views;

    @Column
    private String thumbnailUrl;


   @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<Comment> comments = new ArrayList<>();

}
