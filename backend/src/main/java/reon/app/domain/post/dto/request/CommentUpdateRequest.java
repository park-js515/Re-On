package reon.app.domain.post.dto.request;

import lombok.Data;

@Data
public class CommentUpdateRequest {
    private Long id;
    private String content;
}
