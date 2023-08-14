package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PublicPostsResponse {
    private Long id;
    private String email;
    private String title;
    private String thumbnail;
    private int likeCnt;
    private Boolean isLike;
    private int commentCnt;
    private LocalDateTime createDate;

    @Builder
    public PublicPostsResponse(Long id, String email, String title, String thumbnail, int likeCnt, int commentCnt, LocalDateTime createDate) {
        this.id = id;
        this.email = email;
        this.title = title;
        this.thumbnail = thumbnail;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
        this.createDate = createDate;

    }
}
