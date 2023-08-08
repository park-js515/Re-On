package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrivatePostsResponse {
    private Long id; // post id
    private String title; // utube video title(not member action video title)
    private String thumbnail; // utube video thumnail url
    private LocalDateTime createDate; // created date

    @Builder
    public PrivatePostsResponse(Long id, String title, String thumbnail, LocalDateTime createDate) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.createDate = createDate;
    }
}
