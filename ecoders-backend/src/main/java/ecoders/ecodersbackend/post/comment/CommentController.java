//package ecoders.ecodersbackend.post.comment;
//
//import ecoders.ecodersbackend.domain.member.entity.Member;
//import ecoders.ecodersbackend.exception.BusinessLogicException;
//import ecoders.ecodersbackend.exception.code.ExceptionCode;
//import ecoders.ecodersbackend.post.Post;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletRequest;
//import java.time.LocalDateTime;
//
//@RestController
//@RequestMapping("/post")
//public class CommentController {
//
//    @PostMapping("/{post-Id}/comment")
//    public ResponseEntity postComment(@PathVariable("post-Id") long postId,
//                                      @RequestBody CommentDto.CommentCreateDto commentDto
//                                      ) {
//        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
//
//        Comment newComment = new Comment();
//        newComment.setContent(commentDto.getContent());
//        newComment.setMember(member);
//        newComment.setAnswer(answer);
//        newComment.setCreatedAt(LocalDateTime.now());
//
//        commentRepository.save(newComment);
//        return ResponseEntity.ok("Comment successfully created.");
//    }
//}
