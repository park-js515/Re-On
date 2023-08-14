package reon.app.domain.member.dto.res;

import lombok.*;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.entity.Tier;

@Data
@NoArgsConstructor
public class MemberResponse {
    private String nickName;
    private String introduce;
    private String profileImg;
    private String email;
    private Tier tier;
    private Boolean isMyPage;

    @Builder
    public MemberResponse(String nickName, String introduce, String profileImg, String email, Tier tier, Boolean isMyPage) {
        this.nickName = nickName;
        this.introduce = introduce;
        this.profileImg = profileImg;
        this.email = email;
        this.tier = tier;
        this.isMyPage = isMyPage;
    }


}
