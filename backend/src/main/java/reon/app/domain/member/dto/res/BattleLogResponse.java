package reon.app.domain.member.dto.res;

import lombok.Data;
import lombok.NoArgsConstructor;
import reon.app.domain.member.entity.BattleLog;

@Data
@NoArgsConstructor
public class BattleLogResponse {
    private Long userID;//상대 Id
    private String userNickName;//상대 닉네임
    private String videoId;//연기 영상
    private int point;//점수

    public BattleLogResponse(Long userID,String userNickName,String videoId,int point ){
        this.userID = userID;
        this.userNickName=userNickName;
        this.videoId = videoId;
        this.point=point;
    }
}
