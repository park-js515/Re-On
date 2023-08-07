package reon.app.domain.post.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostQueryRepository;

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
    public Post searchPrivateById(Long postId) {
        return queryFactory
                .select(post)
                .from(post)
                .join(post.member, member).fetchJoin()
                .join(post.video, video).fetchJoin()
                .where(post.id.eq(postId))
                .fetchOne();
    }
}
