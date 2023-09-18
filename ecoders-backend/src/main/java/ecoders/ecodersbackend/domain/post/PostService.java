package ecoders.ecodersbackend.domain.post;

import com.amazonaws.services.s3.model.ObjectMetadata;
import ecoders.ecodersbackend.domain.comment.Comment;
import ecoders.ecodersbackend.domain.comment.CommentRepository;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.repository.MemberRepository;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;


import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final static String VIEWCOOKIENAME = "alreadyViewCookie";


    public PostService(MemberRepository memberRepository,
                       PostRepository postRepository,
                       CommentRepository commentRepository,
                       MemberService memberService,
                       AmazonS3 amazonS3) {
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.amazonS3 = amazonS3;
    }



    public Post findPost(long postId){
        return postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return member.get();
    }

    public PostDto.PostResponseDtoV1 getPost(long postId){
        Post post = findPost(postId);
        PostDto.PostResponseDtoV1 newPost = new PostDto.PostResponseDtoV1();
        long likescount = getLikeCountForPost(postId);
        Set<Member> likedByMembers = post.getLikedBy();
        Set<UUID> likedByUserIds = new HashSet<>();
        for (Member member : likedByMembers) {
            likedByUserIds.add(member.getId());
        }
        newPost.setPostId(post.getPostId());
        newPost.setTitle(post.getTitle());
        newPost.setContent(post.getContent());
        newPost.setCategory(post.getCategory());
        newPost.setThumbnailUrl(post.getThumbnailUrl());
        newPost.setUsername(post.getMember().getUsername());
        newPost.setMemberId(post.getMember().getId());
        newPost.setViews(post.getViews());
        newPost.setLikes(likescount);
        newPost.setLikedByUserIds(likedByUserIds);
        newPost.setCreatedAt(post.getCreatedAt());
        newPost.setUpdatedAt(post.getModifiedAt());
        List<PostDto.CommentResponseDTO> commentResponseDTOs = new ArrayList<>();
        List<Comment> comments = commentRepository.findByPostId(postId);
        for(Comment comment : comments){

            PostDto.CommentResponseDTO commentDTO = new PostDto.CommentResponseDTO();

            commentDTO.setCommentId(comment.getCommentId());
            commentDTO.setContent(comment.getContent());
            commentDTO.setUsername(comment.getMember().getUsername());
            commentDTO.setMemberId(comment.getMember().getId());
            commentDTO.setCreatedAt(comment.getCreatedAt());
            commentDTO.setUpdatedAt(comment.getModifiedAt());
            commentResponseDTOs.add(commentDTO);
        }
        newPost.setComments(commentResponseDTOs);
        return newPost;
    }

    public List<PostDto.PostResponseDtoV2> getPosts(Long lastPostId, int size, String keyword){
        PageRequest pageRequest = PageRequest.of(0, size);
        Page<Post> entityPage;
        if(keyword !=null && !keyword.isEmpty()){
            entityPage = postRepository.findByPostIdLessThanAndTitleContainingOrContentContainingOrderByPostIdDesc(
                    lastPostId, keyword, keyword, pageRequest);
        }else{
            entityPage = postRepository.findByPostIdLessThanOrderByPostIdDesc(lastPostId, pageRequest);
        }

        List<Post> entityList = entityPage.getContent();

        List<PostDto.PostResponseDtoV2> resultList = entityList.stream()
                .map(post -> {
                    PostDto.PostResponseDtoV2 dto = new PostDto.PostResponseDtoV2();
                    long likescount = getLikeCountForPost(post.getPostId());
                    Set<Member> likedByMembers = post.getLikedBy();
                    Set<UUID> likedByUserIds = new HashSet<>();
                    for (Member member : likedByMembers) {
                        likedByUserIds.add(member.getId());
                    }
                    dto.setPostId(post.getPostId());
                    dto.setTitle(post.getTitle());
                    dto.setCategory(post.getCategory());
                    dto.setThumbnailUrl(post.getThumbnailUrl());
                    dto.setUsername(post.getMember().getUsername());
                    dto.setCreatedAt(post.getCreatedAt());
                    dto.setLikes(likescount);
                    dto.setLikedByUserIds(likedByUserIds);

                    return dto;
                })
                .collect(Collectors.toList());

        return resultList;
    }

    public String uploadImage(MultipartFile imageFile) throws IOException {


        byte[] imageBytes = imageFile.getBytes();
        InputStream inputStream = new ByteArrayInputStream(imageBytes);
        String folderName = "post_Image";
        String fileName = folderName + "/" + generateUniqueFileName();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(imageBytes.length);
        amazonS3.putObject(bucketName, fileName, inputStream, metadata);

        String url = amazonS3.getUrl(bucketName, fileName).toString();

        return url;
    }

    public void toggleLike(Long postId, UUID memberId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (post != null && member != null) {
            if (post.getLikedBy().contains(member)) {
                post.getLikedBy().remove(member);
                // 이미 좋아요한 경우 취소
            } else {
                post.getLikedBy().add(member);
                // 아직 좋아요하지 않은 경우 추가
            }
            postRepository.save(post);
        }
    }

    public int getLikeCountForPost(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            return post.getLikeCount();
        }
        return 0; // 게시글이 존재하지 않는 경우
    }



    public Post updatePost(long postId, String email){
        Post newPost = postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        verifyAuthor(newPost,email);
        return newPost;
    }

    public void deletePost(long postId, String email) {
        Post post = postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        verifyAuthor(post, email);
        postRepository.delete(post);
    }
    private void verifyAuthor(Post post, String email) {
        String authorEmail = post.getMember().getEmail();;
        if (!email.equals(authorEmail)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_POST);
        }
    }


    @Transactional
    public int updateView(Long postId, HttpServletRequest request, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();
        boolean checkCookie = false;
        int result = 0;
        if(cookies != null){
            for (Cookie cookie : cookies)
            {
                // 이미 조회를 한 경우 체크
                if (cookie.getName().equals(VIEWCOOKIENAME+postId)) checkCookie = true;

            }
            if(!checkCookie){
                Cookie newCookie = createCookieForForNotOverlap(postId);
                response.addCookie(newCookie);
                result = postRepository.updateView(postId);
            }
        } else {
            Cookie newCookie = createCookieForForNotOverlap(postId);
            response.addCookie(newCookie);
            result = postRepository.updateView(postId);
        }
        return result;
    }

    private Cookie createCookieForForNotOverlap(Long postId) {
        Cookie cookie = new Cookie(VIEWCOOKIENAME+postId, String.valueOf(postId));
        cookie.setComment("조회수 중복 증가 방지 쿠키");
        cookie.setMaxAge(24*60*60);
       // cookie.setHttpOnly(true);
        return cookie;
    }

    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }
}
