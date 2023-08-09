package reon.app.domain.member.service;

import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;

@Transactional
public interface BattleLogService {
    void saveBattleLog(BattleLogSaveRequest battleLogSaveRequest);

}
