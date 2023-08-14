package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostCommentResponse {
    private Long id; // 댓글 id
    private String email;
    private Long postId;
    private String nickName;
    private String profileImg;
    private String content;
    private Boolean isMyComment;
    private LocalDateTime createDate;

    @Builder
    public PostCommentResponse(Long id, String email, Long postId, String nickName, String profileImg, String content, Boolean isMyComment, LocalDateTime createDate) {
        this.id = id;
        this.email = email;
        this.postId = postId;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.content = content;
        this.isMyComment = isMyComment;
        this.createDate = createDate;
    }
}
