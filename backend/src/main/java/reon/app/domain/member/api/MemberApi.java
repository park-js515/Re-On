package reon.app.domain.member.api;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reon.app.domain.member.dto.response.MemberResponse;
import reon.app.global.api.ApiResponse;


@Api(tags = {"member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member-management")
public class MemberApi {

    @GetMapping("/user/{email}")
    public ApiResponse<MemberResponse> findMemberByEmail(@PathVariable("email") String email){
        return ApiResponse.OK(new MemberResponse());
    }
}
