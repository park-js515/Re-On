package reon.app.domain.post.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reon.app.domain.post.repository.PostLikeQueryRepository;

@Repository
@RequiredArgsConstructor
public class PostLikeQueryRepositoryImpl implements PostLikeQueryRepository {
    private JPAQueryFactory queryFactory;
}
