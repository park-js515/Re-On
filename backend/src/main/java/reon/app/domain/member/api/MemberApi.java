package reon.app.domain.member.api;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import reon.app.domain.member.dto.req.BattleLogSaveRequest;
import reon.app.domain.member.dto.req.MemberUpdateRequest;
import reon.app.domain.member.dto.res.BackStageMemberResponse;
import reon.app.domain.member.dto.res.BattleLogResponse;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
import reon.app.domain.member.service.*;
import reon.app.domain.member.service.dto.MemberUpdateDto;
import reon.app.global.api.ApiResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.member.dto.res.MemberResponse;
import reon.app.global.util.FileExtFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.List;

import static reon.app.global.api.ApiResponse.OK;

@Api(tags = "Member")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/member-management/member")
public class MemberApi {
    private final MemberService memberService;
    private final MemberQueryService memberQueryService;
    private final BattleLogService battleLogService;
    private final BattleLogQueryService battleLogQueryService;
    private final FileExtFilter fileExtFilter;


    @Operation(summary = "mypage member 조회", description = "email로 mypage member 상세 조회")
    @GetMapping("/{email}") // 시큐리티를 사용한다면 로그인이 됐으면 ? user 있을꺼고 나도 사용하고싶당~
    public ApiResponse<MemberResponse> findMemberById(@PathVariable("email") @ApiParam("유저 email") String email, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername()); //null exception -> 500 에러가 나감.
        Long findId = memberQueryService.searchMemberIdByEmail(email);

        MemberResponse memberResponse = memberQueryService.findById(findId);
        if(loginId == findId){
            memberResponse.setIsMyPage(true);
        }else{
            memberResponse.setIsMyPage(false);
        }
        return ApiResponse.OK(memberResponse);
    }

    @Operation(summary = "Back stage member 조회", description = "Token 정보 기반 BackStage Member 정보 조회")
    @GetMapping("/back-stage")
    public ApiResponse<BackStageMemberResponse> findBackStageMemberById(@Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        BackStageMemberResponse backStageMemberResponse = memberQueryService.findBackStageMemberById(loginId);
        return ApiResponse.OK(backStageMemberResponse);
    }


    @Operation(summary = "member 정보 수정", description = "회원 정보(닉네임, 자기소개)를 수정한다.")
    @PutMapping("/update")
    public ApiResponse<String> update(@RequestBody @ApiParam("수정할 회원 정보") MemberUpdateRequest memberUpdateRequest, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());

        MemberUpdateDto dto = MemberUpdateDto.builder()
                .loginId(loginId)
                .nickName(memberUpdateRequest.getNickName())
                .introduce(memberUpdateRequest.getIntroduce())
                .build();
        String updateMemberEmail = memberService.updateMember(dto);
        return ApiResponse.OK(updateMemberEmail);
    }

    @Operation(summary = "member profile image 수정", description = "회원 프로필 이미지를 수정한다.")
    @PutMapping("/images/update")
    public ApiResponse<String> updateProfileImg(@RequestPart MultipartFile profileImg, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
        fileExtFilter.imageFilter(profileImg); // 이미지 확장자 검사
        Long loginId = Long.parseLong(user.getUsername());
        String updateMemberEmail = memberService.updateProfileImg(profileImg, loginId);
        return ApiResponse.OK(updateMemberEmail);
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
    
    @Operation(summary = "Battle 결과 등록", description = "배틀 결과를 저장한다")
    @PostMapping("/battlelog")
    public ApiResponse<Void> saveBattleLog(@RequestBody BattleLogSaveRequest battleLogSaveRequest){
        battleLogService.saveBattleLog(battleLogSaveRequest);//배틀 결과 저장
        memberService.updateBattleInfo(battleLogSaveRequest);//member battle info 갱신
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
