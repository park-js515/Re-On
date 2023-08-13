package reon.app.domain.post.dto.req;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CommentUpdateRequest {
    private Long id;
    @Size(max = 150, message = "댓글은 150자까지 작성 가능합니다.")
    private String content;
}
