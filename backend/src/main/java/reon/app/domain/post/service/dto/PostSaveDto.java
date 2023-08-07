package reon.app.domain.post.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class PostSaveDto {
    private Long memberId;
//    private Long VideoId; //원본영상
    private MultipartFile actionVideo;

    @Builder
    public PostSaveDto(Long memberId, MultipartFile actionVideo) {
        this.memberId = memberId;
        this.actionVideo = actionVideo;
    }
}
