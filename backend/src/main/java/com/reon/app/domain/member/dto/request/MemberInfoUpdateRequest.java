package com.reon.app.domain.member.dto.request;

import com.reon.app.domain.member.entity.MemberInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class MemberInfoUpdateRequest {
    private String nickName;
    private String introduce;

    public MemberInfo toEntity(){
        return MemberInfo.builder()
                .nickName(this.nickName)
                .introduce(this.introduce)
                .build();
    }
}
