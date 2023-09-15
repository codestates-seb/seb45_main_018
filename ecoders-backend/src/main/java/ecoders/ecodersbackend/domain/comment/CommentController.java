package ecoders.ecodersbackend.domain.comment;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.comment.Comment;
import ecoders.ecodersbackend.domain.comment.CommentDto;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.post.Post;
import ecoders.ecodersbackend.domain.post.PostDto;
import ecoders.ecodersbackend.domain.post.PostRepository;
import ecoders.ecodersbackend.domain.post.PostService;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;


@RestController
@RequestMapping("/posts")
public class CommentController {
    private final JwtProvider jwtProvider;
    private final CommentService commentService;

    private final CommentRepository commentRepository;

    private final PostRepository postRepository;
    public CommentController(CommentService commentService,
                             CommentRepository commentRepository,
                          PostRepository postRepository,
                          JwtProvider jwtProvider) {
        this.commentService= commentService;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.jwtProvider = jwtProvider;
    }
    @PostMapping("/{post-id}/comment")
    public ResponseEntity postComment(@PathVariable("post-id") long postId,
                                      @RequestBody CommentDto.CommentCreateDto commentDto,
                                      @RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = commentService.findMemberByEmail(email);

        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        Comment newComment = new Comment();
        newComment.setContent(commentDto.getContent());
        newComment.setMember(member);
        newComment.setPost(post);
        newComment.setCreatedAt(LocalDateTime.now());
        newComment.setModifiedAt(LocalDateTime.now());

        commentRepository.save(newComment);
        return ResponseEntity.ok("Comment successfully created.");
    }

    @PatchMapping("/comment/{comment-id}")
    public ResponseEntity patchComment(
                                      @PathVariable("comment-id") @Positive long commentId,
                                      @RequestBody CommentDto.CommentUpdateDto commentDto,
                                      @RequestHeader(HEADER_AUTHORIZATION) String accessToken)
    {
        String email = jwtProvider.getEmailFromToken(accessToken);

        Comment newComment = commentService.updateComment(commentId, email);
        newComment.setContent(commentDto.getContent());
        newComment.setModifiedAt(LocalDateTime.now());

        commentRepository.save(newComment);

        return ResponseEntity.ok("Comment successfully changed");
    }

    @DeleteMapping("/comment/{comment-id}")
    public ResponseEntity deleteAnswer(@PathVariable("comment-id") @Positive long commentId,
                                       @RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        commentService.deleteComment(commentId, email);
        return ResponseEntity.noContent().build();
    }


}
