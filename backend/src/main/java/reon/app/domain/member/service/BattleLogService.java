package reon.app.domain.member.service;

import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.service.dto.BattleLogSaveDto;

@Transactional
public interface BattleLogService {
    int saveBattleLog(BattleLogSaveDto dto);

}
