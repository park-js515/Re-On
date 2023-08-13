package reon.app.domain.member.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BattleLogSaveDto {
    private Long user1Id;
    private Long user2Id;
    private Long videoId;
    private int result;

    @Builder
    public BattleLogSaveDto(Long user1Id, Long user2Id, Long videoId, int result) {
        this.user1Id = user1Id;
        this.user2Id = user2Id;
        this.videoId = videoId;
        this.result = result;
    }
}
