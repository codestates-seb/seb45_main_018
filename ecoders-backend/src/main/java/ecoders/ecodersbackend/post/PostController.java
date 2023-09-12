package ecoders.ecodersbackend.post;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/posts")
@RestController
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    public PostController(PostService postService,
                          PostRepository postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
    }

    @PostMapping
    public ResponseEntity post(@RequestBody PostDto.PostCreateDto postDto){

        Post newPost = new Post();
        newPost.setTitle(postDto.getTitle());
        newPost.setContent(postDto.getContent());
        newPost.setCategory(postDto.getCategory());
        newPost.setThumbnailUrl(postDto.getThumbnailUrl());

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
   public ResponseEntity<Post> getPost(@PathVariable("post-id") long postId){
        Post foundPost = postService.findPost(postId);
        return ResponseEntity.ok(foundPost);
    }


}
