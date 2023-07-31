package reon.app.domain.post.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reon.app.domain.post.dto.request.CommentCreateRequest;
import reon.app.domain.post.service.CommentService;

@Api(tags = "Comment")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/comment-management/comment")
public class CommentApi {

    private final CommentService commentService;
//    private final MemberService memberService;

// TODO: 2023-07-26 security 구현시 Authentication Principal
    @ApiOperation(value = "댓글 생성", notes = "댓글을 생성하는 API입니다.")
    @PostMapping("/create")
    public ResponseEntity<Void> saveComment(@RequestBody CommentCreateRequest commentCreateRequest){
//    public ResponseEntity<Void> saveComment(@RequestBody CommentCreateRequest commentCreateRequest, @Parameter(hidden = true) @AuthenticationPrincipal User user){
        Long memberId = Long.parseLong(user.getUsername());
        Member findMember = memberService.findById(memberId);
        commentService.save(commentCreateRequest, findMember);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
