package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class PostSaveDto {
    private Long memberId;
    private Long videoId; //원본영상
    private MultipartFile actionVideo;

    @Builder
    public PostSaveDto(Long memberId, Long videoId, MultipartFile actionVideo) {
        this.memberId = memberId;
        this.videoId = videoId;
        this.actionVideo = actionVideo;
    }
}
