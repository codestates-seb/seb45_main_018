package ecoders.ecodersbackend.auth.service;

import ecoders.ecodersbackend.domain.member.entity.Member;
import ecoders.ecodersbackend.domain.member.service.MemberService;
import ecoders.ecodersbackend.exception.BusinessLogicException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Slf4j
@AllArgsConstructor
@Component()
public class PolarecoMemberDetailsService implements UserDetailsService {

    private final MemberService memberService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            Member member = memberService.findMemberByEmail(email);
            return new PolarecoMemberDetails(member);
        } catch (BusinessLogicException e) {
            throw new UsernameNotFoundException("Member not found with email");
        }
    }
}
