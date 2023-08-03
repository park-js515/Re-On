package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.domain.member.dto.req.MemberInfoUpdateRequest;
import reon.app.global.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;

@Embeddable
@Getter
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
public class MemberInfo {
    @Column(nullable = false, length = 16)
    private String nickName; //닉네임
    @Column(length = 150)
    private String introduce;//자기소개
    private String profileImg;//프로필 이미지
    private int reported;//재제 수
    private int deleted;//탈퇴 여부
    private int banned;//신고 여부

    public void updateMemberInfo(MemberInfoUpdateRequest memberUpdateRequest){
        this.nickName = memberUpdateRequest.getNickName();
        this.introduce = memberUpdateRequest.getIntroduce();
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
    public void updateReported(int reported){
        this.reported = reported;
    }
    public void updateDeleted(int deleted){
        this.deleted = deleted;
    }
    public void updateBanned(int banned){
        this.banned = banned;
    }
}
