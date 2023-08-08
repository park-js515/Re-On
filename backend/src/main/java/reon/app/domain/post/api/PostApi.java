package reon.app.domain.post.api;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reon.app.domain.post.dto.req.PrivatePostUpdateRequest;
import reon.app.domain.post.dto.res.PrivateDetailPostResponse;
import reon.app.domain.post.dto.res.PrivatePostsResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.service.PostLikeService;
import reon.app.domain.post.service.PostQueryService;
import reon.app.domain.post.service.PostService;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.domain.post.service.dto.PrivatePostUpdateDto;
import reon.app.global.api.ApiResponse;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import java.util.List;

@Api(tags = "Post")
@RestController
@RequiredArgsConstructor
@Slf4j
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
    @Operation(tags = "게시글", description = "PRIVATE / PUBLIC 게시글을 조회한다.")
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

    @Operation(tags = "게시글", description = "개인 PRIVATE 게시글 목록을 조회한다.")
    @GetMapping("/private")
    public ApiResponse<?> searchPirvatePosts(@RequestParam(value = "offset") Long offset, @Parameter(hidden = true) @AuthenticationPrincipal User user ){
        Long memberId = Long.parseLong(user.getUsername());
        log.info(String.valueOf(memberId));
        List<PrivatePostsResponse> responses = postQueryService.searchPrivatePosts(offset, memberId);
        log.info(responses.toString());
        return ApiResponse.OK(responses);
    }

    @Operation(tags = "게시글", description = "PRIVATE 게시글을 PUBLIC으로 변경한다.")
    @PutMapping("/private/{postId}")
    public ApiResponse<?> updatePrivatePost(@PathVariable Long postId, @RequestBody PrivatePostUpdateRequest request){
        Scope scope = postQueryService.searchScopeById(postId);
        if(scope.equals(Scope.PUBLIC)){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        PrivatePostUpdateDto dto = PrivatePostUpdateDto.builder()
                .id(postId)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        postService.updatePrivateToPublic(dto);
        return ApiResponse.OK(null);

    }

    @Operation(tags="post 좋아요", description = "post 좋아요 API입니다. / True : 좋아요 생성, False : 좋아요 취소")
    @PostMapping("/like/{postId}")
    public ApiResponse<Boolean> changeLike(@PathVariable("postId") Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        Boolean flag = postLikeService.changeLike(postId, memberId);
        return ApiResponse.OK(flag);
    }
}
