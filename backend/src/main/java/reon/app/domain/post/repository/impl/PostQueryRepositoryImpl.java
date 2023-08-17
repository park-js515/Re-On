package reon.app.domain.post.repository.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostLike;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostQueryRepository;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

import static reon.app.domain.member.entity.QMember.member;
import static reon.app.domain.post.entity.QPost.post;
import static reon.app.domain.post.entity.QPostLike.postLike;
import static reon.app.domain.video.entity.QVideo.video;

@Repository
@RequiredArgsConstructor
public class PostQueryRepositoryImpl implements PostQueryRepository {
    private final JPAQueryFactory queryFactory;
    @Override
    public Scope searchScopeById(Long postId) {
        return queryFactory
                .select(post.scope)
                .from(post)
                .where(post.id.eq(postId))
                .fetchOne();
    }

    @Override
    public Post searchById(Long postId) {
        return queryFactory
                .select(post)
                .from(post)
                .join(post.member, member).fetchJoin()
                .join(post.video, video).fetchJoin()
                .where(post.id.eq(postId),
                        post.deleted.eq(0))
                .fetchOne();
    }

    @Override
    public List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long loginId) {
        return queryFactory
                .select(Projections.fields(PrivatePostsResponse.class,
                        post.id,
                        post.video.title,
                        post.video.thumbnail,
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.member.id.eq(loginId),
                        post.deleted.eq(0),
                        post.scope.eq(Scope.PRIVATE))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }

    @Override
    public List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId) {
        return queryFactory
                .select(Projections.fields(PublicPostsResponse.class,
                        post.id,
                        post.member.email,
                        post.title,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.postComments.size().as("commentCnt"),
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.member.id.eq(memberId),
                        post.deleted.eq(0),
                        post.scope.eq(Scope.PUBLIC))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }

    @Override
    public List<PostsResponse> searchLikedPosts(List<Long> ids, Long offset, Long loginId) {
        return queryFactory
                .select(Projections.fields(PostsResponse.class,
                        post.id,
                        post.member.email,
                        post.title,
                        post.member.memberInfo.nickName,
                        post.member.memberInfo.profileImg,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.postComments.size().as("commentCnt"),
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.id.in(ids),
                        post.deleted.eq(0),
                        post.scope.eq(Scope.PUBLIC),
                        post.member.id.ne(loginId))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }

    @Override
    public List<PostsResponse> searchFeedPosts(Long offset) {
        return queryFactory
                .select(Projections.fields(PostsResponse.class,
                        post.id,
                        post.member.email,
                        post.title,
                        post.member.memberInfo.nickName,
                        post.member.memberInfo.profileImg,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.postComments.size().as("commentCnt"),
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.scope.eq(Scope.PUBLIC),
                        post.deleted.eq(0))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }

    @Override
    public List<PostsResponse> searchFeedRankPosts() {

        return queryFactory
                .select(Projections.fields(PostsResponse.class,
                        post.id,
                        post.member.email,
                        post.title,
                        post.member.memberInfo.nickName,
                        post.member.memberInfo.profileImg,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.postComments.size().as("commentCnt"),
                        post.createDate
                ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.deleted.eq(0),
                        post.scope.eq(Scope.PUBLIC),
                        isCurrentMonth()
                        )
                .orderBy(post.postLikes.size().desc())
                .limit(10)
                .fetch();
    }

//    @Override
//    public List<PostCommentResponse> searchPostCommentResponse(Long offset, Long postId) {
//        return queryFactory
//                .select(Projections.fields(PostCommentResponse.class,
//                        ));
//    }

    private BooleanExpression isCurrentMonth() {
        LocalDateTime now = LocalDateTime.now();
        YearMonth yearMonth = YearMonth.from(now);

        return post.createDate.between(
                yearMonth.atDay(1).atStartOfDay(),
                yearMonth.atEndOfMonth().atTime(23, 59, 59)
        );
    }
}
