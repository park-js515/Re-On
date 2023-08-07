package reon.app.domain.post.api;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.post.dto.res.PrivateDetailPostResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.service.PostLikeService;
import reon.app.domain.post.service.PostQueryService;
import reon.app.domain.post.service.PostService;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.global.api.ApiResponse;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

@Api(tags = "Post")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/post-management/post")
public class PostApi {
    private final PostService postService;
    private final PostQueryService postQueryService;

//    private final MemberService memberService;
    private final PostLikeService postLikeService;

    @Operation(summary = "post 생성", description = "post를 생성하는 API입니다")
    @PostMapping
    public ApiResponse<?> savePost(@RequestPart MultipartFile actionVideo,@RequestParam("videoId") Long videoId,
                                   @Parameter(hidden = true) @AuthenticationPrincipal User user){
        PostSaveDto postSaveDto = PostSaveDto.builder()
                .memberId(Long.parseLong(user.getUsername()))
                .actionVideo(actionVideo)
                .videoId(videoId)
                .build();
        postService.save(postSaveDto);

        return ApiResponse.OK(null);
    }

    // 단건 조회
    @Operation(tags = "회원", description = "회원 베틀 정보를 조회한다.")
    @GetMapping("/{postId}")
    public ApiResponse<?> searchPost(@PathVariable Long postId){
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope.equals(Scope.PRIVATE)){ // title, content 제공 x
            PrivateDetailPostResponse response = postQueryService.searchPrivateById(postId);
            if(response != null){
                return ApiResponse.OK(response);
            }
        }else{
            PublicDetailPostResponse response = postQueryService.searchPublicById(postId);
        }
        return ApiResponse.OK(null);
    }
}
