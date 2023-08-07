package reon.app.domain.post.dto.req;

import lombok.Data;

@Data
public class CommentUpdateRequest {
    private Long id;
    private String content;
}
