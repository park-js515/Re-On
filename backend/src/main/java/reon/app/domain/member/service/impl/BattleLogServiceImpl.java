package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.entity.BattleLog;
import reon.app.domain.member.repository.BattleLogRepository;
import reon.app.domain.member.service.BattleLogService;

@Service
@RequiredArgsConstructor
@Transactional
public class BattleLogServiceImpl implements BattleLogService {

    private final BattleLogRepository battleLogRepository;
    @Override
    public void saveBattleLog(BattleLogSaveRequest battleLogSaveRequest) {
        BattleLog battleLog = battleLogSaveRequest.toEntity();
        battleLogRepository.save(battleLog);
    }

}
