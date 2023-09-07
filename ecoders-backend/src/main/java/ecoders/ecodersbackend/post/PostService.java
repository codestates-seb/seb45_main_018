package ecoders.ecodersbackend.post;

import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.util.Base64Utils;
import java.util.UUID;


import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    public PostService(PostRepository postRepository,
                       AmazonS3 amazonS3) {
        this.postRepository = postRepository;
        this.amazonS3 = amazonS3;
    }



    public Post findPost(long postId){
        return postRepository.findById(postId).orElseThrow();
    }

    public String uploadImage(String imageUrl){


        byte[] imageBytes = Base64Utils.decodeFromString(imageUrl);
        InputStream inputStream = new ByteArrayInputStream(imageBytes);

        String fileName = generateUniqueFileName();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(imageBytes.length);
        amazonS3.putObject(bucketName, fileName, inputStream, metadata);

        String url = amazonS3.getUrl(bucketName, fileName).toString();

        return url;
    }


    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }
}
