package reon.app.domain.post.dto.req;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CommentUpdateRequest {
    private Long id;
    @Size(max = 100, message = "댓글은 100자까지 작성 가능합니다.")
    private String content;
}
