package ecoders.ecodersbackend.domain.comment;

import com.amazonaws.services.s3.AmazonS3;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.domain.post.Post;
import ecoders.ecodersbackend.domain.post.PostRepository;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CommentService {

    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public CommentService(MemberRepository memberRepository,
                          CommentRepository commentRepository) {
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;

    }
    public Comment updateComment(long commentId, String email){
        Comment newComment = commentRepository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        verifyAuthor(newComment,email);
        return newComment;
    }

    public void deleteComment(long commentId, String email) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        verifyAuthor(comment, email);
       commentRepository.delete(comment);
    }
    private void verifyAuthor(Comment comment, String email) {
        String authorEmail = comment.getMember().getEmail();;
        if (!email.equals(authorEmail)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_POST);
        }
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return member.get();
    }
}
