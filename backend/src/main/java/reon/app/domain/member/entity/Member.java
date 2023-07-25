package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
// 회원 정보를 담을 Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String name;
    private String email;
    private String birthday;
    private String gender;
    //Todo OAuthProvider 생성 후 수정 필수
    private String oauthProvider;
    private String refreshToken;
    private int deleted;
    private int banned;

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

}
