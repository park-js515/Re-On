package reon.app.domain.member.dto.res;

import lombok.*;
import reon.app.domain.member.entity.MemberBattleInfo;

@Data
@NoArgsConstructor
public class MemberBattleInfoResponse {
    private String opponentEmail;
    private String opponentNickName;
    private int point; // 얻은 점수

    @Builder
    public MemberBattleInfoResponse(String opponentEmail, String opponentNickName, int point) {
        this.opponentEmail = opponentEmail;
        this.opponentNickName = opponentNickName;
        this.point = point;
    }
}
