package reon.app.domain.member.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.member.dto.res.BattleLogResponse;
import reon.app.domain.member.repository.BattleLogQueryRepository;

import java.util.List;

import static reon.app.domain.member.entity.QBattleLog.battleLog;



@Repository
@RequiredArgsConstructor
public class BattleLogQueryRepositoryImpl implements BattleLogQueryRepository {

    private final JPAQueryFactory queryFactory;
    @Override
    public List<BattleLogResponse> searchBattleLogsById(Long memberId) {

        return queryFactory
                .select(Projections.fields(BattleLogResponse.class,
                        battleLog.user2Id,
                        battleLog.videoId,
                        battleLog.point
                        ))
                .from(battleLog)
                .where(battleLog.user1Id.eq(memberId))
                .orderBy(battleLog.createDate.desc())
                .limit(10)
                .fetch();
    }
}
