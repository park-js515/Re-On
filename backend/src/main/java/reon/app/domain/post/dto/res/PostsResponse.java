package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostsResponse {
    private Long id;
    private String email;
    private String title;
    private String nickName;
    private String profileImg;
    private String thumbnail;
    private int likeCnt;
    private Boolean isLike;
    private int commentCnt;
    private LocalDateTime createDate;

    @Builder
    public PostsResponse(Long id, String email, String title, String nickName, String profileImg, String thumbnail, int likeCnt, Boolean isLike, int commentCnt, LocalDateTime createDate) {
        this.id = id;
        this.email = email;
        this.title = title;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.thumbnail = thumbnail;
        this.likeCnt = likeCnt;
        this.isLike = isLike;
        this.commentCnt = commentCnt;
        this.createDate = createDate;
    }
}
