package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.member.dto.req.MemberBattleInfoUpdateRequest;

import javax.persistence.Entity;
import javax.persistence.Id;
@Getter
@Entity
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
public class MemberBattleInfo {
    @Id
    private Long memberId;
    private String tier;//현재 티어
    private int score;//누적 점수
    private int gameCnt;//게임 수
    private int win;//승리
    private int lose;//패배


    public void updateTier(String tier){
        this.tier = tier;
    }

    public void updateBattleInfo(MemberBattleInfoUpdateRequest memberBattleInfoUpdateRequest){
        this.score = memberBattleInfoUpdateRequest.getScore();
        this.gameCnt = memberBattleInfoUpdateRequest.getGameCnt();
        this.win = memberBattleInfoUpdateRequest.getWin();
        this.lose = memberBattleInfoUpdateRequest.getLose();
    }
}
