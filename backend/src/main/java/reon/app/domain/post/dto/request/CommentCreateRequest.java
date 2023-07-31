package reon.app.domain.post.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reon.app.domain.post.entity.Comment;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest {
    private Long postId;
    private String content;
    public Comment toEntity(Post post, Member loginMember){
        return Comment.builder()
                // TODO: 2023-07-26 post, member 생성 후 주석 해제
//                .post(post)
//                .member(loginMember)
                .content(content)
                .build();
    }
}
