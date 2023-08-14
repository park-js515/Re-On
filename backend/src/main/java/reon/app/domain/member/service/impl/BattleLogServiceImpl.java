package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.entity.BattleLog;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.entity.Tier;
import reon.app.domain.member.repository.BattleLogRepository;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.member.service.BattleLogService;
import reon.app.domain.member.service.dto.BattleLogSaveDto;
import reon.app.domain.video.entity.Video;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

@Service
@RequiredArgsConstructor
@Transactional
public class BattleLogServiceImpl implements BattleLogService {

    private final BattleLogRepository battleLogRepository;
    private final MemberRepository memberRepository;
    @Override
    public int saveBattleLog(BattleLogSaveDto dto) {
        Member member1 = memberRepository.findById(dto.getUser1Id()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Member member2 = memberRepository.findById(dto.getUser2Id()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        int result = dto.getResult(); //-1 패 0 무 1 승

        Tier tier1 = member1.getMemberBattleInfo().getTier();
        Tier tier2 = member2.getMemberBattleInfo().getTier();

        //티어 비교 후 승점 생성
        int score;
        if(tier1.compareTo(tier2) < 0 && result == -1){ //내가 저티어인데 졌을때
            score = -1;
        }else if(tier1.compareTo(tier2) > 0 && result == 1){//내가 고티어인데 이겼을때
            score = 1;
        }else{
            score = (1 + Math.abs(tier1.compareTo(tier2))) * result; //게임 결과로 변동할 score
        }

        BattleLog battleLog = BattleLog.builder()
                        .user1(Member.builder().id(dto.getUser1Id()).build())
                        .user2(Member.builder().id(dto.getUser2Id()).build())
                        .video(Video.builder().id(dto.getVideoId()).build())
                        .point(score)
                        .build();
        battleLogRepository.save(battleLog);
        return score;
    }

}
