package reon.app.domain.member.service;

import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.entity.Member;

public interface MemberService {
    Member findById(Long id);
//    void modify(MemberModifyRequest memberModifyRequest);
    void updateProfileImg(MultipartFile multipartFile, Long memberId);
    void removeProfileImg(Long memberId);
    void delete(Long loginId);
    void ban(Long memberId);
}
