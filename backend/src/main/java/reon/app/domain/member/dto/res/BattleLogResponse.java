package reon.app.domain.member.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BattleLogResponse {
    private String opponentEmail; // 상대 이메일
    private String opponentNickName;//상대 닉네임
    private int point;//점수

    @Builder
    public BattleLogResponse(String opponentEmail, String opponentNickName, int point) {
        this.opponentEmail = opponentEmail;
        this.opponentNickName = opponentNickName;
        this.point = point;
    }
}
