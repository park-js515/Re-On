package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.res.BattleLogResponse;
import reon.app.domain.member.repository.BattleLogQueryRepository;
import reon.app.domain.member.service.BattleLogQueryService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BattleLogQueryServiceImpl implements BattleLogQueryService {

    private final BattleLogQueryRepository battleLogQueryRepository;
    @Override
    public List<BattleLogResponse> findBattleLogsById(Long loginId) {
        List<BattleLogResponse> battleLogs = battleLogQueryRepository.findBattleLogsById(loginId);
        return battleLogs;
    }
}
