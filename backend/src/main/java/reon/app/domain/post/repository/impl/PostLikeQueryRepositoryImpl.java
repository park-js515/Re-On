package reon.app.domain.post.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.repository.PostLikeQueryRepository;

import java.util.List;

import static reon.app.domain.post.entity.QPostLike.postLike;

@Repository
@RequiredArgsConstructor
public class PostLikeQueryRepositoryImpl implements PostLikeQueryRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Long> searchLikedPostByMemberId(Long memberId) {
        return queryFactory
                .select(postLike.post.id)
                .from(postLike)
                .where(postLike.member.id.eq(memberId))
                .fetch();
    }
}
