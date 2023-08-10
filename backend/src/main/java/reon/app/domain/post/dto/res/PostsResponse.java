package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostsResponse {
    private Long id;
    private Long memberId;
    private String title;
    private String nickName;
    private String profileImg;
    private String thumbnail;
    private int likeCnt;
    private int commentCnt;
    private LocalDateTime createDate;

    @Builder
    public PostsResponse(Long id, Long memberId, String title, String nickName, String profileImg, String thumbnail, int likeCnt, int commentCnt, LocalDateTime createDate) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.thumbnail = thumbnail;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
        this.createDate = createDate;
    }
}
