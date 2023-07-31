package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.member.dto.request.MemberUpdateRequest;
import reon.app.global.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
public class MemberInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickName;
    private String profileImg;
    private String tier;
    private String introduce;
    private int score;
    private int gameCnt;
    private int win;
    private int lose;
    private int reported;
    private int deleted;
    private int banned;

    public void update(MemberUpdateRequest memberUpdateRequest){
        this.nickName = memberUpdateRequest.getNickName();
        this.introduce = memberUpdateRequest.getIntroduce();
    }

    public void modifyProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}
