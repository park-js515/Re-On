package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.member.service.MemberService;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public Member updateMember(MemberUpdateRequest memberUpdateRequest) {
        Member findMember = memberRepository.findById(memberUpdateRequest.getId()).orElse(null);
        if(findMember != null){
            findMember.getMemberInfo().updateMemberInfo(memberUpdateRequest);
            findMember = memberRepository.save(findMember);
        }
        return findMember;
    }

    @Override
    public void removeProfileImg(Long memberId) {

    }

    @Override
    public void delete(String loginId) {

    }
}
