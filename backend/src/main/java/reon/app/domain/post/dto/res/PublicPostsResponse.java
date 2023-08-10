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
    private int commentCnt;
    private LocalDateTime createDate;

    @Builder
    public PublicPostsResponse(Long id, Long memberId, String title, String thumbnail, int likeCnt, int commentCnt, LocalDateTime createDate) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.thumbnail = thumbnail;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
        this.createDate = createDate;

    }
}
