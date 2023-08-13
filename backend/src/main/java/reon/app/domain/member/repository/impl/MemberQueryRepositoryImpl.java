package reon.app.domain.member.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogRankResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.dto.res.MemberResponse;
import reon.app.domain.member.repository.MemberQueryRepository;

import java.util.List;

import static reon.app.domain.member.entity.QMemberBattleInfo.memberBattleInfo;
import static reon.app.domain.member.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository {
    private final JPAQueryFactory queryFactory;

    //mypage 조회
    @Override
    public MemberResponse findById(Long id) {
        return queryFactory
                .select(Projections.fields(MemberResponse.class,
                        member.memberInfo.nickName,
                        member.memberInfo.introduce,
                        member.memberInfo.profileImg,
                        member.email,
                        member.memberBattleInfo.tier
                ))
                .from(member)
                .where(member.id.eq(id),
                        member.memberInfo.deleted.eq(0))
                .fetchOne();
    }

    @Override
    public BackStageMemberResponse findBackStageMemberById(Long id) {
        return queryFactory
                .select(Projections.fields(BackStageMemberResponse.class,
                        member.memberInfo.nickName,
                        member.memberInfo.profileImg,
                        member.memberBattleInfo.tier,
                        member.memberBattleInfo.gameCnt,
                        member.memberBattleInfo.win,
                        member.memberBattleInfo.lose
                ))
                .from(member)
                .where(member.id.eq(id),
                        member.memberInfo.deleted.eq(0))
                .fetchOne();
    }

    @Override
    public MemberBattleInfoResponse findMemberBattleInfoById(Long id) {
        return queryFactory
                .select(Projections.fields(MemberBattleInfoResponse.class,
                        member.memberBattleInfo.score,
                        member.memberBattleInfo.gameCnt,
                        member.memberBattleInfo.win,
                        member.memberBattleInfo.lose
                ))
                .from(member)
                .where(member.id.eq(id))
                .fetchOne();
    }

    @Override
    public Long searchMemberIdByEmail(String email) {
        return queryFactory
                .select(member.id)
                .from(member)
                .where(member.email.eq(email),
                        member.memberInfo.deleted.eq(0))
                .fetchOne();
    }

    @Override
    public List<BattleLogRankResponse> findBattleLogsRank() {
        return queryFactory
                .select(Projections.fields(BattleLogRankResponse.class,
                        member.email,
                        member.memberInfo.nickName,
                        member.memberInfo.profileImg,
                        member.memberBattleInfo.tier,
                        member.memberBattleInfo.score
                        ))
                .from(member)
                .where(member.memberInfo.deleted.eq(0))
                .orderBy(member.memberBattleInfo.score.desc())
                .limit(5)
                .fetch();
    }


}
