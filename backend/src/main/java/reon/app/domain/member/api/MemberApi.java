package reon.app.domain.member.api;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.dto.req.MemberBattleInfoUpdateRequest;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.service.BattleLogQueryService;
import reon.app.domain.member.service.BattleLogService;
import reon.app.domain.member.service.MemberQueryService;
import reon.app.domain.member.service.MemberService;
import reon.app.global.api.ApiResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.res.MemberResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.List;

import static reon.app.global.api.ApiResponse.OK;

@Api(tags = "Member")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/member-management")
public class MemberApi {
    private final MemberService memberService;
    private final MemberQueryService memberQueryService;
    private final BattleLogService battleLogService;
    private final BattleLogQueryService battleLogQueryService;


    @Operation(summary = "mypage member 조회", description = "memberId로 mypage member 상세 조회")
    @GetMapping("/member/{id}") // 시큐리티를 사용한다면 로그인이 됐으면 ? user 있을꺼고 나도 사용하고싶당~
    public ApiResponse<MemberResponse> findMemberById(@PathVariable("id") @ApiParam("유저 id") Long id, @AuthenticationPrincipal User user){
        log.info(user.toString());
        MemberResponse memberResponse = memberQueryService.findById(id);
        return ApiResponse.OK(memberResponse);
    }

    @Operation(summary = "Back stage member 조회", description = "memberId로 BackStage Member 정보 조회")
    @GetMapping("/back-stage/{id}")
    public ApiResponse<BackStageMemberResponse> findBackStageMemberById(@PathVariable("id") @ApiParam("유저 ID") Long id){
        BackStageMemberResponse backStageMemberResponse = memberQueryService.findBackStageMemberById(id);
        return ApiResponse.OK(backStageMemberResponse);
    }

//    @Operation(tags = "회원", description = "이메일로 유저 정보를 조회한다")
//    @GetMapping("/member/{email}")
//    public ApiResponse<MemberResponse> findMemberByEmail(@PathVariable("email") @ApiParam("유저 이메일") String email){
//        return ApiResponse.OK(null);
//    }

    @Operation(summary = "member 정보 수정", description = "회원 정보(닉네임, 자기소개)를 수정한다.")
    @PutMapping("/member/update")
    public ApiResponse<?> update(@RequestBody @ApiParam("수정할 회원 정보") MemberUpdateRequest memberUpdateRequest){
        // TODO 2023.08.04 : ERROR처리 어떻게 ?
        Member updateMember = memberService.updateMember(memberUpdateRequest);
        if(updateMember == null){
            return ApiResponse.ERROR("회원이 존재하지 않습니다", HttpStatus.BAD_REQUEST);
        }
        return ApiResponse.OK(updateMember);
    }

    @Operation(summary = "member profile image 수정", description = "회원 프로필 이미지를 수정한다.")
    @PutMapping("/images/update")
    public ApiResponse<Void> updateProfileImg(@RequestPart MultipartFile profileImg, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
//    public ApiResponse<Void> updateProfileImg(@RequestPart @ApiParam("수정할 이미지") MultipartFile profileImg) {
//        memberService.updateProfileImg(profileImg, Long.parseLong(user.getUsername()));
        memberService.updateProfileImg(profileImg, Long.parseLong(user.getUsername()));
        return ApiResponse.OK(null);
    }
    @Operation(summary = "member image 삭제", description = "회원 프로필 이미지를 삭제한다.")
    @DeleteMapping("/images/delete")
    public ApiResponse<Void> removeProfileImg(@Parameter(hidden = true) @AuthenticationPrincipal User user) {
        memberService.removeProfileImg(Long.parseLong(user.getUsername()));
        return ApiResponse.OK(null);
    }
    
    @Operation(summary = "로그아웃", description = "로그아웃")
    @GetMapping("/member/logout/{id}")
    public ApiResponse<Void> logout(@PathVariable("id") Long id, HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        session.invalidate();
        memberService.deleteRefreshToken(id);
        return ApiResponse.OK(null);
    }

    // TODO: 2023-08-01 아이디를 인자로 받을지 그냥 Authentication으로 처리할지 결정
    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴")
    @DeleteMapping("/member/{id}")
    public ApiResponse<Void> delete(@PathVariable("id") @ApiParam("탈퇴를 진행할 유저의 아이디") Long id){
        memberService.delete(id);
        return ApiResponse.OK(null);
    }



    @Operation(summary = "member 배틀 정보 조회", description = "회원 베틀 정보를 조회한다.")
    @GetMapping("/member/{id}/battleInfo")
    public ApiResponse<MemberBattleInfoResponse> findMemberBattleInfo(@PathVariable("id") Long id) {
        MemberBattleInfoResponse memberBattleInfoResponse = memberQueryService.findMemberBattleInfoById(id);
        return OK(memberBattleInfoResponse);
    }
    @Operation(summary = "member 배틀 정보 업데이트", description = "회원 베틀 정보를 업데이트한다.")
    @PutMapping("/member/{id}/battleInfo")
    public ApiResponse<Void> updateMemberBattleInfo(@RequestBody MemberBattleInfoUpdateRequest memberBattleInfoUpdateRequest) {
        return OK(null);
    }




    @Operation(summary = "Battle 결과 등록", description = "배틀 결과를 저장한다")
    @PostMapping("/battlelog")
    public ApiResponse<Void> saveBattleLog(@RequestBody BattleLogSaveRequest battleLogSaveRequest){
        battleLogService.saveBattleLog(battleLogSaveRequest);
        return OK(null);
    }

    @Operation(summary = "Battle 기록 조회", description = "배틀 기록을 조회한다.")
    @GetMapping("/battlelog")
    public ApiResponse<?> findBattleLogById(@Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        List<BattleLogResponse> battleLogResponseList = battleLogQueryService.findBattleLogsById(memberId);
        return OK(battleLogResponseList);
    }

}
