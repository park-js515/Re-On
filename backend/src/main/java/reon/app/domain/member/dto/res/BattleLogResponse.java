package reon.app.domain.member.dto.res;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BattleLogResponse {

    private Long userId;//상대 Id
    private String userNickName;//상대 닉네임
    private String videoTitle;//연기 영상
    private int point;//점수

    public BattleLogResponse(Long userId, String userNickName, String videoTitle, int point ){
        this.userId = userId;
        this.userNickName=userNickName;
        this.videoTitle = videoTitle;
        this.point=point;
    }
}
