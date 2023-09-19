package ecoders.ecodersbackend.domain.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Modifying
    @Query("update Post set views = views + 1 where postId = :postId")
    int updateView(@Param(value = "postId") Long postId);


    Page<Post> findByPostIdLessThanOrderByPostIdDesc(Long lastPostId, PageRequest pageRequest);

    @Query("SELECT p FROM Post p WHERE p.postId < :lastPostId AND (p.title LIKE %:keyword% OR p.content LIKE %:keyword1%) ORDER BY p.postId DESC")
    Page<Post> findByPostIdLessThanAndTitleContainingOrContentContainingOrderByPostIdDesc(Long lastPostId, String keyword, String keyword1, PageRequest pageRequest);
}
