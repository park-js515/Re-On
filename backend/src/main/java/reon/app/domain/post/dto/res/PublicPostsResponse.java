package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PublicPostsResponse {
    private Long id;
    private Long memberId;
    private String title;
    private String thumbnail;
    private int likeCnt;
    // TODO: 2023-08-09 comment 구현 후 추가 
//    private int commentCnt;
    private LocalDateTime createDate;

    @Builder
    public PublicPostsResponse(Long id, Long memberId, String title, String thumbnail, int likeCnt, LocalDateTime createDate) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.thumbnail = thumbnail;
        this.likeCnt = likeCnt;
        this.createDate = createDate;
    }
}
