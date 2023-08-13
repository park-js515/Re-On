package reon.app.domain.member.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reon.app.domain.member.entity.Tier;

@Data
@NoArgsConstructor
public class BattleLogRankResponse {
    private String email;
    private String nickName;
    private String profileImg;
    private Tier tier;
    private int score;

    @Builder
    public BattleLogRankResponse(String email, String nickName, String profileImg, Tier tier, int score) {
        this.email = email;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.tier = tier;
        this.score = score;
    }
}
