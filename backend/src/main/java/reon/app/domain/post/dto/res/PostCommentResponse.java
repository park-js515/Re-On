package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostCommentResponse {
    private Long id; // 댓글 id
    private Long memberId;
    private Long postId;
    private String nickName;
    private String profileImg;
    private String content;
    private LocalDateTime createdDate;

    @Builder
    public PostCommentResponse(Long id, Long memberId, Long postId, String nickName, String profileImg, String content, LocalDateTime createdDate) {
        this.id = id;
        this.memberId = memberId;
        this.postId = postId;
        this.nickName = nickName;
        this.profileImg = profileImg;
        this.content = content;
        this.createdDate = createdDate;
    }
}
