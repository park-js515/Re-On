package reon.app.domain.post.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.dto.res.PostsResponse;
import reon.app.domain.post.dto.res.PrivatePostsResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.dto.res.PublicPostsResponse;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostLike;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostQueryRepository;

import java.util.List;

import static reon.app.domain.member.entity.QMember.member;
import static reon.app.domain.post.entity.QPost.post;
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
                .where(post.id.eq(postId))
                .fetchOne();
    }

    @Override
    public List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long memberId) {
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
                .where(post.member.id.eq(memberId),
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
                        post.member.id.as("memberId"),
                        post.title,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.member.id.eq(memberId),
                        post.scope.eq(Scope.PUBLIC))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }

    @Override
    public List<PostsResponse> searchLikedPosts(List<Long> ids, Long offset, Long memberId) {
        return queryFactory
                .select(Projections.fields(PostsResponse.class,
                        post.id,
                        post.member.id.as("memberId"),
                        post.title,
                        post.member.memberInfo.nickName,
                        post.member.memberInfo.profileImg,
                        post.video.thumbnail,
                        post.postLikes.size().as("likeCnt"),
                        post.createDate
                        ))
                .from(post)
                .join(post.member, member)
                .join(post.video, video)
                .where(post.id.in(ids),
                        post.scope.eq(Scope.PUBLIC),
                        post.member.id.ne(memberId))
                .orderBy(post.createDate.desc())
                .offset((offset-1)* 21L)
                .limit(21)
                .fetch();
    }
}
