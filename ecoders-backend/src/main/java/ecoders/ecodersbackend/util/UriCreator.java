package ecoders.ecodersbackend.util;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {

    public static URI createUri(String path, Object... values) {
        return UriComponentsBuilder.newInstance()
            .path(path)
            .buildAndExpand(values)
            .toUri();
    }
}
