package com.reon.app.domain.member.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;
import com.reon.app.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
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
