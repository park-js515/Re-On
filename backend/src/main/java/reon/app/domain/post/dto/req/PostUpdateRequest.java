package reon.app.domain.post.dto.req;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class PostUpdateRequest {
    @Size(max = 100, message = "제목은 50자까지 작성 가능합니다.")
    @NotBlank(message = "제목이 비어있습니다.")
    private String title;
    @NotBlank
    private String content;
}
