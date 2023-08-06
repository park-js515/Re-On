package reon.app.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.entity.Member;

@Transactional
public interface MemberService {
    Member updateMember(MemberUpdateRequest memberUpdateRequest);
//    void updateProfileImg(MultipartFile profileImg, long id);

//    void modify(MemberModifyRequest memberModifyRequest);
//
//
//    void updateProfileImg(MultipartFile multipartFile, Long memberId);
    void deleteRefreshToken(Long id);

    void removeProfileImg(Long id);

    void delete(Long id);


}
