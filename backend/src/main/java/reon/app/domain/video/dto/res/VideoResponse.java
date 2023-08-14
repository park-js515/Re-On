package reon.app.domain.video.dto.res;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VideoResponse {
    private Long id;
    private String title;
    private String script;
    private String sttScript;
    private String videoPath;
    private String thumbnail;

    @Builder
    public VideoResponse(Long id, String title, String script, String sttScript, String videoPath, String thumbnail) {
        this.id = id;
        this.title = title;
        this.script = script;
        this.sttScript = sttScript;
        this.videoPath = videoPath;
        this.thumbnail = thumbnail;
    }
}
