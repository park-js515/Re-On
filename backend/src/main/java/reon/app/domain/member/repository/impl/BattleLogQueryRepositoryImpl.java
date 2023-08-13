package reon.app.domain.member.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.BattleLogResponse;
import reon.app.domain.member.repository.BattleLogQueryRepository;

import java.util.List;

import static reon.app.domain.member.entity.QMember.member;
import static reon.app.domain.member.entity.QBattleLog.battleLog;
import static reon.app.domain.member.entity.QMemberInfo.memberInfo;
import static reon.app.domain.video.entity.QVideo.video;



@Repository
@RequiredArgsConstructor
public class BattleLogQueryRepositoryImpl implements BattleLogQueryRepository {

    private final JPAQueryFactory queryFactory;
    @Override
    public List<BattleLogResponse> findBattleLogsById(Long loginId) { //나
        return queryFactory
                .select(Projections.fields(BattleLogResponse.class,
                        battleLog.user2.email.as("opponentEmail"), // 상대 이메일
                        battleLog.user2.memberInfo.nickName.as("opponentNickName"),//상대 이름
                        battleLog.point // 득실 포인트
                        ))
                .from(battleLog) //배틀 기록에서
                .join(battleLog.user2, member)
                .join(battleLog.user1,member)
                .where(battleLog.user1.id.eq(loginId),
                        battleLog.user2.memberInfo.deleted.eq(0))
                .orderBy(battleLog.createDate.desc())
                .limit(10)
                .fetch();
    }

}
