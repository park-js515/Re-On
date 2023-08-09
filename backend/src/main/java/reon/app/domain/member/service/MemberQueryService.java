package reon.app.domain.member.service;

import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.dto.res.MemberResponse;

public interface MemberQueryService {
    MemberResponse findById(Long id);
    BackStageMemberResponse findBackStageMemberById(Long id);

    MemberBattleInfoResponse findMemberBattleInfoById(Long id);

}
