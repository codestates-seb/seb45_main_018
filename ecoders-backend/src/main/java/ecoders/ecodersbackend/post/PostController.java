package ecoders.ecodersbackend.post;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        String imageUrl = postService.uploadImage(postDto.getImageUrl());

        Post newPost = new Post();
        newPost.setTitle(postDto.getTitle());
        newPost.setContent(postDto.getContent());
        newPost.setImageUrl(imageUrl);
        postRepository.save(newPost);

        return ResponseEntity.ok("Post successfully created.");
    }


    @GetMapping("/{post-id}")
   public ResponseEntity<Post> getPost(@PathVariable("post-id") long postId){
        Post foundPost = postService.findPost(postId);
        return ResponseEntity.ok(foundPost);
    }


}
