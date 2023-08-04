package reon.app.domain.member.dto.res;

import lombok.Data;
import lombok.NoArgsConstructor;
import reon.app.domain.member.entity.Member;
import lombok.Getter;
import lombok.ToString;
import reon.app.domain.member.entity.Tier;

@Data
@NoArgsConstructor
public class MemberResponse {
    private Long id;
    private String nickName;
    private String introduce;
    private String profileImg;
    private String email;
    private Tier tier;

    public MemberResponse(Long id, String nickName, String introduce, String profileImg, String email, Tier tier) {
        this.id = id;
        this.nickName = nickName;
        this.introduce = introduce;
        this.profileImg = profileImg;
        this.email = email;
        this.tier = tier;
    }


}
