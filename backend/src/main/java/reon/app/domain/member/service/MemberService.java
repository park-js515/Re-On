package reon.app.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.entity.Member;

@Transactional
public interface MemberService {
    Member updateMember(MemberUpdateRequest memberUpdateRequest);

//    void modify(MemberModifyRequest memberModifyRequest);
//
//
//    void updateProfileImg(MultipartFile multipartFile, Long memberId);

    void removeProfileImg(Long memberId);

    void delete(String loginId);
}
