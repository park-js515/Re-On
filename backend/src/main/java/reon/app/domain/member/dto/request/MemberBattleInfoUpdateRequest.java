package reon.app.domain.member.dto.request;

import reon.app.domain.member.entity.MemberBattleInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MemberBattleInfoUpdateRequest {
    private int score;//누적 점수
    private int gameCnt;//게임 수
    private int win;//승리
    private int lose;//패배

    public MemberBattleInfo toEntity(){
        return MemberBattleInfo.builder()
                .score(this.score)
                .gameCnt(this.gameCnt)
                .win(this.win)
                .lose(this.lose)
                .build();
    }
}
