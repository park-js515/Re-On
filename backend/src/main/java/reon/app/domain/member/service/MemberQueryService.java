package reon.app.domain.member.service;

import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.dto.res.MemberResponse;

import java.util.List;

public interface MemberQueryService {
    MemberResponse findById(Long id);
    Long searchMemberIdByEmail(String email);
    BackStageMemberResponse findBackStageMemberById(Long id);
    MemberBattleInfoResponse findMemberBattleInfoById(Long id);

    List<BattleLogRankResponse> findBattleLogsRank();
}
