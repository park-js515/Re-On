package reon.app.domain.post.dto.req;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class SaveCommentRequest {
    @NotBlank(message = "댓글이 비어있습니다.")
    @Size(max = 100, message = "댓글은 100자까지 작성 가능합니다.")
    private String content;
}
