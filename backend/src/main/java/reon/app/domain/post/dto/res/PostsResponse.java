package reon.app.domain.post.dto.res;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PostsResponse {
    private Long id;
    private Long memberId;
    private String title;
    private String nickName;
    private String profileImg;
    private String thumbnail;
    private int likeCnt;
    // TODO: 2023-08-09 comment 구현 후 추가
//    private int commentCnt;
    private LocalDateTime createDate;
}
