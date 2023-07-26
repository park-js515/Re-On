package reon.app.domain.member.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Api(tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user-management")
public class MemberApi {

    private final MemberService memberService;

    @ApiOperation(value="유저 정보 조회", notes = "해당 유저의 정보 조회")
    @PostMapping("/user/{id}")
    public ResponseEntity<Member> getMember(@PathVariable Long id){
        Member member = memberService.findById(id);
        return new ResponseEntity<>(member,HttpStatus.OK);
    }

    @ApiOperation(value="로그아웃", notes = "로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
