package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostCommentDeleteDto {
    private Long memberId;
    private Long commentId;

    @Builder
    public PostCommentDeleteDto(Long memberId, Long commentId) {
        this.memberId = memberId;
        this.commentId = commentId;
    }
}
