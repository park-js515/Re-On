package reon.app.domain.member.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Api(tags = {"Member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user-management")
public class MemberApi {

    private final MemberService memberService;

    @ApiOperation(value="유저 정보 조회", notes = "해당 유저의 정보 조회")
    @PostMapping("/user/{MemberId}")
    public ResponseEntity<Member> findMemberById(@PathVariable Long MemberId){
        Member member = memberService.findById(MemberId);
        return new ResponseEntity<>(member,HttpStatus.OK);
    }

    @ApiOperation(value="로그아웃", notes = "로그인 된 유저의 로그아웃을 진행한다")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        session.invalidate();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value="회원 탈퇴", notes = "해당 유저의 회원 탈퇴를 진행한다.")
    @DeleteMapping("/delete")
    // TODO: 2023-07-26 security 설정 후 Authentication 사용
    public ResponseEntity<Void> delete(){
//    public ResponseEntity<Void> delete(@Parameter(hidden=true) @AuthenticationPrincipa User user){
//        Long userId = user.getId();
//        memberService.delete(loginId);
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
