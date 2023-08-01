package reon.app.domain.notice.api;//package reon.app.domain.post.api;
//
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.v3.oas.annotations.Operation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import reon.app.domain.post.dto.request.CommentCreateRequest;
//import reon.app.domain.post.service.CommentService;
//
//@Api(tags = "Comment")
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("api/comment-management/comment")
//public class CommentApi {
//
//    private final CommentService commentService;
////    private final MemberService memberService;
//
//// TODO: 2023-07-26 security 구현시 Authentication Principal
//    @Operation(summary = "댓글 생성", description = "댓글을 생성하는 API입니다.")
//    @PostMapping("/create")
//    public ResponseEntity<?> saveComment(@RequestBody CommentCreateRequest commentCreateRequest){
////    public ResponseEntity<Void> saveComment(@RequestBody CommentCreateRequest commentCreateRequest, @Parameter(hidden = true) @AuthenticationPrincipal User user){
////        Long memberId = Long.parseLong(user.getUsername());
////        Member findMember = memberService.findById(memberId);
////        commentService.save(commentCreateRequest, findMember);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @Operation(summary = "댓글 전체", description = "게시글에 댓글을 조회하는 API입니다.")
//    @GetMapping("/post/{id}")
//    public ResponseEntity<?> findComment(@PathVariable("id") Long postId){
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//}
