package reon.app.domain.member.dto.response;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class MemberResponse {
    private Long id;
    private String name;
    private String email;
    private String nickName;
    private String profileImg;
    private String introduce;
    private String tier;
    private int score;
    private int gameCnt;
    private int win;
    private int lose;
}
