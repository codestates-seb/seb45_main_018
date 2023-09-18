//package ecoders.ecodersbackend.domain.mission.util;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.core.ValueOperations;
//import org.springframework.stereotype.Service;
//
//@Service
//public class RedisService {
//
//    public final RedisTemplate<String, String> redisTemplate;
//
//    @Autowired
//    public RedisService(RedisTemplate<String, String> redisTemplate) {
//        this.redisTemplate = redisTemplate;
//    }
//
//    public void setValues(String key, String data) {
//        ValueOperations<String, String> values = redisTemplate.opsForValue();
//        values.set(key, data);
//    }
//
//    public String getValues(String key) {
//        ValueOperations<String, String> values = redisTemplate.opsForValue();
//        return values.get(key);
//    }
//
//    public void deleteValues(String key) {
//        redisTemplate.delete(key);
//    }
//}
