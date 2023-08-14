package reon.app.domain.video.dto.req;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VideoSaveRequest {
    private String title;
    private String actor;
    private String script;
    private String sttScript;
}
