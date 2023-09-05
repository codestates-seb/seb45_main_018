package ecoders.ecodersbackend.auth.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PolarecoAuthorityUtils {

    private static final List<GrantedAuthority> AUTHORITIES_UNVERIFIED =
        AuthorityUtils.createAuthorityList("UNVERIFIED");

    private static final List<GrantedAuthority> AUTHORITIES_VERIFIED =
        AuthorityUtils.createAuthorityList("VERIFIED", "UNVERIFIED");

    public List<GrantedAuthority> createAuthorities(boolean isVerified) {
        return isVerified ? AUTHORITIES_VERIFIED : AUTHORITIES_UNVERIFIED;
    }
}
