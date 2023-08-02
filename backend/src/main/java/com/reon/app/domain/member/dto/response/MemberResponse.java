package com.reon.app.domain.member.dto.response;

import com.reon.app.domain.member.entity.Member;
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

    public MemberResponse(Member member){
        this.id = member.getId();
        this.name=member.getName();
        this.email= member.getEmail();
    }
}
