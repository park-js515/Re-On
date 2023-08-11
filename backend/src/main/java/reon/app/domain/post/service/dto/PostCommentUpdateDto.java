package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCommentUpdateDto {
    private Long memberId;
    private Long commentId;
    private String content;

    @Builder
    public PostCommentUpdateDto(Long memberId, Long commentId, String content) {
        this.memberId = memberId;
        this.commentId = commentId;
        this.content = content;
    }
}
