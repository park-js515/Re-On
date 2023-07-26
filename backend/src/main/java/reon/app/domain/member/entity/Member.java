package reon.app.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@SuperBuilder
@DynamicInsert
@ToString
// 회원 정보를 담을 Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "birthday", nullable = false)
    private String birthday;

    @Column(name = "gender", nullable = false)
    private String gender;

    //Todo OAuthProvider 생성 후 수정 필수
    @Column(name = "oauthProvider", nullable = false)
    private String oauthProvider;

    @Column(name = "refreshToken", nullable = false)
    private String refreshToken;

    @Column(name = "deleted")
    @ColumnDefault("0")
    private int deleted;

    @Column(name = "banned")
    @ColumnDefault("0")
    private int banned;

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }
    public void updateDeleted(){
        this.deleted = 1;
    }
    public void updateBanned(){
        this.deleted = 1;
    }
}
