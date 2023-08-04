package reon.app.domain.member.dto.res;

import lombok.Getter;
import lombok.ToString;
import reon.app.domain.member.entity.MemberBattleInfo;

@ToString
@Getter
public class MemberBattleInfoResponse {
    private int score;
    private int gameCnt;
    private int win;
    private int lose;

    public MemberBattleInfoResponse(MemberBattleInfo memberbattleInfo){
        this.score = memberbattleInfo.getScore();
        this.gameCnt=memberbattleInfo.getGameCnt();
        this.win= memberbattleInfo.getWin();
        this.lose= memberbattleInfo.getLose();
    }
}
