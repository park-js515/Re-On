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
    private Long user1Id;//사용자 1 id
    private Long user2Id;//사용자 2 id
    private Long videoId;//연기 원본 영상
    private int result;//승패 여부
}
