package reon.app.domain.member.dto.req;

import reon.app.domain.member.entity.MemberInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class MemberUpdateRequest {
    private Long id;
    private String nickName;
    private String introduce;

    public MemberUpdateRequest(Long id, String nickName, String introduce) {
        this.id = id;
        this.nickName = nickName;
        this.introduce = introduce;
    }
}
