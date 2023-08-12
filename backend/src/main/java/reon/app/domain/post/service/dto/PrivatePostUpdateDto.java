package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class PrivatePostUpdateDto { // private -> public
    private Long id;
    private Long loginId;
    private String title;
    private String content;

    @Builder
    public PrivatePostUpdateDto(Long id, Long loginId, String title, String content) {
        this.id = id;
        this.loginId = loginId;
        this.title = title;
        this.content = content;
    }
}
