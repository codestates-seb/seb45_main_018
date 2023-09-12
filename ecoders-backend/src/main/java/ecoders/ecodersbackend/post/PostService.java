package ecoders.ecodersbackend.post;

import com.amazonaws.services.s3.model.ObjectMetadata;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.List;
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

//    public static String extractTextAndImages(String html) {
//
//
//        Document doc = Jsoup.parse(html);
//
//        String test = "";
//
//        Element body = doc.getElementsByTag("body").first();
//        List<Node> childNodes = body.childNodes();
//
//        for(Node node : childNodes){
//
//            if(node instanceof TextNode){
//                // These are text nodes, lets see if they are empty or not and add them to the string.
//                String nodeString = node.toString();
//                if(nodeString != null && !nodeString.trim().isEmpty()){
//                    test += nodeString;
//                }
//            } else if (node instanceof Element) {
//                // Here is an element, let's see if there is an image.
//                Element element = (Element)node;
//                Element image = element.children().select("img").first();
//
//                if(image != null)
//                {
//                    test += image.attr("alt");
//                }
//            }
//        }
//
//        return test;
//    }

//    public String uploadImage(String imageUrl){
//
//
//        byte[] imageBytes = Base64Utils.decodeFromString(imageUrl);
//        InputStream inputStream = new ByteArrayInputStream(imageBytes);
//
//        String folderName = "post_Image";
//        String fileName = folderName + "/" + generateUniqueFileName();
//        ObjectMetadata metadata = new ObjectMetadata();
//        metadata.setContentLength(imageBytes.length);
//        amazonS3.putObject(bucketName, fileName, inputStream, metadata);
//
//        String url = amazonS3.getUrl(bucketName, fileName).toString();
//
//        return url;
//    }


    private String generateUniqueFileName() {
        return UUID.randomUUID().toString();
    }
}
