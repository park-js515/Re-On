package reon.app.domain.member.service;

import reon.app.domain.member.dto.res.BattleLogResponse;

public interface BattleLogQueryService {
    BattleLogResponse findById(Long id);
}
