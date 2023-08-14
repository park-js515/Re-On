package reon.app.domain.video.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class VideoSaveDto {
    private String title;
    private String actor;
    private String script;
    private String sttScript;
    private MultipartFile originalVideo;
    private MultipartFile thumbnail;

    @Builder
    public VideoSaveDto(String title, String actor, String script, String sttScript, MultipartFile originalVideo, MultipartFile thumbnail) {
        this.title = title;
        this.actor = actor;
        this.script = script;
        this.sttScript = sttScript;
        this.originalVideo = originalVideo;
        this.thumbnail = thumbnail;
    }
}
