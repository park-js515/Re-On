package reon.app.domain.post.dto.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class PrivatePostUpdateRequest {
    @Size()
    private String title;
    @NotBlank
    private String content;
}
