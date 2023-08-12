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
import reon.app.domain.post.dto.req.PostUpdateRequest;
import reon.app.domain.post.dto.req.UpdateCommentRequest;
import reon.app.domain.post.dto.req.PrivatePostUpdateRequest;
import reon.app.domain.post.dto.req.SaveCommentRequest;
import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.service.*;
import reon.app.domain.post.service.dto.*;
import reon.app.global.api.ApiResponse;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import javax.persistence.Id;
import java.util.List;

@Api(tags = "Post")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/post-management/post")
public class PostApi {
    private final PostService postService;
    private final PostQueryService postQueryService;
    private final PostCommentService postCommentService;
    private final PostCommentQueryService postCommentQueryService;
//    private final MemberService memberService;
    private final PostLikeService postLikeService;

    @Operation(summary = "post 저장", description = "유저 연기 영상, 원본 영상ID를 입력받아 post를 저장")
    @PostMapping
    public ApiResponse<Long> savePost(@RequestPart MultipartFile actionVideo, @RequestParam("videoId") Long videoId,
                                   @Parameter(hidden = true) @AuthenticationPrincipal User user){
        PostSaveDto postSaveDto = PostSaveDto.builder()
                .memberId(Long.parseLong(user.getUsername()))
                .actionVideo(actionVideo)
                .videoId(videoId)
                .build();
        return ApiResponse.OK(postService.save(postSaveDto));
    }

    @Operation(summary = "post 수정", description = "post의 title, content를 수정한다")
    @PutMapping("/{postId}")
    public ApiResponse<Long> updatePost(@PathVariable Long postId, @RequestBody PostUpdateRequest request, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope == Scope.PRIVATE){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        PostUpdateDto dto = PostUpdateDto.builder()
                .id(postId)
                .loginId(loginId)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        return ApiResponse.OK(postService.update(dto));
    }

    @Operation(summary = "post 수정", description = "post의 title, content를 수정한다")
    @PutMapping("delete/{postId}") // delete 0 -> 1 바꾸기 때문에 Put 매핑
    public ApiResponse<Long> deletePost(@PathVariable Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        return ApiResponse.OK(postService.delete(postId, loginId));
    }

    @Operation(summary = "private to public post", description = "PRIVATE 게시글을 PUBLIC으로 변경한다.")
    @PutMapping("/private/{postId}")
    public ApiResponse<?> updatePrivateToPublicPost(@PathVariable Long postId, @RequestBody PrivatePostUpdateRequest request, @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope.equals(Scope.PUBLIC)){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        PrivatePostUpdateDto dto = PrivatePostUpdateDto.builder()
                .id(postId)
                .loginId(loginId)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        return ApiResponse.OK(postService.updatePrivateToPublic(dto));
    }

    @Operation(summary = "public to private post", description = "PUBLIC 게시글을 PRIVATE으로 변경한다. / 게시글의 좋아요, 댓글 기록은 삭제된다. ")
    @PutMapping("/public/{postId}")
    public ApiResponse<?> updatePublicToPrivatePost(@PathVariable Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope.equals(Scope.PRIVATE)){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        return ApiResponse.OK(postService.updatePublicToPrivate(postId, loginId));
    }


    // 단건 조회
    @Operation(summary = "private post 상세 조회", description = "postId로 private post 상세 조회")
    @GetMapping("private/{postId}")
    public ApiResponse<PrivateDetailPostResponse> searchPirvatePost(@PathVariable Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope == Scope.PUBLIC){
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        PrivateDetailPostResponse response = postQueryService.searchPrivateById(postId);
        return ApiResponse.OK(response);
    }

    @Operation(summary = "public post 상세 조회", description = "postId로 public post 상세 조회")
    @GetMapping("public/{postId}")
    public ApiResponse<PublicDetailPostResponse> searchPublicPost(@PathVariable Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(postScope == Scope.PRIVATE){
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        Long memberId = Long.parseLong(user.getUsername());
        PublicDetailPostResponse response = postQueryService.searchPublicById(postId, memberId);
        return ApiResponse.OK(response);
    }

    @Operation(summary = "mypage private post 목록 조회", description = "PRIVATE 게시글 목록을 조회한다.")
    @GetMapping("/private")
    public ApiResponse<List<PrivatePostsResponse>> searchPrivatePosts(@RequestParam(value = "offset") Long offset, @Parameter(hidden = true) @AuthenticationPrincipal User user ){
        Long memberId = Long.parseLong(user.getUsername());
        log.info(String.valueOf(memberId));
        List<PrivatePostsResponse> responses = postQueryService.searchPrivatePosts(offset, memberId);
        log.info(responses.toString());
        return ApiResponse.OK(responses);
    }

    @Operation(summary = "mypage 내가 좋아요 누른 post 목록 조회", description = "liked 게시글 목록을 조회한다.")
    @GetMapping("/liked")
    public ApiResponse<List<PostsResponse>> searchLikedPosts(@RequestParam(value = "offset") Long offset, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
        Long memberId = Long.parseLong(user.getUsername());
        List<PostsResponse> responses = postQueryService.searchLikedPosts(offset, memberId);
        return ApiResponse.OK(responses);
    }


    @Operation(summary = "mypage public post 목록 조회", description = "PUBLIC 게시글 목록을 조회한다.")
    @GetMapping("/public")
    public ApiResponse<List<PublicPostsResponse>> searchPublicPosts(@RequestParam(value = "offset") Long offset, @RequestParam(value = "memberId") Long memberId, @Parameter(hidden = true) @AuthenticationPrincipal User user) {
        Long loginId = Long.parseLong(user.getUsername());
        log.info(String.valueOf(memberId));
        List<PublicPostsResponse> responses = postQueryService.searchPublicPosts(offset, memberId, loginId);
        log.info(responses.toString());
        return ApiResponse.OK(responses);
    }

    @Operation(summary = "투표해줘 public post 목록 전체 조회", description = "투표해줘 PUBLIC 게시글 목록을 조회한다.")
    @GetMapping("/feed")
    public ApiResponse<List<PostsResponse>> searchFeedPosts(@RequestParam(value = "offset") Long offset, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long loginId = Long.parseLong(user.getUsername());
        List<PostsResponse> responses = postQueryService.searchFeedPosts(offset, loginId);
        return ApiResponse.OK(responses);
    }

    @Operation(summary = "투표해줘 페이지 TOP10 post 조회", description = "좋아요 상태를 변경한다.")
    @GetMapping("/feed/rank")
    public ApiResponse<List<PostsResponse>> searchFeedRankPosts(@AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        List<PostsResponse> responses = postQueryService.searchFeedRankPosts(memberId);
        return ApiResponse.OK(responses);
    }



    @Operation(summary = "post 좋아요", description = "좋아요 상태를 변경한다.")
    @PostMapping("/like/{postId}")
    public ApiResponse<Boolean> changeLike(@PathVariable("postId") Long postId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        Boolean flag = postLikeService.changeLike(postId, memberId);
        return ApiResponse.OK(flag);
    }

    @Operation(summary = "post 댓글 작성", description = "post에 댓글을 작성한다.")
    @PostMapping("/{postId}/comment")
    public ApiResponse<?> saveComment(@PathVariable Long postId, @RequestBody SaveCommentRequest request, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope.equals(Scope.PRIVATE)){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        Long memberId = Long.parseLong(user.getUsername());
        PostCommentSaveDto dto = PostCommentSaveDto.builder()
                .memberId(memberId)
                .postId(postId)
                .content(request.getContent())
                .build();
        Long response = postCommentService.save(dto);
        return ApiResponse.OK(response);
    }
    @Operation(summary = "Detail post에서 댓글 10개를 조회한다.", description = "post detail에서 댓글을 조회한다.")
    @GetMapping("/{postId}/comment")
    public ApiResponse<List<PostCommentResponse>> searchComment(@PathVariable Long postId, @RequestParam(value = "offset") Long offset){
        Scope postScope = postQueryService.searchScopeById(postId);
        if(postScope.equals(Scope.PRIVATE)){
            throw new CustomException(ErrorCode.POST_SCOPE_ERROR);
        }
        List<PostCommentResponse> responses = postCommentQueryService.searchPostComment(offset, postId);
        return ApiResponse.OK(responses);
    }

    @Operation(summary = "post 댓글 업데이트", description = "post에 작성한 댓글을 수정한다.")
    @PutMapping("/comment/{commentId}")
    public ApiResponse<?> updateComment(@PathVariable Long commentId, @RequestBody UpdateCommentRequest request, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        PostCommentUpdateDto dto = PostCommentUpdateDto.builder()
                .memberId(memberId)
                .commentId(commentId)
                .content(request.getContent())
                .build();
        Long response = postCommentService.update(dto);
        return ApiResponse.OK(response);
    }

    @Operation(summary = "post 댓글 삭제", description = "post에 작성한 댓글을 삭제한다.")
    @DeleteMapping("/comment/{commentId}")
    public ApiResponse<?> deleteComment(@PathVariable Long commentId, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        PostCommentDeleteDto dto = PostCommentDeleteDto.builder()
                .commentId(commentId)
                .memberId(memberId)
                .build();
        Long response = postCommentService.delete(dto);
        return ApiResponse.OK(response);
    }
}
