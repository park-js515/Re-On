package reon.app.domain.member.api;

import reon.app.domain.member.dto.req.MemberBattleInfoUpdateRequest;
import reon.app.domain.member.dto.req.MemberInfoUpdateRequest;
import reon.app.domain.member.dto.res.MemberBattleInfoResponse;
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

@Api(tags = "회원")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member-management")
public class MemberApi {

    @Operation(tags = "회원", description = "이메일로 유저 정보를 조회한다")
    @GetMapping("/member/{email}")
    public ApiResponse<MemberResponse> findMemberByEmail(@PathVariable("email") @ApiParam("유저 이메일") String email){
        return ApiResponse.OK(null);
    }
    @Operation(tags = "회원", description = "회원 정보(닉네임, 자기소개)를 수정한다.")
    @PutMapping("/member/update")
    public ApiResponse<Void> update(@RequestBody @ApiParam("수정할 회원 정보") MemberInfoUpdateRequest memberModifyRequest){
        return ApiResponse.OK(null);
    }

    // TODO: 2023-08-01 로그인 구현 후 AuthenticationPrincipal 적용
    @Operation(tags = "회원", description = "회원 프로필 이미지를 수정한다.")
    @PostMapping("/images/update")
//    public ApiResponse<Void> updateProfileImg(@RequestPart MultipartFile profileImg, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
    public ApiResponse<Void> updateProfileImg(@RequestPart @ApiParam("수정할 이미지") MultipartFile profileImg) {
        return ApiResponse.OK(null);
    }
    @Operation(tags = "회원", description = "회원 프로필 이미지를 삭제한다.")
    @DeleteMapping("/images/delete")
//    public ApiResponse<Void> removeProfileImg(@Parameter(hidden = true) @AuthenticationPrincipal User user) {
    public ApiResponse<Void> removeProfileImg() {
        return ApiResponse.OK(null);
    }
    
    @Operation(tags = "회원", description = "로그아웃")
    @GetMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest httpServletRequest){
        System.out.println("로그아웃실행");
        HttpSession session = httpServletRequest.getSession();
        session.invalidate();
        return ApiResponse.OK(null);
    }

    // TODO: 2023-08-01 아이디를 인자로 받을지 그냥 Authentication으로 처리할지 결정
    @Operation(tags = "회원", description = "회원 탈퇴")
    @DeleteMapping("/member/{loginId}")
    public ApiResponse<Void> delete(@PathVariable("loginId") @ApiParam("탈퇴를 진행할 유저의 아이디") String loginId){
        return ApiResponse.OK(null);
    }


    @Operation(tags = "회원", description = "회원 베틀 정보를 조회한다.")
    @GetMapping("/battleInfo/{email}")
//    public ApiResponse<Void> removeProfileImg(@Parameter(hidden = true) @AuthenticationPrincipal User user) {
    public ApiResponse<MemberBattleInfoResponse> findMemberBattleInfoByEmail(@PathVariable("email") @ApiParam("유저 이메일") String email) {
        return ApiResponse.OK(null);
    }
    @Operation(tags = "회원", description = "회원 베틀 정보를 업데이트한다.")
    @PutMapping("/battleInfo/update")
//    public ApiResponse<Void> removeProfileImg(@Parameter(hidden = true) @AuthenticationPrincipal User user) {
    public ApiResponse<Void> updateMemberBattleInfo(@RequestBody MemberBattleInfoUpdateRequest memberBattleInfoUpdateRequest) {
        return ApiResponse.OK(null);
    }


}
