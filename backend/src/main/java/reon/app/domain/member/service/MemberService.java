package reon.app.domain.member.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.service.dto.MemberUpdateDto;

@Transactional
public interface MemberService {
    String updateMember(MemberUpdateDto memberUpdateDto);
    String updateProfileImg(MultipartFile profileImg, Long loginId);
    void deleteRefreshToken(Long id);

    void removeProfileImg(Long id);

    void delete(Long id);
    void updateBattleInfo(BattleLogSaveRequest battleLogSaveRequest);

}
