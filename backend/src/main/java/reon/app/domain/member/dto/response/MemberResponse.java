package reon.app.domain.member.dto.response;

import lombok.Getter;
import lombok.ToString;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.entity.MemberInfo;

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

    public MemberResponse(Member member){
        this.id = member.getId();
        this.name=member.getName();
        this.email= member.getEmail();
    }
}
