package ecoders.ecodersbackend.auth.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PolarecoMemberDetails implements UserDetails {

    private final long memberId;

    private final String username;

    private final String email;

    private final String password;

    public static PolarecoMemberDetails of(Member member) {
        return new PolarecoMemberDetails(member.getId(), member.getUsername(), member.getEmail(), member.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
