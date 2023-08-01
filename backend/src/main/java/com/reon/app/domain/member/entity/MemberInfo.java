package com.reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import com.reon.app.domain.member.dto.request.MemberInfoUpdateRequest;
import com.reon.app.global.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
public class MemberInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickName; //닉네임
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
