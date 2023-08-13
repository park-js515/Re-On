package reon.app.domain.member.dto.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BattleLogSaveRequest {
    private String opponentEmail;// 상대 유저 email
    private Long videoId;//연기 원본 영상 id
    private int result;//승패 여부
}
