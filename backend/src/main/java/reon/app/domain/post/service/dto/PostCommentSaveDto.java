package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCommentSaveDto {
    private Long memberId;
    private Long postId;
    private String content;

    @Builder
    public PostCommentSaveDto(Long memberId, Long postId, String content) {
        this.memberId = memberId;
        this.postId = postId;
        this.content = content;
    }
}
