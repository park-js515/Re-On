package reon.app.domain.post.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.dto.res.PostCommentResponse;
import reon.app.domain.post.repository.PostCommentQueryRepository;

import java.util.List;

import static reon.app.domain.member.entity.QMember.member;
import static reon.app.domain.post.entity.QPost.post;
import static reon.app.domain.post.entity.QPostComment.postComment;

@Repository
@RequiredArgsConstructor
public class PostCommentQueryRepositoryImpl implements PostCommentQueryRepository {
    private final JPAQueryFactory queryFactory;
    @Override
    public List<PostCommentResponse> searchPostCommentResponse(Long offset, Long postId) {
        return queryFactory
                .select(Projections.fields(PostCommentResponse.class,
                        postComment.id,
                        postComment.member.id.as("memberId"),
                        postComment.post.id.as("postId"),
                        postComment.member.memberInfo.nickName,
                        postComment.member.memberInfo.profileImg,
                        postComment.content,
                        postComment.createDate
                        ))
                .from(postComment)
                .join(postComment.post, post)
                .join(postComment.member, member)
                .where(postComment.post.id.eq(postId))
                .orderBy(postComment.createDate.desc())
                .offset((offset-1)*10L)
                .limit(10)
                .fetch();
   }

}
