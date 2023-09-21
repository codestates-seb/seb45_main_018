package ecoders.ecodersbackend.auth.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.List;

public class PolarecoAuthorityUtils {

    private static final List<GrantedAuthority> AUTHORITIES_UNVERIFIED =
        AuthorityUtils.createAuthorityList("UNVERIFIED");

    private static final List<GrantedAuthority> AUTHORITIES_VERIFIED =
        AuthorityUtils.createAuthorityList("VERIFIED", "UNVERIFIED");

    public static List<GrantedAuthority> getAuthorities(boolean isVerified) {
        return isVerified ? AUTHORITIES_VERIFIED : AUTHORITIES_UNVERIFIED;
    }
}
