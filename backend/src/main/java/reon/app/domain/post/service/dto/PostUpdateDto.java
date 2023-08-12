package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class PostUpdateDto {
    private Long id;
    private Long loginId;
    private String title;
    private String content;

    @Builder
    public PostUpdateDto(Long id, Long loginId, String title, String content) {
        this.id = id;
        this.loginId = loginId;
        this.title = title;
        this.content = content;
    }
}
