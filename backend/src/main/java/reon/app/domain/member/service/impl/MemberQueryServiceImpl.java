package reon.app.domain.member.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.dto.res.MemberResponse;
import reon.app.domain.member.repository.MemberQueryRepository;
import reon.app.domain.member.repository.impl.MemberQueryRepositoryImpl;
import reon.app.domain.member.service.MemberQueryService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import javax.persistence.Id;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberQueryServiceImpl implements MemberQueryService {
    private final MemberQueryRepository memberQueryRepository;

    @Override
    public MemberResponse findById(Long id) {
        MemberResponse res = memberQueryRepository.findById(id);
        if(res == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return res;
    }

    @Override
    public Long searchMemberIdByEmail(String email) {
        Long findId = memberQueryRepository.searchMemberIdByEmail(email);
        if(findId == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return findId;
    }

    @Override
    public BackStageMemberResponse findBackStageMemberById(Long id) {
        BackStageMemberResponse res = memberQueryRepository.findBackStageMemberById(id);
        if(res == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return res;
    }

    @Override
    public MemberBattleInfoResponse findMemberBattleInfoById(Long id) {
        MemberBattleInfoResponse memberBattleInfoResponse = memberQueryRepository.findMemberBattleInfoById(id);
        if(memberBattleInfoResponse == null){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        return memberBattleInfoResponse;
    }

    @Override
    public List<BattleLogRankResponse> findBattleLogsRank() {
        List<BattleLogRankResponse> battleLogRankResponses = memberQueryRepository.findBattleLogsRank();
        return battleLogRankResponses;
    }

}
