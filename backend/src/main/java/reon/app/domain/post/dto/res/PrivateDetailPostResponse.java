package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrivateDetailPostResponse { // 마이페이지 Private 상세 조회
    private Long id; // post id
    private String email; // member email
    private String title; // utube video title(not member action video title)
    private String actionPath; // member action video url
    private LocalDateTime createdDate; // created date

    @Builder
    public PrivateDetailPostResponse(Long id, String email, String title, String actionPath, LocalDateTime createdDate) {
        this.id = id;
        this.email = email;
        this.title = title;
        this.actionPath = actionPath;
        this.createdDate = createdDate;
    }
}
