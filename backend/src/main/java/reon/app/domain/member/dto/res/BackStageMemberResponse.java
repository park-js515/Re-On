package reon.app.domain.member.dto.res;

import lombok.Data;
import lombok.NoArgsConstructor;
import reon.app.domain.member.entity.Tier;

@Data
@NoArgsConstructor
public class BackStageMemberResponse {
    //닉네임, 프로필 사진, 티어, 통산전적
    private Long id;
    private String nickName;
    private String profileImg;
    private Tier tier;
    private int gameCnt;
    private int win;
    private int lose;

    public BackStageMemberResponse(Long id, String nickName, String profileImg, Tier tier, int gameCnt, int win, int lose) {
        this.id = id;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.tier = tier;
        this.gameCnt = gameCnt;
        this.win = win;
        this.lose = lose;
    }
}
