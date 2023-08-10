package reon.app.domain.post.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrivateDetailPostResponse { // 마이페이지 Private 상세 조회
    private Long id; // post id
    private Long memberId; // member id
    private String title; // utube video title(not member action video title)
    private String actionPath; // member action video url
    private LocalDateTime createdDate; // created date

    @Builder
    public PrivateDetailPostResponse(Long id, Long memberId, String title, String actionPath, LocalDateTime createdDate) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.actionPath = actionPath;
        this.createdDate = createdDate;
    }
}
