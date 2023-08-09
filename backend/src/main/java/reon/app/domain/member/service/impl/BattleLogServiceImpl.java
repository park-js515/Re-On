package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.entity.BattleLog;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.BattleLogRepository;
import reon.app.domain.member.service.BattleLogService;
import reon.app.domain.video.entity.Video;

@Service
@RequiredArgsConstructor
@Transactional
public class BattleLogServiceImpl implements BattleLogService {

    private final BattleLogRepository battleLogRepository;
    @Override
    public void saveBattleLog(BattleLogSaveRequest battleLogSaveRequest) {
        BattleLog battleLog = BattleLog.builder()
                        .user1(Member.builder().id(battleLogSaveRequest.getUser1Id()).build())
                        .user2(Member.builder().id(battleLogSaveRequest.getUser2Id()).build())
                        .video(Video.builder().id(battleLogSaveRequest.getVideoId()).build())
                        .point(battleLogSaveRequest.getPoint())
                        .build();
        battleLogRepository.save(battleLog);
    }

}
