package ecoders.ecodersbackend.domain.post;

import ecoders.ecodersbackend.auth.jwt.JwtProvider;
import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import ecoders.ecodersbackend.exception.code.ExceptionCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

import static ecoders.ecodersbackend.auth.jwt.JwtProvider.HEADER_AUTHORIZATION;

@RequestMapping("/posts")
@RestController
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    public PostController(PostService postService,
                          PostRepository postRepository,
                          JwtProvider jwtProvider,
                          MemberService memberService) {
        this.postService = postService;
        this.postRepository = postRepository;
        this.jwtProvider = jwtProvider;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity post(@RequestBody PostDto.PostCreateDto postDto,
                               @RequestHeader(HEADER_AUTHORIZATION) String accessToken){

        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = postService.findMemberByEmail(email);

        Post newPost = new Post();
        newPost.setTitle(postDto.getTitle());
        newPost.setContent(postDto.getContent());
        newPost.setCategory(postDto.getCategory());
        newPost.setThumbnailUrl(postDto.getThumbnailUrl());
        newPost.setMember(member);
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setModifiedAt(LocalDateTime.now());
        postRepository.save(newPost);

        return ResponseEntity.ok("Post successfully created.");
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestHeader("Content-Type") String contentType,
                                              @RequestParam("imageFile") MultipartFile imageFile){
        try{
        String imageUrl = postService.uploadImage(imageFile);
        return ResponseEntity.ok(imageUrl);
    } catch (Exception e){
        e.printStackTrace();
        return ResponseEntity.status(500).body("Image upload failed");
        }
    }



    @GetMapping("/{post-id}")
   public ResponseEntity<PostDto.PostResponseDtoV1> getPost(@PathVariable("post-id") long postId,
                                                            HttpServletRequest request,
                                                            HttpServletResponse response){
        PostDto.PostResponseDtoV1 foundPost = postService.getPost(postId);
        postService.updateView(postId, request, response);
        return ResponseEntity.ok(foundPost);
    }

    @GetMapping("/all")
    public List<PostDto.PostResponseDtoV2> getAllPosts(@RequestParam long lastPostId,
                                                       @RequestParam int size,
                                                       @RequestParam(required = false) String keyword){
        return postService.getPosts(lastPostId,size,keyword);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") @Positive long postId,
                                      @RequestBody PostDto.PostUpdateDto postDto,
                                      @RequestHeader(HEADER_AUTHORIZATION) String accessToken)
    {
        String email = jwtProvider.getEmailFromToken(accessToken);

        Post newPost = postService.updatePost(postId, email);
        newPost.setTitle(postDto.getTitle());
        newPost.setContent(postDto.getContent());
        newPost.setCategory(postDto.getCategory());
        newPost.setThumbnailUrl(postDto.getThumbnailUrl());
        newPost.setModifiedAt(LocalDateTime.now());

        postRepository.save(newPost);

        return ResponseEntity.ok("Post successfully Changed");
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long postId,
                                       @RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        postService.deletePost(postId, email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{post-id}/likes")
    public ResponseEntity<String> toggleLike(@PathVariable("post-id") long postId,
                                             @RequestHeader(HEADER_AUTHORIZATION) String accessToken) {
        String email = jwtProvider.getEmailFromToken(accessToken);
        Member member = postService.findMemberByEmail(email);
        long memberId = member.getId();
        postService.toggleLike(postId, memberId);
        return ResponseEntity.ok("Like toggled successfully");
    }



}
