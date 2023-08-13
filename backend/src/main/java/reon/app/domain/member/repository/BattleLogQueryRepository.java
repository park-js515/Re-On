package reon.app.domain.member.repository;

import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.BattleLogResponse;

import java.util.List;

public interface BattleLogQueryRepository {

    List<BattleLogResponse> findBattleLogsById(Long loginId);

}
