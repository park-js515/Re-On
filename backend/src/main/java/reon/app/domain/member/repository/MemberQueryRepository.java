package reon.app.domain.member.repository;

import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.dto.res.MemberResponse;

import java.util.List;

public interface MemberQueryRepository {
    MemberResponse findById(Long id);

    BackStageMemberResponse findBackStageMemberById(Long id);

    MemberBattleInfoResponse findMemberBattleInfoById(Long id);

    Long searchMemberIdByEmail(String email);

    List<BattleLogRankResponse> findBattleLogsRank();
}
