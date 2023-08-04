package reon.app.domain.member.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@DynamicInsert
@ToString
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String birthday;
    @Column(nullable = false)
    private String gender;
    @Embedded
    private OAuthProvider oAuthProvider;
    @Column(nullable = true) // 초기에는 없음
    private String refresh_token;
    @Embedded
    private MemberBattleInfo memberBattleInfo;
    @Embedded
    private MemberInfo memberInfo;


    // 비즈니스 로직
    public void updateRefreshToken(String refreshToken) {
        this.refresh_token = refreshToken;
    }
}
