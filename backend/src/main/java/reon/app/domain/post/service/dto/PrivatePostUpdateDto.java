package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class PrivatePostUpdateDto {
    private Long id;
    @Size(max = 50)
    private String title;
    @NotBlank
    private String content;

    @Builder
    public PrivatePostUpdateDto(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
