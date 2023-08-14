package reon.app.domain.member.dto.req;

import reon.app.domain.member.entity.MemberInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@SuperBuilder
public class MemberUpdateRequest {
    private String nickName;
    private String introduce;

    public MemberUpdateRequest(String nickName, String introduce) {
        this.nickName = nickName;
        this.introduce = introduce;
    }
}
