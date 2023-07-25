package reon.app.domain.member.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user-management")
public class MemberApi {

    private final MemberService memberService;

    @ApiOperation(value="유저 정보 조회", notes = "해당 유저의 정보 조회")
    @PostMapping("/user/{id}")
    public ResponseEntity<?> getMember(@PathVariable Long id){
        MemberResponse member = memberService.findById(id);
        return ResponseEntity<>(member);
    }
}
