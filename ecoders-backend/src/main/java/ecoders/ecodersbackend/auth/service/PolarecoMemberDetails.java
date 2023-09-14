package ecoders.ecodersbackend.auth.service;

import ecoders.ecodersbackend.auth.util.PolarecoAuthorityUtils;
import ecoders.ecodersbackend.domain.member.entity.Member;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
public class PolarecoMemberDetails extends Member implements UserDetails {

    private final Member member; // 추가

    public PolarecoMemberDetails(Member member) {
        this.member = member; // 추가
        this.id = member.getId();
        this.username = member.getUsername();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.authType = member.getAuthType();
        this.isVerified = member.isVerified();
    }

    // 추가
    public Member getMember() {
        return member;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return PolarecoAuthorityUtils.getAuthorities(isVerified);
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
