package reon.app.domain.member.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
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
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;
    private String name;

    @Column(unique = true)
    private String email;
    private String birthday;
    private String gender;
    private String oauth_provider;
    private String refresh_token;

    public void updateRefreshToken(String refreshToken){
        this.refresh_token = refreshToken;
    }
}
